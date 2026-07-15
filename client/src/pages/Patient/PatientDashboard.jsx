import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiBell, FiCalendar, FiClipboard,
  FiFileText, FiShield, FiVideo, FiCheck,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();
  const patientName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : 'Patient';
  const patientId = user?._id
    ? `PT-${user._id.toString().slice(-6).toUpperCase()}`
    : 'PT-000001';

  const stats = [
    {
      label: 'Total Appointments',
      value: '0',
      sub: '0 completed visits',
      icon: FiCalendar,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      label: 'Active Prescriptions',
      value: '0',
      sub: 'Medication reminders and dosage',
      icon: FiClipboard,
      color: '#10B981',
      bg: '#ECFDF5',
    },
    {
      label: 'Upcoming Visits',
      value: '0',
      sub: 'Next scheduled consultations',
      icon: FiVideo,
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
    {
      label: 'Recent Reports',
      value: '0',
      sub: 'Latest lab and wellness insights',
      icon: FiFileText,
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
  ];

  const workflows = [
    { label: 'Book new appointment', to: '/patient/appointments' },
    { label: 'View my appointments', to: '/patient/appointments' },
    { label: 'View medical records', to: '/patient/documents' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1120px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

      {/* ── Hero Row ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 0.8fr', gap: '0.65rem' }} className="hero-grid">

        {/* Left – blue gradient */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #3b82f6 100%)',
          padding: '1rem 1.1rem',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* decorative circles */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-30px', right: '80px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem', lineHeight: 1.2, position: 'relative' }}>
            Patient's Health Dashboard
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.45, margin: '0 0 0.75rem', maxWidth: '400px', position: 'relative' }}>
            Book visits, track appointments, view records, and stay on top of
            your care plan from one secure healthcare portal.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', position: 'relative' }}>
            <Link to="/patient/appointments" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              borderRadius: '8px', background: '#fff', color: '#1e40af',
              padding: '0.38rem 0.8rem', fontSize: '0.74rem', fontWeight: 700,
              textDecoration: 'none',
            }}>
              Book new appointment
            </Link>
            <Link to="/patient/documents" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              borderRadius: '8px', background: 'rgba(255,255,255,0.14)', color: '#fff',
              padding: '0.38rem 0.8rem', fontSize: '0.74rem', fontWeight: 600,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.28)',
            }}>
              View medical records
            </Link>
          </div>
        </div>

        {/* Right – dark role card */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
          padding: '0.9rem 0.9rem',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Medical pulse icon */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'rgba(59,130,246,0.14)',
            border: '1px solid rgba(59,130,246,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.9rem',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.25rem' }}>Current Role</p>
          <h2 style={{ fontSize: '1.08rem', fontWeight: 800, margin: '0 0 0.45rem', color: '#F1F5F9' }}>Patient</h2>
          <p style={{ fontSize: '0.68rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>
            Your data is secured with HIPAA-compliant encryption.
          </p>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.55rem' }} className="stat-cards-grid">
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '0.7rem 0.8rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div>
                <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <stat.icon style={{ width: '16px', height: '16px', color: stat.color }} />
              </div>
            </div>
            <p style={{ fontSize: '0.62rem', color: '#94A3B8', margin: '0.35rem 0 0', lineHeight: 1.3 }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom 3-col ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.6rem' }} className="bottom-grid">

        {/* Patient Workflow */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '0.8rem 0.9rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiCheck style={{ width: '14px', height: '14px', color: '#3B82F6' }} />
            </div>
            <h3 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Patient Workflow</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {workflows.map((w) => (
              <Link
                key={w.label}
                to={w.to}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.5rem 0.65rem', borderRadius: '10px',
                  border: '1px solid #E2E8F0', background: '#F8FAFC',
                  fontSize: '0.72rem', fontWeight: 600, color: '#1E293B',
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}
              >
                {w.label}
                <FiArrowRight style={{ width: '13px', height: '13px', color: '#94A3B8' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Protected Access */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiShield style={{ width: '14px', height: '14px', color: '#10B981' }} />
            </div>
            <h3 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Protected Access</h3>
          </div>
          {/* Visual representation of a secured health record */}
          <div style={{
            borderRadius: '10px', overflow: 'hidden', marginBottom: '0.7rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #BAE6FD', padding: '0.85rem',
          }}>
            {/* fake header bar */}
            <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.5rem' }}>
              {['#3B82F6','#10B981','#8B5CF6'].map((c, i) => (
                <div key={i} style={{ flex: 1, height: '5px', borderRadius: '3px', background: c, opacity: 0.55 }} />
              ))}
            </div>
            {/* fake record rows */}
            {[90, 70, 85, 55, 75].map((w, i) => (
              <div key={i} style={{
                height: '5px', borderRadius: '3px', background: '#94A3B8',
                width: `${w}%`, marginBottom: '0.4rem', opacity: 0.35,
              }} />
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
              <FiShield style={{ width: '11px', height: '11px', color: '#10B981' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#10B981' }}>JWT Secured · Role-based access</span>
            </div>
          </div>
          <p style={{ fontSize: '0.66rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
            Your patient data is protected with JWT authentication and role-based route guards to
            ensure that only you can see your appointments, records, and profile.
          </p>
        </div>

        {/* Health Alerts */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiBell style={{ width: '14px', height: '14px', color: '#F59E0B' }} />
            </div>
            <h3 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Health alerts</h3>
          </div>
          {/* Empty state box */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '0.9rem 0.7rem', textAlign: 'center',
            background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0',
            marginBottom: '0.85rem',
          }}>
            <FiBell style={{ width: '28px', height: '28px', color: '#CBD5E1', marginBottom: '0.55rem' }} />
            <p style={{ fontSize: '0.66rem', color: '#94A3B8', margin: 0, lineHeight: 1.35 }}>
              No active health alerts or notifications at this time.
            </p>
          </div>
          <p style={{ fontSize: '0.64rem', color: '#94A3B8', lineHeight: 1.4, margin: 0 }}>
            Receive appointment reminders, prescription updates, or messages directly inside your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
