const db = require('../config/db');


const getAllReservations = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM reservation`);
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get new data',
      error,
    });
  }
};

const addReservation = async (req, res) => {
    const {
      venueID,
      userID
      
    } = req.body;
    
    try {
      const result = await db.query(
        `INSERT INTO reservation (venueID, userID) VALUES (?,?);`,
        [venueID, userID]
      );
  
      console.log(result);
      res.status(201).json({
        success: true,
        message: 'Data added successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to add new data',
        error,
      });
    }
  };

  const getReservationByID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM reservation WHERE ID = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error,
      });
    }
  };

  const getAllReservationByUserID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM reservation WHERE userID = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error,
      });
    }
  };

  const getAllReservationByVenueID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM reservation WHERE venueID = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error,
      });
    }
  };

  
  const updateReservation = async (req, res) => {
    const {venueID, userID } = req.body;
    const ReservationId = req.params.id;
  
    try {
      const result = await db.query(
        `UPDATE reservation SET venueID = ?, userID= ? WHERE ID= ?`,
        [venueID, userID, ReservationId]
      );
  
      console.log(result);
      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Unable to update data',
        error,
      });
    }
  };


  const deleteReservation = async (req, res) => {
    try {
      const [result] = await db.query(`DELETE FROM reservation WHERE ID= ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to delete data',
        error,
      });
    }
  };

  module.exports = { addReservation, deleteReservation, updateReservation, getAllReservations, getReservationByID, getAllReservationByUserID, getAllReservationByVenueID };