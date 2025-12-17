const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const productRoutes = require('./routes/ProductRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');
const authRoutes = require('./routes/AuthRoutes');

// Initialize Express App
const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors({ origin: '*' })); // Allow all origins for development

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', productRoutes);
app.use('/api/transactions', transactionRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send({ status: 'API is healthy and running.' });
});

module.exports = app;
