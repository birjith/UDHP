import React from 'react';

const NurseSettings = () => {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Settings</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Account and preferences</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Notifications</p>
          <p className="mt-2 text-sm text-slate-600">Manage your alerts for patient updates, messages, and shift changes.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Privacy</p>
          <p className="mt-2 text-sm text-slate-600">Review permissions for patient records and secure channel access.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Shift</p>
          <p className="mt-2 text-sm text-slate-600">Update your default work area and preferred handover times.</p>
        </div>
      </div>
    </div>
  );
};

export default NurseSettings;
