const db = require('../utils/db');
const { STATUS } = require('./Constrant');

const dbQueryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const handleQuery = (res, err, result) => {
    if (err) return res.status(STATUS.OK).json({ Status: false, Error: 'Error Query' });
    return res.json({ Status: true, Result: result });
};

module.exports = { dbQueryAsync, handleQuery };
