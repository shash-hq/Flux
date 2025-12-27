const { getRedis } = require('../services/socket');
const { addTrendJob } = require('./processor');
const axios = require('axios');

// Placeholder for real NewsAPI/GDELT integration
// In a real scenario, this would poll the API every few minutes
const ingestData = async () => {
    try {
        const redisPublisher = getRedis();

        // Simulating fetching new data
        const mockTrend = {
            id: new Date().getTime(),
            title: "Real-time Update: AI Breakthrough in " + new Date().toLocaleTimeString(),
            description: "A new development in artificial intelligence has been reported...",
            source: "Reuters",
            timestamp: new Date(),
            hypeStage: "Innovation Trigger", // Default/Calculated
            sentiment: 0.8 // Default/Calculated
        };

        // Add to AI Processing Queue
        await addTrendJob(mockTrend);
        // await redisPublisher.publish('TREND_UPDATES', JSON.stringify(mockTrend)); // OLD: Direct publish

    } catch (error) {
        console.error("[Ingestion] Error:", error);
    }
};

const startIngestionWorker = () => {
    // Run every 30 seconds for demo purposes
    setInterval(ingestData, 30000);
    console.log("Ingestion Worker started (30s interval)");
};

module.exports = { startIngestionWorker };
