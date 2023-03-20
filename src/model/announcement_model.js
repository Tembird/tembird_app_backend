// model/announcement_model.js

const db = require('../config/db');

const Announcement = {
    read: async function () {
        try {
            const [results] = await db.query('SELECT * FROM tb_announcements');
            if (!results.length) {
                throw Error;
            }
            return results;
        } catch (error) {
            throw {status: 500, message: "공지사항 조회에 실패하였습니다"};
        }
    }
}

module.exports = Announcement;