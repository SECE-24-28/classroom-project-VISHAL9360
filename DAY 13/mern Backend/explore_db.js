const mongoose = require('mongoose');
require('dotenv').config();

const exploreDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recharge-backend');
        console.log('✅ Connected to Database: recharge-backend\n');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`Found ${collections.length} Collections:\n`);

        for (const collection of collections) {
            const name = collection.name;
            const count = await mongoose.connection.db.collection(name).countDocuments();
            const sample = await mongoose.connection.db.collection(name).findOne({});

            console.log(`📂 Collection: "${name}"`);
            console.log(`   - Document Count: ${count}`);
            console.log(`   - Sample Document:`);
            console.log(JSON.stringify(sample, null, 2));
            console.log('--------------------------------------------------\n');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

exploreDB();
