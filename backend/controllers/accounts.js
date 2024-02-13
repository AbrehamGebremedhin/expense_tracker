const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Account = require('../models/Account');

// @desc      Get all accounts
// @route     GET /api/v1/accounts   
// Get accounts
exports.getAccounts = asyncHandler( async(req, res, next) => {
    const accounts = await Account.find({user: req.user.id}).populate({
        path: 'user',
        select: 'username'
    });
        
    res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
    }) 
});

// @desc      Get an account
// @route     GET /api/v1/accounts/:id   
// Get accounts
exports.getAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id).populate({
        path: 'user',
        select: 'username'
    });

    if (!account) {
        return next(new ErrorResponse(`Account not found using ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: account
    });
});

//Add account
exports.addAccount = asyncHandler( async(req, res, next) => {
    req.body.user = req.user.id;

    const account = await Account.create(req.body);

    res.status(200).json({
        success: true,
        data: account
    })
});

//Update account
exports.updateAccount = asyncHandler( async(req, res, next) => {   
    let account = await Account.findById(req.params.id);

    if(!account){
        return next(new ErrorResponse(`No account found with this id: ${req.params.id}`, 404));
    }

    account = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: account
    })
});

//Delete account
exports.deleteAccount = asyncHandler( async(req, res, next) => {   
    const account = await Account.findById(req.params.id);

    if(!account){
        return next(new ErrorResponse(`No account found with this id: ${req.params.id}`, 404));
    }

    await account.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    })
});