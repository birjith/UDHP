const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Reserved AI endpoints (protected)
router.use(protect);

router.post('/disease-prediction', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Disease Prediction' });
});

router.post('/report-analysis', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Medical Report Analysis' });
});

router.post('/chat-assistant', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Chat Assistant' });
});

router.get('/appointment-recommendation', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Appointment Recommendation' });
});

router.post('/medicine-reminder', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Medicine Reminder' });
});

router.post('/health-risk-prediction', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: AI Health Risk Prediction' });
});

router.post('/pdf-upload', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: PDF Report Upload' });
});

router.post('/image-upload', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: Medical Image Upload' });
});

module.exports = router;
