// controller/verification_controller.js

const VerificationModel = require('../model/verification_model');
const Mailer = require('../service/mailer_service');
const config = require('../config/config');

const VerificationController = {
    generateSixDigitNumCode: () => Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6),
    sendEmailVerificationEmail: async function (req, res) {
        try {
            // Wrong Request
            const email = req.body.email;
            if (email === undefined) {
                return res.status(400).json({message: "올바른 형식의 요청이 아닙니다"});
            }

            // Create Verification Code
            const verificationCode = VerificationController.generateSixDigitNumCode();
            const expirationTime = config.verification.expirationTime;

            // Save Verification Code in DB
            await VerificationModel.create(email, verificationCode);

            // Send Verification Code to Requested Email
            await Mailer.sendVerificationCode(email, verificationCode, expirationTime);
            return res.status(200).json({message: "인증 코드가 발송되었습니다"});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
    checkEmailVerificationEmail: async function (req, res) {
        try {
            const verification = {
                email: req.body.email,
                code: req.body.code,
            };

            // Wrong Request
            if (verification.code === undefined || verification.email === undefined) {
                return res.status(400).json({message: "올바른 형식의 요청이 아닙니다"});
            }

            // Check Code Validation
            const result = await VerificationModel.getByEmail(verification.email);

            // Not Exist
            if (result === undefined) return res.status(404).json({message: "해당 이메일의 인증 정보가 없습니다"});

            // Wrong Code Error
            if (result.code !== verification.code) {
                return res.status(403).json({message: "인증 코드가 일치하지 않습니다"});
            }

            // Expired Code Error
            const expirationTime = config.verification.expirationTime;
            if (new Date().getTime() > result.createdAt.getTime() + expirationTime) {
                return res.status(403).json({message: "인증 코드가 만료되었습니다"});
            }

            // Success
            return res.json({message: "인증이 완료되었습니다"});
        } catch (error) {
            return res.status(error.status).json({message: error.message});
        }
    },
};

module.exports = VerificationController;
