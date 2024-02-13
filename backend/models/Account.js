const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    accountNumber: {
        type: String,
        unique: true,
        required: [true, 'Account number is required']
    },
    balance: {
        type: Number,  
        required: [true, 'Balance is required'],  
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Account', AccountSchema);