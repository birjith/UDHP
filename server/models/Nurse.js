const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  department: String,
  assignedPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],
  shift: {
    type: String,
    enum: ['morning', 'afternoon', 'night'],
    required: true,
  },
  qualifications: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Nurse', nurseSchema);
