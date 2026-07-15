import React from 'react';
import DoctorSidebar from './DoctorSidebar';
import './DoctorDashboardLayout.css';

const DoctorDashboardLayout = ({ doctor, onLogout, children }) => {
  return (
    <div className="doctor-layout">
      <DoctorSidebar doctor={doctor} onLogout={onLogout} />
      <div className="doctor-content">
        <div className="doctor-topbar">
          <div className="topbar-search">
            <input type="search" placeholder="Search patients, reports, or appointments" />
          </div>
          <div className="topbar-profile">
            <div>
              <p className="topbar-label">{doctor?.userId ? `${doctor.userId.firstName} ${doctor.userId.lastName}` : 'Doctor'}</p>
              <p className="topbar-meta">{doctor?.specialization || 'General Medicine'}</p>
            </div>
            <div className="topbar-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFF6FF', color: '#1D4ED8', fontWeight: 800 }}>
              {doctor?.userId ? `${doctor.userId.firstName?.[0] || ''}${doctor.userId.lastName?.[0] || ''}`.toUpperCase() : 'DR'}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
