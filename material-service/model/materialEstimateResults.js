// models/MaterialEstimateResult.js
const mongoose = require('mongoose');

const MaterialEstimateResultSchema = new mongoose.Schema({
  inputId: { type: String, required: true, unique: true },
  totalCost: { type: Number, required: true },
  quality: { type: String, enum: ['bsic', 'premium', 'luxury'], required: true },
  projectType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  materials: [
    {
      resourceName: String,
      cost: Number,
      resourceQuantity: Number,
      unitPrice: Number,
    }
  ]
});

module.exports = mongoose.model('MaterialEstimateResult', MaterialEstimateResultSchema);
