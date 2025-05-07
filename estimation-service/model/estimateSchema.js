const mongoose = require('mongoose');

// const EstimationSchema = new mongoose.Schema({
//     homeownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     contractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' },
//     projectType: { type: String, enum: ['Renovation', 'Interior Design', 'New Construction'], required: true },
//     roomDetails: [{
//       roomType: String,
//       dimensions: {
//         length: Number,
//         width: Number,
//         height: Number
//       }
//     }],
//     selectedMaterials: [String],
//     selectedDesignStyle: String,
//     laborRegion: String,
//     estimatedCost: Number,
//     costBreakdown: {
//       materials: Number,
//       labor: Number,
//       design: Number,
//       miscellaneous: Number
//     },
//     exportLinks: {
//       pdf: String,
//       spreadsheet: String
//     }
//   }, { timestamps: true });

const EstimationSchema = new mongoose.Schema({
    inputId: String,
    builtupArea: Number,
    totalCost: Number
  }, { timestamps: true });
  
  module.exports = mongoose.model('Estimation', EstimationSchema);
  