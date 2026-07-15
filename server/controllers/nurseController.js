const Nurse = require('../models/Nurse');
const Patient = require('../models/Patient');
const User = require('../models/User');
const VitalSigns = require('../models/VitalSigns');
const Vaccination = require('../models/Vaccination');

// Get Nurse Profile
exports.getProfile = async (req, res) => {
  try {
    const nurse = await Nurse.findOne({ userId: req.user.id }).populate('userId').populate('assignedPatients');

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse profile not found',
      });
    }

    res.status(200).json({
      success: true,
      nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Registered Patients for Nurse Uploads
exports.getRegisteredPatients = async (req, res) => {
  try {
    const patientUsers = await User.find({ role: 'patient' }).select('firstName lastName email phone').lean();

    if (!patientUsers.length) {
      return res.status(200).json({ success: true, patients: [] });
    }

    const userIds = patientUsers.map((user) => user._id);
    const existingPatientProfiles = await Patient.find({ userId: { $in: userIds } }).lean();
    const profileMap = new Map(existingPatientProfiles.map((profile) => [profile.userId.toString(), profile]));

    const formattedPatients = [];

    for (const user of patientUsers) {
      let profile = profileMap.get(user._id.toString());

      if (!profile) {
        profile = await Patient.create({
          userId: user._id,
          dateOfBirth: new Date('1970-01-01'),
          gender: 'other',
        });
      }

      const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      const displayId = `PT-${profile._id.toString().slice(-6).toUpperCase()}`;

      formattedPatients.push({
        _id: profile._id,
        id: profile._id.toString(),
        patientId: profile._id.toString(),
        displayId,
        name: fullName || 'Unnamed Patient',
        email: user.email || '',
        phone: user.phone || '',
        gender: profile.gender || '',
        bloodGroup: profile.bloodGroup || '',
      });
    }

    res.status(200).json({
      success: true,
      patients: formattedPatients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Assigned Patients
exports.getAssignedPatients = async (req, res) => {
  try {
    const nurse = await Nurse.findOne({ userId: req.user.id });

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    const patients = await Patient.find({ _id: { $in: nurse.assignedPatients } }).populate('userId', 'firstName lastName email phone');

    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vital Signs
exports.updateVitalSigns = async (req, res) => {
  try {
    const { patientId, bloodPressure, temperature, pulse, respiratoryRate, oxygenSaturation, weight, height, notes } = req.body;

    const nurse = await Nurse.findOne({ userId: req.user.id });

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    const vitalSigns = await VitalSigns.create({
      patientId,
      nurseId: nurse._id,
      bloodPressure,
      temperature,
      pulse,
      respiratoryRate,
      oxygenSaturation,
      weight,
      height,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Vital signs recorded successfully',
      vitalSigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Patient Vital Signs
exports.getPatientVitalSigns = async (req, res) => {
  try {
    const { patientId } = req.params;

    const vitalSigns = await VitalSigns.find({ patientId }).sort({ recordedAt: -1 });

    res.status(200).json({
      success: true,
      vitalSigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vaccination Record
exports.updateVaccinationRecord = async (req, res) => {
  try {
    const { patientId, vaccineName, dosage, dose, vaccinationDate, expiryDate, batchNumber, manufacturer, siteOfInjection, adverseEffects, notes } = req.body;

    const nurse = await Nurse.findOne({ userId: req.user.id });

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    const vaccination = await Vaccination.create({
      patientId,
      nurseId: nurse._id,
      vaccineName,
      dosage,
      dose,
      vaccinationDate,
      expiryDate,
      batchNumber,
      manufacturer,
      siteOfInjection,
      adverseEffects,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Vaccination record updated successfully',
      vaccination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Patient Vaccinations
exports.getPatientVaccinations = async (req, res) => {
  try {
    const { patientId } = req.params;

    const vaccinations = await Vaccination.find({ patientId }).sort({ vaccinationDate: -1 });

    res.status(200).json({
      success: true,
      vaccinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
