import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FiHome, FiUsers, FiUserCheck, FiActivity,
  FiGrid, FiBarChart2, FiSettings, FiLogOut,
  FiMenu, FiX, FiSearch, FiBell, FiMessageSquare,
  FiHeart,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

/* ─── sidebar items ─────────────────────────────────────────── */
const mainNav = [
  { label: 'Dashboard',   to: '/admin/dashboard',   icon: FiHome,     end: true },
  { label: 'Doctors',     to: '/admin/doctors',      icon: FiUserCheck },
  { label: 'Patients',    to: '/admin/patients',     icon: FiUsers },
  { label: 'Nurses',      to: '/admin/nurses',       icon: FiHeart },
  { label: 'Departments', to: '/admin/departments',  icon: FiGrid },
];

const intellNav = [
  { label: 'Analytics',          to: '/admin/analytics', icon: FiBarChart2 },
  { label: 'Hospital Mgmt',     to: '/admin/management', icon: FiActivity },
  { label: 'System Settings',   to: '/admin/settings',   icon: FiSettings },
];

/* ─── component ─────────────────────────────────────────────── */
const AdminPortal = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : 'Admin';

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'A';

  const adminId = user?._id
    ? `ADM-${user._id.toString().slice(-4).toUpperCase()}`
    : 'ADM-0001';

  const sidebarW = collapsed ? '80px' : '260px';

  /* shared nav-link renderer */
  const renderLink = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
        title={collapsed ? item.label : undefined}
      >
        <span className="admin-nav-icon"><Icon size={18} /></span>
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>

      {/* ═══════ SIDEBAR ═══════════════════════════════════════ */}
      <aside
        className={`admin-sidebar${mobileOpen ? ' open' : ''}`}
        style={{
          width: sidebarW,
          flexShrink: 0,
          background: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          padding: collapsed ? '1.25rem 0.65rem' : '1.25rem 1rem',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 60,
          transition: 'width 300ms ease, padding 300ms ease',
        }}
      >
        {/* ── Brand ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
          marginBottom: '1.25rem', minHeight: '36px',
        }}>
          {!collapsed && (
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: '0.01em', margin: '0 0 0.15rem', lineHeight: 1.3 }}>
                Admin Portal
              </p>
              <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569', margin: 0 }}>
                UDHP Network
              </p>
            </div>
          )}
          {collapsed && (
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #3B82F6, #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 800, color: '#fff',
            }}>
              A
            </div>
          )}
          <button
            type="button"
            onClick={() => { setCollapsed(c => !c); setMobileOpen(false); }}
            className="admin-collapse-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '30px', height: '30px', borderRadius: '8px',
              border: '1px solid #334155', background: 'transparent', color: '#94A3B8',
              cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E293B'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {collapsed ? <FiMenu size={14} /> : <FiX size={14} />}
          </button>
        </div>

        {/* ── User card ── */}
        {!collapsed && (
          <div style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1E3A5F 0%, #1e293b 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '0.82rem', fontWeight: 800, color: '#fff',
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748B', margin: '0 0 0.1rem' }}>
                System Administrator
              </p>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9', margin: '0 0 0.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminName}
              </p>
              <p style={{ fontSize: '0.66rem', color: '#475569', margin: 0 }}>Hospital ID: {adminId}</p>
            </div>
          </div>
        )}

        {/* ── Main Menu ── */}
        {!collapsed && (
          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.5rem', paddingLeft: '0.5rem' }}>
            Main Menu
          </p>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {mainNav.map(renderLink)}
        </nav>

        {/* ── Intelligence ── */}
        {!collapsed && (
          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#475569', margin: '1rem 0 0.5rem', paddingLeft: '0.5rem' }}>
            Intelligence
          </p>
        )}
        {collapsed && <div style={{ borderTop: '1px solid #1E293B', margin: '0.75rem 0' }} />}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {intellNav.map(renderLink)}
        </nav>

        {/* ── Logout ── */}
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '0.9rem', marginTop: 'auto' }}>
          <button
            type="button"
            onClick={logout}
            title={collapsed ? 'Logout' : undefined}
            style={{
              display: 'flex', width: '100%', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '0.6rem', borderRadius: '10px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              padding: collapsed ? '0.6rem' : '0.55rem 0.9rem',
              fontSize: '0.82rem', fontWeight: 600, color: '#FCA5A5',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
          >
            <FiLogOut size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ═══════ MAIN AREA ═════════════════════════════════════ */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
        transition: 'margin-left 300ms ease',
      }}>

        {/* ── Top navbar ── */}
        <header style={{
          height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: '#fff',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {/* Left: mobile toggle + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen(m => !m)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', borderRadius: '10px',
                border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#334155', cursor: 'pointer',
              }}
            >
              <FiMenu size={18} />
            </button>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>UDHP</h2>
              <p style={{ fontSize: '0.65rem', color: '#94A3B8', margin: 0 }}>Admin &gt; Dashboard</p>
            </div>
          </div>

          {/* Center: search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: '#F1F5F9', borderRadius: '12px', padding: '0.45rem 1rem',
            border: '1px solid #E2E8F0', width: '320px', maxWidth: '40%',
          }}>
            <FiSearch size={14} color="#94A3B8" />
            <input
              type="text"
              placeholder="Global system search…"
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontSize: '0.82rem', color: '#334155', width: '100%',
              }}
            />
          </div>

          {/* Right: icons + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button style={{
              width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #E2E8F0',
              background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748B', cursor: 'pointer', position: 'relative',
            }}>
              <FiBell size={16} />
              <span style={{
                position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px',
                borderRadius: '50%', background: '#EF4444', border: '2px solid #fff',
              }} />
            </button>
            <button style={{
              width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #E2E8F0',
              background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748B', cursor: 'pointer',
            }}>
              <FiMessageSquare size={16} />
            </button>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 800, color: '#fff', cursor: 'pointer',
            }}>
              {initials}
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <Outlet />
        </main>
      </div>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 55, background: 'rgba(15,23,42,0.5)' }}
        />
      )}
    </div>
  );
};

export default AdminPortal;
