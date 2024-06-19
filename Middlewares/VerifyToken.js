const jwt = require('jsonwebtoken');
const { STATUS } = require('../config/Constrant');

const VerifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decoded) => {
            if (err) return res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'Wrong token' });
            req.users = decoded;
            next();
        })
    } else {
        res.status(STATUS.UNAUTHORIZED).json({ Status: false, Error: 'You are not authorized' });
    }
}

module.exports = VerifyToken;