import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import doctorApi from '../../services/doctorApi';
import DoctorDashboardLayout from '../../components/DoctorDashboardLayout';

const DoctorPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await doctorApi.getProfile();
        const doc = response.data.doctor || null;

        // If the doctor object doesn't include a name, fall back to the logged-in user's name
        if (doc && (!doc.name || doc.name.trim() === '') && user) {
          doc.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        }

        setDoctor(doc);
      } catch (err) {
        // Log full error for debugging
        console.error('Doctor profile load failed:', err.response || err.message || err);

        const status = err.response?.status;
        const serverMessage = err.response?.data?.message;

        if (status === 401) {
          // Token invalid or expired - clear and redirect to login
          localStorage.removeItem('token');
          setError('Authentication failed. Please sign in again.');
          navigate('/login');
          return;
        }

        // Surface specific server message when available
        setError(serverMessage || err.message || 'Unable to load doctor profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div className="loading-screen">Loading doctor portal…</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <DoctorDashboardLayout doctor={doctor} onLogout={logout}>
      <Outlet context={{ doctor }} />
    </DoctorDashboardLayout>
  );
};

export default DoctorPortal;
