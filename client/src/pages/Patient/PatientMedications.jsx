import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const PatientMedications = () => {
  const medications = [
    { name: 'Atorvastatin', dose: '20 mg', schedule: 'Once daily', status: 'Active' },
    { name: 'Metformin', dose: '500 mg', schedule: 'Twice daily', status: 'Active' },
    { name: 'Vitamin D', dose: '1000 IU', schedule: 'Once daily', status: 'Review' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Medications</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Current prescriptions</h1>
          </div>
          <button className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            Review instructions
            <FiChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="mt-8 space-y-4">
          {medications.map((item) => (
            <div key={item.name} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">{item.dose} • {item.schedule}</p>
              </div>
              <span className={`inline-flex h-9 items-center rounded-full px-3 text-sm font-semibold ${
                item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientMedications;
