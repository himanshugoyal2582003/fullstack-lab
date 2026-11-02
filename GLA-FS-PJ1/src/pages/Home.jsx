import { Link } from "react-router-dom";
import ApiNotice from "../components/ApiNotice";
import { API_BASE_URL } from "../config/api";

const features = [
  ["01", "Create an account", "Registration form se name, email aur password collect karo."],
  ["02", "Login securely", "Login API se JWT milega. Abhi token generate ya store nahi hota."],
  ["03", "Manage tasks", "Dashboard par task list aur CRUD API connection points dekho."]
];

export default function Home() {
  return <div className="container">
    <section className="hero">
      <div>
        <span className="eyebrow">FRONTEND PRACTICE PROJECT</span>
        <h1>Plan your work.<br/><em>Flow through it.</em></h1>
        <p>Ek simple task manager frontend. Is project se React forms, state, pages aur backend API integration ke connection points samjho.</p>
        <div className="actions">
          <Link className="btn primary" to="/register">Create account ↗</Link>
          <Link className="btn secondary" to="/dashboard">Open dashboard</Link>
        </div>
        <ApiNotice />
      </div>
      <div className="hero-art">
        <div className="preview">
          <span className="eyebrow">YOUR WORKSPACE</span><h2>Today's focus</h2>
          <div className="progress"><span /></div><div className="progress-label"><span>Daily progress</span><b>2 of 4</b></div>
          <div className="preview-task done">✓ <span>Review JavaScript</span><small>Done</small></div>
          <div className="preview-task">○ <span>Understand JWT flow</span><small>In progress</small></div>
          <div className="preview-task">○ <span>Connect React APIs</span><small>Pending</small></div>
          <div className="preview-task">○ <span>Test protected routes</span><small>Pending</small></div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="section-title"><span className="eyebrow">THE LEARNING FLOW</span><h2>One frontend. Three key flows.</h2><p>Har screen par API endpoint aur function ka naam comments mein diya hai.</p></div>
      <div className="cards">{features.map(([n, title, text]) => <article className="card" key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="connection"><div><span className="eyebrow">BACKEND CONNECTION</span><h2>Where does the API URL go?</h2><p>Base URL .env mein hai. Endpoint paths relevant components mein TODO comments ke saath diye gaye hain.</p></div><code>{API_BASE_URL || "VITE_API_BASE_URL set nahi hai"}</code></section>
  </div>;
}
