import { useState } from "react";
import ApiNotice from "../components/ApiNotice";

const demoTasks = [
  { id: "demo-1", title: "Understand MongoDB models", description: "Schema, model aur document revise karo.", status: "completed" },
  { id: "demo-2", title: "JWT authentication", description: "Bearer token aur middleware flow samjho.", status: "in-progress" },
  { id: "demo-3", title: "Connect React with APIs", description: "Frontend se backend request bhejna seekho.", status: "pending" }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(demoTasks);
  const [title, setTitle] = useState("");

  function handleCreateTask(event) {
    event.preventDefault();
    // TODO: POST /api/tasks call yahan add karni hai.
    // Body mein title/description/status bhejo; Authorization mein Bearer token bhejna hoga.
    // Abhi sirf local React state update hoti hai, MongoDB mein save nahi hota.
    if (!title.trim()) return;
    setTasks(current => [{ id: `local-${Date.now()}`, title: title.trim(), description: "Local demo — database mein save nahi hua.", status: "pending" }, ...current]);
    setTitle("");
  }

  function handleUpdateTask(id) {
    // TODO: PATCH /api/tasks/:id yahan call karni hai.
    // Example body: { status: "completed" }. Successful response ke baad UI update karna.
    // Abhi sirf local state change hoti hai.
    setTasks(current => current.map(task => task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task));
  }

  function handleDeleteTask(id) {
    // TODO: DELETE /api/tasks/:id yahan call karni hai.
    // Successful response ke baad hi UI se task remove karna.
    // Abhi sirf local state se remove hota hai.
    setTasks(current => current.filter(task => task.id !== id));
  }

  return <div className="container dashboard">
    <div className="dashboard-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>Good work starts with a plan.</h1><p>Demo tasks local state mein hain; backend se data fetch nahi hota.</p></div><span className="demo-pill">LOCAL DEMO</span></div>
    <ApiNotice>API abhi connect nahi hai. Neeche CRUD endpoints ke connection points diye hain.</ApiNotice>
    <div className="stats">
      <div><span>Total tasks</span><b>{tasks.length}</b><small>Current local state</small></div>
      <div><span>Completed</span><b>{tasks.filter(t => t.status === "completed").length}</b><small>Local demo count</small></div>
      <div><span>Remaining</span><b>{tasks.filter(t => t.status !== "completed").length}</b><small>Local demo count</small></div>
    </div>
    <section className="task-panel">
      <div className="panel-heading"><div><span className="eyebrow">TASK MANAGEMENT</span><h2>Your tasks</h2></div></div>
      <form className="add-form" onSubmit={handleCreateTask}>
        <label className="sr-only" htmlFor="new-task">New task title</label>
        <input id="new-task" value={title} onChange={e => setTitle(e.target.value)} placeholder="What do you need to get done?" />
        <button className="btn primary" type="submit">Add task +</button>
      </form>
      <p className="api-inline"><b>CREATE</b> — <code>POST /api/tasks</code> — <code>handleCreateTask()</code></p>
      <div className="task-list">{tasks.map(task => <article className="task-row" key={task.id}>
        <button type="button" className={`task-check ${task.status === "completed" ? "checked" : ""}`} onClick={() => handleUpdateTask(task.id)} aria-label={`Toggle ${task.title}`}>{task.status === "completed" ? "✓" : ""}</button>
        <div className="task-info"><h3 className={task.status === "completed" ? "crossed" : ""}>{task.title}</h3><p>{task.description}</p><span className={`status ${task.status}`}>{task.status}</span></div>
        <div className="task-actions"><button type="button" onClick={() => handleUpdateTask(task.id)}>Toggle status</button><button className="danger" type="button" onClick={() => handleDeleteTask(task.id)}>Delete</button></div>
      </article>)}
      {tasks.length === 0 && <p className="empty">Koi demo task nahi hai. Upar se add karo.</p>}</div>
      <div className="endpoints">
        <div><span>READ ALL</span><code>GET /api/tasks</code><small>Dashboard load par; useEffect mein.</small></div>
        <div><span>CREATE</span><code>POST /api/tasks</code><small>New task form submit par.</small></div>
        <div><span>UPDATE</span><code>PATCH /api/tasks/:id</code><small>Status/title update par.</small></div>
        <div><span>DELETE</span><code>DELETE /api/tasks/:id</code><small>Delete button click par.</small></div>
        <div><span>READ ONE</span><code>GET /api/tasks/:id</code><small>Task detail page banana ho toh.</small></div>
      </div>
    </section>
  </div>;
}
