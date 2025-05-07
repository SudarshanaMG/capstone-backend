// const { EmailValidator } = require('@angular/forms');
const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // validate: {
    //   validator: function(v) {
    //     return EmailValidator(v);
    //   },
    //   message: props => `${props.value} is not a valid email address!`
    // }
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  serviceAreas: {
    type: [String],
    required: true
  },
  rating: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Contractor', contractorSchema);

  