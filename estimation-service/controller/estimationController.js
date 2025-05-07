const costEstimateService = require('../service/estimationService');

exports.calculateCost = async (req, res) => {
  try {
    // console.log(req.header('Authorization'));
    // console.log(req.params.inputId);
    const estimate = await costEstimateService.calculateCost(req);
    res.json(estimate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEstimates = async (req, res) => {
  try {
    const estimates = await costEstimateService.getAllEstimates();
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCostEstimate = async (req, res) => {
  try {
    const estimate = await costEstimateService.getCostEstimate(req.params.inputId);
    if (estimate) {
      res.json(estimate);
    } else {
      res.status(404).json({ message: 'Estimate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
