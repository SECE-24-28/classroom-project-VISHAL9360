const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/azureOpenAI');

router.post('/', async (req, res) => {
    try {
        const { userProfile, products } = req.body;
        const result = await getRecommendations(userProfile, products);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
