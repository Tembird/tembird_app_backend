// service/uuid_service.js

const { v4 } = require('uuid');


const UuidService = {
    generateUuid: () => {
        const tokens = v4().split('-')
        return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    }
};

module.exports = UuidService;