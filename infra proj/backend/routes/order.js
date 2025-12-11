const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock orders store
let orders = [];

// Create order
router.post('/', async (req, res) => {
    try {
        const {
            userId,
            items,
            shippingAddress,
            billingAddress,
            paymentMethod,
            subtotal,
            shippingCost,
            tax,
            discount,
            total
        } = req.body;

        const order = {
            id: `ORD${Date.now()}`,
            userId,
            items: items.map(item => ({
                productId: item.id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            paymentMethod,
            pricing: {
                subtotal,
                shippingCost,
                tax,
                discount,
                total
            },
            status: 'pending',
            paymentStatus: 'pending',
            trackingNumber: null,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            statusHistory: [
                {
                    status: 'pending',
                    timestamp: new Date().toISOString(),
                    message: 'Order placed successfully'
                }
            ]
        };

        orders.push(order);

        res.status(201).json({
            message: 'Order created successfully',
            order
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get user orders
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const { status, limit = 20, offset = 0 } = req.query;

    let userOrders = orders.filter(o => o.userId === userId);

    if (status) {
        userOrders = userOrders.filter(o => o.status === status);
    }

    const paginatedOrders = userOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
        orders: paginatedOrders,
        total: userOrders.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
    });
});

// Get order by ID
router.get('/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
});

// Update order status
router.patch('/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status, message } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();
    order.statusHistory.push({
        status,
        timestamp: new Date().toISOString(),
        message: message || `Order ${status}`
    });

    // Set tracking number for shipped orders
    if (status === 'shipped' && !order.trackingNumber) {
        order.trackingNumber = `TRK${Date.now()}`;
    }

    res.json({
        message: 'Order status updated',
        order
    });
});

// Cancel order
router.post('/:orderId/cancel', (req, res) => {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    if (!['pending', 'confirmed'].includes(order.status)) {
        return res.status(400).json({ error: 'Order cannot be cancelled' });
    }

    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();
    order.statusHistory.push({
        status: 'cancelled',
        timestamp: new Date().toISOString(),
        message: reason || 'Cancelled by user'
    });

    res.json({
        message: 'Order cancelled successfully',
        order
    });
});

// Return order
router.post('/:orderId/return', (req, res) => {
    const { orderId } = req.params;
    const { items, reason } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'delivered') {
        return res.status(400).json({ error: 'Only delivered orders can be returned' });
    }

    const returnRequest = {
        id: `RET${Date.now()}`,
        orderId,
        items,
        reason,
        status: 'requested',
        createdAt: new Date().toISOString()
    };

    order.returnRequest = returnRequest;
    order.updatedAt = new Date().toISOString();

    res.json({
        message: 'Return request submitted',
        returnRequest
    });
});

// Track order
router.get('/:orderId/track', (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
        orderId: order.id,
        status: order.status,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        statusHistory: order.statusHistory
    });
});

module.exports = router;
