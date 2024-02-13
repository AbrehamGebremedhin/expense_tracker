const mongoose = require('mongoose')

const BudgetSchema = new  mongoose.Schema({
    limit:{type:Number,required:true},
    startDate: {
        type: Date,
        required: [true, "Please add a start date"]
    },
    endDate: {
        type: Date,
        required: [true, "Please add an end date"]
    },
    category:{
        type: mongoose.Schema.ObjectId, 
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    spent: { type : Number , default : 0 }
});

module.exports = mongoose.model('Budget', BudgetSchema);