import React, { useEffect, useState } from 'react';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ specialization: '', department: '', consultationFee: '', experience: '', qualification: '', theme: 'light', language: 'English', notifications: true });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await doctorApi.getProfile();
        setProfile(response.data.doctor);
        setForm((prev) => ({
          ...prev,
          specialization: response.data.doctor.specialization || '',
          department: response.data.doctor.department || '',
          consultationFee: response.data.doctor.consultationFee || '',
          experience: response.data.doctor.experience || '',
          qualification: response.data.doctor.qualifications?.join(', ') || '',
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      await doctorApi.updateProfile({
        specialization: form.specialization,
        department: form.department,
        consultationFee: Number(form.consultationFee),
        experience: Number(form.experience),
        qualifications: form.qualification.split(',').map((item) => item.trim()),
      });
      setSuccess('Profile changes saved successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  return (
    <div className="doctor-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Settings</p>
          <h2 className="page-title">Update your profile and preferences</h2>
          <p className="page-description">Personalize how you manage notifications, language, and your doctor profile.</p>
        </div>
      </section>

      {loading ? (
        <div className="empty-state">Loading settings…</div>
      ) : (
        <div className="panel-card settings-card">
          <div className="panel-header">
            <div>
              <p className="panel-title">Personal Information</p>
              <p className="panel-subtitle">Manage your doctor profile and access details.</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="settings-section">
              <label>Specialization</label>
              <input value={form.specialization} onChange={handleChange('specialization')} />
            </div>
            <div className="settings-section">
              <label>Department</label>
              <input value={form.department} onChange={handleChange('department')} />
            </div>
            <div className="settings-section">
              <label>Experience (years)</label>
              <input type="number" value={form.experience} onChange={handleChange('experience')} />
            </div>
            <div className="settings-section">
              <label>Consultation Fee</label>
              <input type="number" value={form.consultationFee} onChange={handleChange('consultationFee')} />
            </div>
            <div className="settings-section settings-full">
              <label>Qualifications</label>
              <input value={form.qualification} onChange={handleChange('qualification')} placeholder="MBBS, MD Cardiology" />
            </div>
            <div className="settings-section">
              <label>Language</label>
              <select value={form.language} onChange={handleChange('language')}>
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="settings-section">
              <label>Theme</label>
              <select value={form.theme} onChange={handleChange('theme')}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="settings-section settings-full checkbox-section">
              <label>
                <input type="checkbox" checked={form.notifications} onChange={(e) => setForm({ ...form, notifications: e.target.checked })} />
                Enable email and SMS notifications
              </label>
            </div>
          </div>

          <div className="settings-actions">
            <button className="button-primary" type="button" onClick={handleSave}>
              Save Changes
            </button>
          </div>

          {success && <div className="success-message">{success}</div>}
        </div>
      )}
    </div>
  );
};

export default Settings;
