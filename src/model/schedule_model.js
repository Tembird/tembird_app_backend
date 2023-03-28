// model/schedule_model.js

const db = require('../config/db');

const Schedule = {
    serialization: function (results) {
        return results.reduce((acc, {
            sid,
            date,
            start_at,
            end_at,
            color_hex,
            title,
            detail,
            location,
            created_at,
            edited_at,
            done,
            done_at,
            tid,
            todo_title,
            todo_status,
            todo_updated_at
        }) => {
            const foundIndex = acc.findIndex(result => result.sid === sid);
            if (foundIndex === -1) {
                acc.push({
                    'sid': sid,
                    'date': date,
                    'start_at': start_at,
                    'end_at': end_at,
                    'color_hex': color_hex,
                    'title': title,
                    'detail': detail,
                    'location': location,
                    'created_at': created_at,
                    'edited_at': edited_at,
                    'done': done,
                    'done_at': done_at,
                    'todo_list': tid === null ? [] : [
                        {
                            'tid': tid,
                            'todo_title': todo_title,
                            'todo_status': todo_status,
                            'todo_updated_at': todo_updated_at,
                        }
                    ]
                });
            } else {
                acc[foundIndex]['todo_list'].push({
                    'tid': tid,
                    'todo_title': todo_title,
                    'todo_status': todo_status,
                    'todo_updated_at': todo_updated_at,
                });
            }
            return acc;
        }, []);
    },
    create: async function (schedule, todoList) {
        try {
            await db.query(
                'INSERT INTO tb_schedules (uid, sid, date, start_at, end_at, color_hex, title, detail, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [schedule.uid, schedule.sid, schedule.date, schedule.startAt, schedule.endAt, schedule.colorHex, schedule.title, schedule.detail, schedule.location],
            );
            todoList.map(async function (todo) {
                await db.query(
                    'INSERT INTO tb_schedule_and_todo (tid, sid, todo_title) VALUES (?, ?, ?)',
                    [todo.tid, schedule.sid, todo.todoTitle]
                )
            });
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "일정 등록 중 오류가 발생하였습니다"};
        }
    },
    readList: async function (uid, date) {
        const query = 'SELECT tb_schedules.sid, tb_schedules.date, tb_schedules.start_at, tb_schedules.end_at, tb_schedules.color_hex, tb_schedules.title, tb_schedules.detail, tb_schedules.location, tb_schedules.created_at, tb_schedules.edited_at, tb_schedules.done, tb_schedules.done_at, tb_schedule_and_todo.tid, tb_schedule_and_todo.todo_title, tb_schedule_and_todo.todo_status, tb_schedule_and_todo.todo_updated_at FROM tb_schedules LEFT JOIN tb_schedule_and_todo ON tb_schedules.sid = tb_schedule_and_todo.sid WHERE uid = ? AND date = ?';
        try {
            const [results] = await db.query(query, [uid, date]);
            return Schedule.serialization(results);
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 조회에 실패하였습니다"};
        }
    },
    read: async function (sid, uid) {
        const query = 'SELECT tb_schedules.sid, tb_schedules.date, tb_schedules.start_at, tb_schedules.end_at, tb_schedules.color_hex, tb_schedules.title, tb_schedules.detail, tb_schedules.location, tb_schedules.created_at, tb_schedules.edited_at, tb_schedules.done, tb_schedules.done_at, tb_schedule_and_todo.tid, tb_schedule_and_todo.todo_title, tb_schedule_and_todo.todo_status, tb_schedule_and_todo.todo_updated_at FROM tb_schedules LEFT JOIN tb_schedule_and_todo ON tb_schedules.sid = tb_schedule_and_todo.sid WHERE tb_schedules.sid = ? AND uid = ?';
        try {
            const [results] = await db.query(query, [sid, uid]);
            if (results.length === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
            return Schedule.serialization(results);
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 조회에 실패하였습니다"};
        }
    },
    update: async function (schedule, todoList, removeTidList) {
        try {
            const [results] = await db.query(
                'UPDATE tb_schedules SET color_hex = ?, title = ?,detail = ?, location = ? WHERE sid = ? AND uid = ? LIMIT 1',
                [schedule.colorHex, schedule.title, schedule.detail, schedule.location, schedule.sid, schedule.uid],
            );
            if (removeTidList.length > 0) {
                await db.query(
                    'DELETE FROM tb_schedule_and_todo WHERE tid IN (?)',[removeTidList]
                );
            }
            todoList.map(async function (todo) {
                await db.query(
                    'INSERT INTO tb_schedule_and_todo (tid, sid, todo_title, todo_status) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE todo_title = ?, todo_status = ?',
                    [todo.tid, schedule.sid, todo.todoTitle, todo.todoStatus, todo.todoTitle, todo.todoStatus]
                )
            });
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 수정에 실패하였습니다"};
        }
    },
    delete: async function (schedule) {
        try {
            const [results] = await db.query(
                'DELETE FROM tb_schedules WHERE sid = ? AND uid = ? LIMIT 1',
                [schedule.sid, schedule.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 삭제에 실패하였습니다"};
        }
    },
}

module.exports = Schedule;