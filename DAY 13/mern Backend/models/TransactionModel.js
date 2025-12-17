const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for guest transactions (if any) or backward compatibility
    },
    userMobile: {
        type: String,
        required: [true, 'Please add a mobile number'],
        trim: true
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    planName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Success', 'Failed', 'Pending'],
        default: 'Success'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
