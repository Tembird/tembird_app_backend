// model/color_model.js

const db = require('../config/db');

const Color = {
    read: async function () {
        try {
            const [results] = await db.query('SELECT hex FROM tb_colors');
            if (!results.length) {
                throw Error;
            }
            return results;
        } catch (error) {
            throw {status: 500, message: "색상 조회에 실패하였습니다"};
        }
    }
}

module.exports = Color;