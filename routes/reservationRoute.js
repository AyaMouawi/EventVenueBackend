const express = require('express');
const router = express.Router();
const {
    addReservation,
    deleteReservation,
    updateReservation,
    getAllReservations,
    getReservationByID,
    getAllReservationByUserID,
    getAllReservationByVenueID,
   
  } = require('../controllers/reservationController');

  router.post('/add', addReservation);  
  router.delete('/delete/:id', deleteReservation);
  router.put('/update/:id', updateReservation);
  router.get('/getAll', getAllReservations);
  router.get('/get/:id', getReservationByID);
  router.get('/getByUser/:id', getAllReservationByUserID);
  router.get('/getByVenue/:id', getAllReservationByVenueID);


  module.exports = router;