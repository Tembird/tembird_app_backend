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
                members: req.body.members,
            };

            // Save Schedule on DB
            await ScheduleModel.create(schedule);
            return res.status(201).json({
                message: '일정 등록이 완료되었습니다', body: {sid: sid}
            });
        } catch (error) {
            return res.status(error.status).json({"message": error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.sid === undefined || req.body.colorHex === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const schedule = {
                uid: req.uid,
                sid: req.body.sid,
                colorHex: req.body.colorHex,
                title: req.body.title,
                detail: req.body.detail,
                location: req.body.location,
                members: req.body.members,
            };

            // Save Schedule on DB
            await ScheduleModel.update(schedule);
            return res.status(201).json({message: '일정 수정이 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.body.sid === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const schedule = {
                uid: req.uid,
                sid: req.body.sid,
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