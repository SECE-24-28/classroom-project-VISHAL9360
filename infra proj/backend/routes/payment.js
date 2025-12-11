const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Mock payment store
let payments = [];
let orders = [];

// Initialize Razorpay (will be mock if no keys)
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
}

// Create payment order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', items, shippingAddress } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Create order in database
        const order = {
            id: `ORD-${Date.now()}`,
            userId: req.body.userId || 'guest',
            amount,
            currency,
            items,
            shippingAddress,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(order);

        // Mock Razorpay order creation for development
        if (razorpay) {
            const razorpayOrder = await razorpay.orders.create({
                amount: amount * 100, // Convert to paise
                currency,
                receipt: order.id,
                notes: {
                    orderId: order.id
                }
            });

            res.json({
                orderId: order.id,
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID
            });
        } else {
            // Mock response for development
            res.json({
                orderId: order.id,
                razorpayOrderId: `razorpay_${uuidv4()}`,
                amount: amount * 100,
                currency,
                key: 'rzp_test_mock_key',
                mock: true
            });
        }

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

// Verify payment
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        // Mock verification for development
        if (!process.env.RAZORPAY_KEY_SECRET) {
            // Update order status
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'confirmed';
                order.paymentStatus = 'paid';
                order.paymentId = razorpay_payment_id;
                order.paidAt = new Date().toISOString();
            }

            // Store payment record
            payments.push({
                id: uuidv4(),
                orderId,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                status: 'success',
                method: 'mock',
                createdAt: new Date().toISOString()
            });

            return res.json({
                success: true,
                message: 'Payment verified successfully (mock)',
                orderId
            });
        }

        // Real Razorpay verification
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Update order
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'confirmed';
                order.paymentStatus = 'paid';
                order.paymentId = razorpay_payment_id;
                order.paidAt = new Date().toISOString();
            }

            // Store payment
            payments.push({
                id: uuidv4(),
                orderId,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                status: 'success',
                createdAt: new Date().toISOString()
            });

            res.json({
                success: true,
                message: 'Payment verified successfully',
                orderId
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
});

// Get payment methods (saved cards, UPI, wallets)
router.get('/methods/:userId', (req, res) => {
    const { userId } = req.params;

    // Mock saved payment methods
    const savedMethods = [
        {
            id: '1',
            type: 'card',
            last4: '4242',
            brand: 'visa',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true
        },
        {
            id: '2',
            type: 'upi',
            vpa: 'user@paytm',
            isDefault: false
        }
    ];

    res.json({ paymentMethods: savedMethods });
});

// Get payment history
router.get('/history/:userId', (req, res) => {
    const { userId } = req.params;

    const userPayments = payments.filter(p => {
        const order = orders.find(o => o.id === p.orderId);
        return order && order.userId === userId;
    });

    res.json({ payments: userPayments });
});

module.exports = router;
