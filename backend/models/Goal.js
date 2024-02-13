const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    current: { 
        type: Number,
        default: 0
    },
    goal: {
        type: Number,
        required: true
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
});

module.exports = mongoose.model('Goal', GoalSchema)