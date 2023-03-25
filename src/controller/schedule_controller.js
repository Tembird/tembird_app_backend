// controller/schedule_controller.js

const UuidService = require('../service/uuid_service');
const ScheduleModel = require("../model/schedule_model");

const ScheduleController = {
    create: async function (req, res) {
        try {
            if (req.body.date === undefined || req.body.startAt === undefined || req.body.endAt === undefined || req.body.colorHex === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const sid = UuidService.generateUuid();
            const schedule = {
                sid: sid,
                uid: req.uid,
                date: req.body.date,
                startAt: req.body.startAt,
                endAt: req.body.endAt,
                colorHex: req.body.colorHex,
                title: req.body.title,
                detail: req.body.detail,
                location: req.body.location,
                memberList: req.body.memberList,
            };

            // Save Schedule on DB
            await ScheduleModel.create(schedule);
            const [result] = await ScheduleModel.read(sid, req.uid);
            return res.status(201).json({
                message: '일정 등록이 완료되었습니다', body: result
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status).json({message: error.message});
        }
    },
    read: async function (req, res) {
        try {
            if (req.params.date === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const uid = req.uid;
            const date = req.params.date;

            // Read Schedule on DB
            const result = await ScheduleModel.readList(uid, date);
            return res.status(200).json({
                message: '일정 조회가 완료되었습니다', body: {list: result}
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.sid === undefined || req.body.colorHex === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const schedule = {
                sid: req.body.sid,
                uid: req.uid,
                date: req.body.date,
                startAt: req.body.startAt,
                endAt: req.body.endAt,
                colorHex: req.body.colorHex,
                title: req.body.title,
                detail: req.body.detail,
                location: req.body.location,
                memberList: req.body.memberList,
            };

            // Save Schedule on DB
            await ScheduleModel.update(schedule);
            const [result] = await ScheduleModel.read(req.body.sid, req.uid);
            return res.status(201).json({message: '일정 수정이 완료되었습니다', body: result});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.params.sid === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const schedule = {
                uid: req.uid,
                sid: req.params.sid,
            };

            // Delete Schedule on DB
            await ScheduleModel.delete(schedule);
            return res.status(200).json({message: '일정 삭제가 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = ScheduleController;