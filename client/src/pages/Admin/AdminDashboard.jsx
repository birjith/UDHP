import React from 'react';
import {
  FiUsers, FiUserCheck, FiDollarSign, FiHome,
  FiArrowRight, FiTrendingUp, FiCheckCircle, FiDownload, FiUserPlus,
  FiHeart, FiZap, FiAlertTriangle,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

/* ════════════════════════════════════════════════════════════ */

const AdminDashboard = () => {
  const { user } = useAuth();

  /* ── stats ────────────────────────────────────────────────── */
  const stats = [
    { label: 'Total Staff',       value: '1,284', sub: '+12 joined this month', icon: FiUserCheck,   color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Total Patients',    value: '42,809', sub: '+9% from last quarter', icon: FiUsers,      color: '#10B981', bg: '#ECFDF5' },
    { label: "Today's Revenue",   value: '$84.2k', sub: 'Live transaction feed', icon: FiDollarSign, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Occupancy',         value: '88%',    sub: 'Bed utilisation rate',   icon: FiHome,       color: '#EF4444', bg: '#FEF2F2' },
  ];

  /* ── analytics mini-bars (fake sparkline) ────────────────── */
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const barHeights = [45, 60, 38, 72, 55, 80]; // % of max

  /* ── departments ─────────────────────────────────────────── */
  const departments = [
    { name: 'Cardiology', pct: '98%', label: 'Efficient',  color: '#10B981', bg: '#ECFDF5', icon: FiHeart },
    { name: 'Neurology',  pct: '85%', label: 'On track',   color: '#3B82F6', bg: '#EFF6FF', icon: FiZap },
    { name: 'Emergency',  pct: '100%', label: 'Critical',  color: '#EF4444', bg: '#FEF2F2', icon: FiAlertTriangle },
  ];

  /* ── analytics summary pills ─────────────────────────────── */
  const analyticsPills = [
    { label: 'Avg Patient Stay', value: '4.2 Days' },
    { label: 'Readmission Rate', value: '2.4%' },
    { label: 'Primary Turn', value: '1.8 Days' },
    { label: 'Facility Uptime', value: '99.8%' },
  ];

  /* ── recent staff logs ───────────────────────────────────── */
  const logs = [
    { name: 'Dr. Arun Mehta',   role: 'Cardiologist',  action: 'Clocked in',   time: '07:45 AM' },
    { name: 'Nurse Priya S.',   role: 'ICU Nurse',     action: 'Shift start',  time: '08:00 AM' },
    { name: 'Admin Ravi K.',    role: 'Receptionist',  action: 'Record update', time: '09:15 AM' },
    { name: 'Dr. Lina Fernandez', role: 'Neurologist', action: 'Clocked out',  time: '06:30 PM' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ═══ HERO / WELCOME ═══════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '1rem' }}>

        {/* Left hero */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #1e3a8a 100%)',
          padding: '1.75rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(59,130,246,0.08)' }} />
          <div style={{ position: 'absolute', bottom: '-30px', right: '100px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(59,130,246,0.05)' }} />

          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#64748B', margin: '0 0 0.5rem', position: 'relative' }}>
            Administrator Overview
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.25, position: 'relative', color: '#F1F5F9' }}>
            UDHP System Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0, maxWidth: '480px', position: 'relative' }}>
            Real-time infrastructure health and facility performance metrics.
          </p>
        </div>

        {/* Right status card */}
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 100%)',
          padding: '1.5rem 1.25rem', color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem',
          }}>
            <FiCheckCircle size={22} color="#34D399" />
          </div>
          <p style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 0.2rem' }}>
            Current Status
          </p>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#fff' }}>
            Systems Operational
          </h2>
          <span style={{
            fontSize: '0.65rem', fontWeight: 700, color: '#34D399',
            background: 'rgba(16,185,129,0.15)', padding: '0.2rem 0.7rem',
            borderRadius: '999px', border: '1px solid rgba(16,185,129,0.25)',
          }}>
            All services healthy
          </span>
        </div>
      </div>

      {/* ═══ STAT CARDS ═══════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{
              background: '#fff', borderRadius: '16px', padding: '1.1rem 1.25rem',
              border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>
                    {stat.value}
                  </p>
                </div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color={stat.color} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.6rem' }}>
                <FiTrendingUp size={12} color="#10B981" />
                <p style={{ fontSize: '0.74rem', color: '#64748B', margin: 0 }}>{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ ANALYTICS + DEPARTMENT HEALTH ════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1rem' }}>

        {/* Hospital Analytics chart */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.2rem' }}>Hospital Analytics</h3>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>Monthly patient flow and revenue trends</p>
            </div>
            <button style={{
              fontSize: '0.72rem', fontWeight: 600, color: '#3B82F6',
              background: '#EFF6FF', border: '1px solid #BFDBFE',
              borderRadius: '8px', padding: '0.3rem 0.75rem', cursor: 'pointer',
            }}>
              Last 6 Months
            </button>
          </div>

          {/* Mini bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '140px', padding: '0 0.5rem' }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{
                  width: '100%', maxWidth: '42px', height: `${barHeights[i]}%`,
                  borderRadius: '6px 6px 2px 2px',
                  background: i === months.length - 1
                    ? 'linear-gradient(180deg, #3B82F6, #1d4ed8)'
                    : 'linear-gradient(180deg, #CBD5E1, #94A3B8)',
                  transition: 'height 0.3s ease',
                }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.05em' }}>{m}</span>
              </div>
            ))}
          </div>

          {/* Analytics summary pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
            {analyticsPills.map((p) => (
              <div key={p.label} style={{
                background: '#F8FAFC', borderRadius: '10px', padding: '0.6rem 0.75rem',
                border: '1px solid #E2E8F0',
              }}>
                <p style={{ fontSize: '0.58rem', fontWeight: 600, color: '#94A3B8', margin: '0 0 0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {p.label}
                </p>
                <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{p.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Health */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column',
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.2rem' }}>Department Health</h3>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '0 0 1rem' }}>Efficiency & status overview</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div key={dept.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 1rem', borderRadius: '12px', background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '10px', background: dept.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={16} color={dept.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{dept.name}</p>
                      <p style={{ fontSize: '0.68rem', color: '#94A3B8', margin: 0 }}>{dept.pct} · {dept.label}</p>
                    </div>
                  </div>
                  <div style={{
                    width: '60px', height: '4px', borderRadius: '999px', background: '#E2E8F0', overflow: 'hidden',
                  }}>
                    <div style={{ width: dept.pct, height: '100%', borderRadius: '999px', background: dept.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button style={{
            marginTop: '1rem', alignSelf: 'center',
            fontSize: '0.78rem', fontWeight: 600, color: '#3B82F6',
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            Manage All Departments <FiArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ═══ RECENT STAFF LOGS ════════════════════════════════ */}
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem',
        border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.2rem' }}>Recent Staff Logs</h3>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>Real-time staff activity and attendance tracking</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.75rem', fontWeight: 600, color: '#3B82F6',
              background: '#EFF6FF', border: '1px solid #BFDBFE',
              borderRadius: '8px', padding: '0.4rem 0.85rem', cursor: 'pointer',
            }}>
              <FiDownload size={13} /> Export Logs
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.75rem', fontWeight: 600, color: '#fff',
              background: '#1d4ed8', border: 'none',
              borderRadius: '8px', padding: '0.4rem 0.85rem', cursor: 'pointer',
            }}>
              <FiUserPlus size={13} /> Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                {['Name', 'Role', 'Action', 'Time'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '0.6rem 0.75rem',
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#94A3B8',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.65rem 0.75rem', fontWeight: 600, color: '#0F172A' }}>{log.name}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#64748B' }}>{log.role}</td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.55rem',
                      borderRadius: '999px', background: '#F0FDF4', color: '#16A34A',
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#94A3B8', fontSize: '0.78rem' }}>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
