const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Secure HTTP headers

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(cors({ origin: '*' })); // Allow all origins for dev (Restrict in production)

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/plans', require('./routes/ProductRoutes'));
app.use('/api/transactions', require('./routes/TransactionRoutes'));

// Base Route
app.get('/', (req, res) => {
    res.send('API is running securely...');
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
