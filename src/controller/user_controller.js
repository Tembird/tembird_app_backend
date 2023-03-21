// controller/user_controller.js

const UserModel = require('../model/user_model');
const AuthorizationService = require('../service/authorization_service');
const EncryptionService = require('../service/encryption_service');
const UuidService = require('../service/uuid_service');
const config = require('../config/config');

const UserController = {
    generateRandomUsername: () => 'unknown#' + new Date().getTime(),
    signUp: async function (req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // Wrong Request
            if(email === undefined || password === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            // Generate Uid
            const uid = UuidService.generateUuid();
            // Generate RefreshToken
            const refreshToken = await AuthorizationService.generateRefreshToken();

            const user = {
                email: email,
                password: await EncryptionService.encryptPassword(req.body.password),
                uid: uid,
                username: UserController.generateRandomUsername(),
                refreshToken: refreshToken,
            };

            // Save User on DB
            await UserModel.create(user);
            const accessToken = await AuthorizationService.generateAccessToken(uid, undefined);

            // Return Success with Tokens
            res.set('Access-Token', accessToken);
            res.set('Refresh-Token', refreshToken);
            return res.status(201).json({message: '사용자 등록이 완료되었습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
    login: async function (req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // Wrong Request
            if(email === undefined || password === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            // Get User from DB
            const user = await UserModel.getUserByEmail(email);

            // Check Password is Correct
            const isCorrectPassword = await EncryptionService.compareEncryptedPassword(password, user.password);
            if (!isCorrectPassword) {
                return res.status(400).json({message: '올바르지 않은 비밀번호입니다'});
            }

            if (user.isValid === 0) {
                return res.status(403).json({message: '사용할 수 없는 계정입니다\n고객 센터로 문의해주세요'});
            }

            // Generate AccessToken
            const accessToken = await AuthorizationService.generateAccessToken(user.uid, user.username);

            // Return New AccessToken
            res.set('Access-Token', accessToken);
            return res.status(200).json({message: '로그인에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
    updateAccessToken: async function (req, res) {
        try {
            const accessToken = req.get('Access-Token');
            const refreshToken = req.get('Refresh-Token');

            // Wrong Request
            if(accessToken === undefined || refreshToken === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }
            // Verify RefreshToken
            await AuthorizationService.verifyRefreshToken(refreshToken);
            // If RefreshToken is Valid, Generate New AccessToken
            const user = await AuthorizationService.decodeToken(accessToken);
            const newAccessToken = await AuthorizationService.generateAccessToken(user.uid, user.username);

            // Decode Refresh to get ExpiredAt
            const decodedRefresh = await AuthorizationService.decodeToken(refreshToken);

            if (decodedRefresh.exp > new Date().getTime() / 1000 + 259200) {
                res.set('Access-Token', newAccessToken);
                return res.status(201).json({message: '액세스 토큰 갱신에 성공하였습니다'});
            }

            // Update Refresh Token if left Under 3 Days to expired
            const newRefreshToken = await AuthorizationService.generateRefreshToken();
            await UserModel.updateRefreshToken(user.uid, refreshToken, newRefreshToken);

            res.set('Access-Token', newAccessToken);
            res.set('Refresh-Token', newRefreshToken);
            return res.status(201).json({message: '액세스 토큰 및 리프레시 토큰 갱신에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
    updateUsername: async function (req, res) {
        try {
            const username = req.body.username;
            const uid = req.uid;
            if (username === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            await UserModel.updateUsername(uid, username);
            return res.status(201).json({message: '아이디 변경에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
    updatePassword: async function (req, res) {
        try {
            const password = req.body.password;
            const newPassword = req.body.newPassword;
            const uid = req.uid;
            if (password === undefined || newPassword === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const encryptedNewPassword = await EncryptionService.encryptPassword(newPassword);

            const user = await UserModel.getUserByUid(uid);
            const isCorrectUser = await EncryptionService.compareEncryptedPassword(password, user.password);
            if (!isCorrectUser) {
                return res.status(400).json({message: '비밀번호가 일치하지 않습니다'});
            }

            await UserModel.updatePassword(uid, encryptedNewPassword);
            return res.status(201).json({message: '비밀번호 변경에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
    resetPassword: async function (req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (email === undefined || password === undefined) {
                return res.status(400).json({message: '올바른 형식의 요청이 아닙니다'});
            }

            const encryptedNewPassword = await EncryptionService.encryptPassword(password);

            await UserModel.resetPassword(email, encryptedNewPassword);
            return res.status(201).json({message: '비밀번호 변경에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    },
};

module.exports = UserController;


