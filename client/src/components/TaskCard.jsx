export default function TaskCard({ task, onDone }) {
  return (
    <article className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <button onClick={() => onDone(task.id)}>Done</button>
    </article>
  );
}
