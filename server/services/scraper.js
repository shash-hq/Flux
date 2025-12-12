const axios = require('axios');
const Technology = require('../models/Technology');
const { calculateTrend } = require('./forecasting');
const Sentiment = require('sentiment');
const sentimentAnalyzer = new Sentiment();

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

        const articles = response.data.articles || [];

        // 1. Calculate Hype Score
        let hypeScore = response.data.totalResults;
        // Normalize: Cap at 500 articles = 100 score
        if (hypeScore > 500) hypeScore = 100;
        else hypeScore = Math.floor((hypeScore / 500) * 100);
        if (hypeScore < 10) hypeScore = 10 + Math.floor(Math.random() * 10);

        // 2. Calculate Sentiment
        let totalSentiment = 0;
        let count = 0;

        // Analyze first 50 headlines for efficiency
        articles.slice(0, 50).forEach(article => {
            const text = `${article.title} ${article.description || ''}`;
            const result = sentimentAnalyzer.analyze(text);
            totalSentiment += result.score;
            count++;
        });

        const avgSentiment = count > 0 ? (totalSentiment / count) : 0;
        let sentimentLabel = 'Neutral';
        if (avgSentiment > 0.5) sentimentLabel = 'Positive';
        if (avgSentiment < -0.5) sentimentLabel = 'Negative';

        // 3. Extract Top News
        const topNews = articles.slice(0, 5).map(article => ({
            title: article.title,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt
        }));

        return {
            name: techName,
            hypeScore: hypeScore,
            sentiment: {
                score: avgSentiment.toFixed(2),
                label: sentimentLabel
            },
            news: topNews,
            timestamp: new Date()
        };
    } catch (error) {
        console.error(`Error fetching data for ${techName}:`, error.message);
        // Fallback
        return {
            name: techName,
            hypeScore: Math.floor(Math.random() * 100),
            sentiment: { score: 0, label: 'Unknown' },
            news: [],
            timestamp: new Date()
        };
    }
};

const scrapeTrends = async () => {
    try {
        console.log('Starting scrape job via NewsAPI...');

        const techList = ['Rust', 'AI', 'Web3', 'React', 'Svelte', 'SolidJS', 'Kubernetes'];

        for (const techName of techList) {
            const { hypeScore, sentiment, news, timestamp } = await scrapeTechnologyData(techName);

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
            tech.sentiment = sentiment;
            tech.news = news;
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

module.exports = { scrapeTrends, scrapeTechnologyData };
