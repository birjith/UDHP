import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiActivity, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email) return setError('Please enter your email address.');
    setLoading(true);
    // TODO: wire up to backend /api/auth/forgot-password when route is added
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
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

          <div className="mt-10 animate-fade-in-up delay-200">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              Forgot your password? No worries.<br />
              We'll send you a secure reset link.
            </p>
          </div>

          {/* Decorative */}
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
          <div className="absolute top-20 right-8 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div className="auth-form-panel">
        <div className="auth-card animate-fade-in-up">
          {/* Back link */}
          <Link to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <FiArrowLeft size={15} /> Back to sign in
          </Link>

          {!sent ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Reset your password
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Enter the email linked to your UDHP account and we'll send a reset link.
                </p>
              </div>

              {error && (
                <div className="udhp-alert-error mb-4 animate-fade-in flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    Email Address
                  </label>
                  <div className="udhp-input-icon-wrapper">
                    <FiMail className="udhp-input-icon" size={16} />
                    <input
                      id="forgot-email"
                      type="email"
                      className="udhp-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button id="forgot-submit" type="submit" className="udhp-btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="udhp-spinner" /> Sending link…
                    </span>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            /* ── Success State ── */
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                style={{ background: 'var(--udhp-success-light)' }}>
                <FiCheckCircle size={32} color="var(--udhp-success)" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Check your inbox
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                We've sent a password reset link to <br />
                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
              </p>
              <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--udhp-primary)', fontWeight: 600, fontSize: 'inherit', padding: 0 }}
                >
                  try again
                </button>
                .
              </p>
              <Link to="/login"
                className="udhp-btn-primary"
                style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '0.75rem 2rem' }}>
                Return to Sign In
              </Link>
            </div>
          )}

          <p className="text-center text-xs mt-8" style={{ color: '#A8B6C8' }}>
            🔒 Reset links expire after 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
