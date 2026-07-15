const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
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
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  temperature: Number,
  pulse: Number,
  respiratoryRate: Number,
  oxygenSaturation: Number,
  weight: Number,
  height: Number,
  notes: String,
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('VitalSigns', vitalSignsSchema);
