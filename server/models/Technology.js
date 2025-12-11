const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hypeScore: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['Booming', 'Stable', 'Fading', 'Unknown'],
        default: 'Unknown'
    },
    history: [{
        score: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Technology', TechnologySchema);
