import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://udhp.onrender.com/api';

export const normalizeApiBaseUrl = (value) => {
    if (!value) return DEFAULT_API_BASE_URL;

    const trimmedValue = value.trim();
    if (!trimmedValue) return DEFAULT_API_BASE_URL;

    try {
        const url = new URL(trimmedValue.replace(/\/+$/, ''));
        const pathname = url.pathname.replace(/\/+$/, '');

        if (pathname === '' || pathname === '/') {
            url.pathname = '/api';
        } else if (pathname.endsWith('/api/auth')) {
            url.pathname = pathname.replace(/\/auth$/, '');
        } else if (pathname.endsWith('/auth')) {
            const basePath = pathname.replace(/\/auth$/, '');
            url.pathname = basePath ? `${basePath}/api` : '/api';
        } else if (pathname.endsWith('/api')) {
            url.pathname = pathname;
        } else {
            url.pathname = `${pathname}/api`;
        }

        return url.toString().replace(/\/$/, '');
    } catch (error) {
        return trimmedValue.endsWith('/api')
            ? trimmedValue.replace(/\/+$/, '')
            : `${trimmedValue.replace(/\/+$/, '')}/api`;
    }
};

const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

const api = axios.create({
    baseURL: apiBaseUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: log responses and handle 401 centrally
api.interceptors.response.use(
    (response) => {
        // Lightweight logging for successful responses
        try {
            // avoid noisy logs in production
            if (process.env.NODE_ENV !== 'production') {
                console.log('[API]', response.config.method.toUpperCase(), response.config.url, response.status);
            }
        } catch (e) {
            /* ignore logging errors */
        }
        return response;
    },
    (error) => {
        // Log error details
        try {
            console.error('[API ERROR]', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status, error.response?.data || error.message);
        } catch (e) {
            console.error('[API ERROR]', error.message || error);
        }

        // If unauthorized, clear token and reload to force login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Redirect to login explicitly
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
