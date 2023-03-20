// controller/feedback_controller.js

const FeedbackModel = require('../model/feedback_model');

const FeedbackController = {
    create: async function (req, res) {
        try {
            if (req.body.title === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            const feedback = {
                uid: req.uid,
                title: req.body.title,
                content: req.body.content,
            };

            // Read Colors from DB
            await FeedbackModel.create(feedback);
            return res.status(201).json({message: '피드백 등록이 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    }
}

module.exports = FeedbackController;