// controller/update_controller.js

const UpdateModel = require('../model/update_model');

const UpdateController = {
    read: async function (req, res) {
        try {
            // Read Update Info from DB
            const result = await UpdateModel.read();
            return res.status(200).json({
                message: '업데이트 조회가 완료되었습니다', body: result
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = UpdateController;