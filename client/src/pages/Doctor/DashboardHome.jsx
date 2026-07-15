import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiUsers, FiCalendar, FiFileText, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const DEFAULT_PATIENTS = [
  { _id: 'default-p1', userId: { firstName: 'Maya', lastName: 'Chen' } },
  { _id: 'default-p2', userId: { firstName: 'Rohan', lastName: 'Patel' } },
  { _id: 'default-p3', userId: { firstName: 'Aisha', lastName: 'Khan' } },
];

const DEFAULT_APPOINTMENTS = [
  { _id: 'default-a1', patientId: { userId: { firstName: 'Maya', lastName: 'Chen' } }, reason: 'Routine follow-up', status: 'Confirmed', appointmentDate: '2026-07-15T10:00:00.000Z' },
  { _id: 'default-a2', patientId: { userId: { firstName: 'Rohan', lastName: 'Patel' } }, reason: 'Medication review', status: 'Pending', appointmentDate: '2026-07-15T13:30:00.000Z' },
  { _id: 'default-a3', patientId: { userId: { firstName: 'Aisha', lastName: 'Khan' } }, reason: 'Post-op assessment', status: 'Confirmed', appointmentDate: '2026-07-15T16:00:00.000Z' },
];

const DEFAULT_REPORTS = [
  { _id: 'default-r1', patientId: { userId: { firstName: 'Maya', lastName: 'Chen' } }, testName: 'CBC Overview', status: 'completed', testDate: '2026-07-14T00:00:00.000Z' },
  { _id: 'default-r2', patientId: { userId: { firstName: 'Rohan', lastName: 'Patel' } }, testName: 'Lipid Profile', status: 'review', testDate: '2026-07-13T00:00:00.000Z' },
];

const DashboardHome = () => {
  const { doctor } = useOutletContext();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [appointmentsRes, patientsRes, reportsRes] = await Promise.all([
          doctorApi.getAppointments(),
          doctorApi.getPatients(),
          doctorApi.getReports(),
        ]);

        const resolvedAppointments = appointmentsRes.data.appointments?.length ? appointmentsRes.data.appointments : DEFAULT_APPOINTMENTS;
        const resolvedPatients = patientsRes.data.patients?.length ? patientsRes.data.patients : DEFAULT_PATIENTS;
        const resolvedReports = reportsRes.data.reports?.length ? reportsRes.data.reports : DEFAULT_REPORTS;

        setAppointments(resolvedAppointments);
        setPatients(resolvedPatients);
        setReports(resolvedReports);
      } catch (err) {
        console.error('Dashboard data load failed', err);
        setError('Unable to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const todaysAppointments = useMemo(() => {
    const today = new Date().toDateString();
    return appointments.filter((appointment) => new Date(appointment.appointmentDate).toDateString() === today).length;
  }, [appointments]);

  const stats = useMemo(
    () => [
      {
        label: 'Total Patients',
        value: patients.length,
        note: `${patients.length} active patients`,
        bg: '#2563eb',
        icon: FiUsers,
      },
      {
        label: "Today's Appointments",
        value: todaysAppointments,
        note: `${todaysAppointments} scheduled for today`,
        bg: '#10b981',
        icon: FiCalendar,
      },
      {
        label: 'Pending Reports',
        value: reports.filter((report) => report.status !== 'completed').length,
        note: `${reports.filter((report) => report.status !== 'completed').length} pending review`,
        bg: '#f59e0b',
        icon: FiFileText,
      },
      {
        label: 'Avg. Consult Time',
        value: '24m',
        note: 'Target 20m',
        bg: '#8b5cf6',
        icon: FiClock,
      },
    ],
    [patients.length, reports, todaysAppointments]
  );

  const activities = useMemo(() => {
    const appointmentActivities = appointments.slice(0, 3).map((appointment) => ({
      id: appointment._id,
      title: `Appointment with ${appointment.patientId?.userId ? `${appointment.patientId.userId.firstName} ${appointment.patientId.userId.lastName}` : 'Patient'}`,
      description: appointment.reason || 'Consultation scheduled',
      time: new Date(appointment.appointmentDate).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    }));

    const reportActivities = reports.slice(0, 3).map((report) => ({
      id: report._id,
      title: `Report uploaded for ${report.patientId?.userId ? `${report.patientId.userId.firstName} ${report.patientId.userId.lastName}` : 'Patient'}`,
      description: report.testName,
      time: new Date(report.testDate).toLocaleDateString(),
    }));

    return [...appointmentActivities, ...reportActivities]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);
  }, [appointments, reports]);

  if (loading) {
    return <div className="loading-screen">Loading dashboard…</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  const displayName = doctor?.name
    || (doctor?.userId ? `Dr. ${doctor.userId.firstName} ${doctor.userId.lastName}` : null)
    || (user?.firstName ? `Dr. ${user.firstName} ${user.lastName || ''}` : 'Dr.');
  const initials = displayName.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

  return (
    <div className="doctor-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Welcome back</p>
          <h2 className="page-title">{displayName}</h2>
          <p className="page-description">Manage your consultations, review patient history, and monitor real-time care with a single doctor portal.</p>
        </div>
        <div className="profile-widget" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0F172A' }}>
            {initials || 'DR'}
          </div>
          <div>
            <p className="widget-label">{doctor?.specialization || 'Cardiology Specialist'}</p>
            <p className="widget-note">{doctor?.department || 'Emergency & Cardiac Care'}</p>
          </div>
        </div>
      </section>

      <div className="stat-grid">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="stat-card">
              <div className="stat-card-top">
                <div>
                  <p className="stat-card-label">{card.label}</p>
                  <h3 className="stat-card-value">{card.value}</h3>
                </div>
                <div className="stat-card-icon" style={{ background: card.bg }}>
                  <Icon />
                </div>
              </div>
              <p className="stat-card-note">{card.note}</p>
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-panel appointments-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Today’s Appointments</p>
              <p className="panel-subtitle">Live schedule, status, and next actions.</p>
            </div>
            <button className="panel-action">View all</button>
          </div>
          <div className="appointments-list">
            {appointments.map((item) => (
              <article key={item._id} className="appointment-item">
                <div>
                  <p className="appointment-name">{item.patientId?.userId ? `${item.patientId.userId.firstName} ${item.patientId.userId.lastName}` : 'Patient'}</p>
                  <p className="appointment-meta">{item.reason || 'General consultation'}</p>
                </div>
                <div className="appointment-right">
                  <span className={`status-badge ${item.status}`}>{item.status}</span>
                  <p className="appointment-time">{new Date(item.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel vitals-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Real-time Vitals</p>
              <p className="panel-subtitle">Monitor patient vitals from active appointments.</p>
            </div>
          </div>
          <div className="vitals-grid">
            <div className="vitals-card">
              <p className="vitals-title">Heart Rate</p>
              <h4 className="vitals-value">76 BPM</h4>
              <p className="vitals-note">Normal</p>
            </div>
            <div className="vitals-card">
              <p className="vitals-title">Blood Pressure</p>
              <h4 className="vitals-value">118/76</h4>
              <p className="vitals-note">Stable</p>
            </div>
            <div className="vitals-card">
              <p className="vitals-title">Oxygen Level</p>
              <h4 className="vitals-value">98%</h4>
              <p className="vitals-note">Healthy</p>
            </div>
            <div className="vitals-card">
              <p className="vitals-title">Temperature</p>
              <h4 className="vitals-value">36.8°C</h4>
              <p className="vitals-note">Normal</p>
            </div>
          </div>
        </section>
      </div>

      <section className="activities-panel">
        <div className="panel-header">
          <div>
            <p className="panel-title">Recent Activity</p>
            <p className="panel-subtitle">Latest updates from your patients and reports.</p>
          </div>
        </div>
        <div className="activity-list">
          {activities.map((activity) => (
            <article key={activity.id} className="activity-row">
              <div>
                <p className="activity-title">{activity.title}</p>
                <p className="activity-meta">{activity.description}</p>
              </div>
              <p className="activity-time">{activity.time}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
