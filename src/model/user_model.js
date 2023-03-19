// model/user_model.js

const db = require('../config/db');

const User = {
    create: async function (user) {
        try {
            await db.query('INSERT INTO tb_user(email, password, uid, username, refresh_token) VALUES(?, ?, ?, ?, ?)', [user.email, user.password, user.uid, user.username, user.refreshToken]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, message: '이미 등록된 이메일입니다' };
            }
            throw {status: 500, message: "유저 생성에 실패하였습니다"};
        }
    },
    get: async function (email) {
        try {
            const [results] = await db.query('SELECT * FROM tb_user WHERE email = ? LIMIT 1', [email]);
            if (!results.length) {
                throw {status: 404, message: "등록되지 않은 이메일입니다"};
            }

            const user = {
                email: results[0].email,
                password: results[0].password,
                uid: results[0].uid,
                username: results[0].username,
                isValid: results[0].is_valid,
            };

            return user;
        } catch (error) {
            if (error.status || error.message) {
                throw error;
            }
            throw {status: 500, message: "로그인 요청을 처리할 수 없습니다"};
        }
    },
    updateRefreshToken: async function (uid, refreshToken, newRefreshToken) {
        try {
            await db.query('UPDATE tb_user SET refresh_token = ? WHERE uid = ? AND refresh_token = ? LIMIT 1', [newRefreshToken, uid, refreshToken]);
        } catch (error) {
            throw {status: 500, message: "리프레쉬 토큰의 갱신에 실패하였습니다"};
        }
    },
    updateUsername: async function (uid, username) {
        try {
            await db.query('UPDATE tb_user SET username = ? WHERE uid = ? LIMIT 1', [username, uid]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, message: '이미 등록된 아이디입니다' };
            }
            throw {status: 500, message: "아이디 변경에 실패하였습니다"};
        }
    },
};

module.exports = User;