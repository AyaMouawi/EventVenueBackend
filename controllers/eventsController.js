const db = require('../config/db');


const getAllEvents = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM events`);
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

const addEvent = async (req, res) => {
    const {
      title,
      date,
      ticketPrice,
      description,
      venueID
    } = req.body;
    
    try {
      const result = await db.query(
        `INSERT INTO events (title, date, ticketPrice, description, venueID) VALUES (?,?,?,?,?);`,
        [title, date, ticketPrice, description, venueID]
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

  const getEventByID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM events WHERE ID = ?`, [
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

  
  const updateEvent = async (req, res) => {
    const { title, date, ticketPrice, description, venueID } = req.body;
    const EventId = req.params.id;
  
    try {
      const result = await db.query(
        `UPDATE events SET title = ?, date= ?, ticketPrice = ?, description = ?, venueID = ?  WHERE ID= ?`,
        [title, date, ticketPrice, description, venueID, EventId]
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


  const deleteEvent = async (req, res) => {
    try {
      const [result] = await db.query(`DELETE FROM events WHERE ID= ?`, [
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

  module.exports = { addEvent, deleteEvent, updateEvent, getAllEvents, getEventByID };