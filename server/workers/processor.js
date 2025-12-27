const { Worker, Queue } = require('bullmq');
const { analyzeTrend } = require('../services/ai');
const { getRedis } = require('../services/socket');
const Trend = require('../models/Trend');

const trendQueue = new Queue('trend-analysis', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

const startProcessor = () => {
    const worker = new Worker('trend-analysis', async (job) => {
        console.log(`[Processor] Processing job ${job.id}: ${job.data.title}`);

        // 1. Run AI Analysis
        const analysis = await analyzeTrend(job.data.description || job.data.title);

        // 2. Merge Data
        const enrichedTrend = {
            ...job.data,
            ...analysis,
            processedAt: new Date()
        };

        // 3. Save to DB (Optional)
        // await Trend.create(enrichedTrend);

        // 4. Publish "Analyzed" event to Frontend via Redis -> Socket.io
        const redisPublisher = getRedis();
        await redisPublisher.publish('TREND_UPDATES', JSON.stringify(enrichedTrend));

        console.log(`[Processor] Completed job ${job.id}. Hype Stage: ${analysis.hype_stage}`);

    }, {
        connection: {
            host: 'localhost',
            port: 6379
        }
    });

    worker.on('completed', job => {
        console.log(`[Processor] Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`[Processor] Job ${job.id} has failed with ${err.message}`);
    });

    console.log("AI Processor Worker started");
    return trendQueue;
};

// Helper to add jobs
const addTrendJob = async (data) => {
    await trendQueue.add('analyze', data);
    console.log(`[Queue] Added job for: ${data.title}`);
};

module.exports = { startProcessor, addTrendJob };
