const cheerio = require('cheerio');
const Technology = require('../models/Technology');
const { calculateTrend } = require('./forecasting');

// Mock Data Source Generator
// In a real app, we would use axios.get(url) to get html
const getMockHtml = () => {
    const trends = [
        { name: 'Rust', base: 80, var: 10 },
        { name: 'AI', base: 95, var: 5 },
        { name: 'Web3', base: 40, var: 15 },
        { name: 'React', base: 90, var: 5 },
        { name: 'Svelte', base: 60, var: 10 },
        { name: 'SolidJS', base: 50, var: 10 },
        { name: 'Kubernetes', base: 75, var: 8 },
    ];

    let html = '<html><body><div id="news-feed">';
    trends.forEach(t => {
        // Randomize occurrence count somewhat based on base + random variance
        const count = Math.max(10, Math.floor(t.base + (Math.random() * t.var * 2 - t.var)));
        // Add repeated keywords to simulate frequency
        const content = (t.name + ' ').repeat(count);
        html += `<article>${content}</article>`;
    });
    html += '</div></body></html>';
    return html;
};

const scrapeTrends = async () => {
    try {
        console.log('Starting scrape job...');
        const html = getMockHtml();
        const $ = cheerio.load(html);
        const text = $('body').text().toLowerCase();

        const techList = ['Rust', 'AI', 'Web3', 'React', 'Svelte', 'SolidJS', 'Kubernetes'];

        for (const techName of techList) {
            // Regex to count occurrences (whole word)
            const regex = new RegExp(`\\b${techName.toLowerCase()}\\b`, 'g');
            const matches = text.match(regex);
            const score = matches ? matches.length : 0;

            // Find or Create
            let tech = await Technology.findOne({ name: techName });
            if (!tech) {
                tech = new Technology({ name: techName, history: [] });
            }

            // Update History (Limit history to 50 entries to keep it clean)
            tech.history.push({ score, timestamp: new Date() });
            if (tech.history.length > 50) tech.history.shift();

            // Update Current Stats
            tech.hypeScore = score;
            tech.status = calculateTrend(tech.history);
            tech.lastUpdated = new Date();

            await tech.save();
            console.log(`Updated ${techName}: Score ${score}, Status ${tech.status}`);
        }
        console.log('Scrape job completed.');
        return true;
    } catch (error) {
        console.error('Error in scraper:', error);
        return false;
    }
};

module.exports = { scrapeTrends };
