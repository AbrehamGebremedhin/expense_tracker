const express = require('express');
const {
    getAccounts,
    getAccount,
    addAccount,
    updateAccount,
    deleteAccount
} = require('../controllers/accounts');

const Account = require('../models/Account');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getAccounts
  )
  .post(protect, addAccount);

router
  .route('/:id')
  .get(getAccount)
  .put(protect, updateAccount)
  .delete(protect, deleteAccount);

module.exports = router;