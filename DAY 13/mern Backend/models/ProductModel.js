const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    operator: {
        type: String,
        required: [true, 'Please add an operator name'],
        trim: true,
        enum: ['Airtel', 'Jio', 'Vi', 'BSNL']
    },
    planName: {
        type: String,
        required: [true, 'Please add a plan name'],
        trim: true
    },
    planType: {
        type: String,
        enum: ['Truly Unlimited', 'Data Voucher', 'Top Up', 'Entertainment', 'Topup'],
        default: 'Truly Unlimited'
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    validity: {
        type: String,
        required: [true, 'Please add validity (e.g. 28 Days)']
    },
    data: {
        type: String,
        required: [true, 'Please add data limit (e.g. 1.5 GB/Day)']
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
