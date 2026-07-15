import React, { useState, useEffect } from 'react';
import {
  FiFileText, FiX, FiDownload, FiCheckCircle,
  FiAlertCircle, FiClock, FiSearch, FiEye, FiUploadCloud,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

/* ─── Static sample reports ───────────────────────────────── */
const STATIC_REPORTS = [
  {
    id:     'RPT-2025-001',
    title:  'Complete Blood Count (CBC)',
    date:   'Jul 10, 2025',
    doctor: 'Dr. Arun Mehta',
    lab:    'City Diagnostics Lab',
    status: 'Normal',
    summary: 'All blood parameters are within the normal reference range. No signs of anaemia, infection or platelet abnormalities detected.',
    parameters: [
      { name: 'Haemoglobin (Hb)',      value: '14.2 g/dL',  ref: '13.0–17.0',  status: 'Normal' },
      { name: 'White Blood Cells (WBC)',value: '7,200 /µL', ref: '4,000–11,000',status: 'Normal' },
      { name: 'Red Blood Cells (RBC)',  value: '5.1 M/µL',  ref: '4.5–5.9',    status: 'Normal' },
      { name: 'Platelets',             value: '2.4 L/µL',  ref: '1.5–4.0 L',  status: 'Normal' },
      { name: 'MCV',                   value: '88 fL',      ref: '80–100',      status: 'Normal' },
      { name: 'MCH',                   value: '29 pg',      ref: '27–33',       status: 'Normal' },
    ],
    notes: 'Repeat CBC recommended in 6 months as part of routine monitoring.',
  },
  {
    id:     'RPT-2025-002',
    title:  'Lipid Profile Panel',
    date:   'Jul 05, 2025',
    doctor: 'Dr. Lina Fernandez',
    lab:    'Apollo Diagnostics',
    status: 'Attention',
    summary: 'LDL Cholesterol is mildly elevated. Dietary modification and physical activity recommended before considering medication.',
    parameters: [
      { name: 'Total Cholesterol', value: '218 mg/dL', ref: '<200',      status: 'High' },
      { name: 'HDL Cholesterol',   value: '52 mg/dL',  ref: '>40',       status: 'Normal' },
      { name: 'LDL Cholesterol',   value: '148 mg/dL', ref: '<130',      status: 'High' },
      { name: 'Triglycerides',     value: '142 mg/dL', ref: '<150',      status: 'Normal' },
      { name: 'VLDL',              value: '28 mg/dL',  ref: '5–40',      status: 'Normal' },
    ],
    notes: 'Follow-up lipid profile after 3 months of dietary changes. Avoid saturated fats and increase omega-3 intake.',
  },
  {
    id:     'RPT-2025-003',
    title:  'Thyroid Function Test (TFT)',
    date:   'Jun 28, 2025',
    doctor: 'Dr. Arun Mehta',
    lab:    'City Diagnostics Lab',
    status: 'Normal',
    summary: 'Thyroid hormone levels (T3, T4, TSH) are all within the normal physiological range. Thyroid function is adequate.',
    parameters: [
      { name: 'TSH',  value: '2.8 mIU/L',  ref: '0.4–4.0',  status: 'Normal' },
      { name: 'T3',   value: '1.4 nmol/L', ref: '1.2–2.1',  status: 'Normal' },
      { name: 'T4',   value: '88 nmol/L',  ref: '60–120',   status: 'Normal' },
      { name: 'Free T4 (fT4)', value: '14 pmol/L', ref: '12–22', status: 'Normal' },
    ],
    notes: 'No evidence of hypothyroidism or hyperthyroidism. Annual screening recommended.',
  },
  {
    id:     'RPT-2025-004',
    title:  'Blood Glucose – Fasting',
    date:   'Jun 20, 2025',
    doctor: 'Dr. Lina Fernandez',
    lab:    'HealthFirst Labs',
    status: 'Pending',
    summary: 'Fasting blood glucose result is pending confirmation. Repeat test under fasting conditions may be required.',
    parameters: [
      { name: 'Fasting Blood Glucose', value: '102 mg/dL', ref: '70–99',   status: 'High' },
      { name: 'HbA1c',                 value: '5.8%',       ref: '<5.7%',   status: 'High' },
    ],
    notes: 'Pre-diabetic range detected. Lifestyle intervention recommended. Repeat HbA1c in 3 months.',
  },
  {
    id:     'RPT-2025-005',
    title:  'Urine Routine Examination',
    date:   'Jun 15, 2025',
    doctor: 'Dr. Arun Mehta',
    lab:    'Apollo Diagnostics',
    status: 'Normal',
    summary: 'Urine routine is normal. No protein, glucose, blood or casts detected. Kidney function appears intact.',
    parameters: [
      { name: 'Colour',    value: 'Yellow', ref: 'Yellow',     status: 'Normal' },
      { name: 'pH',        value: '6.2',    ref: '4.5–8.0',   status: 'Normal' },
      { name: 'Protein',   value: 'Nil',    ref: 'Nil',        status: 'Normal' },
      { name: 'Glucose',   value: 'Nil',    ref: 'Nil',        status: 'Normal' },
      { name: 'RBC',       value: '0–1/hpf',ref: '0–2/hpf',  status: 'Normal' },
      { name: 'Pus Cells', value: '2–3/hpf',ref: '0–5/hpf',  status: 'Normal' },
    ],
    notes: 'Normal urinalysis. No further action required.',
  },
];

/* ─── Status helpers ──────────────────────────────────────── */
const STATUS_CONFIG = {
  Normal:    { color: '#16A34A', bg: '#ECFDF5', border: '#BBF7D0', icon: FiCheckCircle },
  Attention: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', icon: FiAlertCircle },
  Pending:   { color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE', icon: FiClock },
  High:      { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', icon: FiAlertCircle },
};

/* ─── Modal ───────────────────────────────────────────────── */
const ReportModal = ({ report, onClose, onDownload }) => {
  const cfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.Normal;
  const StatusIcon = cfg.icon;

  return (
    /* backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* modal card — stop propagation so clicking inside doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '680px',
          maxHeight: '85vh', overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(15,23,42,0.35)',
        }}
      >
        {/* Modal header */}
        <div style={{
          borderRadius: '20px 20px 0 0',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e3a8a 100%)',
          padding: '1.5rem 1.75rem',
          color: '#fff',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <FiX size={16} />
          </button>

          <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>
            Lab Report · {report.id}
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#F1F5F9', lineHeight: 1.3 }}>
            {report.title}
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Date',    value: report.date },
              { label: 'Doctor',  value: report.doctor },
              { label: 'Lab',     value: report.lab },
            ].map(m => (
              <div key={m.label}>
                <span style={{ fontSize: '0.58rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.label}: </span>
                <span style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 600 }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal body */}
        <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Status + summary */}
          <div style={{
            borderRadius: '12px', padding: '0.9rem 1.1rem',
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
          }}>
            <StatusIcon size={18} color={cfg.color} style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: cfg.color, margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {report.status}
              </p>
              <p style={{ fontSize: '0.84rem', color: '#334155', margin: 0, lineHeight: 1.6 }}>{report.summary}</p>
            </div>
          </div>

          {/* Parameters table */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Test Parameters
            </h4>
            <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Parameter', 'Result', 'Reference Range', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.65rem 0.85rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.parameters.map((p, i) => {
                    const pCfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.Normal;
                    return (
                      <tr key={i} style={{ borderBottom: i < report.parameters.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: '#0F172A' }}>{p.name}</td>
                        <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700, color: p.status === 'High' ? '#EF4444' : '#0F172A' }}>{p.value}</td>
                        <td style={{ padding: '0.65rem 0.85rem', color: '#64748B' }}>{p.ref}</td>
                        <td style={{ padding: '0.65rem 0.85rem' }}>
                          <span style={{
                            fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.55rem',
                            borderRadius: '999px', background: pCfg.bg, color: pCfg.color,
                          }}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor notes */}
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '0.9rem 1.1rem', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', margin: '0 0 0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Doctor's Notes
            </p>
            <p style={{ fontSize: '0.84rem', color: '#334155', margin: 0, lineHeight: 1.65 }}>{report.notes}</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '0.5rem 1.1rem', cursor: 'pointer' }}
            >
              Close
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDownload(report); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                background: '#1d4ed8', border: 'none', borderRadius: '10px',
                padding: '0.5rem 1.1rem', cursor: 'pointer',
              }}
            >
              <FiDownload size={14} /> Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main page ───────────────────────────────────────────── */
const LabReports = () => {
  const { user } = useAuth();
  const [selected, setSelected]   = useState(null);
  const [search,   setSearch]     = useState('');
  const [filter,   setFilter]     = useState('All');
  const [allReports, setAllReports] = useState(STATIC_REPORTS);

  const handleDownload = (report) => {
    const content = [
      `Lab Report: ${report.title}`,
      `ID: ${report.id}`,
      `Date: ${report.date}`,
      `Doctor: ${report.doctor}`,
      `Lab: ${report.lab}`,
      `Status: ${report.status}`,
      '',
      'Summary',
      report.summary || '',
      '',
      'Parameters',
      ...(report.parameters || []).map((p) => `${p.name}: ${p.value} (${p.ref}) [${p.status}]`),
      '',
      'Notes',
      report.notes || '',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(report.title || 'report').replace(/\s+/g, '-').toLowerCase()}-${report.id || 'download'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /* Load nurse-uploaded reports from localStorage */
  useEffect(() => {
    try {
      const normalize = (value = '') => String(value).trim().toLowerCase().replace(/\s+/g, ' ');
      const patientFirst = normalize(user?.firstName || '');
      const patientLast = normalize(user?.lastName || '');
      const patientName = normalize(`${user?.firstName || ''} ${user?.lastName || ''}`);
      const patientId = user?._id ? `PT-${String(user._id).slice(-6).toUpperCase()}` : null;
      const rawPatientId = user?._id ? String(user._id) : user?.patientId ? String(user.patientId) : '';

      const nameCandidates = [patientName];
      if (patientFirst) nameCandidates.push(patientFirst);
      if (patientLast) nameCandidates.push(patientLast);
      if (patientFirst && patientLast) {
        nameCandidates.push(`${patientFirst} ${patientLast}`);
        nameCandidates.push(`${patientLast} ${patientFirst}`);
      }

      const idCandidates = [];
      if (patientId) idCandidates.push(normalize(patientId));
      if (rawPatientId) {
        idCandidates.push(normalize(rawPatientId));
        idCandidates.push(normalize(`PT-${String(rawPatientId).slice(-6).toUpperCase()}`));
      }
      if (user?.id) {
        idCandidates.push(normalize(String(user.id)));
      }

      const matchesPatient = (report) => {
        if (!report.patientName && !report.patientId) return true;

        const reportPatientName = normalize(report.patientName || '');
        const reportPatientId = normalize(report.patientId || '');
        const reportPatientKey = normalize(report.patientKey || '');

        const nameMatches = nameCandidates.some((candidate) => candidate && reportPatientName === candidate);
        const idMatches = idCandidates.some((candidate) =>
          (candidate && reportPatientId === candidate) ||
          (candidate && reportPatientKey === candidate)
        );

        return nameMatches || idMatches;
      };

      const nurseReports = JSON.parse(localStorage.getItem('nurse_lab_reports') || '[]');
      const patientSpecificReports = Object.keys(localStorage)
        .filter((key) => key.startsWith('nurse_lab_reports_'))
        .flatMap((key) => {
          try {
            return JSON.parse(localStorage.getItem(key) || '[]');
          } catch {
            return [];
          }
        });

      const mergedReports = [...nurseReports, ...patientSpecificReports].filter((report, index, array) => {
        const firstIndex = array.findIndex((item) => item.id === report.id);
        return firstIndex === index;
      });

      setAllReports([...mergedReports.filter(matchesPatient), ...STATIC_REPORTS]);
    } catch {
      setAllReports(STATIC_REPORTS);
    }
  }, [user]);

  const filtered = allReports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase())
      || r.doctor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Header hero */}
      <div style={{
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e3a8a 100%)',
        padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(59,130,246,0.07)' }} />
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Patient Portal</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Lab Reports</h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>View and download your diagnostic test results.</p>
      </div>

      {/* Toolbar: search + filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px',
          background: '#fff', borderRadius: '10px', padding: '0.5rem 0.85rem',
          border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <FiSearch size={14} color="#94A3B8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reports or doctor…"
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem', color: '#334155', width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'Normal', 'Attention', 'Pending'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontSize: '0.74rem', fontWeight: 600, padding: '0.45rem 0.9rem', borderRadius: '8px', cursor: 'pointer',
                background: filter === f ? '#1d4ed8' : '#fff',
                color:      filter === f ? '#fff'     : '#64748B',
                border:     filter === f ? 'none'     : '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Report cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8', fontSize: '0.88rem' }}>
            No reports match your search.
          </div>
        )}

        {filtered.map((report) => {
          const cfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.Normal;
          const StatusIcon = cfg.icon;
          const isNurseUploaded = !!report.uploadedBy;

          return (
            <div
              key={report.id}
              style={{
                background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem',
                border: `1px solid ${isNurseUploaded ? '#BFDBFE' : '#E2E8F0'}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
              onClick={() => setSelected(report)}
            >
              {/* Icon */}
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
                background: isNurseUploaded ? '#EFF6FF' : '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isNurseUploaded
                  ? <FiUploadCloud size={20} color="#3B82F6" />
                  : <FiFileText size={20} color="#64748B" />
                }
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{report.title}</p>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: '999px',
                    background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                    display: 'inline-flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap',
                  }}>
                    <StatusIcon size={10} /> {report.status}
                  </span>
                  {isNurseUploaded && (
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: '999px',
                      background: '#EFF6FF', color: '#1d4ed8', border: '1px solid #BFDBFE',
                      display: 'inline-flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap',
                    }}>
                      <FiUploadCloud size={9} /> Uploaded by Nurse
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.74rem', color: '#64748B', margin: 0 }}>
                  {report.date} &nbsp;·&nbsp; {report.doctor} &nbsp;·&nbsp; {report.lab}
                </p>
              </div>

              {/* Report ID */}
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94A3B8', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {report.id}
              </span>

              {/* View button */}
              <button
                onClick={e => { e.stopPropagation(); setSelected(report); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.75rem', fontWeight: 700, color: '#3B82F6',
                  background: '#EFF6FF', border: '1px solid #BFDBFE',
                  borderRadius: '8px', padding: '0.4rem 0.85rem', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <FiEye size={13} /> View
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && <ReportModal report={selected} onClose={() => setSelected(null)} onDownload={handleDownload} />}
    </div>
  );
};

export default LabReports;
