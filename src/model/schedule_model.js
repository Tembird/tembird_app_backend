// model/schedule_model.js

const db = require('../config/db');

const Schedule = {
    create: async function (schedule) {
        try {
            await db.query(
                'INSERT INTO tb_schedule (uid, sid, date, start_at, end_at, color_hex, title, detail, location, members) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [schedule.uid, schedule.sid, schedule.date, schedule.startAt, schedule.endAt, schedule.colorHex, schedule.title, schedule.detail, schedule.location, schedule.members],
            );
        } catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "일정 등록에 실패하였습니다"};
        }
    },
}

module.exports = Schedule;