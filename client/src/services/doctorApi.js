import api from './api';

const doctorApi = {
  getProfile: () => {
    console.log('[doctorApi] GET /doctor/profile');
    return api.get('/doctor/profile');
  },
  updateProfile: (payload) => api.put('/doctor/profile', payload),
  getPatients: () => api.get('/doctor/patients'),
  getAppointments: () => api.get('/doctor/appointments'),
  getMessages: () => api.get('/doctor/messages'),
  getReports: () => api.get('/doctor/reports'),
  updateAppointmentStatus: (appointmentId, status) => api.put(`/doctor/appointments/${appointmentId}`, { status }),
};

export default doctorApi;
