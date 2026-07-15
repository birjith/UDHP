# UDHP Backend

Node.js + Express.js + MongoDB backend for the Unified Digital Health Platform.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/udhp
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB
```bash
# Windows
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Run Server
```bash
# Development with nodemon
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

## API Routes

### Authentication (`/api/auth`)
```
POST   /register          - Register new user
POST   /login            - Login user
GET    /me               - Get current user (protected)
```

### Patient (`/api/patient`) - Patient only
```
GET    /profile          - Get patient profile
PUT    /profile          - Update patient profile
GET    /medical-history  - Get medical history
GET    /prescriptions    - Get prescriptions
GET    /lab-reports      - Get lab reports
GET    /appointments     - Get appointments
POST   /appointments     - Book appointment
PUT    /appointments/:id/cancel - Cancel appointment
```

### Doctor (`/api/doctor`) - Doctor only
```
GET    /profile          - Get doctor profile
PUT    /profile          - Update doctor profile
GET    /appointments     - Get doctor appointments
GET    /patient/:id      - Search patient
GET    /patient/:id/medical-history - Get patient history
POST   /diagnosis-treatment - Add diagnosis
POST   /prescription     - Generate prescription
POST   /lab-test         - Order lab test
POST   /attendance       - Record login time
```

### Nurse (`/api/nurse`) - Nurse only
```
GET    /profile          - Get nurse profile
GET    /assigned-patients - Get assigned patients
POST   /vital-signs      - Update vital signs
GET    /vital-signs/:id  - Get patient vital signs
POST   /vaccination      - Record vaccination
GET    /vaccination/:id  - Get patient vaccinations
```

### Admin (`/api/admin`) - Admin only
```
GET    /dashboard        - Get analytics
GET    /doctors          - Get all doctors
POST   /doctors          - Add doctor
PUT    /doctors/:id      - Update doctor
DELETE /doctors/:id      - Delete doctor
GET    /nurses           - Get all nurses
POST   /nurses           - Add nurse
PUT    /nurses/:id       - Update nurse
DELETE /nurses/:id       - Delete nurse
GET    /patients         - Get all patients
POST   /patients         - Add patient
PUT    /patients/:id     - Update patient
DELETE /patients/:id     - Delete patient
GET    /attendance       - Get doctor attendance
GET    /phc-details      - Get PHC details
PUT    /phc-details      - Update PHC details
```

## Database Models

### User
```javascript
{
  firstName, lastName, email, phone,
  password, role, isActive, createdAt, updatedAt
}
```

### Patient
```javascript
{
  userId, dateOfBirth, gender, bloodGroup,
  address, emergencyContact, knownAllergies,
  chronicDiseases, medicalHistory
}
```

### Doctor
```javascript
{
  userId, specialization, licenseNumber, experience,
  availability, department, consultationFee,
  qualifications, attendanceRecords
}
```

### Nurse
```javascript
{
  userId, licenseNumber, experience, department,
  assignedPatients, shift, qualifications
}
```

### Appointment
```javascript
{
  patientId, doctorId, appointmentDate, timeSlot,
  status, reason, notes, consultationNotes, diagnosis
}
```

### Prescription
```javascript
{
  patientId, doctorId, appointmentId, medicines,
  diagnosis, followUpDate, notes, issuedDate
}
```

### LabReport
```javascript
{
  patientId, doctorId, appointmentId, testName,
  testCode, testDate, resultDate, status, results
}
```

### VitalSigns
```javascript
{
  patientId, nurseId, bloodPressure, temperature,
  pulse, respiratoryRate, oxygenSaturation,
  weight, height, notes, recordedAt
}
```

### Vaccination
```javascript
{
  patientId, nurseId, vaccineName, dosage, dose,
  vaccinationDate, expiryDate, batchNumber,
  manufacturer, siteOfInjection, adverseEffects
}
```

### PhcDetails
```javascript
{
  name, registrationNumber, type, address, phone, email,
  totalBeds, totalDoctors, totalNurses, totalPatients,
  operatingHours, departments, services
}
```

## Authentication & Authorization

### Request with Token
```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/patient/profile
```

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

All responses include:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Middleware

### Authentication Middleware
- Verifies JWT token
- Checks token expiration
- Returns 401 if invalid

### Authorization Middleware
- Checks user role
- Returns 403 if not authorized
- Used for role-based access control

## Testing

Use Postman or curl to test endpoints:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@test.com",
    "phone":"1234567890",
    "password":"password123",
    "confirmPassword":"password123",
    "role":"patient"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "password":"password123"
  }'

# Get Profile (with token)
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/patient/profile
```

## Project Structure

```
backend/
├── models/          - MongoDB schemas
├── routes/          - API routes
├── controllers/     - Business logic
├── middleware/      - Auth middleware
├── config/          - Database config
├── server.js        - Express app
├── package.json
├── .env.example
└── .gitignore
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **joi**: Data validation (optional)

## Development

```bash
# Install nodemon for auto-reload
npm install -D nodemon

# Run in dev mode
npm run dev
```

## Production Deployment

1. Update .env for production
2. Set NODE_ENV=production
3. Use process manager (PM2, Forever, etc.)
4. Setup reverse proxy (Nginx)
5. Use HTTPS

## Support

For issues, check:
1. MongoDB connection
2. JWT_SECRET in .env
3. Port availability
4. CORS settings
