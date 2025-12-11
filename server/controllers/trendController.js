const Technology = require('../models/Technology');
const { scrapeTrends, scrapeTechnologyData } = require('../services/scraper');

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

const analyzeTechnology = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    try {
        // Check if exists
        let tech = await Technology.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

        if (tech) {
            // If exists but old (> 24 hours), update it? For MVP, just return it.
            // Or force refresh it if user specifically asked.
            // For "Search", let's refresh it to be sure.
            const { hypeScore, timestamp } = await scrapeTechnologyData(tech.name);
            tech.history.push({ score: hypeScore, timestamp });
            if (tech.history.length > 50) tech.history.shift();
            tech.hypeScore = hypeScore;
            // Recalculate trend is complex as it requires history import. 
            // We can just rely on the existing status for now or import forecast.
            // Simpler: Just save and return.
            tech.lastUpdated = new Date();
            await tech.save();
            return res.json(tech);
        }

        // Create New
        const { hypeScore, timestamp } = await scrapeTechnologyData(name);
        const newTech = new Technology({
            name: name, // Maintain case
            hypeScore: hypeScore,
            history: [{ score: hypeScore, timestamp }],
            status: 'Unknown', // Need history for trend
            lastUpdated: new Date()
        });

        await newTech.save();
        res.json(newTech);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTrends, refreshTrends, analyzeTechnology };
