// controller/todo_controller.js

const TodoModel = require("../model/todo_model");
const UuidService = require("../service/uuid_service");

const TodoController = {
    create: async function (req, res) {
        try {
            if (req.body.sid === undefined || req.body.todoTitle === undefined || req.body.todoStatus === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const tid = UuidService.generateUuid() + new Date().getTime();
            const todo = {
                tid: tid,
                sid: req.body.sid,
                todoTitle: req.body.todoTitle,
                todoStatus: req.body.todoStatus,
            };
            await TodoModel.create(todo);
            const created = await TodoModel.read(tid);
            return res.status(201).json({message: '할일 등록이 완료되었습니다', body: created});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.tid === undefined || req.body.todoTitle === undefined || req.body.todoStatus === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todo = {
                tid: req.body.tid,
                todoTitle: req.body.todoTitle,
                todoStatus: req.body.todoStatus,
            };
            await TodoModel.update(todo);
            const updated = await TodoModel.read(todo.tid);
            return res.status(201).json({message: '할일 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.params.tid === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            await TodoModel.delete(req.params.tid);
            return res.status(200).json({message: '할일 삭제가 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = TodoController;