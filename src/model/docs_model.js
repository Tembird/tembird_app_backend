// model/docs_model.js

const db = require('../config/db');

const Docs = {
    readTerms: async function () {
        try {
            const [results] = await db.query('SELECT * FROM tb_terms_docs ORDER BY created_at DESC LIMIT 1');
            if (!results.length) {
                throw Error;
            }
            return results[0];
        } catch (error) {
            throw {status: 500, message: "이용약관 조회에 실패하였습니다"};
        }
    }
}

module.exports = Docs;