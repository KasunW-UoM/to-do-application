import { addTask, listRecentTasks, markTaskAsDone , listRecentTasksCompleted } from '../services/taskService.js';

export async function getTasks(_req, res, next) {
  try {
    const tasks = await listRecentTasks();
    res.json({ data: tasks });
  } catch (error) {
    next(error);
  }
}

export async function getTasksCompleted(_req, res, next) {
  try {
    const tasks = await listRecentTasksCompleted();
    res.json({ data: tasks });
  } catch (error) {
    next(error);
  }
}


export async function postTask(req, res, next) {
  try {
    const task = await addTask(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    next(error);
  }
}

export async function patchTaskDone(req, res, next) {
  try {
    await markTaskAsDone(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}