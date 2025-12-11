const axios = require('axios');
const Technology = require('../models/Technology');
const { calculateTrend } = require('./forecasting');

const scrapeTechnologyData = async (techName) => {
    try {
        console.log(`Fetching real data for: ${techName}`);

        // Calculate date range (last 24 hours) for relevancy
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0];

        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: techName,
                from: dateStr,
                sortBy: 'publishedAt',
                language: 'en',
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Use total result count as a proxy for "Hype Score"
        // Normalize: Cap at 100 for dashboard consistency (or use log scale in future)
        let hypeScore = response.data.totalResults;

        // Simple normalization logic: >500 articles = 100 score
        if (hypeScore > 500) hypeScore = 100;
        else hypeScore = Math.floor((hypeScore / 500) * 100);

        // Ensure minimum visibility
        if (hypeScore < 10) hypeScore = 10 + Math.floor(Math.random() * 10);

        return {
            name: techName,
            hypeScore: hypeScore,
            timestamp: new Date()
        };
    } catch (error) {
        console.error(`Error fetching data for ${techName}:`, error.message);
        // Fallback to random if API fails (e.g., rate limit)
        return {
            name: techName,
            hypeScore: Math.floor(Math.random() * 100),
            timestamp: new Date()
        };
    }
};

const scrapeTrends = async () => {
    try {
        console.log('Starting scrape job via NewsAPI...');

        const techList = ['Rust', 'AI', 'Web3', 'React', 'Svelte', 'SolidJS', 'Kubernetes'];

        for (const techName of techList) {
            const { hypeScore, timestamp } = await scrapeTechnologyData(techName);

            // Find or Create
            let tech = await Technology.findOne({ name: techName });
            if (!tech) {
                tech = new Technology({ name: techName, history: [] });
            }

            // Update History (Limit history to 50 entries to keep it clean)
            tech.history.push({ score: hypeScore, timestamp });
            if (tech.history.length > 50) tech.history.shift();

            // Update Current Stats
            tech.hypeScore = hypeScore;
            tech.status = calculateTrend(tech.history);
            tech.lastUpdated = new Date();

            await tech.save();
            console.log(`Updated ${techName}: Score ${hypeScore}, Status ${tech.status}`);
        }
        console.log('Scrape job completed.');
        return true;
    } catch (error) {
        console.error('Error in scraper:', error);
        return false;
    }
};

module.exports = { scrapeTrends };
