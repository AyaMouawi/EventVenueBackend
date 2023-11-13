const db = require('../config/db');
const cloudinaryConfig = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;


const getAllVenues = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM venues`);
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

const addVenue = async (req, res) => {
  const {
    name,
    description,
    capacity,
    address
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image not provided',
      });
    }
    const imageBuffer = req.file.buffer.toString('base64');
    const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
      folder: 'venues', 
    });

    const result = await db.query(
      `INSERT INTO venues (name, description, capacity, image, address) VALUES (?,?,?,?,?);`,
      [name, description, capacity, imageResult.secure_url, address]
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Data added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Unable to add new data',
      error: error.message, 
    });
  }
};


  const getVenueByID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM venues WHERE ID = ?`, [
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

  
  const updateVenue = async (req, res) => {
    const { name, description, capacity, address } = req.body;
    const VenueId = req.params.id;
  
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image not provided',
        });
      }
  
      const imageBuffer = req.file.buffer.toString('base64');
      const imageResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBuffer}`, {
        folder: 'venues', 
      });
  
      
      const result = await db.query(
        `UPDATE venues SET name = ?, description = ?, capacity = ?, image = ?, address = ? WHERE ID = ?`,
        [name, description, capacity, imageResult.secure_url, address, VenueId]
      );
  
      console.log(result);
      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: 'Unable to update data',
        error: error.message, 
      });
    }
  };
  


  const deleteVenue = async (req, res) => {
    try {
      const [result] = await db.query(`DELETE FROM venues WHERE ID= ?`, [
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

  module.exports = { deleteVenue,  getAllVenues, getVenueByID, addVenue, updateVenue };