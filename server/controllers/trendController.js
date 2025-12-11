const Technology = require('../models/Technology');
const { scrapeTrends } = require('../services/scraper');

const getTrends = async (req, res) => {
    try {
        const trends = await Technology.find().sort({ hypeScore: -1 });
        res.json(trends);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const refreshTrends = async (req, res) => {
    try {
        await scrapeTrends();
        const trends = await Technology.find().sort({ hypeScore: -1 });
        res.json({ message: 'Scrape completed', data: trends });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTrends, refreshTrends };
