import React from 'react';
import { FiCreditCard, FiFileText, FiCheckCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';

const bills = [
  { id: 'INV-001', service: 'General Consultation', date: 'Jul 10, 2025', amount: '₹800', status: 'Paid' },
  { id: 'INV-002', service: 'Blood Test – CBC',      date: 'Jul 08, 2025', amount: '₹450', status: 'Paid' },
  { id: 'INV-003', service: 'X-Ray (Chest)',         date: 'Jun 25, 2025', amount: '₹1,200', status: 'Pending' },
  { id: 'INV-004', service: 'Pharmacy – Antibiotics',date: 'Jun 20, 2025', amount: '₹380', status: 'Paid' },
];

const PatientBilling = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

    {/* Header */}
    <div style={{
      borderRadius: '18px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #14532d 100%)',
      padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(16,185,129,0.07)' }} />
      <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Patient Portal</p>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Bills &amp; Insurance</h1>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>View invoices, payment history and insurance claims.</p>
    </div>

    {/* Summary cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
      {[
        { label: 'Total Billed',   value: '₹2,830', icon: FiFileText,    color: '#3B82F6', bg: '#EFF6FF' },
        { label: 'Amount Paid',    value: '₹1,630', icon: FiCheckCircle, color: '#10B981', bg: '#ECFDF5' },
        { label: 'Pending',        value: '₹1,200', icon: FiAlertCircle, color: '#F59E0B', bg: '#FFFBEB' },
      ].map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1rem 1.1rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.35rem' }}>{s.label}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>{s.value}</p>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} color={s.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Bills table */}
    <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Invoice History</h3>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: '#3B82F6', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.4rem 0.85rem', cursor: 'pointer' }}>
          <FiDownload size={13} /> Export PDF
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
            {['Invoice', 'Service', 'Date', 'Amount', 'Status'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '0.55rem 0.75rem', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: '#0F172A' }}>{b.id}</td>
              <td style={{ padding: '0.65rem 0.75rem', color: '#334155' }}>{b.service}</td>
              <td style={{ padding: '0.65rem 0.75rem', color: '#64748B' }}>{b.date}</td>
              <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: '#0F172A' }}>{b.amount}</td>
              <td style={{ padding: '0.65rem 0.75rem' }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, padding: '0.18rem 0.6rem', borderRadius: '999px',
                  background: b.status === 'Paid' ? '#ECFDF5' : '#FFFBEB',
                  color: b.status === 'Paid' ? '#16A34A' : '#D97706',
                }}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Insurance card */}
    <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.85rem' }}>Insurance Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {[
          { label: 'Provider', value: 'Star Health Insurance' },
          { label: 'Policy Number', value: 'SH-2024-00456' },
          { label: 'Coverage Status', value: 'Active' },
        ].map(f => (
          <div key={f.label} style={{ background: '#F8FAFC', borderRadius: '10px', padding: '0.75rem 0.9rem', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.25rem' }}>{f.label}</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PatientBilling;
