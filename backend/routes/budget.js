const express = require('express');
const { 
    getBudgets,
    getBudget,
    addBudget,
    updateBudget,
    deleteBudget,
} = require('../controllers/budgets')

const Budget = require('../models/Budget');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router
  .route('/')
  .get(protect,
    advancedResults(Budget,{
      path: 'category',
      select: 'name'
    }),
    getBudgets
  )
  .post(protect, addBudget);

router
  .route('/:id')
  .get(protect, getBudget)
  .put(protect, updateBudget)
  .delete(protect, deleteBudget);

module.exports = router;