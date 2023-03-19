// model/schedule_model.js

const db = require('../config/db');

const Schedule = {
    create: async function (schedule) {
        try {
            await db.query(
                'INSERT INTO tb_schedules (uid, sid, date, start_at, end_at, color_hex, title, detail, location, members) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [schedule.uid, schedule.sid, schedule.date, schedule.startAt, schedule.endAt, schedule.colorHex, schedule.title, schedule.detail, schedule.location, schedule.members],
            );
        } catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw {status: 400, message: "올바르지 않은 요청입니다"};
            }
            throw {status: 500, message: "일정 등록에 실패하였습니다"};
        }
    },
    update: async function (schedule) {
        try {
            const [results] = await db.query(
                'UPDATE tb_schedules SET color_hex = ?, title = ?,detail = ?, location = ?, members = ? WHERE sid = ? AND uid = ? LIMIT 1',
                [schedule.colorHex, schedule.title, schedule.detail, schedule.location, schedule.members, schedule.sid, schedule.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 수정에 실패하였습니다"};
        }
    },
    delete: async function (schedule) {
        try {
            const [results] = await db.query(
                'DELETE FROM tb_schedules WHERE sid = ? AND uid = ? LIMIT 1',
                [schedule.sid, schedule.uid],
            );
            if (results.affectedRows === 0) {
                throw {status: 404, message: "존재하지 않는 일정입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "일정 삭제에 실패하였습니다"};
        }
    },
}

module.exports = Schedule;