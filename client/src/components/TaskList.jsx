import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, onDone, isLoading }) {
  return (
    <section className="panel">
      <div className="task-list-header">
        <h2>Recent Tasks</h2>
        <span>{tasks.length}/5 visible</span>
      </div>

      {isLoading ? <p>Loading tasks...</p> : null}

      {!isLoading && tasks.length === 0 ? (
        <p className="empty-state">No active tasks yet. Add one from the form.</p>
      ) : null}

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDone={onDone} />
        ))}
      </div>
    </section>
  );
}
