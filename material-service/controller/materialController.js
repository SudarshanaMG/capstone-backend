const materialEstimatorService = require('../service/materialService');

exports.calculateMaterialCost = async (req, res) => {
  try {
    const { inputId, quality, materialId } = req.body;
    const result = await materialEstimatorService.calculateMaterialCost(req, inputId, quality, materialId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getEstimate = async (req, res) => {
  try {
    const { inputId } = req.params;
    const estimate = await materialEstimatorService.getEstimateByInputId(inputId);
    res.json(estimate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
