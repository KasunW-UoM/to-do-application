import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { taskApi } from './services/api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadTasks() {
    try {
      setIsLoading(true);
      setError('');
      const data = await taskApi.list();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateTask(form) {
    try {
      setIsSubmitting(true);
      setError('');
      await taskApi.create(form);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDone(taskId) {
    try {
      setError('');
      await taskApi.complete(taskId);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-shell">
      <div className="hero">
        <h1>Weerasekara To-Do Task App</h1>
        <p>Create tasks, show only the latest five, and hide completed items.</p>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      <div className="layout">
        <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />
        <TaskList tasks={tasks} onDone={handleDone} isLoading={isLoading} />
      </div>
    </main>
  );
}

