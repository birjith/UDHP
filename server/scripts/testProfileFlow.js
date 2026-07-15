const fetch = global.fetch || require('node-fetch');

const BASE = 'http://localhost:5000/api';

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, opts);
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch(e) { body = text; }
  return { status: res.status, body };
}

(async () => {
  const email = 'test.doctor+ci@udhp.local';
  const password = 'Passw0rd!';

  // Try register
  try {
    const reg = await req('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'Test', lastName: 'Doctor', email, phone: '1234567890', password, confirmPassword: password, role: 'doctor' })
    });
    console.log('REGISTER', reg.status, reg.body);
  } catch (e) { console.error('Register error', e); }

  // Login
  const login = await req('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  console.log('LOGIN', login.status, login.body);
  if (!login.body || !login.body.token) return console.error('No token from login');

  const token = login.body.token;

  const profile = await req('/doctor/profile', { headers: { Authorization: `Bearer ${token}` } });
  console.log('PROFILE', profile.status, profile.body);
})();
