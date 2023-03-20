// controller/docs_controller.js

const DocsModel = require('../model/docs_model');

const DocsController = {
    readTerms: async function (req, res) {
        try {
            // Read Terms from DB
            const result = await DocsModel.readTerms();
            return res.status(200).json({
                message: '이용약관 조회가 완료되었습니다', body: result
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    readPrivacyPolicy: async function (req, res) {
        try {
            // Read Terms from DB
            const result = await DocsModel.readPrivacyPolicy();
            return res.status(200).json({
                message: '개인정보 처리방침 조회가 완료되었습니다', body: result
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
}

module.exports = DocsController;