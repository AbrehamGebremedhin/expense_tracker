const express = require('express');
const {
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenses');

const Expense = require('../models/Expense');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Expense, [{
        path: 'paymentMethod',
        select: 'name'
    },{
      path: 'category',
      select: 'name'
    }]),
    getExpenses
  )
  .post(protect, addExpense);

router
  .route('/:id')
  .get(getExpense)
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;