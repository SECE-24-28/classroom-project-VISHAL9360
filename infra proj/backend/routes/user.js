const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock user store
let users = [];

// Get user profile
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
});


// Update profile
router.patch('/:userId', (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Don't allow password update through this route
    delete updates.password;
    delete updates.id;

    Object.assign(user, updates);
    user.updatedAt = new Date().toISOString();

    const { password, ...userWithoutPassword } = user;
    res.json({
        message: 'Profile updated successfully',
        user: userWithoutPassword
    });
});

// Add address
router.post('/:userId/addresses', (req, res) => {
    const { userId } = req.params;
    const addressData = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const address = {
        id: uuidv4(),
        ...addressData,
        createdAt: new Date().toISOString()
    };

    if (!user.addresses) {
        user.addresses = [];
    }

    // If first address or set as default
    if (user.addresses.length === 0 || addressData.isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
        address.isDefault = true;
    }

    user.addresses.push(address);

    res.status(201).json({
        message: 'Address added successfully',
        address
    });
});

// Update address
router.patch('/:userId/addresses/:addressId', (req, res) => {
    const { userId, addressId } = req.params;
    const updates = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const address = user.addresses?.find(a => a.id === addressId);
    if (!address) {
        return res.status(404).json({ error: 'Address not found' });
    }

    if (updates.isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
    }

    Object.assign(address, updates);

    res.json({
        message: 'Address updated successfully',
        address
    });
});

// Delete address
router.delete('/:userId/addresses/:addressId', (req, res) => {
    const { userId, addressId } = req.params;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.addresses = user.addresses?.filter(a => a.id !== addressId) || [];

    res.json({ message: 'Address deleted successfully' });
});

// Get addresses
router.get('/:userId/addresses', (req, res) => {
    const { userId } = req.params;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ addresses: user.addresses || [] });
});

// Add payment method
router.post('/:userId/payment-methods', (req, res) => {
    const { userId } = req.params;
    const method = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const paymentMethod = {
        id: uuidv4(),
        ...method,
        createdAt: new Date().toISOString()
    };

    if (!user.savedPaymentMethods) {
        user.savedPaymentMethods = [];
    }

    if (user.savedPaymentMethods.length === 0 || method.isDefault) {
        user.savedPaymentMethods.forEach(pm => pm.isDefault = false);
        paymentMethod.isDefault = true;
    }

    user.savedPaymentMethods.push(paymentMethod);

    res.status(201).json({
        message: 'Payment method added successfully',
        paymentMethod
    });
});

// Get payment methods
router.get('/:userId/payment-methods', (req, res) => {
    const { userId } = req.params;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ paymentMethods: user.savedPaymentMethods || [] });
});

// Delete payment method
router.delete('/:userId/payment-methods/:methodId', (req, res) => {
    const { userId, methodId } = req.params;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.savedPaymentMethods = user.savedPaymentMethods?.filter(pm => pm.id !== methodId) || [];

    res.json({ message: 'Payment method deleted successfully' });
});

module.exports = router;
