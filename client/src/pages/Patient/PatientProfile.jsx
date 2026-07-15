import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiShield, FiBell, FiEdit2, FiSave } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const PatientProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const patientName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : 'Patient';
  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'P';
  const patientId = user?._id
    ? `PT-${user._id.toString().slice(-6).toUpperCase()}`
    : 'PT-000001';

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    email:     user?.email     || '',
    phone:     user?.phone     || '',
    bloodGroup: 'B+',
    dob:       '1995-06-12',
    address:   '42, MG Road, Bangalore, KA 560001',
  });

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const Field = ({ label, name, icon: Icon, readOnly }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: editing && !readOnly ? '#fff' : '#F8FAFC', border: `1px solid ${editing && !readOnly ? '#93C5FD' : '#E2E8F0'}`, borderRadius: '10px', padding: '0.6rem 0.9rem' }}>
        <Icon size={14} color="#94A3B8" />
        <input
          name={name}
          value={form[name]}
          onChange={handle}
          readOnly={!editing || readOnly}
          style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.84rem', color: '#334155', width: '100%' }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Header */}
      <div style={{
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e3a8a 100%)',
        padding: '1.5rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(59,130,246,0.08)' }} />
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>Patient Portal</p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#F1F5F9' }}>Profile Settings</h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Manage your personal information and preferences.</p>
      </div>

      {/* Profile card + form */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1rem' }}>

        {/* Avatar card */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem 1rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', fontWeight: 800, color: '#fff',
          }}>
            {initials}
          </div>
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.15rem' }}>{patientName}</p>
            <p style={{ fontSize: '0.68rem', color: '#94A3B8', margin: 0 }}>{patientId}</p>
          </div>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#16A34A', background: '#ECFDF5', padding: '0.2rem 0.7rem', borderRadius: '999px', border: '1px solid #BBF7D0' }}>
            Active Patient
          </span>
          <div style={{ width: '100%', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {[
              { label: 'Blood Group', value: form.bloodGroup },
              { label: 'Date of Birth', value: form.dob },
            ].map(i => (
              <div key={i.label} style={{ background: '#F8FAFC', borderRadius: '8px', padding: '0.5rem 0.7rem', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '0.58rem', fontWeight: 700, color: '#94A3B8', margin: '0 0 0.15rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{i.label}</p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{i.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Personal Information</h3>
            <button
              onClick={() => setEditing(e => !e)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', borderRadius: '8px',
                padding: '0.4rem 0.85rem', border: editing ? '1px solid #BBF7D0' : '1px solid #BFDBFE',
                background: editing ? '#ECFDF5' : '#EFF6FF', color: editing ? '#16A34A' : '#3B82F6',
              }}
            >
              {editing ? <><FiSave size={13} /> Save</> : <><FiEdit2 size={13} /> Edit</>}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <Field label="First Name"  name="firstName" icon={FiUser} />
            <Field label="Last Name"   name="lastName"  icon={FiUser} />
            <Field label="Email"       name="email"     icon={FiMail}  readOnly />
            <Field label="Phone"       name="phone"     icon={FiPhone} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Address" name="address" icon={FiShield} />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications preference */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiBell size={14} color="#F59E0B" />
          </div>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Notification Preferences</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {['Appointment reminders', 'Lab result notifications', 'Prescription alerts', 'Messages from care team'].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{n}</span>
              <div style={{ width: '36px', height: '20px', borderRadius: '999px', background: '#3B82F6', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ position: 'absolute', right: '3px', top: '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
