import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiActivity } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(email, password);
      setTimeout(() => {
        if (user.role === 'patient') navigate('/patient/dashboard');
        else if (user.role === 'doctor') navigate('/doctor/dashboard');
        else if (user.role === 'nurse') navigate('/nurse/dashboard');
        else if (user.role === 'admin') navigate('/admin/dashboard');
      }, 350);
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* ── Brand Panel ── */}
      <div className="auth-brand-panel">
        <div className="relative z-10 text-center text-white">
          {/* Logo mark */}
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

          {/* Feature bullets */}
          <div className="mt-10 space-y-4 text-left animate-fade-in-up delay-200">
            {[
              { icon: '🔒', title: 'Secure & HIPAA Ready',   sub: 'End-to-end encrypted health data' },
              { icon: '👥', title: 'Multi-Role Access',       sub: 'Doctors, Nurses, Patients & Admins' },
              { icon: '📊', title: 'Real-Time Analytics',     sub: 'Live dashboards and health insights' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{f.title}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative circles */}
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
          <div className="absolute top-20 right-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div className="auth-form-panel">
        <div className="auth-card animate-fade-in-up">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Sign in to access your health dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="udhp-alert-error mb-5 animate-fade-in flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div className="udhp-input-icon-wrapper">
                <FiMail className="udhp-input-icon" size={16} />
                <input
                  id="login-email"
                  type="email"
                  className="udhp-input"
                  placeholder="doctor@udhp.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium"
                  style={{ color: 'var(--udhp-primary)', textDecoration: 'none' }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="udhp-input-icon-wrapper" style={{ position: 'relative' }}>
                <FiLock className="udhp-input-icon" size={16} />
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  className="udhp-input"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '2.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: 'absolute', right: '0.9rem', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0
                  }}
                >
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button id="login-submit" type="submit" className="udhp-btn-primary" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="udhp-spinner" /> Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
          </div>

          {/* Register link */}
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold"
              style={{ color: 'var(--udhp-primary)', textDecoration: 'none' }}
            >
              Create account →
            </Link>
          </p>

          {/* Footer note */}
          <p className="text-center text-xs mt-6" style={{ color: '#A8B6C8' }}>
            🔒 Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
