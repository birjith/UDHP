import React from 'react';
import { FiDownload, FiFolder } from 'react-icons/fi';

const PatientDocuments = () => {
  const documents = [
    { title: 'Annual physical summary', date: 'May 22, 2026' },
    { title: 'Lab results - lipid panel', date: 'Apr 28, 2026' },
    { title: 'Chest x-ray report', date: 'Mar 09, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Documents</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Health records</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            <FiFolder className="h-4 w-4" /> Browse files
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {documents.map((document) => (
            <div key={document.title} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <p className="font-semibold text-slate-900">{document.title}</p>
                <p className="mt-1 text-sm text-slate-600">{document.date}</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100">
                <FiDownload className="h-4 w-4" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDocuments;
