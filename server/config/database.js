/**
 * MongoDB Atlas Connection — production-quality with retry + detailed diagnostics
 *
 * Root-cause reference:
 *  ReplicaSetNoPrimary / servers:{} / commonWireVersion:0
 *  → TLS alert 80 (internal_error) from Atlas after TCP connect
 *  → Atlas rejects the connection at the TLS layer (IP not allowed in whitelist)
 *  → No MongoDB wire-protocol hello ever succeeds → driver sees empty topology
 *
 * Fix:  Add 0.0.0.0/0 (or your current IP) to Atlas Network Access → IP Access List.
 */

const mongoose = require('mongoose');

// ── helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Mask the password in a URI so we can log safely. */
function safeUri(uri) {
  return uri.replace(/:([^@]{1,})@/, ':****@');
}

/**
 * Decode the error into a human-readable root cause so the exact problem
 * is printed instead of the generic Atlas whitelist message.
 */
function decodeError(error) {
  const reason = error.reason;

  if (!reason) {
    return `  [code] ${error.code || 'n/a'} — ${error.message.split('\n')[0]}`;
  }

  const type        = reason.type        ?? 'unknown';
  const servers     = reason.servers     ?? {};
  const wireVersion = reason.commonWireVersion ?? 0;

  const lines = [
    `  [topology type]      ${type}`,
    `  [known servers]      ${JSON.stringify(servers)}`,
    `  [commonWireVersion]  ${wireVersion}`,
  ];

  if (type === 'ReplicaSetNoPrimary' && Object.keys(servers).length === 0 && wireVersion === 0) {
    lines.push('');
    lines.push('  ► Exact cause: Atlas sent TLS alert 80 (internal_error) during the');
    lines.push('    TLS handshake on port 27017.  This happens BEFORE the MongoDB wire');
    lines.push('    protocol starts, so the driver never learns about any replica-set');
    lines.push('    member → servers:{}, commonWireVersion:0 → ReplicaSetNoPrimary.');
    lines.push('');
    lines.push('  ► Fix required in MongoDB Atlas dashboard (not in code):');
    lines.push('    1. cloud.mongodb.com → Security → Network Access → + Add IP Address');
    lines.push('    2. Choose "Allow Access from Anywhere" (0.0.0.0/0) or add your');
    lines.push('       exact current public IP.');
    lines.push('    3. Click Confirm and wait ~60 s for propagation.');
    lines.push('    4. Restart the server — connection will succeed immediately.');
  } else if (type === 'Unknown') {
    lines.push('');
    lines.push('  ► Exact cause: IP not in Atlas whitelist (connection refused at');
    lines.push('    network level before TLS).  Add your IP in Atlas Network Access.');
  }

  return lines.join('\n');
}

// ── main export ───────────────────────────────────────────────────────────────

const MAX_RETRIES   = 3;
const RETRY_DELAY   = 4000;   // ms between attempts

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('✗ MONGO_URI is not set in .env — cannot start.');
    process.exit(1);
  }

  console.log(`  [DB] URI  : ${safeUri(mongoUri)}`);
  console.log(`  [DB] Using Mongoose v${mongoose.version} / Node ${process.version}`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`  [DB] Connecting … (attempt ${attempt}/${MAX_RETRIES})`);

    try {
      const conn = await mongoose.connect(mongoUri, {
        // Mongoose 7+ removed useNewUrlParser and useUnifiedTopology.
        // Passing them causes MongoParseError — do NOT include them.
        serverSelectionTimeoutMS : 12000,   // fail fast, not after 30 s
        connectTimeoutMS         : 12000,
        socketTimeoutMS          : 45000,
        family                   : 4,       // force IPv4 — avoids IPv6 DNS ambiguity
      });

      console.log('✓ MongoDB Atlas connected successfully');
      console.log(`✓ Database : ${conn.connection.name}`);
      console.log(`✓ Host     : ${conn.connection.host}`);
      return; // success — exit retry loop
    } catch (error) {
      console.error(`✗ Attempt ${attempt} failed — ${error.name}`);
      console.error(decodeError(error));

      if (attempt < MAX_RETRIES) {
        console.log(`  Retrying in ${RETRY_DELAY / 1000} s …\n`);
        await sleep(RETRY_DELAY);
      } else {
        console.error('\n✗ All connection attempts failed.  Server will not start.');
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;