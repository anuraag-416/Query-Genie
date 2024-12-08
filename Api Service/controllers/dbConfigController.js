const express = require('express');
const router = express.Router();
const {
    fetchDBConfigs,
    fetchDBConfigById,
    createDBConfig,
    updateDBConfig,
    deleteDBConfig,
} = require('../services/dbConfigService');

// Get all DB configurations
router.get('/getAllConfigs', async (req, res) => {
    try {
        const user_id = req.user.userId
        const dbConfigs = await fetchDBConfigs(user_id);
        res.status(200).json({ success: true, data: dbConfigs });
    } catch (err) {
        console.error('Error while fetching DB configurations:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get DB configuration by ID
router.get('/getConfig/:id', async (req, res) => {
    try {
        const dbConfig = await fetchDBConfigById(req.params.id);
        res.status(200).json({ success: true, data: dbConfig });
    } catch (err) {
        console.error('Error while fetching DB configuration:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create a new DB configuration
router.post('/addDBConfig', async (req, res) => {
    try {
        const data=req.body;
        const userId = req.user.userId;
        data.user_id = userId;
        const newDBConfig = await createDBConfig(data);
        res.status(201).json({ success: true, data: newDBConfig });
    } catch (err) {
        console.error('Error while creating DB configuration:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update an existing DB configuration
router.put('/dbconfigs/:id', async (req, res) => {
    try {
        const updatedDBConfig = await updateDBConfig(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedDBConfig });
    } catch (err) {
        console.error('Error while updating DB configuration:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete a DB configuration
router.delete('/dbconfigs/:id', async (req, res) => {
    try {
        const result = await deleteDBConfig(req.params.id);
        res.status(200).json({ success: true, message: result.message });
    } catch (err) {
        console.error('Error while deleting DB configuration:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
