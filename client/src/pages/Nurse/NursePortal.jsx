import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiUploadCloud,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/nurse/dashboard', icon: FiHome },
  { label: 'Rounds',    to: '/nurse/rounds',    icon: FiClipboard },
  { label: 'Patients',       to: '/nurse/patients',       icon: FiUsers },
  { label: 'Upload Report',  to: '/nurse/upload-report',  icon: FiUploadCloud },
  { label: 'Messages',       to: '/nurse/messages',       icon: FiMessageSquare },
  { label: 'Settings',  to: '/nurse/settings',  icon: FiSettings },
];

const NursePortal = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const nurseName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Nurse';

  return (
    /* zoom: 2 → at 50% browser zoom the page looks 1× (normal) — same fix as Patient Portal */
    <div className="nurse-zoom-wrapper">
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside
          className={`nurse-sidebar${menuOpen ? ' open' : ''}`}
          style={{
            width: '288px',          /* w-72 = 18rem = 288px */
            flexShrink: 0,
            background: '#020617',   /* slate-950 */
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            /* sticky keeps sidebar in-flow so zoom: 2 works correctly */
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            zIndex: 50,
            borderRadius: '0 1.5rem 1.5rem 0',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Header row (brand + close btn on mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#64748B', margin: 0 }}>
                Nurse Station
              </p>
              <h1 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 600, color: '#fff', margin: '1rem 0 0' }}>
                Shift Control
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="nurse-close-btn"
              style={{
                display: 'none',
                borderRadius: '9999px',
                border: '1px solid #334155',
                background: '#0F172A',
                padding: '0.5rem',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* User card */}
          <div style={{
            marginTop: '2rem',
            borderRadius: '1.5rem',
            background: 'rgba(15,23,42,0.95)',
            padding: '1.25rem',
            boxShadow: '0 25px 50px -25px rgba(15,23,42,0.8)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#64748B', margin: 0 }}>
              On duty
            </p>
            <h2 style={{ marginTop: '0.75rem', fontSize: '1.25rem', fontWeight: 600, color: '#fff', margin: '0.75rem 0 0.5rem' }}>
              {nurseName}
            </h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94A3B8', margin: 0 }}>
              Track rounds, tasks, and patient alerts in real-time.
            </p>
          </div>

          {/* Nav */}
          <nav style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'nurse-nav-link active' : 'nurse-nav-link'
                  }
                >
                  <span className="nurse-nav-icon">
                    <Icon size={20} />
                  </span>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout — sits directly below nav items */}
          <div style={{ borderTop: '1px solid #1E293B', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={logout}
              style={{
                display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: '1.5rem', background: '#1E293B',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem', fontWeight: 600, color: '#CBD5E1',
                border: 'none', cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.color = '#CBD5E1'; }}
            >
              <span>Logout</span>
              <FiLogOut size={20} />
            </button>
          </div>
        </aside>

        {/* ── Main content ──────────────────────────────────── */}
        <div className="nurse-main-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Mobile topbar (hidden on desktop) */}
          <header className="nurse-mobile-header">
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#64748B', margin: 0 }}>
                Nurse Portal
              </p>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', margin: '0.2rem 0 0' }}>
                {nurseName}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '44px', height: '44px', borderRadius: '1rem',
                border: '1px solid #E2E8F0', background: '#F1F5F9', color: '#334155', cursor: 'pointer',
              }}
            >
              <FiMenu size={20} />
            </button>
          </header>

          <main style={{ flex: 1, minHeight: '100vh', background: '#F8FAFC', padding: '1rem 2rem' }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="nurse-backdrop"
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.5)' }}
        />
      )}
    </div>
  );
};

export default NursePortal;
