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
    readByQuery: async function (req, res) {
        try {
            if (req.query.date !== undefined) {
                const results = await DailyTodoLabelModel.readByDate(req.query.date, req.uid);
                return res.status(200).json({message: '해당 일자의 일정 카테고리 리스트 조회가 완료되었습니다', body: results});
            }
            return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
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