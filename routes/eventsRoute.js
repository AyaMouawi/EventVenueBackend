const express = require('express');
const router = express.Router();
const {
    addEvent,
    deleteEvent,
    updateEvent,
    getAllEvents,
    getEventByID,
   
  } = require('../controllers/eventsController');

  router.post('/add', addEvent);  
  router.delete('/delete/:id', deleteEvent);
  router.put('/update/:id', updateEvent);
  router.get('/getAll', getAllEvents);
  router.get('/get/:id', getEventByID);


  module.exports = router;