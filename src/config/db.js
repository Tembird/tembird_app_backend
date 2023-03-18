const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool({
    connectionLimit: 60,
    host: config.db.host,
    user: config.db.user,
    port: config.db.port,
    password: config.db.password,
    database: config.db.database
});

module.exports = pool;