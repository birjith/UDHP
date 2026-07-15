import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff,
  FiActivity, FiUserCheck,
} from 'react-icons/fi';

const ROLES = [
  { value: 'patient', label: 'Patient',       icon: '🏥', desc: 'Manage your health records' },
  { value: 'doctor',  label: 'Doctor',         icon: '🩺', desc: 'Manage patients & prescriptions' },
  { value: 'nurse',   label: 'Nurse',          icon: '💉', desc: 'Monitor assigned patients' },
  { value: 'admin',   label: 'Administrator',  icon: '⚙️', desc: 'Full system access' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', confirmPassword: '', role: 'patient',
  });
  const [showPwd, setShowPwd]     = useState(false);
  const [showCPwd, setShowCPwd]   = useState(false);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const { register }              = useAuth();
  const navigate                  = useNavigate();

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setLoading(true);
    try {
      const user = await register(formData);
      setTimeout(() => navigate(`/${user.role}/dashboard`), 400);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* ── Brand Panel ── */}
      <div className="auth-brand-panel">
        <div className="relative z-10 text-center text-white">
          <div className="animate-fade-in-up mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <FiActivity size={38} color="#5EEAD4" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">UDHP</h1>
            <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>
              Unified Digital Health Platform
            </p>
          </div>

          {/* Role preview cards */}
          <div className="mt-8 space-y-3 text-left animate-fade-in-up delay-200">
            {ROLES.map((r) => (
              <div
                key={r.value}
                onClick={() => setFormData({ ...formData, role: r.value })}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  border: '1px solid',
                  borderColor: formData.role === r.value ? 'rgba(94,234,212,0.6)' : 'rgba(255,255,255,0.08)',
                  background: formData.role === r.value ? 'rgba(13,148,136,0.18)' : 'rgba(255,255,255,0.04)',
                }}
              >
                <span className="font-semibold text-sm text-white">{r.icon} {r.label}</span>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Decorative */}
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
          <div className="absolute top-20 right-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div className="auth-form-panel" style={{ overflowY: 'auto' }}>
        <div className="auth-card animate-fade-in-up" style={{ maxWidth: '480px', paddingTop: '1.5rem', paddingBottom: '2rem' }}>
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Create your account
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Join UDHP — secure healthcare at your fingertips
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="udhp-alert-error mb-4 animate-fade-in flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  First Name
                </label>
                <div className="udhp-input-icon-wrapper">
                  <FiUser className="udhp-input-icon" size={15} />
                  <input id="reg-firstname" type="text" className="udhp-input" placeholder="Sarah"
                    value={formData.firstName} onChange={set('firstName')} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  Last Name
                </label>
                <div className="udhp-input-icon-wrapper">
                  <FiUser className="udhp-input-icon" size={15} />
                  <input id="reg-lastname" type="text" className="udhp-input" placeholder="Jenkins"
                    value={formData.lastName} onChange={set('lastName')} required />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div className="udhp-input-icon-wrapper">
                <FiMail className="udhp-input-icon" size={15} />
                <input id="reg-email" type="email" className="udhp-input" placeholder="sarah@udhp.org"
                  value={formData.email} onChange={set('email')} required autoComplete="email" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Phone Number
              </label>
              <div className="udhp-input-icon-wrapper">
                <FiPhone className="udhp-input-icon" size={15} />
                <input id="reg-phone" type="tel" className="udhp-input" placeholder="+1 (555) 000-0000"
                  value={formData.phone} onChange={set('phone')} required />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Account Role
              </label>
              <div className="udhp-input-icon-wrapper">
                <FiUserCheck className="udhp-input-icon" size={15} />
                <select id="reg-role" className="udhp-input udhp-select"
                  value={formData.role} onChange={set('role')}>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.icon} {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  Password
                </label>
                <div className="udhp-input-icon-wrapper" style={{ position: 'relative' }}>
                  <FiLock className="udhp-input-icon" size={15} />
                  <input id="reg-password" type={showPwd ? 'text' : 'password'}
                    className="udhp-input" placeholder="••••••••"
                    value={formData.password} onChange={set('password')}
                    required style={{ paddingRight: '2.5rem' }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                    {showPwd ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  Confirm
                </label>
                <div className="udhp-input-icon-wrapper" style={{ position: 'relative' }}>
                  <FiLock className="udhp-input-icon" size={15} />
                  <input id="reg-confirm-password" type={showCPwd ? 'text' : 'password'}
                    className="udhp-input" placeholder="••••••••"
                    value={formData.confirmPassword} onChange={set('confirmPassword')}
                    required style={{ paddingRight: '2.5rem' }} />
                  <button type="button" onClick={() => setShowCPwd(!showCPwd)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                    {showCPwd ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button id="register-submit" type="submit" className="udhp-btn-primary mt-1" disabled={loading}
              style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', boxShadow: '0 4px 14px rgba(13,148,136,0.4)' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="udhp-spinner" /> Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>already registered?</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
          </div>

          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold"
              style={{ color: 'var(--udhp-primary)', textDecoration: 'none' }}>
              Sign in →
            </Link>
          </p>

          <p className="text-center text-xs mt-5" style={{ color: '#A8B6C8' }}>
            🔒 Your data is encrypted and HIPAA compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
