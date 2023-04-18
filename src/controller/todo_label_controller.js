// controller/todo_label_controller.js

const TodoLabelModel = require("../model/todo_label_model");

const TodoLabelController = {
    create: async function (req, res) {
        try {
            if (req.body.title === undefined || req.body.colorHex === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todoLabel = {
                uid: req.uid,
                title: req.body.title,
                colorHex: req.body.colorHex,
            };
            const createdId = await TodoLabelModel.create(todoLabel);
            const created = await TodoLabelModel.read(createdId, req.uid);
            return res.status(201).json({message: '카테고리 등록이 완료되었습니다', body : created});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    update: async function (req, res) {
        try {
            if (req.body.id === undefined || req.body.title === undefined || req.body.colorHex === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const todoLabel = {
                uid: req.uid,
                id: req.body.id,
                title: req.body.title,
                colorHex: req.body.colorHex,
            };
            await TodoLabelModel.update(todoLabel);
            const updated = await TodoLabelModel.read(req.body.id, req.uid);
            return res.status(201).json({message: '카테고리 수정이 완료되었습니다', body: updated});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    read: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const result = await TodoLabelModel.read(req.params.id, req.uid);
            return res.status(200).json({message: '해당 카테고리 조회가 완료되었습니다', body: result});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    readAll: async function (req, res) {
        try {
            const results = await TodoLabelModel.readAll(req.uid);
            return res.status(200).json({message: '모든 카테고리 조회가 완료되었습니다', body: results});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    delete: async function (req, res) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            await TodoLabelModel.delete(req.params.id, req.uid);
            return res.status(200).json({message: '카테고리 삭제가 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = TodoLabelController;