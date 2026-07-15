import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiHeart, FiClipboard,
  FiCheckCircle, FiMessageSquare, FiShield, FiAlertCircle,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const NurseDashboard = () => {
  const { user } = useAuth();
  const nurseName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Nurse';

  const stats = [
    { label: 'Active Patients', value: '18', sub: '3 high-priority cases',   icon: FiHeart,         color: '#10B981', bg: '#ECFDF5' },
    { label: 'Rounds Today',    value: '4',  sub: '2 remaining this shift',  icon: FiClipboard,    color: '#0EA5E9', bg: '#F0F9FF' },
    { label: 'Messages',        value: '2',  sub: '1 unread from Dr. Patel', icon: FiMessageSquare, color: '#8B5CF6', bg: '#F5F3FF' },
    { label: 'Tasks Completed', value: '11', sub: '3 pending action items',  icon: FiCheckCircle,   color: '#F59E0B', bg: '#FFFBEB' },
  ];

  const tasks = [
    { label: 'Medication check-in', status: 'Due now',     statusColor: '#EF4444', statusBg: '#FEF2F2' },
    { label: 'Post-op wound care',  status: 'In progress', statusColor: '#F59E0B', statusBg: '#FFFBEB' },
    { label: 'Discharge summary',   status: 'Review',      statusColor: '#6366F1', statusBg: '#EEF2FF' },
  ];

  const alerts = [
    { title: 'Room 3B patient needs vitals review', time: '9 min ago'  },
    { title: 'Medication refill approved',          time: '20 min ago' },
    { title: 'New message from Dr. Patel',          time: '45 min ago' },
  ];

  const quickLinks = [
    { label: 'Start patient rounds', to: '/nurse/rounds'   },
    { label: 'View all patients',    to: '/nurse/patients' },
    { label: 'Open messages',        to: '/nurse/messages' },
  ];

  return (
    /* width:100% fills whatever the main area provides after the sidebar.
       No max-width — content adapts to any browser zoom level. */
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* ── Hero Row: welcome (flex:1) + compact role card (220px) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1rem' }}>

        {/* Left — dark teal gradient */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0c4a6e 100%)',
          padding: '1.75rem 2rem',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', bottom: '-30px', right: '80px',  width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

          <p style={{ fontSize: '0.63rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.5rem', position: 'relative' }}>
            Nurse Dashboard
          </p>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.25, position: 'relative', color: '#F1F5F9' }}>
            Welcome back, {nurseName}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: '0 0 1.25rem', maxWidth: '420px', position: 'relative' }}>
            Monitor your shift, triage alerts, and patient rounds from one central place.
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', position: 'relative' }}>
            <Link to="/nurse/rounds" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              borderRadius: '8px', background: '#fff', color: '#0c4a6e',
              padding: '0.45rem 1rem', fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none',
            }}>
              Start rounds
            </Link>
            <Link to="/nurse/patients" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              borderRadius: '8px', background: 'rgba(255,255,255,0.14)', color: '#fff',
              padding: '0.45rem 1rem', fontSize: '0.82rem', fontWeight: 600,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.28)',
            }}>
              View patients
            </Link>
          </div>
        </div>

        {/* Right — compact role card (matches 220px patient pattern) */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
          padding: '1.5rem 1.25rem',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'rgba(14,165,233,0.14)',
            border: '1px solid rgba(14,165,233,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.75rem',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L12 22M2 12L22 12" />
            </svg>
          </div>
          <p style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.2rem' }}>
            Current Role
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.6rem', color: '#F1F5F9' }}>Nurse</h2>
          <p style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 0.6rem' }}>
            On duty · ICU / Recovery
          </p>
          <span style={{
            fontSize: '0.62rem', fontWeight: 700, color: '#38BDF8',
            background: 'rgba(14,165,233,0.12)', padding: '0.22rem 0.65rem',
            borderRadius: '999px', border: '1px solid rgba(14,165,233,0.2)',
          }}>
            Next handover in 2h 50m
          </span>
        </div>
      </div>

      {/* ── 4 Stat cards ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.875rem' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1rem 1.1rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>
                    {stat.value}
                  </p>
                </div>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={16} color={stat.color} />
                </div>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#94A3B8', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Bottom 3-col: Quick Actions | Priority Tasks | Live Alerts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>

        {/* Quick Actions */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiClipboard size={14} color="#0EA5E9" />
            </div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {quickLinks.map((w) => (
              <Link
                key={w.label}
                to={w.to}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem', borderRadius: '10px',
                  border: '1px solid #E2E8F0', background: '#F8FAFC',
                  fontSize: '0.84rem', fontWeight: 600, color: '#1E293B',
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}
              >
                {w.label}
                <FiArrowRight size={13} color="#94A3B8" />
              </Link>
            ))}
          </div>
        </div>

        {/* Priority Tasks */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiShield size={14} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Priority Tasks</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {tasks.map((task) => (
              <div key={task.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.6rem 0.85rem', borderRadius: '10px',
                border: '1px solid #E2E8F0', background: '#F8FAFC',
              }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', margin: 0 }}>
                  {task.label}
                </p>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, padding: '0.18rem 0.55rem',
                  borderRadius: '999px', background: task.statusBg, color: task.statusColor,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiAlertCircle size={14} color="#F59E0B" />
            </div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Live Alerts</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {alerts.map((alert) => (
              <div key={alert.title} style={{
                padding: '0.6rem 0.85rem', borderRadius: '10px',
                border: '1px solid #E2E8F0', background: '#F8FAFC',
              }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E293B', margin: '0 0 0.18rem' }}>
                  {alert.title}
                </p>
                <span style={{ fontSize: '0.63rem', color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {alert.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NurseDashboard;
