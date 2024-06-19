const { STATUS } = require("../config/Constrant");
const VerifyToken = require("./VerifyToken")

const VerifyAdmin = (req, res, next) => {
    VerifyToken(req, res, () => {
        (req.users.isAdmin) ? next()
            : res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'You are not authorized' })
    })
}

module.exports = VerifyAdmin;