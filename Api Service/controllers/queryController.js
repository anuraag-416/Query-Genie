const express = require('express');
const router = express.Router();
const { 
  fetchQueries, 
  fetchQueryById, 
  createQuery, 
  updateQuery, 
  deleteQuery,
  fetchQueriesByConversationId 
} = require('../services/queryService'); // Import CRUD functions
const {
  fetchDBConfigById
} = require('../services/dbConfigService');

const axios = require('axios');

// Get all queries
router.get('/getAllQueries', async (req, res) => {
  try {
    const db_id = req.query.db_id;
    const queries = await fetchQueries(db_id);
    res.status(200).json({
      success: true,
      data: queries,
    });
  } catch (err) {
    console.error('Error while fetching queries:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error occurred while getting queries!',
      error: err.message,
    });
  }
});

// Get a specific query by ID
router.get('/getQuery/:id', async (req, res) => {
  const queryId = req.params.id;
  try {
    const query = await fetchQueryById(queryId);
    if (query) {
      res.status(200).json({
        success: true,
        data: query,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Query not found',
      });
    }
  } catch (err) {
    console.error('Error while fetching query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error occurred while getting query!',
      error: err.message,
    });
  }
});

// Create a new query
router.post('/createQuery', async (req, res) => {
  try {
    const queryData = req.body;
    const newQuery = await createQuery(queryData);
    
    
    const payload = {
      newQuery
    };

    await axios.post('http://localhost:5000/populateAnswer', payload);

    res.status(201).json({
      success: true,
      data: newQuery,     
    });
  } catch (err) {
    console.error('Error while creating query:', err.message);
    res.status(202).json({
      success: false,
      message: 'Error occurred while creating query!',
      error: err.message,
    });
  }
});

// Update a query by ID
router.put('/queries/:id', async (req, res) => {
  const queryId = req.params.id;
  const updateData = req.body;
  try {
    const updatedQuery = await updateQuery(queryId, updateData);
    if (updatedQuery) {
      res.status(200).json({
        success: true,
        data: updatedQuery,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Query not found',
      });
    }
  } catch (err) {
    console.error('Error while updating query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error occurred while updating query!',
      error: err.message,
    });
  }
});

// Delete a query by ID
router.delete('/queries/:id', async (req, res) => {
  const queryId = req.params.id;
  try {
    const result = await deleteQuery(queryId);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    console.error('Error while deleting query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error occurred while deleting query!',
      error: err.message,
    });
  }
});

router.post('/fetchAnswer', async (req, res) => {
  const queryId = req.query.query_id;
try {
  const query = await fetchQueryById(queryId);
  if (query) {
    if (query.answer) {
      res.status(200).json({
        success: true,
        answer: query.answer,
      });
    } else {
      res.status(404).json({
        success: false,
        answer: 'Query found, but no answer available',
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: 'Query not found',
    });
  }
} catch (err) {
  console.error('Error while fetching query:', err.message);
  res.status(500).json({
    success: false,
    message: 'Error occurred while getting query!',
    error: err.message,
  });
}
});

module.exports = router;
