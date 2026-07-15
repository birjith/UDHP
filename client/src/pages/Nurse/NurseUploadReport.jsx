import React, { useEffect, useMemo, useState } from 'react';
import {
  FiUpload, FiPlus, FiTrash2, FiCheckCircle, FiUser,
  FiFileText, FiAlertCircle, FiSearch,
} from 'react-icons/fi';
import api from '../../services/api';

const TEST_TYPES = [
  'Complete Blood Count (CBC)',
  'Lipid Profile Panel',
  'Thyroid Function Test (TFT)',
  'Blood Glucose – Fasting',
  'Urine Routine Examination',
  'Liver Function Test (LFT)',
  'Kidney Function Test (KFT)',
  'HbA1c',
  'ECG Report',
  'X-Ray Analysis',
  'Custom / Other',
];

const emptyParam = () => ({ name: '', value: '', ref: '', status: 'Normal' });

const NurseUploadReport = () => {
  const [submitted, setSubmitted] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [form, setForm] = useState({
    patientId: '',
    testName:  '',
    customTest:'',
    doctor:    '',
    lab:       '',
    date:      new Date().toISOString().split('T')[0],
    summary:   '',
    notes:     '',
    status:    'Normal',
    params:    [emptyParam()],
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        const response = await api.get('/nurse/patients');
        setPatients(response.data.patients || []);
      } catch (error) {
        console.error('Unable to load registered patients', error);
        setPatients([]);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const query = patientSearch.trim().toLowerCase();

    if (!query) return patients;

    return patients.filter((patient) => {
      const searchableText = `${patient.name} ${patient.displayId || ''} ${patient.patientId || ''} ${patient.email || ''} ${patient.phone || ''}`.toLowerCase();
      return searchableText.includes(query);
    });
  }, [patientSearch, patients]);

  /* ── helpers ─────────────────────────────────────────── */
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setParam = (i, key, val) =>
    setForm(f => {
      const params = [...f.params];
      params[i] = { ...params[i], [key]: val };
      return { ...f, params };
    });

  const addParam    = () => setForm(f => ({ ...f, params: [...f.params, emptyParam()] }));
  const removeParam = (i) => setForm(f => ({ ...f, params: f.params.filter((_, idx) => idx !== i) }));

  /* ── submit: save to localStorage ───────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedPatient = patients.find((p) => p.id === form.patientId || p.patientId === form.patientId || p._id === form.patientId);
    const testName = form.testName === 'Custom / Other' ? form.customTest : form.testName;

    const report = {
      id: `RPT-${Date.now()}`,
      patientId: selectedPatient?.id || form.patientId,
      patientName: selectedPatient?.name || 'Unknown',
      patientDisplayId: selectedPatient?.displayId || '',
      title: testName,
      date: new Date(form.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctor: form.doctor,
      lab: form.lab,
      status: form.status,
      summary: form.summary,
      notes: form.notes,
      parameters: form.params.filter((p) => p.name.trim()),
      uploadedBy: 'Nurse',
    };

    const existing = JSON.parse(localStorage.getItem('nurse_lab_reports') || '[]');
    const patientStorageKey = `nurse_lab_reports_${selectedPatient?.id || form.patientId}`;
    const patientReports = JSON.parse(localStorage.getItem(patientStorageKey) || '[]');

    localStorage.setItem('nurse_lab_reports', JSON.stringify([report, ...existing]));
    localStorage.setItem(patientStorageKey, JSON.stringify([report, ...patientReports]));

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      patientId: '', testName: '', customTest: '',
      doctor: '', lab: '',
      date: new Date().toISOString().split('T')[0],
      summary: '', notes: '', status: 'Normal',
      params: [emptyParam()],
    });
  };

  /* ── field style helper ──────────────────────────────── */
  const inputStyle = {
    width: '100%', border: '1px solid #E2E8F0', borderRadius: '10px',
    padding: '0.55rem 0.9rem', fontSize: '0.84rem', color: '#334155',
    outline: 'none', background: '#F8FAFC', boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', fontSize: '0.63rem', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748B',
    marginBottom: '0.35rem',
  };

  /* ── success screen ─────────────────────────────────── */
  if (submitted) {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #0f172a 0%, #14532d 100%)',
          padding: '1.5rem 2rem', color: '#fff',
        }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#F1F5F9' }}>Report Uploaded</h1>
        </div>
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '2.5rem',
          border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center',
        }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCheckCircle size={32} color="#16A34A" />
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Report saved successfully!</h2>
          <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0, maxWidth: '360px', lineHeight: 1.65 }}>
            The lab report has been added to the patient's records. The patient can now view it in their Lab Reports page.
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
            <button
              onClick={handleReset}
              style={{
                fontSize: '0.82rem', fontWeight: 700, padding: '0.55rem 1.25rem', borderRadius: '10px',
                background: '#1d4ed8', color: '#fff', border: 'none', cursor: 'pointer',
              }}
            >
              Upload Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── main form ──────────────────────────────────────── */
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Hero header */}
      <div style={{
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)',
        padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(14,165,233,0.08)' }} />
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Nurse Portal</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Upload Patient Report</h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Add a lab or health report to a patient's record. It will appear immediately in their Lab Reports page.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* ── Section 1: Patient & Test Info ── */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiUser size={14} color="#0EA5E9" />
            </div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Patient &amp; Test Details</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>

            {/* Patient selector */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Select Patient *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.55rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <FiSearch size={14} color="#94A3B8" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="search"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="Search by name, ID, email or phone"
                    style={{ ...inputStyle, paddingLeft: '2.2rem' }}
                  />
                </div>
              </div>
              {loadingPatients ? (
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Loading registered patients…</div>
              ) : filteredPatients.length > 0 ? (
                <select
                  required
                  value={form.patientId}
                  onChange={(e) => set('patientId', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">— Choose a patient —</option>
                  {filteredPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} — {patient.displayId} {patient.email ? `• ${patient.email}` : ''}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ fontSize: '0.8rem', color: '#64748B', border: '1px dashed #CBD5E1', borderRadius: '10px', padding: '0.8rem', background: '#F8FAFC' }}>
                  No registered patients were found for the hospital registry.
                </div>
              )}
            </div>

            {/* Test type */}
            <div>
              <label style={labelStyle}>Test / Report Type *</label>
              <select
                required
                value={form.testName}
                onChange={e => set('testName', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">— Select test —</option>
                {TEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Custom test name */}
            {form.testName === 'Custom / Other' && (
              <div>
                <label style={labelStyle}>Custom Test Name *</label>
                <input
                  required
                  value={form.customTest}
                  onChange={e => set('customTest', e.target.value)}
                  placeholder="Enter test name…"
                  style={inputStyle}
                />
              </div>
            )}

            {/* Doctor */}
            <div>
              <label style={labelStyle}>Doctor / Physician *</label>
              <input
                required
                value={form.doctor}
                onChange={e => set('doctor', e.target.value)}
                placeholder="Dr. Name"
                style={inputStyle}
              />
            </div>

            {/* Lab */}
            <div>
              <label style={labelStyle}>Lab / Facility *</label>
              <input
                required
                value={form.lab}
                onChange={e => set('lab', e.target.value)}
                placeholder="Lab name"
                style={inputStyle}
              />
            </div>

            {/* Date */}
            <div>
              <label style={labelStyle}>Report Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Overall status */}
            <div>
              <label style={labelStyle}>Overall Status *</label>
              <select
                required
                value={form.status}
                onChange={e => set('status', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="Normal">Normal</option>
                <option value="Attention">Attention Required</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Summary */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Report Summary *</label>
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={e => set('summary', e.target.value)}
                placeholder="Brief summary of findings…"
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Test Parameters ── */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiFileText size={14} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Test Parameters</h3>
            </div>
            <button
              type="button"
              onClick={addParam}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.74rem', fontWeight: 700, color: '#3B82F6',
                background: '#EFF6FF', border: '1px solid #BFDBFE',
                borderRadius: '8px', padding: '0.35rem 0.8rem', cursor: 'pointer',
              }}
            >
              <FiPlus size={13} /> Add Row
            </button>
          </div>

          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 36px', gap: '0.5rem', marginBottom: '0.4rem' }}>
            {['Parameter Name', 'Result', 'Reference Range', 'Status', ''].map(h => (
              <span key={h} style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {form.params.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 36px', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  value={p.name}
                  onChange={e => setParam(i, 'name', e.target.value)}
                  placeholder="e.g. Haemoglobin"
                  style={inputStyle}
                />
                <input
                  value={p.value}
                  onChange={e => setParam(i, 'value', e.target.value)}
                  placeholder="e.g. 14.2 g/dL"
                  style={inputStyle}
                />
                <input
                  value={p.ref}
                  onChange={e => setParam(i, 'ref', e.target.value)}
                  placeholder="e.g. 13.0–17.0"
                  style={inputStyle}
                />
                <select
                  value={p.status}
                  onChange={e => setParam(i, 'status', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', padding: '0.55rem 0.4rem' }}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeParam(i)}
                  disabled={form.params.length === 1}
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    background: form.params.length === 1 ? '#F8FAFC' : '#FEF2F2',
                    border: '1px solid', borderColor: form.params.length === 1 ? '#E2E8F0' : '#FECACA',
                    color: form.params.length === 1 ? '#CBD5E1' : '#EF4444',
                    cursor: form.params.length === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: Doctor notes ── */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiAlertCircle size={14} color="#F59E0B" />
            </div>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Doctor's Notes &amp; Instructions</h3>
          </div>
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Follow-up instructions, dietary advice, medication notes…"
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              fontSize: '0.82rem', fontWeight: 600, padding: '0.6rem 1.4rem', borderRadius: '10px',
              background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0', cursor: 'pointer',
            }}
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={loadingPatients || patients.length === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.84rem', fontWeight: 700, padding: '0.6rem 1.6rem', borderRadius: '10px',
              background: loadingPatients || patients.length === 0 ? '#94A3B8' : '#1d4ed8', color: '#fff', border: 'none', cursor: loadingPatients || patients.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow: loadingPatients || patients.length === 0 ? 'none' : '0 4px 12px rgba(29,78,216,0.3)',
            }}
          >
            <FiUpload size={15} /> Upload Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default NurseUploadReport;
