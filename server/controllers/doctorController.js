const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');

// Get Doctor Profile
exports.getProfile = async (req, res) => {
  try {
    console.log('GET /api/doctor/profile - req.user =', req.user);
    console.log('GET /api/doctor/profile - Authorization header =', req.headers.authorization || 'none');

    let doctor = await Doctor.findOne({ userId: req.user.id }).populate('userId');

    // If no doctor record exists but the user has 'doctor' role, create a minimal one
    if (!doctor) {
      console.warn(`No Doctor profile for user id ${req.user && req.user.id}. Attempting auto-create.`);

      if (req.user && req.user.role === 'doctor') {
        const license = `AUTO-${Date.now()}`;
        try {
          const created = await Doctor.create({
            userId: req.user.id,
            specialization: 'General Medicine',
            licenseNumber: license,
            experience: 1,
            department: 'General',
            consultationFee: 0,
            qualifications: [],
            attendanceRecords: [],
          });

          doctor = await Doctor.findById(created._id).populate('userId');
          console.log(`Auto-created doctor profile for user ${req.user.id}`);
        } catch (createErr) {
          console.error('Failed to auto-create doctor profile:', createErr && createErr.message ? createErr.message : createErr);
          return res.status(500).json({ success: false, message: 'Failed to create doctor profile' });
        }
      } else {
        console.error(`Doctor profile not found for user id: ${req.user && req.user.id}`);
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
      }
    }

    // Build a minimal, consistent response shape
    const docUser = doctor.userId || {};
    const doctorResp = {
      _id: doctor._id,
      name: `${docUser.firstName || ''} ${docUser.lastName || ''}`.trim(),
      email: docUser.email || '',
      specialization: doctor.specialization || '',
      hospitalId: doctor.hospitalId || doctor.hospital || null,
      phone: docUser.phone || '',
      profileImage: doctor.profileImage || docUser.profileImage || '',
    };

    res.status(200).json({
      success: true,
      doctor: doctorResp,
    });
  } catch (error) {
    console.error('Error loading doctor profile:', error && error.message ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Server error while loading doctor profile',
    });
  }
};

// Update Doctor Profile
exports.updateProfile = async (req, res) => {
  try {
    const { specialization, experience, availability, department, consultationFee, qualifications } = req.body;

    let doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found',
      });
    }

    if (specialization) doctor.specialization = specialization;
    if (experience) doctor.experience = experience;
    if (availability) doctor.availability = availability;
    if (department) doctor.department = department;
    if (consultationFee) doctor.consultationFee = consultationFee;
    if (qualifications) doctor.qualifications = qualifications;
    doctor.updatedAt = Date.now();

    await doctor.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Patient by ID
exports.searchPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).populate('userId', 'firstName lastName email phone');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
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

// Get Patient Medical History
exports.getPatientMedicalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

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

// Add Diagnosis and Treatment Notes
exports.addDiagnosisAndTreatment = async (req, res) => {
  try {
    const { appointmentId, diagnosis, consultationNotes } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    appointment.diagnosis = diagnosis;
    appointment.consultationNotes = consultationNotes;
    appointment.status = 'completed';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Diagnosis and notes added successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate Prescription
exports.generatePrescription = async (req, res) => {
  try {
    const { patientId, appointmentId, medicines, diagnosis, followUpDate, notes } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const prescription = await Prescription.create({
      patientId,
      doctorId: doctor._id,
      appointmentId,
      medicines,
      diagnosis,
      followUpDate,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Prescription generated successfully',
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Order Lab Test
exports.orderLabTest = async (req, res) => {
  try {
    const { patientId, appointmentId, testName, testCode, testDate } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const labReport = await LabReport.create({
      patientId,
      doctorId: doctor._id,
      appointmentId,
      testName,
      testCode,
      testDate,
      status: 'ordered',
    });

    res.status(201).json({
      success: true,
      message: 'Lab test ordered successfully',
      labReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Record Login Time
exports.recordLoginTime = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const today = new Date().toDateString();
    let attendance = doctor.attendanceRecords.find((record) => new Date(record.date).toDateString() === today);

    if (!attendance) {
      doctor.attendanceRecords.push({
        date: new Date(),
        loginTime: new Date(),
        status: 'present',
      });
    } else {
      attendance.loginTime = new Date();
      attendance.status = 'present';
    }

    await doctor.save();

    res.status(200).json({
      success: true,
      message: 'Login time recorded',
      doctor,
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
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'firstName lastName email phone' } })
      .sort({ appointmentDate: -1 });

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

// Get Patients for Doctor
exports.getPatients = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'firstName lastName email phone' } })
      .sort({ appointmentDate: -1 });

    const patientMap = new Map();

    appointments.forEach((appointment) => {
      const patient = appointment.patientId;
      if (!patient || !patient.userId) return;

      const patientId = patient._id.toString();
      const existing = patientMap.get(patientId);
      const lastVisit = existing?.lastVisit && existing.lastVisit > appointment.appointmentDate
        ? existing.lastVisit
        : appointment.appointmentDate;

      patientMap.set(patientId, {
        id: patientId,
        name: `${patient.userId.firstName} ${patient.userId.lastName}`,
        age: patient.dateOfBirth ? Math.max(0, new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()) : 'N/A',
        gender: patient.gender || 'N/A',
        bloodGroup: patient.bloodGroup || 'N/A',
        disease: patient.chronicDiseases?.[0] || appointment.reason || 'General Checkup',
        lastVisit,
        status: appointment.status || 'scheduled',
        contact: patient.userId.phone || '',
        email: patient.userId.email || '',
        medicalHistory: patient.medicalHistory || [],
      });
    });

    res.status(200).json({
      success: true,
      patients: Array.from(patientMap.values()),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Doctor Messages
exports.getMessages = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id }).populate('userId', 'firstName lastName email');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const conversations = [
      {
        id: 'conv-1',
        patient: {
          name: 'Ayesha Khan',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
          online: true,
        },
        lastMessage: 'I am ready for the appointment today.',
        unread: 2,
        messages: [
          {
            id: 'm1',
            from: 'patient',
            content: 'Hello Doctor, I have chest discomfort since morning.',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
          },
          {
            id: 'm2',
            from: 'doctor',
            content: 'Please arrive 15 minutes early and bring your previous reports.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
          },
          {
            id: 'm3',
            from: 'patient',
            content: 'Sure, thank you.',
            timestamp: new Date(Date.now() - 1000 * 60 * 12),
          },
        ],
      },
      {
        id: 'conv-2',
        patient: {
          name: 'Raj Patel',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
          online: false,
        },
        lastMessage: 'The pain reduced after the medication.',
        unread: 0,
        messages: [
          {
            id: 'm4',
            from: 'patient',
            content: 'Doctor, the chest pain is much better now.',
            timestamp: new Date(Date.now() - 1000 * 60 * 90),
          },
          {
            id: 'm5',
            from: 'doctor',
            content: 'Great to hear. Continue the medication and follow up in 7 days.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
          },
        ],
      },
    ];

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Lab Reports
exports.getReports = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const reports = await LabReport.find({ doctorId: doctor._id })
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'firstName lastName email' } })
      .sort({ testDate: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    const appointment = await Appointment.findOne({ _id: appointmentId, doctorId: doctor._id });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    if (['scheduled', 'completed', 'cancelled', 'no-show'].includes(status)) {
      appointment.status = status;
      await appointment.save();
      return res.status(200).json({
        success: true,
        appointment,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Invalid appointment status',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
