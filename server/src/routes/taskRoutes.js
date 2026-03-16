import { Router } from 'express';
import { getTasks, getTasksCompleted, patchTaskDone, postTask, } from '../controllers/taskControllers.js';

export const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.get('/complete', getTasksCompleted);
taskRouter.post('/', postTask);
taskRouter.patch('/:id/done', patchTaskDone);
