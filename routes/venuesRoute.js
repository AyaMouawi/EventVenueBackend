const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    addVenue,
    deleteVenue,
    updateVenue,
    getAllVenues,
    getVenueByID,
   
  } = require('../controllers/venuesController');

  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });

  router.post('/add', upload.single('image'), addVenue);  
  router.delete('/delete/:id', deleteVenue);
  router.put('/update/:id',  upload.single('image'),  updateVenue);
  router.get('/getAll', getAllVenues);
  router.get('/get/:id', getVenueByID);


  module.exports = router;