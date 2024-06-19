const db = require('../utils/db');
const bcrypt = require('bcrypt');
const { dbQueryAsync, handleQuery } = require('../config/Database');
const jwt = require('jsonwebtoken');
const { STATUS } = require('../config/Constrant');

const customerRegister = async (req, res) => {
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
};

const customerLogin = async (req, res) => {
    const sql = 'SELECT * FROM customer WHERE cust_email = ?';
    const values = [req.body.cust_email];
    await db.query(sql, values, (err, result) => {
        if (err) return res.status(STATUS.BAD_REQUEST).json({ Status: false, Error: 'Error query' });
        if (result.length > 0) {
            const storedHashPassword = result[0].cust_password;
            const isMatchPassword = bcrypt.compare(req.body.cust_password, storedHashPassword);
            if (isMatchPassword) {
                const email = result[0].cust_email;
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
}

const getCustomer = async (req, res) => {
    const sql = 'SELECT * FROM customer';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const editCustomer = async (req, res) => {
    const idUser = req.params.id;
    const sql = 'UPDATE customer SET cust_name = ?, cust_email = ?, cust_phone = ? WHERE cust_id = ?';
    const values = [
        req.body.cust_name,
        req.body.cust_email,
        req.body.cust_phone
    ]
    await db.query(sql, [...values, idUser], (err, result) => {
        handleQuery(res, err, result);
    })
}

const getRooms_facilities = async (req, res) => {
    const sql = 'SELECT * FROM facilities';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const getRooms_types = async (req, res) => {
    const sql = 'SELECT * FROM room_type';
    await db.query(sql, (err, result) => {
        handleQuery(res, err, result);
    })
}

const orderReservation = async (req, res) => {
    const sql = `INSERT INTO reservation 
                (cust_id, room_id, booking_date, start_date, end_date, amount)
                VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.cust_id,
        req.body.room_id,
        req.body.booking_date,
        req.body.start_date,
        req.body.end_date,
        req.body.amount
    ]
    await db.query(sql, values, (err, result) => {
        handleQuery(res, err, result);
    })
}

const deleteReservation = async (req, res) => {
    const idReservation = req.params.id;
    const sql = 'DELETE FROM reservation WHERE r_id = ?';
    await db.query(sql, [idReservation], (err, result) => {
        handleQuery(res, err, result);
    })
}

const getRooms_Detail = async (req, res) => {
    const start_date = req.params.start_date;
    const end_date = req.params.end_date;

    const sql = `
        SELECT 
            r.room_id,
            r.images,
            rt.type_name,
            rt.cost,
            rs.availability,
            f.facility,
            f.facility_cost
        FROM 
            room AS r
        JOIN 
            room_type AS rt ON r.type_id = rt.type_id
        JOIN 
            room_status AS rs ON r.status_id = rs.status_id
        JOIN 
            facilities AS f ON r.facility_id = f.facility_id
        LEFT JOIN 
            reservation AS res ON r.room_id = res.room_id
        WHERE 
            res.room_id IS NULL OR 
            NOT (res.start_date BETWEEN ? AND ? OR res.end_date BETWEEN ? AND ?)
    `;

    db.query(sql, [start_date, end_date, start_date, end_date], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).send('Internal Server Error');
        }

        return res.status(200).json(result);
    });
};


module.exports = {
    customerRegister,
    customerLogin,
    getCustomer,
    editCustomer,
    getRooms_facilities,
    getRooms_types,
    orderReservation,
    deleteReservation,
    getRooms_Detail,
}