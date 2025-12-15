const Plan = require('../models/PlanModel');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = async (req, res) => {
    try {
        if (!req.body.operator || !req.body.planName || !req.body.amount || !req.body.validity || !req.body.data) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }
        const plan = await Plan.create(req.body);
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        await plan.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Plan deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
};
