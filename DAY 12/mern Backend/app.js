const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');

// Load env vars if not already loaded by server.js (redundant but safe)
// const dotenv = require('dotenv');
// dotenv.config();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors()); // Enable CORS for frontend communication

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send({ status: 'API is healthy and running.' });
});

module.exports = app;
