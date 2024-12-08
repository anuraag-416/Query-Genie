const db = require('../models');
const { convertDBRespToObject } = require('../utils/index');

// Fetch all DB configurations
const fetchDBConfigs = async (user_id) => {
    const dbConfigs = await db.DatabaseConfig.findAll({
        where: {
            user_id
        }
    });
    return convertDBRespToObject(dbConfigs);
};

// Fetch a DB configuration by ID
const fetchDBConfigById = async (id) => {
    const dbConfig = await db.DatabaseConfig.findByPk(id);

    if (!dbConfig) {
        throw new Error('Database configuration not found');
    }

    return dbConfig;
};

// Create a new DB configuration
const createDBConfig = async (dbConfigData) => {
    const newDBConfig = await db.DatabaseConfig.create(dbConfigData);
    return newDBConfig;
};

// Update an existing DB configuration
const updateDBConfig = async (id, dbConfigData) => {
    const dbConfig = await db.DatabaseConfig.findByPk(id);

    if (!dbConfig) {
        throw new Error('Database configuration not found');
    }

    await dbConfig.update(dbConfigData);
    return dbConfig;
};

// Delete a DB configuration
const deleteDBConfig = async (id) => {
    const dbConfig = await db.DatabaseConfig.findByPk(id);

    if (!dbConfig) {
        throw new Error('Database configuration not found');
    }

    await dbConfig.destroy();
    return { message: 'Database configuration deleted successfully' };
};

module.exports = {
    fetchDBConfigs,
    fetchDBConfigById,
    createDBConfig,
    updateDBConfig,
    deleteDBConfig,
};
