const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    getUserTransactions
} = require('../controllers/TransactionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my', protect, getUserTransactions);

router.route('/')
    .post(protect, createTransaction) // Protect creation to get userId
    .get(protect, getTransactions); // Protect admin view

module.exports = router;
