const express = require('express');
const {
  getDashboardAnalytics,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  addNurse,
  updateNurse,
  deleteNurse,
  addPatient,
  updatePatient,
  deletePatient,
  getDoctorAttendance,
  getPhcDetails,
  updatePhcDetails,
  getAllDoctors,
  getAllNurses,
  getAllPatients,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardAnalytics);
router.get('/doctors', getAllDoctors);
router.post('/doctors', addDoctor);
router.put('/doctors/:doctorId', updateDoctor);
router.delete('/doctors/:doctorId', deleteDoctor);

router.get('/nurses', getAllNurses);
router.post('/nurses', addNurse);
router.put('/nurses/:nurseId', updateNurse);
router.delete('/nurses/:nurseId', deleteNurse);

router.get('/patients', getAllPatients);
router.post('/patients', addPatient);
router.put('/patients/:patientId', updatePatient);
router.delete('/patients/:patientId', deletePatient);

router.get('/attendance', getDoctorAttendance);
router.get('/phc-details', getPhcDetails);
router.put('/phc-details', updatePhcDetails);

module.exports = router;
