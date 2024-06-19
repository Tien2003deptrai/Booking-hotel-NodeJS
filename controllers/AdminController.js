const db = require('../utils/db');
const bcrypt = require('bcrypt');
const { dbQueryAsync, handleQuery } = require('../config/Database');
const jwt = require('jsonwebtoken');
const { STATUS } = require('../config/Constrant');

const adminRegister = async (req, res) => {
    try {
        const existingUser = await dbQueryAsync(`SELECT * FROM admin WHERE LOWER(admin_email) = LOWER(?)`, [req.body.email_admin]);
        if (existingUser.length) {
            return res.status(STATUS.BAD_REQUEST).json({ status: false, error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.admin_password, 10);
        const sql = `INSERT INTO admin (hotel_id, admin_name, admin_email, admin_password) VALUES (?, ?, ?, ?)`;
        const values = [req.body.hotel_id, req.body.admin_name, req.body.admin_email, hashedPassword];
        await dbQueryAsync(sql, values);
        return res.status(STATUS.OK).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: false, Error: 'Internal Server Errors' });
    }
};



const adminLogin = async (req, res) => {
    try {
        const sql = 'SELECT * FROM admin WHERE admin_email = ?';
        const values = [req.body.admin_email];
        await db.query(sql, values, (err, result) => {
            if (err) return res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'Error query' });
            if (result.length > 0) {
                console.log('result', result);
                const storedHashPassword = result[0].admin_password;
                const isMatchPassword = bcrypt.compare(req.body.admin_password, storedHashPassword);
                console.log('admin password', req.body.admin_password);
                if (isMatchPassword) {
                    const email = result[0].admin_email;
                    const isAdmin = result[0].isAdmin;
                    const token = jwt.sign(
                        { email: email, isAdmin: isAdmin },
                        process.env.JWT,
                        { expiresIn: '1d' }
                    )
                    res.cookie('token', token);
                    return res.status(STATUS.OK).json({ Status: true, Auth: { email, isAdmin, token } })
                } else {
                    res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'Password not is match' });
                }
            } else {
                res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'Error email or password' });
            }
        })
    } catch (error) {
        console.log('Error logging in', error);
    }
}

const getAdmin = async (req, res) => {
    const sql = 'SELECT * FROM admin';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const getHotels = async (req, res) => {
    const sql = 'SELECT * FROM hotel';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const getRoom_types = async (req, res) => {
    const sql = 'SELECT * FROM room_type';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const getFacilities = async (req, res) => {
    const sql = 'SELECT * FROM facilities';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}


const addCustomer = async (req, res) => {
    try {
        const existingUser = await dbQueryAsync(`SELECT * FROM customer WHERE LOWER(cust_email) = LOWER(?)`, [req.body.cust_email]);
        if (existingUser.length) {
            return res.status(STATUS.BAD_REQUEST).json({ status: false, error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.cust_password, 10);
        const sql = `INSERT INTO customer (cust_name, cust_email, cust_phone, cust_password) VALUES (?, ?, ?, ?)`;
        const values = [req.body.cust_name, req.body.cust_email, req.body.cust_phone, hashedPassword];
        await dbQueryAsync(sql, values);
        return res.status(STATUS.OK).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: false, Error: 'Internal Server Errors' });
    }
}

const addNewRoom = async (req, res) => {
    const sql = `INSERT INTO room (type_id, facility_id, status_id, hotel_id, images) 
                VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.type_id,
        req.body.facility_id,
        req.body.status_id,
        req.body.hotel_id,
        req.body.images
    ]
    await db.query(sql, values, (err, result) => {
        handleQuery(res, err, result);
    })
}

const addFacilities = async (req, res) => {
    const sql = `INSERT INTO facilities (facility, facility_cost) VALUES (?, ?)`;
    const values = [
        req.body.facility,
        req.body.facility_cost,
    ]
    await db.query(sql, values, (err, result) => {
        handleQuery(res, err, result);
    })
}

const editHotel = async (req, res) => {
    const idHotel = req.params.id;
    const sql = `UPDATE hotel SET hotel_name = ?,hotel_addr = ?,
                hotel_email = ?, hotel_phone = ? WHERE hotel_id = ?`;
    const values = [
        req.body.hotel_name,
        req.body.hotel_addr,
        req.body.hotel_email,
        req.body.hotel_phone
    ]
    await db.query(sql, [...values, idHotel], (err, result) => {
        handleQuery(res, err, result);
    })
}

const getOneReservation = async (req, res) => {
    const cust_id = req.params.id;
    const sql = 'SELECT * FROM reservation WHERE cust_id = ?';
    await db.query(sql, [cust_id], (err, result) => {
        handleQuery(res, err, result);
    })
}

const getBookings = async (req, res) => {
    const sql = 'SELECT * FROM reservation ORDER BY booking_date';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const deleteFacilities = async (req, res) => {
    const idFac = req.params.id;
    const sql = 'DELETE FROM facilities WHERE facility_id = ?';
    await db.query(sql, [idFac], (err, result) => {
        handleQuery(res, err, result);
    })
}

module.exports = {
    adminRegister,
    adminLogin,
    getAdmin,
    getHotels,
    getRoom_types,
    getFacilities,
    addCustomer,
    addNewRoom,
    addFacilities,
    editHotel,
    getOneReservation,
    getBookings,
    deleteFacilities
};
