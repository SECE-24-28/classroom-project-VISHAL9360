const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized' });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers
};
