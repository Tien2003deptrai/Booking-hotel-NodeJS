const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/AdminController');
const VerifyAdmin = require('../Middlewares/VerifyAdmin');

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/getAdmin', VerifyAdmin, getAdmin);
router.get('/hotels', VerifyAdmin, getHotels);
router.get('/room/types', VerifyAdmin, getRoom_types);
router.get('/facilities', VerifyAdmin, getFacilities);
router.post('/add_customer', VerifyAdmin, addCustomer);
router.post('/add_newroom', VerifyAdmin, addNewRoom);
router.post('/add_facilities', VerifyAdmin, addFacilities);
router.put('/edit_hotel/:id', VerifyAdmin, editHotel);
router.get('/reservation/:id', VerifyAdmin, getOneReservation);
router.get('/bookings', VerifyAdmin, getBookings);
router.delete('/facilities/delete/:id', VerifyAdmin, deleteFacilities);

module.exports = router;