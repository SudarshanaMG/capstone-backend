const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
  length: { type: Number },
  width: { type: Number },
  phoneNumber: { type: Number },
  userEmail: { type: String },
  userName: { type: String },
  city: { type: String },
  state: { type: String },
  constructionType: { type: String },
  totalFloor: { type: Number },
  propertyName: { type: String },
  landclearence: { type: Boolean },
  materialQuality: { type: String },
  contractorId: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Input', InputSchema);
