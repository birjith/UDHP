const mongoose = require('mongoose');

const phcDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['primary', 'secondary', 'tertiary'],
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phone: String,
  email: String,
  totalBeds: Number,
  totalDoctors: Number,
  totalNurses: Number,
  totalPatients: Number,
  operatingHours: {
    start: String,
    end: String,
  },
  departments: [String],
  services: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PhcDetails', phcDetailsSchema);
