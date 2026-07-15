import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiActivity,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiSettings,
} from 'react-icons/fi';
import './DoctorSidebar.css';

const navItems = [
  { label: 'Dashboard', to: '/doctor/dashboard', icon: FiActivity },
  { label: 'Patients', to: '/doctor/patients', icon: FiUsers },
  { label: 'Schedule', to: '/doctor/schedule', icon: FiCalendar },
  { label: 'Messages', to: '/doctor/messages', icon: FiMessageSquare },
  { label: 'Reports', to: '/doctor/reports', icon: FiFileText },
  { label: 'Settings', to: '/doctor/settings', icon: FiSettings },
];

const DoctorSidebar = ({ doctor, onLogout }) => {
  return (
    <aside className="doctor-sidebar">
      <div className="sidebar-brand">
        <div>
          <p className="brand-caption">Doctor Portal</p>
          <h1 className="brand-title">{doctor?.userId ? `${doctor.userId.firstName} ${doctor.userId.lastName}` : 'Doctor'}</h1>
          <p className="brand-note">Hospital ID: {doctor?.licenseNumber || 'N/A'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-link-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
