// model/todo_label_model.js

const db = require('../config/db');

const TodoLabel = {
    create: async function (todoLabel) {
        try {
            const [result] = await db.query(
                'INSERT INTO tb_todo_labels (title, color_hex, uid) VALUES (?, ?, ?);',
                [todoLabel.title, todoLabel.colorHex, todoLabel.uid],
            );
            return result.insertId;
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "카테고리 등록 중 오류가 발생하였습니다"};
        }
    },
    update: async function (todoLabel) {
        try {
            const [result] = await db.query(
                'UPDATE tb_todo_labels SET title = ?, color_hex = ? WHERE id = ? AND uid = ? LIMIT 1',
                [todoLabel.title, todoLabel.colorHex, todoLabel.id, todoLabel.uid],
            );
            return result.insertId;
        } catch (error) {
            console.log(error);
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "카테고리 수정 중 오류가 발생하였습니다"};
        }
    },
    read: async function (id, uid) {
        try {
            const [results] = await db.query(
                'SELECT id, title, color_hex, created_at, updated_at FROM tb_todo_labels WHERE id = ? AND uid = ? LIMIT 1',
                [id, uid],
            );
            if (results.length === 0) {
                throw {status: 404, message: "존재하지 않는 카테고리입니다"};
            }
            return results[0];
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "카테고리 조회에 실패하였습니다"};
        }
    },
    readAll: async function (uid) {
        try {
            const [results] = await db.query(
                'SELECT id, title, color_hex, created_at, updated_at FROM tb_todo_labels WHERE uid = ?',
                [uid],
            );
            return results;
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "카테고리 조회에 실패하였습니다"};
        }
    },
    delete: async function (id, uid) {
        try {
            const [results] = await db.query(
                'DELETE FROM tb_todo_labels WHERE id = ? AND uid = ? LIMIT 1',
                [id, uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 카테고리입니다"};
            }
        } catch (error) {
            console.log(error);
            if (error) {
                throw error;
            }
            throw {status: 500, message: "카테고리 삭제에 실패하였습니다"};
        }
    },
}

module.exports = TodoLabel;