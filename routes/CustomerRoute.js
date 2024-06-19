const express = require('express');
const router = express.Router();
const {
    customerRegister,
    customerLogin,
    editCustomer,
    getCustomer,
    orderReservation,
    getRooms_facilities,
    getRooms_types,
    deleteReservation,
    getRooms_Detail
} = require('../controllers/CustomerController');
const VerifyCustomer = require('../Middlewares/VerifyCustomer');

router.post('/register', customerRegister);
router.post('/login', customerLogin);
router.get('/getCustomer', VerifyCustomer, getCustomer);
router.put('/edit/:id', VerifyCustomer, editCustomer);
router.get('/getCustomer', VerifyCustomer, getCustomer);
router.get('/room/facilities', VerifyCustomer, getRooms_facilities);
router.get('/room/types', VerifyCustomer, getRooms_types);
router.post('/oder_reservation', VerifyCustomer, orderReservation);
router.delete('/cance_reservation/:id', VerifyCustomer, deleteReservation);
router.get('/rooms/detail/:start_date/:end_date', VerifyCustomer, getRooms_Detail);

module.exports = router;