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
      eventID,
      userID
      
    } = req.body;
    
    try {
      const result = await db.query(
        `INSERT INTO reservation (eventID, userID) VALUES (?,?);`,
        [eventID, userID]
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

  const getAllReservationsDetails = async (req, res) => {
    try {
      const query = `
        SELECT
          u.*,
          v.*,
          e.*,
          r.*
        FROM users u
        LEFT JOIN reservation r ON u.ID = r.userID
        LEFT JOIN events e ON r.eventID = e.ID
        LEFT JOIN venues v ON e.venueID = v.ID`;
  
      const [result] = await db.query(query);
  
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


  const getDataByReservationID = async (req, res) => {
    try {
      const query = `
        SELECT
          users.*,
          reservation.*,
          events.*,
          venues.*
        FROM users
        LEFT JOIN reservation ON reservation.userID = users.ID
        LEFT JOIN events ON reservation.eventID = events.ID
        LEFT JOIN venues ON events.venueID = venues.ID
        WHERE reservation.ID = ?`;
  
      const [result] = await db.query(query, [req.params.id]);
  
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
  


  const getAllReservationByEventID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM reservation WHERE eventID = ?`, [
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
    const {eventID, userID } = req.body;
    const ReservationId = req.params.id;
  
    try {
      const result = await db.query(
        `UPDATE reservation SET eventID = ?, userID= ? WHERE ID= ?`,
        [eventID, userID, ReservationId]
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

  module.exports = { addReservation, deleteReservation, updateReservation, getAllReservations, getReservationByID, getAllReservationByUserID, getAllReservationByEventID, getAllReservationsDetails, getDataByReservationID };