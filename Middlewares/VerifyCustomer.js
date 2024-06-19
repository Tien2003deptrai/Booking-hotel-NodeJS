const { STATUS } = require("../config/Constrant");
const VerifyToken = require("./VerifyToken")

const VerifyCustomer = (req, res, next) => {
    VerifyToken(req, res, () => {
        (req.users) ? next()
            : res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'You are not authorized' });

    })
}

module.exports = VerifyCustomer;