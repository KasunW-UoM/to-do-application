import request from 'supertest';
import { createApp } from '../app.js';

jest.unstable_mockModule('../services/taskService.js', () => ({
  addTask: jest.fn(async ({ title, description }) => ({
    id: 1,
    title,
    description,
    isCompleted: false,
    createdAt: '2026-01-01T00:00:00.000Z',
  })),
  listRecentTasks: jest.fn(async () => [
    { id: 1, title: 'A', description: 'B', isCompleted: false, createdAt: '2026-01-01T00:00:00.000Z' },
  ]),
  markTaskAsDone: jest.fn(async () => undefined),
}));

const { addTask, listRecentTasks, markTaskAsDone } = await import('../services/taskService.js');

const app = createApp();

describe('task routes', () => {
  test('GET /api/tasks returns recent tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(listRecentTasks).toHaveBeenCalled();
  });

  test('POST /api/tasks creates task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Buy books', description: 'For next week' });

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe('Buy books');
    expect(addTask).toHaveBeenCalled();
  });

  test('PATCH /api/tasks/:id/done returns 204', async () => {
    const response = await request(app).patch('/api/tasks/1/done');
    expect(response.status).toBe(204);
    expect(markTaskAsDone).toHaveBeenCalledWith('1');
  });
});
