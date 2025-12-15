const express = require('express');
const router = express.Router();
const {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
} = require('../controllers/ProductController');

// Route for getting all plans and creating a new plan
router.route('/')
    .get(getPlans)
    .post(createPlan);

// Route for updating and deleting a plan by ID
router.route('/:id')
    .put(updatePlan)
    .delete(deletePlan);

module.exports = router;
