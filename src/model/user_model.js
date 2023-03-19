// model/user_model.js

const db = require('../config/db');

const User = {
    create: async function (user) {
        try {
            await db.query('INSERT INTO tb_user(email, password, uid, username, refresh_token) VALUES(?, ?, ?, ?, ?)', [user.email, user.password, user.uid, user.username, user.refreshToken]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, message: '이미 등록된 이메일입니다.' };
            }
            throw {status: 500, message: "유저 생성에 실패하였습니다"};
        }
    },
};

module.exports = User;