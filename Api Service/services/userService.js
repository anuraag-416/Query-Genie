const db = require('../models');
const { convertDBRespToObject } = require('../utils/index');
const bcrypt = require('bcrypt'); 


const fetchUsers = async () => {
    const users = await db.User.findAll();
    return convertDBRespToObject(users);
};

const createUser = async (userData) => {
    const { user_name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
        user_name,
        email,
        password: hashedPassword,
    });

    return newUser;
};

const loginUser = async (userCreds) => {
    const user = await db.User.findOne({ where: { email: userCreds.email } });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(userCreds.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
};

const fetchUserById = async (id) => {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }

    return convertDBRespToObject(user);
};

module.exports = {
    fetchUsers,
    createUser,
    loginUser,
    fetchUserById,
};
