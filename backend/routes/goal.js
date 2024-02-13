const express = require('express');
const {
    getGoals,
    getGoal,
    addGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/goals');

const Goal = require('../models/Goal');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Goal),
    getGoals)
  .post(protect, addGoal);

router
  .route('/:id')
  .get(getGoal)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;