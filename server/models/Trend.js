const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
    title: String,
    description: String,
    source: String,
    timestamp: Date,
    hypeStage: String,
    sentiment: Number,
    summary: String,
    processedAt: Date
});

module.exports = mongoose.model('Trend', TrendSchema);
