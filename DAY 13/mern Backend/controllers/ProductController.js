const Product = require('../models/ProductModel');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
    try {
        const plans = await Product.find();
        res.status(200).json({
            success: true,
            count: plans.length,
            data: plans
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create a new plan
// @route   POST /api/plans
// @access  Public (Should be private/admin in real app)
const createPlan = async (req, res) => {
    try {
        console.log('Controller: Creating Plan with data:', req.body);
        const plan = await Product.create(req.body);
        console.log('Controller: Plan created:', plan);
        res.status(201).json({
            success: true,
            data: plan
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid data',
            error: error.message
        });
    }
};

// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Public (Should be private/admin in real app)
const updatePlan = async (req, res) => {
    try {
        let plan = await Product.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'Plan not found'
            });
        }

        plan = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Update failed',
            error: error.message
        });
    }
};

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Public (Should be private/admin in real app)
const deletePlan = async (req, res) => {
    try {
        const plan = await Product.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'Plan not found'
            });
        }

        await plan.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Plan deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Delete failed',
            error: error.message
        });
    }
};

module.exports = {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
};
