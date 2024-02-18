const mongoose = require('mongoose');
const Account = require('./Account');
const Budget = require('./Budget');

const ExpenseSchema = new mongoose.Schema({
    date: { type: Date, required: [true, "Please add a date of the expediture"] },
    amount: {type: Number, required: [true, 'Please provide an amount']},
    description:  { type: String },
    category: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    type: {
        type: String,
        enum: ['Income', 'Expenditure'],
        default: 'Expenditure',
        required: [true, 'Please specify if this is Income or Expenditure']
    },
    paymentMethod: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Account',
        required: [true, "Please a payment method"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

ExpenseSchema.pre('save', async function (next) {
    try {
        // Find the budget document for the same category and user
        const budget = await Budget.findOne({ category: this.category, user: this.user });
        const account = await Account.findOne({ _id: this.paymentMethod, user: this.user });

        const currentDate = new Date();

        if (budget && currentDate <= budget.endDate) {
            // Increment the spent field of the budget document
            budget.spent += this.amount;
            await budget.save();
        }

        if (account) {
            // Increment the spent field of the budget document
            this.type  === 'Expenditure' ? account.balance -= this.amount : account.balance += this.amount;
            await account.save();
        }

        next();
    } catch (error) {
        next(error);
    }
});

ExpenseSchema.pre('findOneAndUpdate', async function (next) {
    try {
        // Find the budget document for the same category and user
        const budget = await Budget.findOne({ category: this.category, user: this.user });
        const account = await Account.findOne({ _id: this.paymentMethod, user: this.user });

        const currentDate = new Date();

        if (budget && currentDate <= budget.endDate) {
            // Increment the spent field of the budget document
            budget.spent += this.amount;
            await budget.save();
        }

        if (account) {
            // Increment the spent field of the budget document
            this.type  === 'Expenditure' ? account.balance -= this.amount : account.balance += this.amount;
            await account.save();
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);