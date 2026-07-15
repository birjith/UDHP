const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse',
    required: true,
  },
  vaccineName: {
    type: String,
    required: true,
  },
  dosage: String,
  dose: Number,
  vaccinationDate: {
    type: Date,
    required: true,
  },
  expiryDate: Date,
  batchNumber: String,
  manufacturer: String,
  siteOfInjection: String,
  adverseEffects: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
