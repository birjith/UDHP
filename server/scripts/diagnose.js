/**
 * scripts/diagnose.js
 *
 * Run with:  node scripts/diagnose.js
 *
 * Tests (in order):
 *  1. MONGO_URI loaded from .env
 *  2. DNS SRV resolution  (_mongodb._tcp.<cluster>)
 *  3. TCP connectivity to each shard (port 27017)
 *  4. TLS handshake to each shard   (the actual step Atlas blocks)
 *  5. Full Mongoose connection attempt
 */

require('dotenv').config();
const net  = require('net');
const tls  = require('tls');
const dns  = require('dns').promises;

// ─────────────────────────────────────────────────────────────────────────────

function pad(label, width = 28) {
  return label.padEnd(width);
}

function testTCP(host, port, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const sock = net.createConnection({ host, port, timeout: timeoutMs });
    const timer = setTimeout(() => { sock.destroy(); resolve({ ok: false, reason: 'TIMEOUT' }); }, timeoutMs);
    sock.on('connect', () => { clearTimeout(timer); sock.destroy(); resolve({ ok: true }); });
    sock.on('error',   (e) => { clearTimeout(timer); resolve({ ok: false, reason: e.message }); });
  });
}

function testTLS(host, port, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const sock = tls.connect({ host, port, servername: host, timeout: timeoutMs, rejectUnauthorized: false });
    const timer = setTimeout(() => { sock.destroy(); resolve({ ok: false, reason: 'TIMEOUT' }); }, timeoutMs);
    sock.on('secureConnect', () => {
      clearTimeout(timer);
      const cipher = sock.getCipher()?.name ?? 'n/a';
      sock.destroy();
      resolve({ ok: true, cipher });
    });
    sock.on('error', (e) => {
      clearTimeout(timer);
      // TLS alert 80 = internal_error = Atlas rejected IP at TLS layer
      const isAlert80 = e.message.includes('alert number 80') || e.message.includes('internal error');
      resolve({ ok: false, reason: e.message, isAlert80 });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  MongoDB Atlas Connectivity Diagnostics');
  console.log('══════════════════════════════════════════════════════\n');

  // ── 1. MONGO_URI ────────────────────────────────────────────────────────
  console.log('── 1. Environment ─────────────────────────────────────');
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log('✗ MONGO_URI is not set in .env');
    return;
  }
  const safeUri = uri.replace(/:([^@]+)@/, ':****@');
  console.log(`${pad('MONGO_URI')} ${safeUri}`);

  const hasPlaceholder = uri.includes('<password>') || uri.includes('<db_password>');
  if (hasPlaceholder) {
    console.log('✗ MONGO_URI still contains a <password> placeholder — replace it!');
    return;
  }
  console.log(`${pad('Placeholder password?')} No ✓`);

  const hostMatch = uri.match(/@([^/?]+)/);
  if (!hostMatch) { console.log('✗ Cannot parse hostname from URI'); return; }
  const srvHost = hostMatch[1];
  console.log(`${pad('SRV hostname')} ${srvHost}`);

  const mongoose = require('mongoose');
  console.log(`${pad('Mongoose version')} v${mongoose.version}`);
  console.log(`${pad('Node.js version')} ${process.version}\n`);

  // ── 2. DNS SRV ──────────────────────────────────────────────────────────
  console.log('── 2. DNS SRV Resolution ──────────────────────────────');
  let shards = [];
  try {
    const records = await dns.resolveSrv(`_mongodb._tcp.${srvHost}`);
    shards = records.map((r) => ({ host: r.name, port: r.port }));
    console.log(`✓ Resolved ${shards.length} shard(s):`);
    shards.forEach((s) => console.log(`     ${s.host}:${s.port}`));
  } catch (e) {
    console.log(`✗ SRV lookup FAILED: ${e.message}`);
    console.log('  → DNS issue or no internet connection');
    return;
  }
  console.log();

  // ── 3. TCP ──────────────────────────────────────────────────────────────
  console.log('── 3. TCP Connectivity (port 27017) ───────────────────');
  let anyTcpFail = false;
  for (const s of shards) {
    const r = await testTCP(s.host, s.port);
    const icon = r.ok ? '✓' : '✗';
    const note = r.ok ? 'OK' : `FAIL [${r.reason}]`;
    console.log(`  ${icon} ${s.host}:${s.port}  →  ${note}`);
    if (!r.ok) {
      anyTcpFail = true;
      if (r.reason === 'TIMEOUT') {
        console.log('    ↳ Port 27017 is blocked by Windows Firewall, antivirus, ISP, or VPN');
      }
    }
  }
  console.log();

  if (anyTcpFail) {
    console.log('✗ TCP blocked — fix your firewall / ISP before proceeding.\n');
    return;
  }

  // ── 4. TLS handshake ────────────────────────────────────────────────────
  console.log('── 4. TLS Handshake ───────────────────────────────────');
  let anyTlsFail = false;
  for (const s of shards) {
    const r = await testTLS(s.host, s.port);
    if (r.ok) {
      console.log(`  ✓ ${s.host}:${s.port}  →  OK (cipher: ${r.cipher})`);
    } else {
      console.log(`  ✗ ${s.host}:${s.port}  →  FAIL`);
      console.log(`    Error: ${r.reason}`);
      if (r.isAlert80) {
        anyTlsFail = true;
        console.log('    ↳ TLS alert 80 = Atlas rejected the connection at the TLS layer.');
        console.log('      This is an IP whitelist block — Atlas refuses BEFORE MongoDB');
        console.log('      wire protocol starts (hence servers:{}, commonWireVersion:0).');
        console.log('');
        console.log('      FIX: MongoDB Atlas → Security → Network Access → Add IP:');
        console.log('        • "Allow Access from Anywhere" = 0.0.0.0/0  (easiest)');
        console.log('        • or add your exact public IP from https://api.ipify.org');
      }
    }
  }
  console.log();

  if (anyTlsFail) {
    console.log('✗ TLS handshake blocked by Atlas.  No code change can fix this.');
    console.log('  Add your IP in Atlas Network Access and retry.\n');
    return;
  }

  // ── 5. Full Mongoose connect ─────────────────────────────────────────────
  console.log('── 5. Full Mongoose Connection ────────────────────────');
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 12000,
      connectTimeoutMS: 12000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`✓ Connected!  database="${conn.connection.name}"  host="${conn.connection.host}"`);
    await mongoose.disconnect();
  } catch (e) {
    console.log(`✗ Mongoose failed: ${e.name}`);
    console.log(`  ${e.message.split('\n')[0]}`);
  }

  console.log('\n══════════════════════════════════════════════════════\n');
}

run().catch(console.error);
