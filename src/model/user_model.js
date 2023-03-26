// model/user_model.js

const db = require('../config/db');

const User = {
    create: async function (user) {
        try {
            await db.query('INSERT INTO tb_users(email, password, uid, username, refresh_token) VALUES(?, ?, ?, ?, ?)', [user.email, user.password, user.uid, user.username, user.refreshToken]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, message: '이미 등록된 이메일입니다' };
            }
            throw {status: 500, message: "사용자 생성에 실패하였습니다"};
        }
    },
    getUserByEmail: async function (email) {
        try {
            const [results] = await db.query('SELECT * FROM tb_users WHERE email = ? LIMIT 1', [email]);
            if (!results.length) {
                throw {status: 404, message: "등록되지 않은 이메일입니다"};
            }

            const user = {
                email: results[0].email,
                password: results[0].password,
                uid: results[0].uid,
                username: results[0].username,
                isValid: results[0].is_valid,
                refreshToken: results[0].refresh_token,
            };

            return user;
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "로그인 요청을 처리할 수 없습니다"};
        }
    },
    getUserByUid: async function (uid) {
        try {
            const [results] = await db.query('SELECT * FROM tb_users WHERE uid = ? LIMIT 1', [uid]);
            if (!results.length) {
                throw {status: 401, message: "알 수 없는 사용자입니다"};
            }

            return results[0];

            // const user = {
            //     password: results[0].password,
            // };
            //
            // return user;
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "요청을 처리할 수 없습니다"};
        }
    },
    updateRefreshToken: async function (uid, refreshToken, newRefreshToken) {
        try {
            const [results] = await db.query('UPDATE tb_users SET refresh_token = ? WHERE uid = ? AND refresh_token = ? LIMIT 1', [newRefreshToken, uid, refreshToken]);
            if (results.affectedRows === 0) {
                throw {status: 401, message: "알 수 없는 사용자입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "리프레쉬 토큰의 갱신에 실패하였습니다"};
        }
    },
    updateUsername: async function (uid, username) {
        try {
            const [results] = await db.query('UPDATE tb_users SET username = ? WHERE uid = ? LIMIT 1', [username, uid]);
            if (results.affectedRows === 0) {
                throw {status: 401, message: "알 수 없는 사용자입니다"};
            }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, message: '이미 등록된 아이디입니다' };
            }
            if (error) {
                throw error;
            }
            throw {status: 500, message: "아이디 변경에 실패하였습니다"};
        }
    },
    updatePassword: async function (uid, newPassword) {
        try {
            const [results] = await db.query('UPDATE tb_users SET password = ? WHERE uid = ? LIMIT 1', [newPassword, uid]);
            if (results.affectedRows === 0) {
                throw {status: 401, message: "알 수 없는 사용자입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "비밀번호 변경에 실패하였습니다"};
        }
    },
    resetPassword: async function (email, password) {
        try {
            const [results] = await db.query('UPDATE tb_users SET password = ? WHERE email = ? LIMIT 1', [password, email]);
            if (results.affectedRows === 0) {
                throw {status: 404, message: "등록되어 있지 않은 사용자입니다"};
            }
        } catch (error) {
            if (error) {
                throw error;
            }
            throw {status: 500, message: "비밀번호 초기화에 실패하였습니다"};
        }
    },
};

module.exports = User;