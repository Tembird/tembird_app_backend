// controller/daily_todo_controller.js

const DailyTodoModel = require("../model/daily_todo_model");

const DailyTodoController = {
    create: async function (req, res) {
        try {
            if (req.body.title === undefined || req.body.dailyLabelId === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todo = {
                uid: req.uid,
                title: req.body.title,
                dailyLabelId: req.body.dailyLabelId,
            };
            const createdId = await DailyTodoModel.create(todo);
            const created = await DailyTodoModel.read(createdId, req.uid);
            return res.status(201).json({message: '일정 등록이 완료되었습니다', body: created});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.title === undefined && req.body.status === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todo = {
                id: req.body.id,
                uid: req.uid,
                title: req.body.title,
                status: req.body.status,
            };

            if (todo.title === undefined) {
                await DailyTodoModel.updateStatus(todo);
            }
            else if (todo.status === undefined) {
                await DailyTodoModel.updateTitle(todo);
            } else {
                await DailyTodoModel.update(todo);
            }
            const updated = await DailyTodoModel.read(req.body.id, req.uid);
            return res.status(201).json({message: '일정 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    updateTitle: async function (req, res) {
        try {
            if (req.body.title === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todo = {
                id: req.body.id,
                uid: req.uid,
                title: req.body.title,
            };
            await DailyTodoModel.updateTitle(todo);
            const updated = await DailyTodoModel.read(req.body.id, req.uid);
            return res.status(201).json({message: '일정 제목 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    updateStatus: async function (req, res) {
        try {
            if (req.body.status === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todo = {
                id: req.body.id,
                uid: req.uid,
                status: req.body.status,
            };
            await DailyTodoModel.updateStatus(todo);
            const updated = await DailyTodoModel.read(req.body.id, req.uid);
            return res.status(201).json({message: '일정 상태 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            await DailyTodoModel.delete(req.params.id, req.uid);
            return res.status(200).json({message: '일정 삭제가 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    read: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const result = await DailyTodoModel.read(req.params.id, req.uid);
            return res.status(200).json({message: '일정 목록 조회가 완료되었습니다', body: result});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    readByQuery: async function (req, res) {
        try {
            if (req.query.date !== undefined) {
                const result = await DailyTodoModel.readAllByDate(req.query.date, req.uid);
                return res.status(200).json({message: '일정 목록 조회가 완료되었습니다', body: result});
            }
            if (req.query.dailyLabelId !== undefined) {
                const result = await DailyTodoModel.readAllByDailyLabel(req.query.dailyLabelId, req.uid);
                return res.status(200).json({message: '일정 목록 조회가 완료되었습니다', body: result});
            }
            return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = DailyTodoController;