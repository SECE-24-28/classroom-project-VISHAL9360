const Transaction = require('../models/TransactionModel');

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Public
const createTransaction = async (req, res) => {
    try {
        const { userMobile, planId, planName, amount, paymentId, status } = req.body;

        if (!userMobile || !amount || !paymentId) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const transaction = await Transaction.create({
            userId: req.user.id, // Add authenticated user ID
            userMobile,
            planId,
            planName,
            amount,
            paymentId,
            status: status || 'Success'
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public (should be Admin only ideally)
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's transactions
// @route   GET /api/transactions/my
// @access  Private
const getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getUserTransactions
};
