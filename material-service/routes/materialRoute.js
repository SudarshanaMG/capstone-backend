const express = require('express');
const router = express.Router();
const materialEstimatorController = require('../controller/materialController');


router.post('/calculate', materialEstimatorController.calculateMaterialCost);
router.get('/estimate/:inputId', materialEstimatorController.getEstimate);

module.exports = router;
