// model/daily_todo_model.js

const db = require('../config/db');

const DailyTodo = {
    serialization: async function (results) {
        return await results.reduce((acc, {
            label_id, label_origin_id, label_title, label_color_hex, label_date, label_start_at, label_end_at, label_created_at, label_updated_at, id, title, location, detail, status, created_at, updated_at, start_at, end_at,
        }) => {
            const foundIndex = acc.findIndex(result => result.id === label_id);
            if (foundIndex === -1) {
                acc.push({
                    'id': label_id,
                    'label_id': label_origin_id,
                    'title': label_title,
                    'color_hex': label_color_hex,
                    'date': label_date,
                    'start_at': label_start_at,
                    'end_at': label_end_at,
                    'created_at': label_created_at,
                    'updated_at': label_updated_at,
                    'todo_list': id === null ? [] : [
                        {
                            'id': id,
                            'title': title,
                            'location': location,
                            'detail': detail,
                            'status': status,
                            'created_at': created_at,
                            'updated_at': updated_at,
                            'start_at': start_at,
                            'end_at': end_at,
                        }
                    ]
                });
            } else {
                acc[foundIndex]['todo_list'].push({
                    'id': id,
                    'title': title,
                    'location': location,
                    'detail': detail,
                    'status': status,
                    'created_at': created_at,
                    'updated_at': updated_at,
                    'start_at': start_at,
                    'end_at': end_at,
                });
            }
            return acc;
        }, []);
    },
    create: async function (todo) {
        try {
            const [result] = await db.query(
                'INSERT INTO tb_daily_todo (daily_label_id, title, location, detail) SELECT id, ?, ?, ? FROM tb_daily_todo_labels WHERE id = ? AND uid = ?',
                [todo.title, todo.location, todo.detail, todo.dailyLabelId, todo.uid],
            );
            return result.insertId;
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw {status: 409, message: "이미 등록된 일정입니다"};
            }
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "할일 등록 중 오류가 발생하였습니다"};
        }
    },
    update: async function (todo) {
        try {
            const [results] = await db.query(
                'UPDATE tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id SET tdt.title = ?, tdt.location = ?, tdt.detail = ?, tdt.status = ?, tdt.start_at = ?, tdt.end_at = ? WHERE tdt.id = ? AND tdtl.uid = ?',
                [todo.title, todo.location, todo.detail, todo.status, todo.startAt, todo.endAt, todo.id, todo.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw {status: 409, message: "이미 등록된 일정입니다"};
            }
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 수정에 실패하였습니다"};
        }
    },
    updateInfo: async function (todo) {
        try {
            const [results] = await db.query(
                'UPDATE tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id SET tdt.title = ?, tdt.location = ?, tdt.detail = ? WHERE tdt.id = ? AND tdtl.uid = ?',
                [todo.title, todo.location, todo.detail, todo.id, todo.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw {status: 409, message: "이미 등록된 일정입니다"};
            }
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 제목 수정에 실패하였습니다"};
        }
    },
    updateStatus: async function (todo) {
        try {
            const [results] = await db.query(
                'UPDATE tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id SET tdt.status = ? WHERE tdt.id = ? AND tdtl.uid = ?',
                [todo.status, todo.id, todo.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 상태 수정에 실패하였습니다"};
        }
    },
    updateDuration: async function (todo) {
        try {
            const [results] = await db.query(
                'UPDATE tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id SET tdt.start_at = ?, tdt.end_at = ? WHERE tdt.id = ? AND tdtl.uid = ?',
                [todo.startAt, todo.endAt, todo.id, todo.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 시간 수정에 실패하였습니다"};
        }
    },
    read: async function (id, uid) {
        try {
            const [results] = await db.query(
                'SELECT tdt.id, tdt.title, tdt.location, tdt.detail, tdt.status, tdt.created_at, tdt.updated_at, tdt.start_at, tdt.end_at FROM tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id WHERE tdt.id = ? AND tdtl.uid = ? LIMIT 1',
                [id, uid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
            return results[0];
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 조회에 실패하였습니다"};
        }
    },
    readAllByDate: async function (date, uid) {
        try {
            const [results] = await db.query(
                    'SELECT tdtl.id AS "label_id", tdtl.label_id AS "label_origin_id", ttl.title AS "label_title", ttl.color_hex AS "label_color_hex", tdtl.date AS "label_date", tdtl.created_at AS "label_created_at", tdtl.updated_at AS "label_updated_at", tdt.id, tdt.title, tdt.location, tdt.detail, tdt.status, tdt.created_at, tdt.updated_at, tdt.start_at, tdt.end_at FROM tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id JOIN tb_todo_labels ttl ON tdtl.label_id = ttl.id WHERE tdtl.date = ? AND tdtl.uid = ?',
                [date, uid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "해당 일자에 일정이 존재하지 않습니다"};
            }
            return await DailyTodo.serialization(results);
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 조회에 실패하였습니다"};
        }
    },
    readAllByDailyLabel: async function (dailyLabelId, uid) {
        try {
            const [results] = await db.query(
                'SELECT tdtl.id AS "label_id", tdtl.label_id AS "label_origin_id", ttl.title AS "label_title", ttl.color_hex AS "label_color_hex", tdtl.date AS "label_date", tdtl.created_at AS "label_created_at", tdtl.updated_at AS "label_updated_at", tdt.id, tdt.title, tdt.location, tdt.detail, tdt.status, tdt.created_at, tdt.updated_at, tdt.start_at, tdt.end_at FROM tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id JOIN tb_todo_labels ttl ON tdtl.label_id = ttl.id WHERE tdtl.id = ? AND tdtl.uid = ?',
                [dailyLabelId, uid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "해당 카테고리의 일정이 존재하지 않습니다"};
            }
            return await DailyTodo.serialization(results);
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 조회에 실패하였습니다"};
        }
    },
    delete: async function (id, uid) {
        try {
            const [results1] = await db.query(
                'DELETE tdt FROM tb_daily_todo tdt JOIN tb_daily_todo_labels tdtl ON tdt.daily_label_id = tdtl.id WHERE tdt.id = ? AND tdtl.uid = ?',
                [id, uid],
            );
            if (results1.affectedRows === 0) {
                throw {status: 404, message: "해당 일정이 존재하지 않습니다"};
            }
            await db.query(
                'DELETE tdtl FROM tb_daily_todo_labels tdtl LEFT JOIN tb_daily_todo tdt on tdtl.id = tdt.daily_label_id WHERE uid = ? AND tdt.daily_label_id IS NULL',
                [uid],
            );
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 삭제에 실패하였습니다"};
        }
    },
}

module.exports = DailyTodo;