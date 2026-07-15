import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Register from './pages/Auth/Register';
import PatientPortal from './pages/Patient/PatientPortal';
import PatientDashboard from './pages/Patient/PatientDashboard';
import LabReports from './pages/Patient/LabReports';
import PatientMedications from './pages/Patient/PatientMedications';
import PatientAppointments from './pages/Patient/PatientAppointments';
import PatientDocuments from './pages/Patient/PatientDocuments';
import PatientBilling from './pages/Patient/PatientBilling';
import PatientHealthTracker from './pages/Patient/PatientHealthTracker';
import PatientMessages from './pages/Patient/PatientMessages';
import PatientProfile from './pages/Patient/PatientProfile';

import DoctorPortal from './pages/Doctor/DoctorPortal';
import DashboardHome from './pages/Doctor/DashboardHome';
import Patients from './pages/Doctor/Patients';
import Schedule from './pages/Doctor/Schedule';
import Messages from './pages/Doctor/Messages';
import Reports from './pages/Doctor/Reports';
import Settings from './pages/Doctor/Settings';
import AdminPortal from './pages/Admin/AdminPortal';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminSectionPage from './pages/Admin/AdminSectionPage';
import NursePortal from './pages/Nurse/NursePortal';
import NurseDashboard from './pages/Nurse/NurseDashboard';
import NurseRounds from './pages/Nurse/NurseRounds';
import NursePatients from './pages/Nurse/NursePatients';
import NurseMessages from './pages/Nurse/NurseMessages';
import NurseSettings from './pages/Nurse/NurseSettings';
import NurseUploadReport from './pages/Nurse/NurseUploadReport';
import DiseasePrediction from './pages/AI/DiseasePrediction';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="container mt-5">Loading authentication status...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container mt-5">Loading application...</div>;
  }

  const getDashboardHome = () => {
    switch (user?.role) {
      case 'patient': return '/patient/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'nurse': return '/nurse/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to={getDashboardHome()} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientPortal /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="lab-reports" element={<LabReports />} />
          <Route path="medications" element={<PatientMedications />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="documents" element={<PatientDocuments />} />
          <Route path="billing" element={<PatientBilling />} />
          <Route path="health-tracker" element={<PatientHealthTracker />} />
          <Route path="ai-assistant" element={<DiseasePrediction />} />
          <Route path="messages" element={<PatientMessages />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorPortal /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="patients" element={<Patients />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPortal /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminSectionPage title="Doctors Management" description="Manage physician accounts, assignments, schedules, and medical staff access." type="doctors" />} />
          <Route path="patients" element={<AdminSectionPage title="Patients Management" description="Review patient accounts, profiles, and hospital records from one place." type="patients" />} />
          <Route path="nurses" element={<AdminSectionPage title="Nurses Management" description="Coordinate nursing staff, assignments, and care operations." type="nurses" />} />
          <Route path="departments" element={<AdminSectionPage title="Departments" description="Oversee hospital departments and internal service areas." type="departments" />} />
          <Route path="analytics" element={<AdminSectionPage title="Analytics" description="Track platform usage, operational performance, and hospital insights." type="analytics" />} />
          <Route path="management" element={<AdminSectionPage title="Hospital Management" description="Monitor service workflows, resource allocation, and administration tasks." type="management" />} />
          <Route path="settings" element={<AdminSectionPage title="System Settings" description="Configure global system preferences and admin controls." type="settings" />} />
        </Route>

        {/* Nurse Routes */}
        <Route path="/nurse" element={<ProtectedRoute allowedRoles={['nurse']}><NursePortal /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<NurseDashboard />} />
          <Route path="rounds" element={<NurseRounds />} />
          <Route path="patients" element={<NursePatients />} />
          <Route path="messages" element={<NurseMessages />} />
          <Route path="settings" element={<NurseSettings />} />
          <Route path="upload-report" element={<NurseUploadReport />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
