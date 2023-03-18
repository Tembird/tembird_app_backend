const dotenv = require('dotenv');
dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    token: {
        secret: {
            accessToken: process.env.ACCESS_TOKEN_SECRET,
            refreshToken: process.env.REFRESH_TOKEN_SECRET,
        },
        expiresIn: {
            accessToken: "30m",
            refreshToken: "14d",
        },
    },
    verification: {
        // expirationTime is 600,000ms = 600s = 10min
        expirationTime: 600000,
    },
    email: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    },
}

module.exports = config;