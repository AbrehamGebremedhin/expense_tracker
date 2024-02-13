const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:  { type: String },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Define Category model
module.exports = mongoose.model('Category', CategorySchema);