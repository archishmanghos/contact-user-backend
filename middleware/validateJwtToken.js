const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { constants } = require('../constants');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(constants.UNAUTHORISED);
                throw new Error('Unauthorised User!');
            }
            req.user = decoded.user;
            next(); 
            console.log(decoded);
        });

        if (!token) {
            res.status(constants.UNAUTHORISED);
            throw new Error('Unauthorised User or Token is missing!');
        }
    }
});

module.exports = validateToken;