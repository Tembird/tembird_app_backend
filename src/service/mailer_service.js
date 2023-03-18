// service/mailer_service.js

const nodemailer = require("nodemailer");
const config = require('../config/config')

const MailerService = {
    sendVerificationCode: async function (email, verificationCode, expirationTime) {
        try {
            const transporter = nodemailer.createTransport({
                service: config.email.service,
                auth: {
                    user: config.email.user,
                    pass: config.email.password,
                }
            });

            // send verification code via email
            const mailOptions = {
                from: config.email.user,
                to: email,
                subject: '[Tembird] 이메일 인증 코드',
                text: `인증 코드는 ${verificationCode} 이며 ${expirationTime / 60000}분간 유효합니다.\n${expirationTime / 60000}분 내에 인증코드를 입력해주세요.`
            };

            await transporter.sendMail(mailOptions);
            return {status: 200, message: "인증 코드 발송에 성공하였습니다"};
        } catch (error) {
            throw {status: 500, message: "인증 코드 발송에 실패하였습니다"};
        }

    }
}

module.exports = MailerService;