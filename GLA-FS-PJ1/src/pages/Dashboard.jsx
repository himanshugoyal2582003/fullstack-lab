import { useEffect, useState } from "react";
import ApiNotice from "../components/ApiNotice";
import { apiRequest, authHeaders } from "../config/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await apiRequest("/api/tasks", { headers: authHeaders() });
        setTasks(data.tasks || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    setError("");
    setIsSaving(true);
    try {
      const data = await apiRequest("/api/tasks", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ title: title.trim() }),
      });
      setTasks(current => [data.task, ...current]);
      setTitle("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateTask(task) {
    const status = task.status === "completed" ? "pending" : "completed";
    setError("");

    try {
      const data = await apiRequest(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      setTasks(current => current.map(item => item._id === task._id ? data.task : item));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeleteTask(id) {
    setError("");

    try {
      await apiRequest(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setTasks(current => current.filter(task => task._id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return <div className="container dashboard">
    <div className="dashboard-heading">
      <div><span className="eyebrow">YOUR WORKSPACE</span><h1>Good work starts with a plan.</h1><p>Tasks MongoDB se load aur API ke through manage hote hain.</p></div>
      <span className="demo-pill">LIVE API</span>
    </div>
    <ApiNotice>StudyFlow API se connected. Changes database mein save hote hain.</ApiNotice>
    {error && <p className="error">{error}</p>}
    <div className="stats">
      <div><span>Total tasks</span><b>{tasks.length}</b><small>Current database records</small></div>
      <div><span>Completed</span><b>{tasks.filter(task => task.status === "completed").length}</b><small>Completed tasks</small></div>
      <div><span>Remaining</span><b>{tasks.filter(task => task.status !== "completed").length}</b><small>Open tasks</small></div>
    </div>
    <section className="task-panel">
      <div className="panel-heading"><div><span className="eyebrow">TASK MANAGEMENT</span><h2>Your tasks</h2></div></div>
      <form className="add-form" onSubmit={handleCreateTask}>
        <label className="sr-only" htmlFor="new-task">New task title</label>
        <input id="new-task" value={title} onChange={event => setTitle(event.target.value)} placeholder="What do you need to get done?" />
        <button className="btn primary" type="submit" disabled={isSaving}>{isSaving ? "Adding..." : "Add task +"}</button>
      </form>
      <div className="task-list">
        {loading && <p className="status">Loading tasks...</p>}
        {!loading && tasks.map(task => <article className="task-row" key={task._id}>
          <button type="button" className={`task-check ${task.status === "completed" ? "checked" : ""}`} onClick={() => handleUpdateTask(task)} aria-label={`Toggle ${task.title}`}>{task.status === "completed" ? "✓" : ""}</button>
          <div className="task-info"><h3 className={task.status === "completed" ? "crossed" : ""}>{task.title}</h3><p>{task.description}</p><span className={`status ${task.status}`}>{task.status}</span></div>
          <div className="task-actions"><button type="button" onClick={() => handleUpdateTask(task)}>Toggle status</button><button className="danger" type="button" onClick={() => handleDeleteTask(task._id)}>Delete</button></div>
        </article>)}
        {!loading && tasks.length === 0 && <p className="empty">Koi task nahi hai. Upar se add karo.</p>}
      </div>
    </section>
  </div>;
}
