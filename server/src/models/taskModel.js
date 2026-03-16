import { pool } from '../db/pool.js';

export async function createTask({ title, description }) {
  const result = await pool.query(
    `INSERT INTO task (title, description)
     VALUES ($1, $2)
     RETURNING id, title, description, is_completed AS "isCompleted", created_at AS "createdAt"`,
    [title, description],
  );

  return result.rows[0];
}

export async function getRecentActiveTasks(limit = 5) {
  const result = await pool.query(
    `SELECT id, title, description, is_completed AS "isCompleted", created_at AS "createdAt"
     FROM task
     WHERE is_completed = FALSE
     ORDER BY created_at DESC, id DESC
     LIMIT $1`,
    [limit],
  );

  return result.rows;
}

export async function getRecentActiveCompleted(limit = 5) {
  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      is_completed AS "isCompleted",
      created_at AS "createdAt"
    FROM task
    WHERE is_completed = TRUE
    ORDER BY created_at DESC, id DESC
    LIMIT ${limit}
  `);

  return result;
}

export async function completeTask(id) {
  const result = await pool.query(
    `UPDATE task
     SET is_completed = TRUE,
         completed_at = NOW()
     WHERE id = $1 AND is_completed = FALSE
     RETURNING id`,
    [id],
  );

  return result.rows[0] || null;
}
