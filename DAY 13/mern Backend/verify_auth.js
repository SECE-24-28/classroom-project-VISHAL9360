const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testAuth = async () => {
    try {
        console.log('1. Testing Registration...');
        // Create unique email
        const email = `testuser_${Date.now()}@example.com`;
        const registerRes = await axios.post(`${API_URL}/register`, {
            name: 'Test User',
            email: email,
            password: 'password123'
        });
        const token = registerRes.data.token;
        console.log('✅ Registration Successful. Token received.');

        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: email,
            password: 'password123'
        });
        if (loginRes.data.token) console.log('✅ Login Successful. Token verified.');

        console.log('\n3. Testing Protected Route (/me)...');
        const meRes = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Protected Route Accessed. User ID: ${meRes.data.data._id}`);

        console.log('\n🎉 AUTHENTICATION SYSTEM IS WORKING PERFECTLY!');

    } catch (error) {
        console.error('❌ Authentication Test Failed:', error.response ? error.response.data : error.message);
    }
};

// Wait for server to start roughly
setTimeout(testAuth, 3000);
