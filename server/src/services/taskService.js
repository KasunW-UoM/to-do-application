import { completeTask, createTask, getRecentActiveTasks ,getRecentActiveCompleted } from '../models/taskModel.js';

export function validateTaskPayload(payload) {
  const title = payload?.title?.trim();
  const description = payload?.description?.trim();

  if (!title || !description) {
    const error = new Error('Title and description are required.');
    error.status = 400;
    throw error;
  }

  if (title.length > 120) {
    const error = new Error('Title must be 120 characters or fewer.');
    error.status = 400;
    throw error;
  }

  return { title, description };
}

export async function addTask(payload) {
  const validPayload = validateTaskPayload(payload);
  return createTask(validPayload);
}

export async function listRecentTasks() {
  return getRecentActiveTasks(5);
}

export async function listRecentTasksCompleted() {
  return getRecentActiveCompleted(5);
}

export async function markTaskAsDone(id) {
  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    const error = new Error('Task id must be a positive integer.');
    error.status = 400;
    throw error;
  }

  const updated = await completeTask(taskId);

  if (!updated) {
    const error = new Error('Task not found or already completed.');
    error.status = 404;
    throw error;
  }
}