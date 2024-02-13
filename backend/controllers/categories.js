const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');
// @desc      Get all courses
// @route     GET /api/v1/courses   
// Get courses
exports.getCategories = asyncHandler( async(req, res, next) => {
    const categories = await Category.find({user: req.user.id});
        
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    }) 
});

//Add Category
exports.addCategory = asyncHandler( async(req, res, next) => {
    req.body.user = req.user.id;

    const category = await Category.create(req.body);

    res.status(200).json({
        success: true,
        data: category
    })
});

//Update category
exports.updateCategory = asyncHandler( async(req, res, next) => {   
    let category = await Category.findById(req.params.id);

    if(!category){
        return next(new ErrorResponse(`No category found with this id: ${req.params.id}`, 404));
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: category
    })
});

//Delete category
exports.deleteCategory = asyncHandler( async(req, res, next) => {   
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new ErrorResponse(`No category found with this id: ${req.params.id}`, 404));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    })
});