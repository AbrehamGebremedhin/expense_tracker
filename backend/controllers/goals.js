const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Goal = require('../models/Goal');

// @desc      Get all goals
// @route     GET /api/v1/goals   
// Get goals
exports.getGoals = asyncHandler( async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

exports.getGoal = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        return next(new ErrorResponse(`Goal not found using ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: goal
    });
});

//Add goal
exports.addGoal = asyncHandler( async(req, res, next) => {
    req.body.user = req.user.id;

    const goal = await Goal.create(req.body);

    res.status(200).json({
        success: true,
        data: goal
    })
});

//Update goal
exports.updateGoal = asyncHandler( async(req, res, next) => {   
    let goal = await Goal.findById(req.params.id);

    if(!goal){
        return next(new ErrorResponse(`No goal found with this id: ${req.params.id}`, 404));
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: goal
    })
});

//Delete goal
exports.deleteGoal = asyncHandler( async(req, res, next) => {   
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        return next(new ErrorResponse(`No goal found with this id: ${req.params.id}`, 404));
    }

    await goal.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    })
});