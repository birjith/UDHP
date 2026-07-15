const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  testName: {
    type: String,
    required: true,
  },
  testCode: String,
  testDate: {
    type: Date,
    required: true,
  },
  resultDate: Date,
  status: {
    type: String,
    enum: ['ordered', 'pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  results: {
    type: Map,
    of: String,
  },
  normalRange: {
    type: Map,
    of: String,
  },
  fileUrl: String,
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

module.exports = mongoose.model('LabReport', labReportSchema);
