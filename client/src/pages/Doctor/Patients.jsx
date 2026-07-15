import React, { useEffect, useMemo, useState } from 'react';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const statusLabels = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'no-show': 'No-show',
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await doctorApi.getPatients();
        setPatients(response.data.patients || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const query = search.toLowerCase();
    return patients.filter((patient) => {
      return (
        (patient.name || '').toLowerCase().includes(query) ||
        (patient.gender || '').toLowerCase().includes(query) ||
        (patient.bloodGroup || '').toLowerCase().includes(query) ||
        (patient.disease || '').toLowerCase().includes(query)
      );
    });
  }, [patients, search]);

  return (
    <div className="doctor-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Patient Records</p>
          <h2 className="page-title">Manage your patient roster</h2>
          <p className="page-description">Search across patient history, review their vitals, and open detailed records in one view.</p>
        </div>
      </section>

      <div className="panel-card">
        <div className="panel-header">
          <div>
            <p className="panel-title">Patient List</p>
            <p className="panel-subtitle">Track visits, diagnoses, and care status.</p>
          </div>
          <div className="panel-action-group">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients by name, disease, or blood group"
              className="panel-search"
            />
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading patients…</div>
        ) : filteredPatients.length === 0 ? (
          <div className="empty-state">No patients found matching your search.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Disease</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.bloodGroup}</td>
                    <td>{patient.disease}</td>
                    <td>{new Date(patient.lastVisit).toLocaleDateString() || 'N/A'}</td>
                    <td>{statusLabels[patient.status] || patient.status}</td>
                    <td>
                      <button className="button-link" onClick={() => setSelected(patient)}>
                        View
                      </button>
                      <button className="button-secondary" onClick={() => setSelected(patient)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <section className="panel-card detail-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Patient details</p>
              <p className="panel-subtitle">Complete information for {selected.name}.</p>
            </div>
            <button className="panel-action" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
          <div className="detail-grid">
            <div className="detail-card">
              <h4>Contact</h4>
              <p>{selected.email}</p>
              <p>{selected.contact}</p>
            </div>
            <div className="detail-card">
              <h4>Health Info</h4>
              <p>Blood Group: {selected.bloodGroup}</p>
              <p>Gender: {selected.gender}</p>
              <p>Disease: {selected.disease}</p>
            </div>
            <div className="detail-card">
              <h4>Medical Timeline</h4>
              <p>Last visit: {new Date(selected.lastVisit).toLocaleDateString()}</p>
              <p>Status: {statusLabels[selected.status] || selected.status}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Patients;
