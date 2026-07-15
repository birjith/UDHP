const User = require('../models/User');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword, role } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });

    if (role === 'patient') {
      const existingPatientProfile = await Patient.findOne({ userId: user._id });
      if (!existingPatientProfile) {
        await Patient.create({
          userId: user._id,
          dateOfBirth: new Date('1970-01-01'),
          gender: 'other',
        });
      }
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth register error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    console.log(`Login attempt for email: ${email}`);
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.warn(`Login failed - user not found: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'User account is deactivated',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.warn(`Login failed - invalid password for: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id, user.role);
    console.log(`Login successful for ${email} (role: ${user.role})`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
