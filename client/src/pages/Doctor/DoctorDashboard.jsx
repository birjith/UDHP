import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiSearch,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiSettings,
  FiActivity,
  FiArrowRight,
  FiZap,
  FiShield,
  FiTablet,
  FiHeart,
  FiClock,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from './DoctorDashboard.module.css';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const doctorName = user?.firstName ? `Dr. ${user.firstName} ${user.lastName || ''}` : 'Dr. Sarah Jenkins';
  const firstName = user?.firstName || 'Sarah';
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const navItems = [
    { label: 'Dashboard', icon: FiActivity, to: '/doctor/dashboard' },
    { label: 'Patients', icon: FiUsers, to: '/doctor/patients' },
    { label: 'Schedule', icon: FiCalendar, to: '/doctor/schedule' },
    { label: 'Messages', icon: FiMessageSquare, to: '/doctor/messages', badge: true },
    { label: 'Reports', icon: FiFileText, to: '/doctor/reports' },
    { label: 'Settings', icon: FiSettings, to: '/doctor/settings' },
  ];

  const stats = [
    { label: 'Total Patients', value: '1,284', note: '+12% from last month', icon: FiUsers },
    { label: "Today's Appointments", value: '14', note: '4 consultations remaining', icon: FiCalendar },
    { label: 'Pending Reports', value: '8', note: '2 critical alerts', icon: FiFileText, danger: true },
    { label: 'Avg. Consult Time', value: '24m', note: 'Optimal target: 20m', icon: FiClock },
  ];

  const queuePatients = [
    {
      name: 'Robert Thompson',
      note: 'Post-surgery follow up',
      time: '10:30 AM',
      status: 'In Progress',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Elena Rodriguez',
      note: 'General Cardiology Consult',
      time: '11:15 AM',
      status: 'Waiting',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'James Wilson',
      note: 'Emergency Chest Pain',
      time: '11:50 AM',
      status: 'Waiting',
      urgent: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    },
  ];

  const vitals = [
    { patient: 'A. Vance', metric: '72 BPM', label: 'Stable', color: '#34d399', bars: [80, 95, 88, 92] },
    { patient: 'M. Chen', metric: '98 O₂ Sat', label: 'Monitoring', color: '#f87171', bars: [65, 78, 92, 100] },
  ];

  const cards = [
    { title: 'Prescription Engine', description: 'Draft secure digital prescriptions with drug-drug interaction checks.', icon: FiTablet, accent: '#bfdbfe' },
    { title: 'Health Summaries', description: 'AI-powered extraction of key patient milestones and lab results.', icon: FiShield, accent: '#d8b4fe' },
    { title: 'Team Sync', description: 'Secure channel for nurse handovers and department consultations.', icon: FiZap, accent: '#fed7aa' },
  ];

  return (
    <div className={styles.dashboardPage}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brandCard}>
            <div className={styles.brandLabel}>Doctor Portal</div>
            <h2 className={styles.brandName}>Dr. Jenkins</h2>
            <p className={styles.brandId}>Hospital ID: 8829</p>
          </div>
          <nav className={styles.navList}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return item.to === '/doctor/dashboard' ? (
                <Link key={item.label} to={item.to} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                  <span className={styles.navIcon}>
                    <Icon />
                  </span>
                  {item.label}
                  {item.badge && <span className={styles.navBadge} />}
                </Link>
              ) : (
                <button key={item.label} type="button" className={styles.navItem}>
                  <span className={styles.navIcon}>
                    <Icon />
                  </span>
                  {item.label}
                  {item.badge && <span className={styles.navBadge} />}
                </button>
              );
            })}
          </nav>
        </div>
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.headerRow}>
          <div className={styles.searchBar}>
            <FiSearch className={styles.searchIcon} />
            <input className={styles.searchInput} placeholder="Search patients, reports, or schedules..." />
          </div>
          <div className={styles.profileSummary}>
            <div className={styles.specialtyCard}>
              <div>
                <div className={styles.specialtyLabel}>Specialty</div>
                <p className={styles.specialtyText}>Cardiology Specialist</p>
              </div>
              <FiUsers className="text-white" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=80"
              alt="Doctor avatar"
              className={styles.avatar}
            />
          </div>
        </div>

        <div className={styles.welcomeRow}>
          <div className={styles.welcomeText}>
            <div className={styles.welcomeLabel}>Hello, Dr.</div>
            <h1 className={styles.welcomeTitle}>{doctorName}</h1>
            <p className={styles.welcomeSubtitle}>Manage appointments, review patient history, and deliver prescriptions with confidence.</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={styles.statCard}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={styles.statLabel}>{stat.label}</p>
                    <p className={styles.statValue}>{stat.value}</p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className={styles.statMeta}>
                  <span>{stat.note}</span>
                  {stat.danger ? <span className="text-rose-600 font-semibold">!</span> : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.mainGrid}>
          <section className={styles.appointmentCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionTitle}>Appointment Management</p>
                <p className={styles.sectionMeta}>Today's Queue</p>
              </div>
              <div className={styles.tabGroup}>
                <button className={`${styles.tabButton} ${styles.active}`}>All</button>
                <button className={styles.tabButton}>Urgent</button>
                <button className={styles.tabButton}>Follow-up</button>
              </div>
            </div>
            <div className={styles.queueList}>
              {queuePatients.map((patient) => (
                <div key={patient.name} className={`${styles.queueCard} ${patient.urgent ? styles.urgent : ''}`}>
                  <div className={styles.patientAvatar}>
                    <img src={patient.avatar} alt={patient.name} />
                  </div>
                  <div className={styles.queueInfo}>
                    <p className={styles.patientName}>{patient.name}</p>
                    <p className={styles.patientNote}>{patient.note}</p>
                  </div>
                  <div className={styles.queueStatus}>
                    <span
                      className={`${styles.statusBadge} ${
                        patient.urgent ? styles.urgent : patient.status === 'Confirmed' ? styles.confirmed : styles.waiting
                      }`}
                    >
                      {patient.urgent ? 'URGENT' : patient.status}
                    </span>
                    <span className="text-sm text-slate-500">{patient.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className={styles.vitalsCard}>
            <div className={styles.vitalsContent}>
              <div className={styles.vitalsHeader}>
                <div>
                  <p className={styles.vitalsTitle}>Real-time Vitals</p>
                  <p className={styles.vitalsUnit}>Unit 4B</p>
                </div>
                <FiHeart className="text-cyan-400 h-6 w-6" />
              </div>
              {vitals.map((item) => (
                <div key={item.patient} className={styles.vitalsCardItem}>
                  <div className={styles.vitalsPatient}>
                    <div>
                      <p className={styles.vitalsPatientName}>{item.patient}</p>
                      <p className={styles.vitalsPatientTag}>{item.label}</p>
                    </div>
                    <p className={styles.vitalsMetric}>{item.metric}</p>
                  </div>
                  <div className={styles.vitalsStatus}>
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </div>
                  <div className={styles.vitalsGraph}>
                    {item.bars.map((value, index) => (
                      <div
                        key={index}
                        className={styles.vitalsBar}
                        style={{ height: `${value}%`, background: index % 2 === 0 ? item.color : '#1e293b' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <button className={styles.monitorButton}>Open Monitoring Hub</button>
            </div>
          </aside>
        </div>

        <div className={styles.bottomGrid}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className={styles.actionCard}>
                <div className={styles.actionIcon} style={{ background: card.accent }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={styles.actionTitle}>{card.title}</h3>
                <p className={styles.actionText}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
