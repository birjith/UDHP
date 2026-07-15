import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FiHome,
  FiFileText,
  FiClipboard,
  FiCalendar,
  FiCreditCard,
  FiActivity,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiZap,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Home',             to: '/patient/dashboard',     icon: FiHome,         end: true },
  { label: 'Book Appointment', to: '/patient/appointments',  icon: FiCalendar },
  { label: 'Prescriptions',    to: '/patient/medications',   icon: FiClipboard },
  { label: 'Lab Reports',      to: '/patient/lab-reports',   icon: FiFileText },
  { label: 'Bills & Insurance',to: '/patient/billing',       icon: FiCreditCard },
  { label: 'Health Tracker',   to: '/patient/health-tracker',icon: FiActivity },
  { label: 'AI Assistant',     to: '/patient/ai-assistant',  icon: FiZap },
  { label: 'Messages',         to: '/patient/messages',      icon: FiMessageSquare },
  { label: 'Profile Settings', to: '/patient/profile',       icon: FiSettings },
];

const PatientPortal = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const patientName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : 'Patient';

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'P';

  const patientId = user?._id
    ? `Patient ID: ${user._id.toString().slice(-6).toUpperCase()}`
    : 'Patient ID: ------';

  return (
    /* zoom: 2 → at 50% browser zoom the page looks 1× (normal size) */
    <div className="patient-zoom-wrapper">
      <div style={{ display: 'flex', background: '#F1F5F9', minHeight: '100vh' }}>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside
          className={`patient-sidebar${menuOpen ? ' open' : ''}`}
          style={{
            width: '260px',
            flexShrink: 0,
            background: '#0F172A',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem 1rem',
            /* height:100vh makes sidebar exactly screen-tall so logout is always visible */
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            zIndex: 50,
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.01em', margin: '0 0 0.15rem', lineHeight: 1.3 }}>
                Unified Healthcare Platform UI
              </p>
              <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569', margin: 0 }}>
                Patient Portal
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="sidebar-close-btn"
              style={{ display: 'none', background: 'none', border: '1px solid #334155', borderRadius: '8px', padding: '0.35rem', color: '#94A3B8', cursor: 'pointer' }}
            >
              <FiX size={16} />
            </button>
          </div>

          {/* User card */}
          <div style={{
            borderRadius: '12px',
            background: 'rgba(30,41,59,0.7)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '0.82rem', fontWeight: 800, color: '#fff', letterSpacing: '0.03em',
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9', margin: '0 0 0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {patientName}
              </p>
              <p style={{ fontSize: '0.66rem', color: '#475569', margin: 0 }}>{patientId}</p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ overflowY: 'auto' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `patient-nav-link${isActive ? ' active' : ''}`}
                >
                  <span className="patient-nav-icon"><Icon size={15} /></span>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div style={{ borderTop: '1px solid #1E293B', paddingTop: '0.9rem', marginTop: '0.8rem' }}>
            <button
              type="button"
              onClick={logout}
              style={{
                display: 'flex', width: '100%', alignItems: 'center', gap: '0.6rem',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                padding: '0.55rem 0.9rem',
                fontSize: '0.82rem', fontWeight: 600, color: '#FCA5A5',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#FEE2E2'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}
            >
              <FiLogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Main content ──────────────────────────────────── */}
        <div className="patient-main-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Mobile topbar (hidden on desktop) */}
          <header className="patient-mobile-header">
            <div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748B', margin: 0 }}>Patient Portal</p>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0.15rem 0 0' }}>{patientName}</h2>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', borderRadius: '8px',
                border: '1px solid #E2E8F0', background: '#F1F5F9', color: '#334155', cursor: 'pointer',
              }}
            >
              <FiMenu size={16} />
            </button>
          </header>

          <main style={{ flex: 1, padding: '1.25rem 1.5rem' }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="patient-backdrop"
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.5)' }}
        />
      )}
    </div>
  );
};

export default PatientPortal;
