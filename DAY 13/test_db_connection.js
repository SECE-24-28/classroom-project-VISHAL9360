const axios = require('axios');

const testCreatePlan = async () => {
    const plan = {
        operator: 'Jio',
        planName: 'Test Plan ' + Date.now(),
        planType: 'Truly Unlimited',
        amount: 555,
        validity: '55 Days',
        data: '2 GB/Day',
        description: 'Test Description'
    };

    try {
        console.log('Sending Plan:', plan);
        const res = await axios.post('http://localhost:5000/api/plans', plan);
        console.log(' Success! Plan Created:', res.data);
    } catch (err) {
        console.error(' Failed:', err.response ? err.response.data : err.message);
    }
};

testCreatePlan();
