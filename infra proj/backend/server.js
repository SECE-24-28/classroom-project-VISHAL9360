const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { CosmosClient } = require('@azure/cosmos');
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Azure Cosmos DB Client
let cosmosClient, database, containers = {};
if (process.env.COSMOS_ENDPOINT && process.env.COSMOS_KEY) {
  cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
  });
  database = cosmosClient.database(process.env.COSMOS_DATABASE || 'ecommerce');

  // Initialize containers
  containers = {
    users: database.container('users'),
    products: database.container('products'),
    orders: database.container('orders'),
    reviews: database.container('reviews'),
    payments: database.container('payments'),
    addresses: database.container('addresses'),
    cart: database.container('cart'),
    wishlist: database.container('wishlist')
  };
  console.log('✓ Connected to Azure Cosmos DB');
} else {
  console.log('⚠ Running in mock mode - Cosmos DB not configured');
}

// Azure Blob Storage Client
let blobServiceClient;
if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
  blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  console.log('✓ Connected to Azure Blob Storage');
}

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const reviewRoutes = require('./routes/review');
const searchRoutes = require('./routes/search');
const uploadRoutes = require('./routes/upload');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'E-commerce API Server',
    cosmosDB: !!cosmosClient,
    blobStorage: !!blobServiceClient,
    timestamp: new Date().toISOString()
  });
});

// Export for use in routes
app.locals.db = { containers, cosmosClient, database };
app.locals.blobServiceClient = blobServiceClient;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});

module.exports = app;
