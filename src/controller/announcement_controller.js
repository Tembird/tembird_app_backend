// controller/feedback_controller.js

const AnnouncementModel = require('../model/announcement_model');

const AnnouncementController = {
    read: async function (req, res) {
        try {
            // Read Announcement from DB
            const result = await AnnouncementModel.read();
            return res.status(200).json({
                message: '공지사항 조회가 완료되었습니다', body: {list: result}
            });
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    }
}

module.exports = AnnouncementController;