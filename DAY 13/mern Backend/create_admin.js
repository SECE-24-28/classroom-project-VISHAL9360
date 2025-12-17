const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/UserModel');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@example.com';

        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log('Admin user already exists. Updating role to admin...');
            user.role = 'admin';
            user.password = 'admin123'; // Resetting password to known value
            await user.save();
        } else {
            console.log('Creating new admin user...');
            user = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: 'admin123',
                role: 'admin'
            });
        }

        console.log(`Admin User Ready: ${adminEmail} / admin123`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
