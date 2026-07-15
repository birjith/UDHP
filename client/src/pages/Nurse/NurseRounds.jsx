import React from 'react';

const NurseRounds = () => {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Today's rounds</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Nurse patrol schedule</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Ward 4A', details: '12 patients • 3 urgent follow-ups' },
          { title: 'ICU', details: '5 patients • 1 medication review' },
          { title: 'Recovery', details: '8 patients • 2 therapy checks' },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{item.title}</p>
            <p className="mt-3 text-base text-slate-700">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseRounds;
