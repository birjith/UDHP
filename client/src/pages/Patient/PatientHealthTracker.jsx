import React from 'react';
import { FiActivity, FiHeart, FiDroplet, FiThermometer } from 'react-icons/fi';

const vitals = [
  { label: 'Heart Rate',    value: '72', unit: 'bpm',   color: '#EF4444', bg: '#FEF2F2', icon: FiHeart,       status: 'Normal' },
  { label: 'Blood Pressure',value: '118/78', unit: 'mmHg', color: '#3B82F6', bg: '#EFF6FF', icon: FiActivity, status: 'Normal' },
  { label: 'Blood Glucose', value: '95', unit: 'mg/dL', color: '#F59E0B', bg: '#FFFBEB', icon: FiDroplet,     status: 'Normal' },
  { label: 'Temperature',   value: '98.6', unit: '°F',  color: '#10B981', bg: '#ECFDF5', icon: FiThermometer, status: 'Normal' },
];

const weekData = [62, 58, 45, 72, 88, 76, 65]; // fake weekly step % relative to goal
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PatientHealthTracker = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

    {/* Header */}
    <div style={{
      borderRadius: '18px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #7c3aed 100%)',
      padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(139,92,246,0.1)' }} />
      <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Patient Portal</p>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Health Tracker</h1>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Monitor your vitals, activity and wellness trends.</p>
    </div>

    {/* Vitals cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.875rem' }}>
      {vitals.map((v) => {
        const Icon = v.icon;
        return (
          <div key={v.label} style={{ background: '#fff', borderRadius: '14px', padding: '1rem 1.1rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.35rem' }}>{v.label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>
                  {v.value} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>{v.unit}</span>
                </p>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={v.color} />
              </div>
            </div>
            <span style={{ display: 'inline-block', marginTop: '0.55rem', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '999px', background: '#ECFDF5', color: '#16A34A' }}>
              ✓ {v.status}
            </span>
          </div>
        );
      })}
    </div>

    {/* Activity chart + goals */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>

      {/* Weekly steps bar chart */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem' }}>Weekly Step Activity</h3>
        <p style={{ fontSize: '0.74rem', color: '#94A3B8', margin: '0 0 1.25rem' }}>Goal: 10,000 steps/day</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.85rem', height: '120px' }}>
          {days.map((d, i) => (
            <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '100%', height: `${weekData[i]}%`,
                borderRadius: '6px 6px 2px 2px',
                background: i === 6 ? 'linear-gradient(180deg,#8B5CF6,#7C3AED)' : 'linear-gradient(180deg,#C4B5FD,#A78BFA)',
              }} />
              <span style={{ fontSize: '0.58rem', fontWeight: 600, color: '#94A3B8' }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Goals */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.85rem' }}>Wellness Goals</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'Daily Steps',   pct: 76, color: '#8B5CF6' },
            { label: 'Water Intake',  pct: 88, color: '#3B82F6' },
            { label: 'Sleep Quality', pct: 62, color: '#10B981' },
            { label: 'Calories',      pct: 55, color: '#F59E0B' },
          ].map(g => (
            <div key={g.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>{g.label}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: g.color }}>{g.pct}%</span>
              </div>
              <div style={{ height: '6px', borderRadius: '999px', background: '#E2E8F0', overflow: 'hidden' }}>
                <div style={{ width: `${g.pct}%`, height: '100%', borderRadius: '999px', background: g.color, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PatientHealthTracker;
