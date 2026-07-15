import React, { useState } from 'react';

const SYMPTOM_OPTIONS = [
  'Fever',
  'Cough',
  'Sore throat',
  'Headache',
  'Fatigue',
  'Shortness of breath',
  'Chest pain',
  'Nausea',
  'Vomiting',
  'Runny nose',
  'Rash',
  'Itching',
  'Diarrhea',
  'Muscle pain',
  'Dizziness',
];

const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const buildTermSet = (symptoms, note) => {
  const terms = new Set();
  const entries = [
    ...symptoms.map((item) => normalizeText(item)),
    normalizeText(note),
  ];

  entries.forEach((entry) => {
    if (!entry) return;

    const chunks = entry
      .split(/ and |, |\/|; |\+|\. /)
      .map((item) => normalizeText(item))
      .filter(Boolean);

    chunks.forEach((chunk) => {
      terms.add(chunk);
      chunk.split(' ').forEach((word) => {
        if (word.length > 2) terms.add(word);
      });
    });
  });

  return terms;
};

const DISEASE_RULES = [
  {
    title: 'Possible COVID-19 / viral fever',
    summary: 'Your symptoms look similar to a viral fever or COVID-style infection pattern.',
    advice: 'Rest well, drink plenty of fluids, and seek medical care if fever, cough, or breathing trouble worsens.',
    patterns: [['fever', 'high fever', 'viral fever', 'temperature'], ['cough', 'dry cough', 'corona', 'covid', 'covid-19', 'coronavirus'], ['fatigue', 'tiredness', 'body pain', 'body ache', 'muscle pain', 'headache', 'sore throat']],
    minMatches: 2,
  },
  {
    title: 'Possible flu',
    summary: 'These symptoms commonly match a flu-like illness.',
    advice: 'Take rest, stay hydrated, and contact a doctor if symptoms are strong or lasting.',
    patterns: [['fever', 'high fever'], ['cough', 'body pain', 'muscle pain'], ['fatigue', 'headache']],
    minMatches: 2,
  },
  {
    title: 'Possible common cold',
    summary: 'A common cold is a likely match for these symptoms.',
    advice: 'Rest, drink fluids, and monitor your symptoms for a few days.',
    patterns: [['runny nose', 'stuffy nose', 'sneezing'], ['sore throat', 'throat pain'], ['cough', 'mild fever', 'low fever']],
    minMatches: 2,
  },
  {
    title: 'Possible chickenpox',
    summary: 'A fever with rash and itching can match chickenpox.',
    advice: 'Avoid close contact with others and consult a clinician if the rash spreads or becomes painful.',
    patterns: [['fever', 'high fever'], ['rash', 'blisters', 'pimples'], ['itching', 'itchy']],
    minMatches: 2,
  },
  {
    title: 'Possible dengue',
    summary: 'High fever with severe body pain and rash can fit dengue symptoms.',
    advice: 'Seek medical attention quickly if the fever is high or you feel very weak.',
    patterns: [['high fever', 'fever', 'temperature'], ['headache', 'pain behind eyes', 'body pain', 'muscle pain'], ['rash']],
    minMatches: 2,
  },
  {
    title: 'Possible malaria',
    summary: 'Repeated fever with chills and sweating can match malaria.',
    advice: 'Get medical help promptly if the fever keeps returning or you feel very unwell.',
    patterns: [['fever', 'high fever'], ['chills', 'shivering'], ['sweating', 'sweat', 'headache']],
    minMatches: 2,
  },
  {
    title: 'Possible allergy',
    summary: 'Rash, itching, sneezing, or a runny nose can suggest an allergy.',
    advice: 'Avoid the trigger if possible and seek help if the reaction is severe.',
    patterns: [['rash', 'itching', 'hives'], ['sneezing', 'runny nose', 'watery eyes']],
    minMatches: 2,
  },
  {
    title: 'Possible food poisoning',
    summary: 'Vomiting and diarrhea can match a stomach infection or food-related illness.',
    advice: 'Stay hydrated and avoid solid food for a while if symptoms are strong.',
    patterns: [['vomiting', 'nausea'], ['diarrhea', 'stomach pain']],
    minMatches: 2,
  },
  {
    title: 'Possible migraine',
    summary: 'A strong headache with nausea or dizziness can match migraine symptoms.',
    advice: 'Rest in a quiet place, hydrate, and get medical care if the pain is severe.',
    patterns: [['headache', 'migraine'], ['nausea', 'dizziness']],
    minMatches: 2,
  },
  {
    title: 'Possible pneumonia or serious respiratory issue',
    summary: 'Chest pain, shortness of breath, and fever can point to a serious respiratory problem.',
    advice: 'Get urgent medical attention if breathing feels difficult or the symptoms are severe.',
    patterns: [['chest pain', 'shortness of breath', 'breathlessness'], ['fever', 'cough']],
    minMatches: 2,
  },
];

const getPrediction = (symptoms, note) => {
  const termSet = buildTermSet(symptoms, note);

  const ranked = DISEASE_RULES.map((rule) => {
    const matches = rule.patterns.filter((group) =>
      group.some((keyword) => termSet.has(keyword))
    ).length;

    return {
      ...rule,
      matches,
    };
  })
    .filter((rule) => rule.matches >= rule.minMatches)
    .sort((a, b) => b.matches - a.matches);

  if (ranked.length > 0) {
    const best = ranked[0];
    const confidence = Math.min(95, 55 + best.matches * 10);

    return {
      title: best.title,
      summary: best.summary,
      advice: best.advice,
      confidence: `${confidence}%`,
    };
  }

  return {
    title: 'Needs professional review',
    summary: 'Your symptoms suggest a health issue that should be checked by a doctor.',
    advice: 'A doctor can evaluate your history and recommend the right diagnosis and care.',
    confidence: '40%',
  };
};

const DiseasePrediction = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am your AI health assistant. Please tell me your symptoms, and I will predict a possible disease for you.',
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom]
    );
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && selectedSymptoms.length === 0) return;

    const userMessage = {
      role: 'user',
      text: trimmed || `Symptoms: ${selectedSymptoms.join(', ')}`,
    };

    const prediction = getPrediction(selectedSymptoms, trimmed);
    const assistantMessage = {
      role: 'assistant',
      text: `AI prediction: ${prediction.title}\n\nI matched your symptoms to common disease patterns and found the closest match.\n\n${prediction.summary}\n\nConfidence: ${prediction.confidence}\n\n${prediction.advice}`,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderRadius: '18px', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #38bdf8 100%)', padding: '1.5rem 1.75rem', color: '#fff' }}>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#DBEAFE', margin: '0 0 0.4rem' }}>AI Health Assistant</p>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.35rem' }}>Chat-based disease prediction</h1>
        <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.55 }}>
          The AI assistant predicts the disease itself using built-in symptom patterns and does not send your symptoms to a doctor.
        </p>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.25rem 1.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>Quick symptom tags</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
          {SYMPTOM_OPTIONS.map((symptom) => {
            const active = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                style={{
                  borderRadius: '999px',
                  padding: '0.45rem 0.8rem',
                  border: active ? '1px solid #2563EB' : '1px solid #CBD5E1',
                  background: active ? '#DBEAFE' : '#F8FAFC',
                  color: active ? '#1D4ED8' : '#334155',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1rem', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', overflowY: 'auto', maxHeight: '280px' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%',
                padding: '0.7rem 0.85rem',
                borderRadius: '12px',
                background: message.role === 'user' ? '#2563EB' : '#fff',
                color: message.role === 'user' ? '#fff' : '#0F172A',
                border: message.role === 'assistant' ? '1px solid #E2E8F0' : 'none',
                whiteSpace: 'pre-line',
                lineHeight: 1.5,
              }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your symptoms here..."
            style={{ flex: 1, borderRadius: '10px', border: '1px solid #E2E8F0', padding: '0.7rem 0.9rem', outline: 'none' }}
          />
          <button
            type="button"
            onClick={handleSend}
            style={{ border: 'none', borderRadius: '10px', background: '#2563EB', color: '#fff', padding: '0.7rem 1rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Predict
          </button>
        </div>
      </div>

      <div style={{ background: '#fff7ed', borderRadius: '12px', border: '1px solid #FED7AA', padding: '0.9rem 1rem', color: '#9A2C00' }}>
        <strong>Disclaimer:</strong> This is an AI-based prediction generated by the assistant using built-in symptom patterns. Your symptoms are not sent to a doctor. A doctor should still confirm the diagnosis in person.
      </div>
    </div>
  );
};

export default DiseasePrediction;
