const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Expense = require('../models/Expense');
const Account = require('../models/Account');
const Category = require('../models/Category');
// @desc      Get all courses
// @route     GET /api/v1/courses   
// Get courses
exports.getExpenses = asyncHandler( async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

exports.getExpense = asyncHandler(async (req, res, next) => {
    const expense = await Expense.findById(req.params.id).populate({
        path: 'paymentMethod',
        select: 'name'
    }).populate({
        path: 'category',
        select: 'name'
    });

    if (!expense) {
        return next(new ErrorResponse(`Expense not found using ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: expense
    });
});

//Add Expense
exports.addExpense = asyncHandler( async(req, res, next) => {
    req.body.user = req.user.id;
    const category = await Category.findOne({name: req.body.category});
    const account = await Account.findOne({name: req.body.paymentMethod});
    
    req.body.paymentMethod = account._id
    req.body.category = category._id

    const expense = await Expense.create(req.body);

    res.status(200).json({
        success: true,
        data: expense
    })
});

//Update expense
exports.updateExpense = asyncHandler( async(req, res, next) => {   
    let expense = await Expense.findById(req.params.id);

    if(!expense){
        return next(new ErrorResponse(`No expense found with this id: ${req.params.id}`, 404));
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: expense
    })
});

//Delete expense
exports.deleteExpense = asyncHandler( async(req, res, next) => {   
    const expense = await Expense.findById(req.params.id);

    if(!expense){
        return next(new ErrorResponse(`No expense found with this id: ${req.params.id}`, 404));
    }

    await expense.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    })
});