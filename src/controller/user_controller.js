// controller/user_controller.js

const UserModel = require('../model/user_model');
const AuthorizationService = require('../service/authorization_service');
const EncryptionService = require('../service/encryption_service');
const UuidService = require('../service/uuid_service');

const UserController = {
    generateRandomUsername: (email) => 'unknown#' + new Date().getTime(),
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
            return res.status(error.status).json({"message":error.message});
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
            const user = await UserModel.get(email);

            // Check Password is Correct
            const isCorrectPassword = await EncryptionService.compareEncryptedPassword(password, user.password);
            if (!isCorrectPassword) {
                return res.status(400).json({message: '올바르지 않은 비밀번호입니다'});
            }

            if (user.isValid === 0) {
                return res.status(403).json({message: '사용할 수 없는 계정입니다.\n고객 센터로 문의해주세요.'});
            }
            // Update RefreshToken
            const refreshToken = await AuthorizationService.generateRefreshToken();
            await UserModel.updateRefreshToken(user.uid, refreshToken);
            // Create AccessToken
            const accessToken = await AuthorizationService.generateAccessToken(user.uid, user.username);

            // Return Success with Tokens
            res.set('Access-Token', accessToken);
            res.set('Refresh-Token', refreshToken);
            return res.status(200).json({message: '로그인에 성공하였습니다'});
        } catch (error) {
            return res.status(error.status).json({"message":error.message});
        }
    },
};

module.exports = UserController;


