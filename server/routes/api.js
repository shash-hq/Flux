const express = require('express');
const router = express.Router();
const { getTrends, refreshTrends } = require('../controllers/trendController');

router.get('/trends', getTrends);
router.post('/refresh', refreshTrends);
router.post('/analyze', require('../controllers/trendController').analyzeTechnology);

module.exports = router;
