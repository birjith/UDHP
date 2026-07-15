import React from 'react';

const PatientAppointments = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Appointments</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Your upcoming visits</h1>
          </div>
          <button className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            Schedule a new visit
          </button>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-500">Next appointment</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">Consultation with Dr. Patel</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Tuesday, June 18 · 10:15 AM · City Care Clinic</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-500">Check-in notes</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">Bring a list of current medications</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Remember to arrive 10 minutes early for paperwork.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">History</p>
        <div className="mt-6 space-y-4">
          {[
            { title: 'Routine check-up', date: 'Mar 14, 2026', status: 'Completed' },
            { title: 'Bloodwork review', date: 'Apr 27, 2026', status: 'Completed' },
            { title: 'Dermatology consult', date: 'May 11, 2026', status: 'Canceled' },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
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

export default PatientAppointments;
