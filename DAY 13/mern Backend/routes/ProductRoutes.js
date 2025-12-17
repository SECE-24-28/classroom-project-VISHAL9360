const express = require('express');
const router = express.Router();
const {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
} = require('../controllers/ProductController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route for getting all plans and creating a new plan
router.route('/')
    .get(getPlans)
    .post(protect, authorize('admin'), createPlan);

// Route for updating and deleting a plan by ID
router.route('/:id')
    .put(protect, authorize('admin'), updatePlan)
    .delete(protect, authorize('admin'), deletePlan);

module.exports = router;
