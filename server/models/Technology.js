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
    sentiment: {
        score: { type: Number, default: 0 },
        label: { type: String, default: 'Neutral' } // Positive, Negative, Neutral
    },
    news: [{
        title: String,
        url: String,
        source: String,
        publishedAt: Date
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Technology', TechnologySchema);
