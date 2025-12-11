require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const apiRoutes = require('./routes/api');
const { scrapeTrends } = require('./services/scraper');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flux';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    // Initial scrape on startup
    scrapeTrends();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use('/api', apiRoutes);

// Scheduler: Run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running scheduled scrape...');
  scrapeTrends();
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
