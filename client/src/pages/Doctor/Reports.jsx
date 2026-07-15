import React, { useEffect, useState } from 'react';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await doctorApi.getReports();
        setReports(response.data.reports || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const pending = reports.filter((report) => report.status !== 'completed').length;
  const approved = reports.filter((report) => report.status === 'completed').length;

  return (
    <div className="doctor-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Reports Dashboard</p>
          <h2 className="page-title">Manage lab reports and approvals</h2>
          <p className="page-description">Track report status, preview files, and upload new results for your patients.</p>
        </div>
      </section>

      <div className="stat-grid">
        <article className="stat-card">
          <p className="stat-card-label">Uploaded Reports</p>
          <h3 className="stat-card-value">{reports.length}</h3>
          <p className="stat-card-note">All reports currently associated with your patients.</p>
        </article>
        <article className="stat-card">
          <p className="stat-card-label">Pending Reports</p>
          <h3 className="stat-card-value">{pending}</h3>
          <p className="stat-card-note">Reports awaiting review or approval.</p>
        </article>
        <article className="stat-card">
          <p className="stat-card-label">Approved Reports</p>
          <h3 className="stat-card-value">{approved}</h3>
          <p className="stat-card-note">Reports marked complete and shared.</p>
        </article>
        <article className="stat-card">
          <p className="stat-card-label">Drafts & Uploads</p>
          <h3 className="stat-card-value">{reports.filter((report) => report.status === 'ordered').length}</h3>
          <p className="stat-card-note">Reports still in processing or scheduled status.</p>
        </article>
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <div>
            <p className="panel-title">Report queue</p>
            <p className="panel-subtitle">Review report details, preview attachments, and download patient files.</p>
          </div>
          <button className="panel-action">Upload report</button>
        </div>

        {loading ? (
          <div className="empty-state">Loading reports…</div>
        ) : reports.length === 0 ? (
          <div className="empty-state">No reports available yet.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Test</th>
                  <th>Test Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.patientId?.userId ? `${report.patientId.userId.firstName} ${report.patientId.userId.lastName}` : 'Patient'}</td>
                    <td>{report.testName}</td>
                    <td>{new Date(report.testDate).toLocaleDateString()}</td>
                    <td>{report.status}</td>
                    <td>
                      <button className="button-link">Preview</button>
                      <button className="button-secondary">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
