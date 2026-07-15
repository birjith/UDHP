const express = require('express');
const {
  updateProfile,
  getProfile,
  getMedicalHistory,
  getPrescriptions,
  getLabReports,
  getAppointments,
  bookAppointment,
  cancelAppointment,
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('patient'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/medical-history', getMedicalHistory);
router.get('/prescriptions', getPrescriptions);
router.get('/lab-reports', getLabReports);
router.get('/appointments', getAppointments);
router.post('/appointments', bookAppointment);
router.put('/appointments/:appointmentId/cancel', cancelAppointment);

module.exports = router;
