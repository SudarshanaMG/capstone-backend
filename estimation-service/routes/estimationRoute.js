const express = require('express');
const router = express.Router();
const controller = require('../controller/estimationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/calculate/:inputId', controller.calculateCost);
router.get('/', controller.getAllEstimates);
router.get('/:inputId', controller.getCostEstimate);

module.exports = router;
