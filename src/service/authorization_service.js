// service/authorization_service.js

const jwt = require("jsonwebtoken");
const config = require("../config/config");

const refreshTokenSecretKey = config.token.secret.refreshToken;
const refreshTokenExpiresIn = config.token.expiresIn.refreshToken;
const accessTokenSecretKey = config.token.secret.accessToken;
const accessTokenExpiresIn = config.token.expiresIn.accessToken;

const AuthorizationService = {
    generateRefreshToken: async function () {
        try {
            const payload = {
                createdAt: new Date().getTime(),
            }
            const options = {
                expiresIn: refreshTokenExpiresIn,
            };

            return await jwt.sign(payload, refreshTokenSecretKey, options);
        } catch (error) {
            throw {status: 500, message: "리프레쉬 토큰 생성에 실패하였습니다"};
        }
    },
    generateAccessToken: async function (uid, username) {
        try {
            const payload = {
                createdAt: new Date().getTime(),
                uid: uid,
                username: username,
            }
            const options = {
                expiresIn: accessTokenExpiresIn,
            };

            return await jwt.sign(payload, accessTokenSecretKey, options);
        } catch (error) {
            throw {status: 500, message: "엑세스 토큰 생성에 실패하였습니다"};
        }
    },
    decodeToken: async function (token) {
        try {
            const result = await jwt.decode(token);
            if (result === null) {
                throw {status: 400, message: "잘못된 토큰입니다"};
            }
            return result;
        } catch (e) {
            throw {status: 400, message: "잘못된 토큰입니다"};
        }
    },
    verifyAccessToken: async function (token) {
        try {
            const options = {
                expiresIn: accessTokenExpiresIn,
            };
            return await jwt.verify(token, accessTokenSecretKey, options);
        } catch (e) {
            throw {status:401, message: "유효하지 않은 액세스 토큰입니다"};
        }
    },
    verifyRefreshToken: async function (token) {
        try {
            const options = {
                expiresIn: refreshTokenExpiresIn,
            };
            return await jwt.verify(token, refreshTokenSecretKey, options);
        } catch (e) {
            throw {status: 403, message: "유효하지 않은 리프레시 토큰입니다"};
        }
    },
};

module.exports = AuthorizationService;