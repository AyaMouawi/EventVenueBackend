const db = require('../config/db');


const getAllUsers = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM users`);
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

const addUser = async (req, res) => {
    const {
      fullName,
      email,
      password,
      role
    } = req.body;
    
    try {
      const result = await db.query(
        `INSERT INTO users (fullName, email, password, role) VALUES (?,?,?,?);`,
        [fullName, email, password, role]
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

  const getUserByID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM users WHERE ID = ?`, [
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

  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [result] = await db.query(
            `SELECT ID, role, password FROM users WHERE email = ?`,
            [email]
        );

        if (!result || result.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        const storedPassword = result[0].password;

        if (password !== storedPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            role: result[0].role,
            ID: result[0].ID,
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to log in',
            error: error.message,
        });
    }
};

  const updateUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const userId = req.params.id;
  
    try {
      const result = await db.query(
        `UPDATE users SET fullName = ?, email= ?, password = ?, role = ? WHERE ID= ?`,
        [fullName, email, password, role, userId]
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


  const deleteUser = async (req, res) => {
    try {
      const [result] = await db.query(`DELETE FROM users WHERE ID= ?`, [
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

  module.exports = { addUser, deleteUser, updateUser, getAllUsers, loginUser, getUserByID };