const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/ProductRoutes');

// Initialize Express App
const app = express();

// Connect to Database
// Note: We call this here, but it expects env vars to be loaded (which server.js does, or we do here if needed)
// Better to rely on server.js for env loading, but connection should happen after env is loaded.
// We will simply define the app here. The connection will be called in app.js or server.js.
// Standard pattern: Call config/db from server.js OR call it here but ensure dotenv config is top-level in entry file.
// We will call it here to keep app logic self-contained, assuming 'dotenv' is loaded before importing 'app' in server.js.
// However, to be safe and "separate", let's export list of loaders or just do it.

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors()); // Enable CORS for frontend communication

// Mount Routes
app.use('/api/plans', productRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send({ status: 'API is healthy and running.' });
});

module.exports = app;
