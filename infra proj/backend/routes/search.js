const express = require('express');
const router = express.Router();

// Import product data
const { products } = require('../data/products');

// Search products
router.get('/', (req, res) => {
    try {
        const { q, category } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Search query required' });
        }

        const searchLower = q.toLowerCase();
        let results = products.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.brand.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower) ||
            p.subCategory.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );

        if (category) {
            results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        res.json({
            query: q,
            results,
            count: results.length
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Search failed' });
    }
});

// Get search suggestions
router.get('/suggestions', (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.json({ suggestions: [] });
        }

        const searchLower = q.toLowerCase();
        const suggestions = new Set();

        // Add product names
        products.forEach(p => {
            if (p.name.toLowerCase().includes(searchLower)) {
                suggestions.add(p.name);
            }
            if (p.brand.toLowerCase().includes(searchLower)) {
                suggestions.add(p.brand);
            }
        });

        res.json({
            suggestions: Array.from(suggestions).slice(0, 10)
        });

    } catch (error) {
        console.error('Suggestions error:', error);
        res.status(500).json({ error: 'Failed to get suggestions' });
    }
});

module.exports = router;
