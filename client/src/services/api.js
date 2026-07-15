import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
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
