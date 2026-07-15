import React from 'react';

const NurseMessages = () => {
  const messages = [
    { from: 'Dr. Patel', subject: 'Medication update', time: '9:14 AM' },
    { from: 'Lab Team', subject: 'Bloodwork ready', time: '8:42 AM' },
    { from: 'Admin', subject: 'Shift handover notes', time: 'Yesterday' },
  ];

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-slate-200">
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Messages</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Team communications</h1>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div key={`${message.from}-${message.time}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{message.subject}</p>
                <p className="text-sm text-slate-500">From {message.from}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseMessages;
