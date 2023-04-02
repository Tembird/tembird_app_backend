// model/todo_model.js

const db = require('../config/db');

const Todo = {
    create: async function (todo) {
        try {
            const [results] = await db.query(
                'INSERT INTO tb_schedule_and_todo (tid, sid, todo_title, todo_status) VALUES (?, ?, ?, ?)',
                [todo.tid, todo.sid, todo.todoTitle, todo.todoStatus],
            );
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "할일 등록 중 오류가 발생하였습니다"};
        }
    },
    update: async function (todo) {
        try {
            const [results] = await db.query(
                'UPDATE tb_schedule_and_todo SET todo_title = ?, todo_status = ? WHERE tid = ?',
                [todo.todoTitle, todo.todoStatus, todo.tid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 수정에 실패하였습니다"};
        }
    },
    read: async function (tid) {
        try {
            const [results] = await db.query(
                'SELECT tid, todo_title, todo_status, todo_updated_at FROM tb_schedule_and_todo WHERE tid = ? LIMIT 1',
                [tid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "존재하지 않는 항목입니다"};
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
    delete: async function (tid) {
        try {
            const [results] = await db.query(
                'DELETE FROM tb_schedule_and_todo WHERE tid = ? LIMIT 1',
                [tid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "해당 할일이 존재하지 않습니다"};
            }
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "할일 삭제에 실패하였습니다"};
        }
    },
}

module.exports = Todo;