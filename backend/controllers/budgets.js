const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Budget = require('../models/Budget');
const Category = require('../models/Category');

// @desc      Get all budgets
// @route     GET /api/v1/budgets   
// Get budgets
exports.getBudgets = asyncHandler( async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

exports.getBudget = asyncHandler(async (req, res, next) => {
    const budget = await Budget.findById(req.params.id).populate({
        path: 'category',
        select: 'name'
    });

    if (!budget) {
        return next(new ErrorResponse(`budget not found using ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: budget
    });
});

//Add budget
exports.addBudget = asyncHandler( async(req, res, next) => {
    req.body.user = req.user.id;
    const category = await Category.findOne({name: req.body.category});

    req.body.category = category._id

    const budget = await Budget.create(req.body);

    res.status(200).json({
        success: true,
        data: budget
    })
});

//Update budget
exports.updateBudget = asyncHandler( async(req, res, next) => {   
    let budget = await Budget.findById(req.params.id);
    const category = await Category.findOne({name: req.body.category});

    req.body.category = category._id

    if(!budget){
        return next(new ErrorResponse(`No budget found with this id: ${req.params.id}`, 404));
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: budget
    })
});

//Delete budget
exports.deleteBudget = asyncHandler( async(req, res, next) => {   
    const budget = await Budget.findById(req.params.id);

    if(!budget){
        return next(new ErrorResponse(`No budget found with this id: ${req.params.id}`, 404));
    }
    
    await budget.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    })
});