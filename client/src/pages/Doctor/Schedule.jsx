import React, { useEffect, useState } from 'react';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await doctorApi.getAppointments();
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const updateStatus = async (appointmentId, status) => {
    try {
      await doctorApi.updateAppointmentStatus(appointmentId, status);
      setAppointments((prev) => prev.map((item) => (item._id === appointmentId ? { ...item, status } : item)));
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="doctor-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Appointment Schedule</p>
          <h2 className="page-title">Today's and upcoming appointments</h2>
          <p className="page-description">Manage patient visits, accept requests, and complete consultations in one workflow.</p>
        </div>
      </section>

      <div className="panel-card">
        <div className="panel-header">
          <div>
            <p className="panel-title">Calendar overview</p>
            <p className="panel-subtitle">{today} — {appointments.length} appointments scheduled</p>
          </div>
          <button className="panel-action">New appointment</button>
        </div>

        {loading ? (
          <div className="empty-state">Loading schedule…</div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">No appointments scheduled yet.</div>
        ) : (
          <div className="schedule-grid">
            {appointments.map((appointment) => (
              <article key={appointment._id} className="schedule-card">
                <div className="schedule-header">
                  <div>
                    <p className="schedule-patient">{appointment.patientId?.userId ? `${appointment.patientId.userId.firstName} ${appointment.patientId.userId.lastName}` : 'Patient'}</p>
                    <p className="schedule-meta">{appointment.reason || 'General consultation'}</p>
                  </div>
                  <span className={`status-badge ${appointment.status}`}>{appointment.status}</span>
                </div>
                <div className="schedule-details">
                  <p><strong>Time:</strong> {appointment.timeSlot || new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div className="schedule-actions">
                  <button className="button-secondary" onClick={() => updateStatus(appointment._id, 'completed')}>
                    Complete
                  </button>
                  <button className="button-secondary" onClick={() => updateStatus(appointment._id, 'cancelled')}>
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
