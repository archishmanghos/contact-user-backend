const asyncHandler = require('express-async-handler');
const { constants } = require('../constants');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register an User
// @route POST /api/users/register
// @access  public
// @status done
const registerUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('User already registered!');
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('User already registered!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password: ', hashedPassword);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log(`User created: ${user}`);
        if (user) {
            res.status(201).json({ _id: user.id, username: user.username, email: user.email });
        } else {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('User data not valid');
        }
    }
)

// @desc Logging in an User
// @route POST /api/users/login
// @access  public
// @status done
const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error('Both fields are mandatory!');
        }

        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' });
            res.status(200).json({ accessToken });
        } else {
            res.status(constants.UNAUTHORISED);
            throw new Error('Email or password is incorrect!');
        }
    }
)

// @desc Current User Information
// @route GET /api/users/current
// @access  private
// @status not-done
const currentUser = asyncHandler(
    async (req, res) => {
        res.status(200).json(req.user);
    }
)

module.exports = { registerUser, loginUser, currentUser };