const ss = require('simple-statistics');

const calculateTrend = (history) => {
    if (!history || history.length < 2) {
        return 'Unknown';
    }

    // Use up to last 10 data points for recent trend
    const recentHistory = history.slice(-10);

    // Create [x, y] points where x is simply the index (0, 1, 2...)
    // This gives us the rate of change per update cycle
    const data = recentHistory.map((entry, index) => [index, entry.score]);

    const { m } = ss.linearRegression(data);

    // Define thresholds for status
    // m is "score points per update"
    if (m > 0.5) return 'Booming';
    if (m < -0.5) return 'Fading';
    return 'Stable';
};

module.exports = { calculateTrend };
