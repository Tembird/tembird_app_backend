// model/feedback_model.js

const db = require('../config/db');

const Feedback = {
    create: async function (feedback) {
        try {
            await db.query(
                'INSERT INTO tb_feedbacks (uid, title, content) VALUES (?, ?, ?)',
                [feedback.uid, feedback.title, feedback.content]
                );
        } catch (error) {
            throw {status: 500, message: "피드백 등록에 실패하였습니다"};
        }
    }
}

module.exports = Feedback;