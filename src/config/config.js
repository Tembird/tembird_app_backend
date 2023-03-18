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
}

module.exports = config;