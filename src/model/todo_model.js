// model/todo_model.js

const db = require('../config/db');

const Todo = {
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
}

module.exports = Todo;