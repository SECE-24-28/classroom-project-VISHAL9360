const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/ProductModel');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const products = [
    // Jio Plans
    { operator: 'Jio', planName: 'Freedom 299', planType: 'Truly Unlimited', amount: 299, validity: '28 Days', data: '1.5 GB/Day', description: 'Unlimited Voice Calls, 100 SMS/Day' },
    { operator: 'Jio', planName: 'Data Booster', planType: 'Data Voucher', amount: 61, validity: 'Active Plan', data: '6 GB', description: 'High Speed Data' },
    { operator: 'Jio', planName: 'Cricket Pack', planType: 'Entertainment', amount: 749, validity: '90 Days', data: '2 GB/Day', description: 'Disney+ Hotstar included' },

    // Airtel Plans
    { operator: 'Airtel', planName: 'Unlimited 5G', planType: 'Truly Unlimited', amount: 499, validity: '56 Days', data: '2 GB/Day', description: 'Unlimited 5G Data, Apollo Circle' },
    { operator: 'Airtel', planName: 'Talktime Topup', planType: 'Topup', amount: 100, validity: 'Unlimited', data: 'N/A', description: '₹81.75 Talktime' },
    { operator: 'Airtel', planName: 'Annual Dhamaka', planType: 'Truly Unlimited', amount: 2999, validity: '365 Days', data: '2.5 GB/Day', description: 'Amazon Prime Mobile Edition' },

    // Vi Plans
    { operator: 'Vi', planName: 'Hero Unlimited', planType: 'Truly Unlimited', amount: 719, validity: '84 Days', data: '1.5 GB/Day', description: 'Weekend Data Rollover, Binge All Night' },
    { operator: 'Vi', planName: 'Night Binge', planType: 'Data Voucher', amount: 118, validity: '28 Days', data: '12 GB', description: 'No Daily Limit' },

    // BSNL Plans
    { operator: 'BSNL', planName: 'STV 147', planType: 'Truly Unlimited', amount: 147, validity: '30 Days', data: '10 GB', description: 'Unlimited Calls + BSNL Tunes' },
    { operator: 'BSNL', planName: 'Work From Home', planType: 'Data Voucher', amount: 151, validity: '28 Days', data: '40 GB', description: 'Zing Music Subscription' },

    // More Mix
    { operator: 'Jio', planName: 'Value Plan', planType: 'Truly Unlimited', amount: 395, validity: '84 Days', data: '6 GB', description: 'Best for low data users' },
    { operator: 'Airtel', planName: 'Starter Pack', planType: 'Truly Unlimited', amount: 155, validity: '24 Days', data: '1 GB', description: 'Entry level pack' }
];

const importData = async () => {
    try {
        await connectDB();

        await Product.deleteMany(); // Clear existing data
        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

importData();
