// service/encryption_service.js

const bcrypt = require('bcrypt');

const EncryptionService = {
    encryptPassword: async function(password) {
        try {
            // Generate a salt to use for the password hash
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            // Hash the user's password with the salt
            return await bcrypt.hash(password, salt);
        } catch (e) {
            throw {status: 500, message: "비밀번호 복호화에 실패하였습니다"};
        }
    },
};

module.exports = EncryptionService;