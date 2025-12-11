const express = require('express');
const router = express.Router();

// Import product data
const { products } = require('../data/products');

// Get all products with filters and pagination
router.get('/', (req, res) => {
    try {
        const {
            category,
            subCategory,
            brand,
            minPrice,
            maxPrice,
            rating,
            inStock,
            sort = 'popularity',
            limit = 20,
            offset = 0,
            search
        } = req.query;

        let filteredProducts = [...products];

        // Apply filters
        if (category) {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        if (subCategory) {
            filteredProducts = filteredProducts.filter(p => p.subCategory === subCategory);
        }

        if (brand) {
            const brands = Array.isArray(brand) ? brand : [brand];
            filteredProducts = filteredProducts.filter(p => brands.includes(p.brand));
        }

        if (minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
        }

        if (rating) {
            filteredProducts = filteredProducts.filter(p => p.rating >= parseFloat(rating));
        }

        if (inStock === 'true') {
            filteredProducts = filteredProducts.filter(p => p.inStock);
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.brand.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        switch (sort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'discount':
                filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
                break;
            case 'popularity':
            default:
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
        }

        // Pagination
        const paginatedProducts = filteredProducts.slice(
            parseInt(offset),
            parseInt(offset) + parseInt(limit)
        );

        res.json({
            products: paginatedProducts,
            total: filteredProducts.length,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product
router.get('/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const product = products.find(p => p.id === parseInt(productId));

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ product });

    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Get similar products
router.get('/:productId/similar', (req, res) => {
    try {
        const { productId } = req.params;
        const product = products.find(p => p.id === parseInt(productId));

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const similarProducts = products
            .filter(p =>
                p.id !== product.id &&
                (p.category === product.category || p.subCategory === product.subCategory)
            )
            .slice(0, 6);

        res.json({ products: similarProducts });

    } catch (error) {
        console.error('Get similar products error:', error);
        res.status(500).json({ error: 'Failed to fetch similar products' });
    }
});

module.exports = router;
