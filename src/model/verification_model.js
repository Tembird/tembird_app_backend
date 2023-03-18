// model/verification_model.js

const db = require('../config/db');

const Verification = {
    create: async function (email, code) {
        try {
            await db.query('INSERT INTO tb_verification (email, code) VALUES(?, ?) ON DUPLICATE KEY UPDATE code = ?', [email, code, code]);
        } catch (error) {
            throw {status: 500, message: "인증 코드를 생성하지 못했습니다"};
        }
    },
    getByEmail: async function (email) {
        try {
            const [results] = await db.query('SELECT * FROM tb_verification WHERE email = ? ORDER BY created_at LIMIT 1', [email]);
            if (!results.length) {
                throw {status: 404, message: "요청한 이메일의 인증 정보가 없습니다"};
            }

            const result = {
                email: results[0].email,
                createdAt: results[0].created_at,
                code: results[0].code,
            };

            return result;
        } catch (error) {
            if (error.status || error.message) {
                throw error;
            }
            throw {status: 500, message: "요청을 처리하지 못했습니다"};
        }
    },
};

module.exports = Verification;