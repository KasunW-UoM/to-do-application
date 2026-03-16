import { addTask, markTaskAsDone, validateTaskPayload } from '../services/taskService.js';

jest.unstable_mockModule('../models/taskModel.js', () => ({
  createTask: jest.fn(async (payload) => ({ id: 1, ...payload })),
  getRecentActiveTasks: jest.fn(),
  completeTask: jest.fn(async (id) => (id === 1 ? { id } : null)),
}));

const taskModel = await import('../models/taskModel.js');

describe('taskService', () => {
  test('validateTaskPayload trims and validates', () => {
    expect(validateTaskPayload({ title: '  Demo ', description: '  Desc ' })).toEqual({
      title: 'Demo',
      description: 'Desc',
    });
  });

  test('addTask delegates to model', async () => {
    const result = await addTask({ title: 'Test', description: 'Task' });
    expect(result).toEqual({ id: 1, title: 'Test', description: 'Task' });
    expect(taskModel.createTask).toHaveBeenCalledWith({ title: 'Test', description: 'Task' });
  });

  test('markTaskAsDone throws for invalid id', async () => {
    await expect(markTaskAsDone('abc')).rejects.toMatchObject({ status: 400 });
  });

  test('markTaskAsDone throws when task not found', async () => {
    await expect(markTaskAsDone(2)).rejects.toMatchObject({ status: 404 });
  });
});
