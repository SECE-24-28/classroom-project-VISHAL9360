const express = require('express');
const router = express.Router();
const { getChatCompletion } = require('../services/azureOpenAI');

router.post('/', async (req, res) => {
    try {
        const { messages } = req.body;
        const result = await getChatCompletion(messages);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
