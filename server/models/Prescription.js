const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
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
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
    },
  ],
  diagnosis: String,
  followUpDate: Date,
  notes: String,
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
