#!/usr/bin/env node
const connectDB = require('../config/database');
const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const argv = require('minimist')(process.argv.slice(2));

async function main() {
  const email = argv._[0] || argv.email || argv.e;
  if (!email) {
    console.error('Usage: node createDoctorForUser.js <email> [--license=<license>] [--specialization=<spec>] [--experience=<years>]');
    process.exit(1);
  }

  const license = argv.license || argv.l || `LIC-${Date.now()}`;
  const specialization = argv.specialization || argv.s || 'General Medicine';
  const experience = Number(argv.experience || argv.x || 3);

  await connectDB();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(2);
    }

    const existing = await Doctor.findOne({ userId: user._id });
    if (existing) {
      console.log('Doctor record already exists for this user:');
      console.log(existing);
      process.exit(0);
    }

    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      licenseNumber: license,
      experience,
      department: 'General',
      consultationFee: 0,
      qualifications: [],
      attendanceRecords: [],
    });

    console.log('Doctor record created successfully:');
    console.log(doctor);
    process.exit(0);
  } catch (err) {
    console.error('Error creating doctor record:', err && err.message ? err.message : err);
    process.exit(3);
  } finally {
    mongoose.connection.close();
  }
}

main();
