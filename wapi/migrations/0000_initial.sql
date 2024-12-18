-- Create system_states table
CREATE TABLE IF NOT EXISTS system_states (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  metrics JSON NOT NULL,
  config JSON NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create improvements table
CREATE TABLE IF NOT EXISTS improvements (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('code', 'config', 'dependency', 'rollback')),
  description TEXT NOT NULL,
  priority INTEGER NOT NULL,
  estimated_impact INTEGER NOT NULL,
  changes JSON NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table 
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('improvement', 'degradation', 'failure')),
  description TEXT NOT NULL,
  changes JSON NOT NULL,
  metrics JSON,
  goals JSON,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);