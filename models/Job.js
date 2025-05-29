const mongoose = require('mongoose');

const jobschema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
    },
    status: {
        type: String,
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }
})

module.exports = mongoose.model('Job', jobschema);