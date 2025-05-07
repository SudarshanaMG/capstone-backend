const mongoose = require('mongoose');

// const MaterialSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: String,
//     unit: String,
//     costPerUnit: Number,
//     materialType: { type: String, enum: ['lowCost', 'moderate', 'luxury', 'premium'] },
//     // region: String,
//     available: { type: Boolean, default: true }
//   }, { timestamps: { createdAt: false, updatedAt: true } });

const MaterialSchema = new mongoose.Schema({

  materialId: { type: String, required: true },
  inputId: String,
  resourceName: String,
  resourceQuantity: Number,
  quality: String,
  cost: Number
  }, { timestamps: { createdAt: false, updatedAt: true } });
  
  module.exports = mongoose.model('Material', MaterialSchema);
  