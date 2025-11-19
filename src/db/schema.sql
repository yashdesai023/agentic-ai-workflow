-- emails table
CREATE TABLE IF NOT EXISTS emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id TEXT UNIQUE,
  subject TEXT,
  sender TEXT,
  recipients TEXT,
  date TIMESTAMP,
  body_text TEXT,
  raw_html TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_id INTEGER,
  title TEXT,
  description TEXT,
  due_date DATE,
  priority TEXT,
  status TEXT DEFAULT 'pending',
  confidence REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email_id) REFERENCES emails(id)
);

-- reply drafts
CREATE TABLE IF NOT EXISTS reply_drafts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_id INTEGER,
  tone TEXT,
  draft_text TEXT,
  confidence REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email_id) REFERENCES emails(id)
);

-- audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT,
  step TEXT,
  payload TEXT,
  outcome TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
