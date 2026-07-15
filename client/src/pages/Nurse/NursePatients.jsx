import React from 'react';

const NursePatients = () => {
  const patients = [
    { name: 'Isabella Ford', room: '4A', status: 'Stable' },
    { name: 'Marcus Lee', room: '3B', status: 'Monitor' },
    { name: 'Priya Singh', room: '7C', status: 'Medication update' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Patient list</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Assigned care roster</h1>

        <div className="mt-8 space-y-4">
          {patients.map((patient) => (
            <div key={patient.name} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{patient.name}</p>
                <p className="text-sm text-slate-500">Room {patient.room}</p>
              </div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{patient.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NursePatients;
