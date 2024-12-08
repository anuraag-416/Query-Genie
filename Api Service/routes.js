const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const dbConfigController = require('./controllers/dbConfigController')
const queryController = require('./controllers/queryController')
const { validateToken } = require('./utils/jwtutils');
router.use(validateToken);
router.use('/user' ,userController)
router.use('/dbConfig', dbConfigController)
router.use('/query', queryController)


module.exports = router