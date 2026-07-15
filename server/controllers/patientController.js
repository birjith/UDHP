const Patient = require('../models/Patient');
const User = require('../models/User');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');
const Appointment = require('../models/Appointment');

// Update Patient Profile
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, gender, bloodGroup, address, emergencyContact, knownAllergies, chronicDiseases } = req.body;

    let patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      });
    }

    if (dateOfBirth) patient.dateOfBirth = dateOfBirth;
    if (gender) patient.gender = gender;
    if (bloodGroup) patient.bloodGroup = bloodGroup;
    if (address) patient.address = address;
    if (emergencyContact) patient.emergencyContact = emergencyContact;
    if (knownAllergies) patient.knownAllergies = knownAllergies;
    if (chronicDiseases) patient.chronicDiseases = chronicDiseases;
    patient.updatedAt = Date.now();

    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Patient Profile
exports.getProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id }).populate('userId');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Medical History
exports.getMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      success: true,
      medicalHistory: patient.medicalHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const prescriptions = await Prescription.find({ patientId: patient._id }).populate('doctorId').sort({ issuedDate: -1 });

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Lab Reports
exports.getLabReports = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const labReports = await LabReport.find({ patientId: patient._id }).populate('doctorId').sort({ testDate: -1 });

    res.status(200).json({
      success: true,
      labReports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const appointments = await Appointment.find({ patientId: patient._id }).populate('doctorId').sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason, symptoms } = req.body;

    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
      symptoms,
      status: 'scheduled',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment || appointment.patientId.toString() !== patient._id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
