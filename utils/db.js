const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tien2003@',
    database: 'pj_hotel_booking',
    port: 3306
});

conn.connect(function (err, conn) {
    if (err) return console.error(err);
    return console.log('Connected mysql');
});

module.exports = conn;