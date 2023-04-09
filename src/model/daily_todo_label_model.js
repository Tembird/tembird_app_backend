// model/daily_todo_label_model.js

const db = require('../config/db');

const DailyTodoLabel = {
    create: async function (dailyTodoLabel) {
        try {
            const [result] = await db.query(
                'INSERT INTO tb_daily_todo_labels (date, uid, label_id) VALUES (?, ?, ?)',
                [dailyTodoLabel.date, dailyTodoLabel.uid, dailyTodoLabel.labelId],
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
            throw {status: 500, message: "일정 등록에 실패하였습니다"};
        }
    },
    update: async function (dailyTodoLabel) {
        try {
            await db.query(
                'UPDATE tb_daily_todo_labels SET start_at = ?, end_at = ? WHERE id = ? AND uid = ? LIMIT 1',
                [dailyTodoLabel.startAt, dailyTodoLabel.endAt, dailyTodoLabel.id, dailyTodoLabel.uid],
            );
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "일정 수정에 실패하였습니다"};
        }
    },
    read: async function (id, uid) {
        try {
            const [results] = await db.query(
                'SELECT tdtl.id, ttl.id as "label_id", ttl.title, ttl.color_hex, tdtl.date, tdtl.start_at, tdtl.end_at, tdtl.create_at, tdtl.updated_at FROM tb_daily_todo_labels tdtl JOIN tb_todo_labels ttl on ttl.id = tdtl.label_id WHERE tdtl.id = ? AND tdtl.uid = ? LIMIT 1',
                [id, uid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "올바르지 않은 요청입니다"};
            }
            return results[0];
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정을 불러오지 못했습니다"};
        }
    },
    readByDate: async function (date, uid) {
        try {
            const [results] = await db.query(
                'SELECT tdtl.id, ttl.id as "label_id", ttl.title, ttl.color_hex, tdtl.date, tdtl.start_at, tdtl.end_at, tdtl.create_at, tdtl.updated_at FROM tb_daily_todo_labels tdtl JOIN tb_todo_labels ttl on ttl.id = tdtl.label_id WHERE tdtl.uid = ? AND tdtl.date = ?',
                [uid, date],
            );
            if (results.length === 0) {
                throw {status: 404, message: "등록된 일정이 없습니다"};
            }
            return results;
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정을 불러오지 못했습니다"};
        }
    },
    delete: async function (id, uid) {
        try {
            const [results] = await db.query(
                'DELETE FROM tb_daily_todo_labels WHERE id = ? AND uid = ? LIMIT 1',
                [id, uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "올바르지 않은 요청입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 삭제에 실패하였습니다"};
        }
    },
}

module.exports = DailyTodoLabel;