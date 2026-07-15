const express = require('express');
const {
  getProfile,
  getRegisteredPatients,
  getAssignedPatients,
  updateVitalSigns,
  getPatientVitalSigns,
  updateVaccinationRecord,
  getPatientVaccinations,
} = require('../controllers/nurseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('nurse'));

router.get('/profile', getProfile);
router.get('/patients', getRegisteredPatients);
router.get('/assigned-patients', getAssignedPatients);
router.post('/vital-signs', updateVitalSigns);
router.get('/vital-signs/:patientId', getPatientVitalSigns);
router.post('/vaccination', updateVaccinationRecord);
router.get('/vaccination/:patientId', getPatientVaccinations);

module.exports = router;
