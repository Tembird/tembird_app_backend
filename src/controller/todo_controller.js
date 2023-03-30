// controller/todo_controller.js

const TodoModel = require("../model/todo_model");

const TodoController = {
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
            return res.status(201).json({message: '일정 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = TodoController;