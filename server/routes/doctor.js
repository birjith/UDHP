const express = require('express');
const {
  getProfile,
  updateProfile,
  searchPatient,
  getPatientMedicalHistory,
  addDiagnosisAndTreatment,
  generatePrescription,
  orderLabTest,
  recordLoginTime,
  getAppointments,
  getPatients,
  getMessages,
  getReports,
  updateAppointmentStatus,
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('doctor'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/appointments', getAppointments);
router.get('/patients', getPatients);
router.get('/messages', getMessages);
router.get('/reports', getReports);
router.put('/appointments/:appointmentId', updateAppointmentStatus);
router.get('/patient/:patientId', searchPatient);
router.get('/patient/:patientId/medical-history', getPatientMedicalHistory);
router.post('/diagnosis-treatment', addDiagnosisAndTreatment);
router.post('/prescription', generatePrescription);
router.post('/lab-test', orderLabTest);
router.post('/attendance', recordLoginTime);

module.exports = router;
