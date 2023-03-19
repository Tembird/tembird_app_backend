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
            throw {status: 500, message: "refresh 인증 토큰 생성에 실패하였습니다"};
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
            throw {status: 500, message: "access 인증 토큰 생성에 실패하였습니다"};
        }
    },
};

module.exports = AuthorizationService;