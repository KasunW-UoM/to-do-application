import { pool } from './pool.js';

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS task (
      id SERIAL PRIMARY KEY,
      title VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      is_completed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ NULL
    );
  `);
}
