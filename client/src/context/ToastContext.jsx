import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

const STYLES = {
  success: { bg: '#F0FDF4', border: '#86EFAC', textColor: '#15803D', iconColor: '#16A34A' },
  error:   { bg: '#FEF2F2', border: '#FCA5A5', textColor: '#B91C1C', iconColor: '#DC2626' },
  warning: { bg: '#FFFBEB', border: '#FCD34D', textColor: '#92400E', iconColor: '#D97706' },
  info:    { bg: '#EFF6FF', border: '#93C5FD', textColor: '#1E40AF', iconColor: '#1D4ED8' },
};

const ICONS = {
  success: FiCheckCircle,
  error:   FiAlertCircle,
  warning: FiAlertTriangle,
  info:    FiInfo,
};

const ToastItem = ({ toast, onRemove }) => {
  const s = STYLES[toast.type] || STYLES.info;
  const Icon = ICONS[toast.type] || FiInfo;

  return (
    <div
      className="animate-slide-left"
      role="alert"
      aria-live="assertive"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
        padding: '0.875rem 1rem',
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        minWidth: '280px', maxWidth: '380px',
        pointerEvents: 'auto',
      }}
    >
      <Icon size={18} color={s.iconColor} style={{ flexShrink: 0, marginTop: '1px' }} />
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1E293B', flex: 1, lineHeight: 1.45 }}>
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, flexShrink: 0, display: 'flex' }}
      >
        <FiX size={14} />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4500) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error',   dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info:    (msg, dur) => addToast(msg, 'info',    dur),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      {children}
      <div
        aria-label="Toast notifications"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          zIndex: 9999, display: 'flex', flexDirection: 'column',
          gap: '0.6rem', pointerEvents: 'none',
        }}
      >
        {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={removeToast} />)}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
};
