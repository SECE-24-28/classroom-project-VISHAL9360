const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/ProductModel');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recharge-backend');
        console.log('MongoDB Connected');

        const count = await Product.countDocuments();
        console.log(`Plans Count: ${count}`);

        if (count === 0) {
            console.log('No plans found. Seeding specific test data...');
            await Product.create({
                operator: 'Jio',
                planName: 'Emergency Test Plan',
                planType: 'Truly Unlimited',
                amount: 199,
                validity: '28 Days',
                data: '1 GB/Day',
                description: 'Created by Verify Script'
            });
            console.log('Test Plan Created');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectDB();
