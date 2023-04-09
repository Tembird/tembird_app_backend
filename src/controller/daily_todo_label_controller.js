// controller/daily_todo_label_controller.js

const DailyTodoLabelModel = require("../model/daily_todo_label_model");

const DailyTodoLabelController = {
    create: async function (req, res) {
        try {
            if (req.body.date === undefined || req.body.labelId === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const dailyTodoLabel = {
                uid: req.uid,
                date: req.body.date,
                labelId: req.body.labelId,
            };
            const createdId = await DailyTodoLabelModel.create(dailyTodoLabel);
            const created = await DailyTodoLabelModel.read(createdId, req.uid);
            return res.status(201).json({message: '일정 등록이 완료되었습니다', body : created});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.id === undefined || req.body.startAt === undefined || req.body.endAt === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const dailyTodoLabel = {
                uid: req.uid,
                id: req.body.id,
                startAt: req.body.startAt,
                endAt: req.body.endAt,
            };
            await DailyTodoLabelModel.update(dailyTodoLabel);
            const updated = await DailyTodoLabelModel.read(req.body.id, req.uid);
            return res.status(201).json({message: '일정 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    read: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const result = await DailyTodoLabelModel.read(req.params.id, req.uid);
            return res.status(200).json({message: '해당 일정 조회가 완료되었습니다', body: result});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    readAtDate: async function (req, res) {
        try {
            if (req.params.date === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const results = await DailyTodoLabelModel.readAtDate(req.params.date, req.uid);
            return res.status(200).json({message: '해당 일자의 모든 일정 조회가 완료되었습니다', body: results});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            await DailyTodoLabelModel.delete(req.params.id, req.uid);
            return res.status(200).json({message: '일정 삭제가 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = DailyTodoLabelController;