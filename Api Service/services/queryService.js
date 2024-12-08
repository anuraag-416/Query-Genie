const db = require('../models');
const { convertDBRespToObject } = require('../utils/index');

// Fetch all queries
const fetchQueries = async (db_id) => {
  try {
    const queries = await db.Query.findAll({
      where: {
        db_id
      }
    });
    return convertDBRespToObject(queries); // Converts DB response to plain JS object
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
};

// Fetch a specific query by ID
const fetchQueryById = async (query_id) => {
  try {
    const query = await db.Query.findByPk(query_id);
    return query;
  } catch (error) {
    console.error('Error fetching query:', error);
    throw error;
  }
};

// Create a new query
const createQuery = async (queryData) => {
  try {
    const newQuery = await db.Query.create(queryData); // queryData is the input object
    return newQuery;
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

// Update a query by ID
const updateQuery = async (query_id, updateData) => {
  try {
    const [updated] = await db.Query.update(updateData, {
      where: { query_id },
      returning: true, // PostgreSQL-specific, returns updated rows
    });
    if (updated) {
      const updatedQuery = await db.Query.findByPk(query_id);
      return updatedQuery;
    }
    throw new Error('Query not found');
  } catch (error) {
    console.error('Error updating query:', error);
    throw error;
  }
};

// Delete a query by ID
const deleteQuery = async (query_id) => {
  try {
    const deleted = await db.Query.destroy({
      where: { query_id },
    });
    if (!deleted) {
      throw new Error('Query not found');
    }
    return { message: 'Query deleted successfully' };
  } catch (error) {
    console.error('Error deleting query:', error);
    throw error;
  }
};

// Fetch all queries by conversation_id
const fetchQueriesByConversationId = async (conversation_id) => {
  try {
    const queries = await db.Query.findAll({
      where: { conversation_id }, // Filter by conversation_id
    });
    return convertDBRespToObject(queries); // Convert the response to a plain JS object
  } catch (error) {
    console.error('Error fetching queries by conversation_id:', error);
    throw error;
  }
};

module.exports = {
  fetchQueries,
  fetchQueryById,
  createQuery,
  updateQuery,
  deleteQuery,
  fetchQueriesByConversationId,
};
