const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_SERVER,
    database: 'school-app',
    user: 'root',
    password: 'admin',
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

const poolPromise = pool.promise();

module.exports = {
    poolPromise,
};
