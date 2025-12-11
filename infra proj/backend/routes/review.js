const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock reviews store
let reviews = [];

// Create review
router.post('/', (req, res) => {
    try {
        const {
            productId,
            userId,
            userName,
            rating,
            title,
            comment,
            images
        } = req.body;

        if (!productId || !userId || !rating) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const review = {
            id: uuidv4(),
            productId,
            userId,
            userName,
            rating,
            title,
            comment,
            images: images || [],
            helpful: 0,
            verified: true, // Mark as verified if purchased
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        reviews.push(review);

        res.status(201).json({
            message: 'Review submitted successfully',
            review
        });

    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// Get product reviews
router.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const { sort = 'recent', limit = 20, offset = 0 } = req.query;

    let productReviews = reviews.filter(r => r.productId === productId);

    // Sort reviews
    if (sort === 'recent') {
        productReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'helpful') {
        productReviews.sort((a, b) => b.helpful - a.helpful);
    } else if (sort === 'rating-high') {
        productReviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'rating-low') {
        productReviews.sort((a, b) => a.rating - b.rating);
    }

    const paginatedReviews = productReviews.slice(
        parseInt(offset),
        parseInt(offset) + parseInt(limit)
    );

    // Calculate rating summary
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(r => ratingCounts[r.rating]++);

    const avgRating = productReviews.length > 0
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : 0;

    res.json({
        reviews: paginatedReviews,
        summary: {
            totalReviews: productReviews.length,
            averageRating: Math.round(avgRating * 10) / 10,
            ratingDistribution: ratingCounts
        },
        pagination: {
            total: productReviews.length,
            limit: parseInt(limit),
            offset: parseInt(offset)
        }
    });
});

// Get user reviews
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;

    const userReviews = reviews
        .filter(r => r.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ reviews: userReviews });
});

// Update review
router.patch('/:reviewId', (req, res) => {
    const { reviewId } = req.params;
    const updates = req.body;

    const review = reviews.find(r => r.id === reviewId);
    if (!review) {
        return res.status(404).json({ error: 'Review not found' });
    }

    Object.assign(review, updates);
    review.updatedAt = new Date().toISOString();

    res.json({
        message: 'Review updated successfully',
        review
    });
});

// Delete review
router.delete('/:reviewId', (req, res) => {
    const { reviewId } = req.params;

    reviews = reviews.filter(r => r.id !== reviewId);

    res.json({ message: 'Review deleted successfully' });
});

// Mark review as helpful
router.post('/:reviewId/helpful', (req, res) => {
    const { reviewId } = req.params;

    const review = reviews.find(r => r.id === reviewId);
    if (!review) {
        return res.status(404).json({ error: 'Review not found' });
    }

    review.helpful = (review.helpful || 0) + 1;

    res.json({
        message: 'Marked as helpful',
        helpful: review.helpful
    });
});

module.exports = router;
