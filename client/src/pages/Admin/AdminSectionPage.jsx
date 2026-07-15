import React from 'react';

const AdminSectionPage = ({ title, description, accent = '#2563eb', type = 'default' }) => {
  const renderContent = () => {
    switch (type) {
      case 'doctors':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
              {[
                ['Active doctors', '24'],
                ['Pending approvals', '3'],
                ['On-call today', '7'],
              ].map(([label, value]) => (
                <div key={label} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.9rem', background: '#F8FAFC' }}>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.6rem' }}>Doctor operations</h3>
              <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', lineHeight: 1.7 }}>
                <li>Review physician schedules and staffing.</li>
                <li>Approve new doctor accounts and credentials.</li>
                <li>Monitor specialist availability and coverage.</li>
              </ul>
            </div>
          </>
        );
      case 'patients':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
              {[
                ['Registered patients', '186'],
                ['Admissions today', '14'],
                ['Critical follow-ups', '5'],
              ].map(([label, value]) => (
                <div key={label} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.9rem', background: '#F8FAFC' }}>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.6rem' }}>Patient actions</h3>
              <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', lineHeight: 1.7 }}>
                <li>Manage patient profiles and medical records.</li>
                <li>Track admissions, discharges, and referrals.</li>
                <li>Flag patients needing urgent follow-up.</li>
              </ul>
            </div>
          </>
        );
      case 'nurses':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
              {[
                ['Assigned nurses', '18'],
                ['Shift coverage', '92%'],
                ['Care rounds pending', '6'],
              ].map(([label, value]) => (
                <div key={label} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.9rem', background: '#F8FAFC' }}>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.6rem' }}>Nursing operations</h3>
              <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', lineHeight: 1.7 }}>
                <li>Coordinate nursing assignments and ward coverage.</li>
                <li>Review patient care rounds and handovers.</li>
                <li>Ensure shift tasks are completed on time.</li>
              </ul>
            </div>
          </>
        );
      case 'departments':
        return (
          <>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {[
                ['Emergency', 'High demand'],
                ['ICU', 'Stable capacity'],
                ['Radiology', '2 slots available'],
              ].map(([name, status]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.8rem 0.95rem', background: '#F8FAFC' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>{name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{status}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 'analytics':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
              {[
                ['Occupancy rate', '78%'],
                ['Avg. wait time', '12 min'],
                ['Lab turnaround', '1.4 hrs'],
              ].map(([label, value]) => (
                <div key={label} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.9rem', background: '#F8FAFC' }}>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', alignItems: 'stretch' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Patient volume trend</h3>
                  <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 700 }}>Last 7 days</span>
                </div>
                <svg viewBox="0 0 320 140" style={{ width: '100%', height: '140px' }}>
                  <path d="M10 110 C45 92, 70 88, 95 84 S140 78, 165 72 S210 54, 235 58 S280 70, 310 34" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                  <path d="M10 110 C45 92, 70 88, 95 84 S140 78, 165 72 S210 54, 235 58 S280 70, 310 34" fill="none" stroke="#93C5FD" strokeWidth="10" strokeLinecap="round" opacity="0.2" />
                  {['10','95','165','235','310'].map((x, idx) => (
                    <circle key={x} cx={x} cy={[110,84,72,58,34][idx]} r="4" fill="#2563EB" />
                  ))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748B', marginTop: '0.2rem' }}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.8rem' }}>Care distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    ['Emergency', 42],
                    ['ICU', 28],
                    ['Outpatient', 30],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#334155' }}>
                        <span>{label}</span><span>{value}%</span>
                      </div>
                      <div style={{ height: '8px', borderRadius: '999px', background: '#E2E8F0' }}>
                        <div style={{ width: `${value}%`, height: '8px', borderRadius: '999px', background: value === 42 ? '#2563EB' : value === 28 ? '#10B981' : '#F59E0B' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.5rem' }}>What this means</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                Patient visits are trending upward this week, while emergency care remains the largest share of service demand. Staffing and bed planning should stay focused on urgent care capacity.
              </p>
            </div>
          </>
        );
      case 'management':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
              {[
                ['Bed occupancy', '84%'],
                ['Critical alerts', '3'],
                ['Pending approvals', '5'],
              ].map(([label, value]) => (
                <div key={label} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.9rem', background: '#F8FAFC' }}>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.7rem' }}>Priority operations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    ['Reassign ICU beds', 'High priority'],
                    ['Review equipment maintenance', 'Today'],
                    ['Approve transfer requests', 'Pending'],
                  ].map(([task, status]) => (
                    <div key={task} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '0.7rem 0.8rem', background: '#fff' }}>
                      <span style={{ fontWeight: 700, color: '#0F172A' }}>{task}</span>
                      <span style={{ fontSize: '0.76rem', color: status === 'High priority' ? '#DC2626' : '#2563EB', fontWeight: 700 }}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.7rem' }}>Workflow summary</h3>
                <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', lineHeight: 1.7 }}>
                  <li>Monitor ward utilization and bed readiness.</li>
                  <li>Coordinate urgent inpatient transfers.</li>
                  <li>Escalate critical supply and equipment issues.</li>
                </ul>
              </div>
            </div>
          </>
        );
      case 'settings':
        return (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Appointment reminders', 'Enabled'],
              ['Auto report sync', 'Enabled'],
              ['Admin two-factor auth', 'Required'],
            ].map(([name, state]) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.8rem 0.95rem', background: '#F8FAFC' }}>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{name}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: accent }}>{state}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', background: '#F8FAFC' }}>
            <p style={{ margin: 0, color: '#475569' }}>This section is ready for the relevant admin workflow.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '18px',
        padding: '1.4rem 1.6rem',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.14)',
      }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.4rem' }}>
          Admin Portal
        </p>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{title}</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', margin: '0.45rem 0 0', maxWidth: '700px' }}>
          {description}
        </p>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '1.5rem',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
      }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminSectionPage;
