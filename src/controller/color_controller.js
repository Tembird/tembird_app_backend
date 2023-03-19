// controller/color_controller.js

const ColorModel = require('../model/color_model');

const ColorController = {
    read: async function (req, res) {
        try {
            // Read Colors from DB
            const result = await ColorModel.read();
            return res.status(200).json({
                message: '색상 조회가 완료되었습니다', body: {list: result}
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    }
}

module.exports = ColorController;