const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  line1: String,
  city: String,
  state: String,
  pincode: String
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'homeowner'], required: true, default: 'homeowner' },
  contactNumber: String,
  address: AddressSchema,
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
