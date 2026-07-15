const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/chat/initiate', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: Chat System Initiation' });
});

router.post('/video/consultation', (req, res) => {
  res.status(200).json({ success: true, message: 'Reserved: Video Consultation session setup' });
});

module.exports = router;
