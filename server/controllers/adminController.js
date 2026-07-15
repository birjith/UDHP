const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Nurse = require('../models/Nurse');
const PhcDetails = require('../models/PhcDetails');
const Appointment = require('../models/Appointment');

// Get Dashboard Analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalNurses = await Nurse.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const scheduledAppointments = await Appointment.countDocuments({ status: 'scheduled' });

    res.status(200).json({
      success: true,
      analytics: {
        totalPatients,
        totalDoctors,
        totalNurses,
        totalAppointments,
        completedAppointments,
        scheduledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Doctor
exports.addDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, specialization, licenseNumber, experience, department, consultationFee, qualifications } = req.body;

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'doctor',
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      licenseNumber,
      experience,
      department,
      consultationFee,
      qualifications,
    });

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { specialization, experience, department, consultationFee, qualifications } = req.body;

    let doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    if (specialization) doctor.specialization = specialization;
    if (experience) doctor.experience = experience;
    if (department) doctor.department = department;
    if (consultationFee) doctor.consultationFee = consultationFee;
    if (qualifications) doctor.qualifications = qualifications;
    doctor.updatedAt = Date.now();

    await doctor.save();

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    await User.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Nurse
exports.addNurse = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, licenseNumber, experience, department, shift, qualifications } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'nurse',
    });

    const nurse = await Nurse.create({
      userId: user._id,
      licenseNumber,
      experience,
      department,
      shift,
      qualifications,
    });

    res.status(201).json({
      success: true,
      message: 'Nurse added successfully',
      nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Nurse
exports.updateNurse = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { experience, department, shift, qualifications, assignedPatients } = req.body;

    let nurse = await Nurse.findById(nurseId);

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    if (experience) nurse.experience = experience;
    if (department) nurse.department = department;
    if (shift) nurse.shift = shift;
    if (qualifications) nurse.qualifications = qualifications;
    if (assignedPatients) nurse.assignedPatients = assignedPatients;
    nurse.updatedAt = Date.now();

    await nurse.save();

    res.status(200).json({
      success: true,
      message: 'Nurse updated successfully',
      nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Nurse
exports.deleteNurse = async (req, res) => {
  try {
    const { nurseId } = req.params;

    const nurse = await Nurse.findById(nurseId);

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: 'Nurse not found',
      });
    }

    await User.findByIdAndDelete(nurse.userId);
    await Nurse.findByIdAndDelete(nurseId);

    res.status(200).json({
      success: true,
      message: 'Nurse deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Patient
exports.addPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, dateOfBirth, gender, bloodGroup, address, emergencyContact, knownAllergies, chronicDiseases } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'patient',
    });

    const patient = await Patient.create({
      userId: user._id,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      emergencyContact,
      knownAllergies,
      chronicDiseases,
    });

    res.status(201).json({
      success: true,
      message: 'Patient added successfully',
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Patient
exports.updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { bloodGroup, address, emergencyContact, knownAllergies, chronicDiseases } = req.body;

    let patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    if (bloodGroup) patient.bloodGroup = bloodGroup;
    if (address) patient.address = address;
    if (emergencyContact) patient.emergencyContact = emergencyContact;
    if (knownAllergies) patient.knownAllergies = knownAllergies;
    if (chronicDiseases) patient.chronicDiseases = chronicDiseases;
    patient.updatedAt = Date.now();

    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    await User.findByIdAndDelete(patient.userId);
    await Patient.findByIdAndDelete(patientId);

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Monitor Doctor Attendance
exports.getDoctorAttendance = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'firstName lastName email');

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Manage PHC Details
exports.getPhcDetails = async (req, res) => {
  try {
    const phcDetails = await PhcDetails.findOne();

    res.status(200).json({
      success: true,
      phcDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update PHC Details
exports.updatePhcDetails = async (req, res) => {
  try {
    const { name, registrationNumber, type, address, phone, email, totalBeds, totalDoctors, totalNurses, operatingHours, departments, services } = req.body;

    let phcDetails = await PhcDetails.findOne();

    if (!phcDetails) {
      phcDetails = await PhcDetails.create({
        name,
        registrationNumber,
        type,
        address,
        phone,
        email,
        totalBeds,
        totalDoctors,
        totalNurses,
        operatingHours,
        departments,
        services,
      });
    } else {
      if (name) phcDetails.name = name;
      if (registrationNumber) phcDetails.registrationNumber = registrationNumber;
      if (type) phcDetails.type = type;
      if (address) phcDetails.address = address;
      if (phone) phcDetails.phone = phone;
      if (email) phcDetails.email = email;
      if (totalBeds) phcDetails.totalBeds = totalBeds;
      if (totalDoctors) phcDetails.totalDoctors = totalDoctors;
      if (totalNurses) phcDetails.totalNurses = totalNurses;
      if (operatingHours) phcDetails.operatingHours = operatingHours;
      if (departments) phcDetails.departments = departments;
      if (services) phcDetails.services = services;
      phcDetails.updatedAt = Date.now();
    }

    await phcDetails.save();

    res.status(200).json({
      success: true,
      message: 'PHC details updated successfully',
      phcDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'firstName lastName email phone');

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Nurses
exports.getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find().populate('userId', 'firstName lastName email phone');

    res.status(200).json({
      success: true,
      nurses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'firstName lastName email phone');

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
