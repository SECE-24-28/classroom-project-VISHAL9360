const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/ProductModel');

const verifyBrowserTest = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recharge-backend');
        console.log('Checking for Browser Agent Test Plan...');

        const plan = await Product.findOne({ planName: 'Browser Agent Test' });

        if (plan) {
            console.log('✅ FOUND! The plan was successfully stored in MongoDB.');
            console.log(JSON.stringify(plan, null, 2));
        } else {
            console.log('❌ NOT FOUND. The plan was NOT stored.');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyBrowserTest();
