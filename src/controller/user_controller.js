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
};

module.exports = UserController;
