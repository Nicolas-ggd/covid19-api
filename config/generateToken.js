const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userInfo, type, time) => {
    return jwt.sign(
        userInfo, 
        type === "access_token" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: time }
    );
};

module.exports = generateToken;