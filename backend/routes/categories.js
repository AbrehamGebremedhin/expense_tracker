const express = require('express');
const { 
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories')

const Category = require('../models/Category');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router
  .route('/')
  .get(protect,
    advancedResults(Category),
    getCategories
  )
  .post(protect, addCategory);

router
  .route('/:id')
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;