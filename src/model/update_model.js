// model/update_model.js

const db = require('../config/db');

const Update = {
    read: async function () {
        try {
            const [results] = await db.query('SELECT * FROM tb_update ORDER BY created_at DESC LIMIT 1');
            if (!results.length) {
                throw Error;
            }
            return results[0];
        } catch (error) {
            throw {status: 500, message: "업데이트 버전 확인에 실패하였습니다"};
        }
    },
}

module.exports = Update;