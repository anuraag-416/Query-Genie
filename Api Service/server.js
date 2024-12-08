const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const app = express();
const db= require('./models');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes =require("./routes")
app.use(express.json());
app.use("/api", routes);


async function initialize(req, res, next) {
    await db.sequelize.sync({});
    app.listen(config.PORT, () => {
        console.log("listening on port " + config.PORT);
    });
}

const {loginUser,createUser} = require('./services/userService');

const {generateToken}  = require('./utils/jwtutils');

app.post('/login', async (req, res) => {
    try {
        const userCreds = req.body; 
        const user = await loginUser(userCreds);
        const token = generateToken(user);
        res.status(201).json({
            success: true,
            data: user,
            token : token
        });
        
    } catch (err) {
        console.error('Error while logging in:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while logging in!',
            error: err.message,
        });
    }
});

app.post('/createUser', async (req, res) => {
    try {
        const newUser = req.body; 
        const user = await createUser(newUser);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        console.error('Error while creating user:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred while creating user!',
            error: err.message
        });
    }
});
initialize()

