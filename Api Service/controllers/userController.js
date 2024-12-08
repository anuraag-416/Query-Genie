const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    fetchUsers,
    updateUser,
    deleteUser,
    fetchUserById,
} = require('../services/userService');
const {generateToken}  = require('../utils/jwtutils');
const app = express();
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');



// Get all users
router.get('/getusers', async (req, res) => {
    try {
        const users = await fetchUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (err) {
        console.error('Error while fetching users:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while getting users!',
            error: err.message,
        });
    }
});

// Get a user by ID
router.get('/getuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await fetchUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        console.error('Error while fetching user:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while getting user!',
            error: err.message,
        });
    }
});
// Update a user by ID
router.put('/updateuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body; // Expecting updated user data in the request body
        const updatedUser = await updateUser(userId, updatedData);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            data: updatedUser,
        });
    } catch (err) {
        console.error('Error while updating user:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while updating user!',
            error: err.message,
        });
    }
});

// Delete a user by ID
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.error('Error while deleting user:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while deleting user!',
            error: err.message,
        });
    }
});

module.exports = router;
