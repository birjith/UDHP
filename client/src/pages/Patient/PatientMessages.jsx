import React, { useState } from 'react';
import { FiMessageSquare, FiSend, FiSearch } from 'react-icons/fi';

const contacts = [
  { name: 'Dr. Arun Mehta',   role: 'Cardiologist',   initial: 'AM', color: '#3B82F6', bg: '#EFF6FF', lastMsg: 'Your report looks fine.', time: '10:32 AM', unread: 0 },
  { name: 'Dr. Lina Fernandez', role: 'Neurologist',  initial: 'LF', color: '#8B5CF6', bg: '#F5F3FF', lastMsg: 'Please come for a follow-up.', time: '9:15 AM', unread: 1 },
  { name: 'Nurse Priya S.',   role: 'ICU Nurse',       initial: 'PS', color: '#10B981', bg: '#ECFDF5', lastMsg: 'Medication schedule updated.', time: 'Yesterday', unread: 0 },
  { name: 'Reception Desk',   role: 'Admin',           initial: 'RD', color: '#F59E0B', bg: '#FFFBEB', lastMsg: 'Your appointment confirmed.', time: 'Yesterday', unread: 0 },
];

const demoMessages = [
  { from: 'them', text: 'Hello! How are you feeling today?', time: '9:00 AM' },
  { from: 'me',   text: 'I am feeling much better, thank you doctor.', time: '9:05 AM' },
  { from: 'them', text: 'Your report looks fine. Continue the medication.', time: '10:32 AM' },
];

const PatientMessages = () => {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState('');

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Header */}
      <div style={{
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)',
        padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(14,165,233,0.08)' }} />
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Patient Portal</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Messages</h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Communicate securely with your care team.</p>
      </div>

      {/* Chat layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1rem', height: '480px' }}>

        {/* Contact list */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0.9rem 1rem', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#F8FAFC', borderRadius: '8px', padding: '0.4rem 0.75rem', border: '1px solid #E2E8F0' }}>
              <FiSearch size={12} color="#94A3B8" />
              <input placeholder="Search…" style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.78rem', color: '#334155', width: '100%' }} />
            </div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {contacts.map((c, i) => (
              <div
                key={c.name}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.65rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', transition: 'background 0.15s',
                  background: active === i ? '#F0F9FF' : 'transparent',
                  borderLeft: active === i ? '3px solid #3B82F6' : '3px solid transparent',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: c.color, flexShrink: 0 }}>
                  {c.initial}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                    <span style={{ fontSize: '0.6rem', color: '#94A3B8', flexShrink: 0 }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{c.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: contacts[active].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: contacts[active].color }}>
              {contacts[active].initial}
            </div>
            <div>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{contacts[active].name}</p>
              <p style={{ fontSize: '0.68rem', color: '#94A3B8', margin: 0 }}>{contacts[active].role}</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {demoMessages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '65%', padding: '0.6rem 0.9rem', borderRadius: m.from === 'me' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: m.from === 'me' ? '#1d4ed8' : '#F1F5F9',
                  color: m.from === 'me' ? '#fff' : '#334155',
                  fontSize: '0.82rem',
                }}>
                  <p style={{ margin: '0 0 0.2rem' }}>{m.text}</p>
                  <span style={{ fontSize: '0.6rem', opacity: 0.65 }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: '10px', padding: '0.55rem 0.9rem', fontSize: '0.82rem', color: '#334155', outline: 'none', background: '#F8FAFC' }}
            />
            <button
              onClick={() => setInput('')}
              style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#1d4ed8', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <FiSend size={15} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMessages;
