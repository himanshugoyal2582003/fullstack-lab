import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import ApiNotice from "../components/ApiNotice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: YAHAN API CALL ADD KARNI HAI.
    // Method: POST | Endpoint: /api/auth/login
    // Body: { email, password }
    // Success response se token lena hai; errors ko UI par dikhana hai.
    // Abhi token create/store nahi hota aur koi request send nahi hoti.
    alert("Login API abhi connect nahi hai. handleSubmit() ke TODO comments dekho.");
  }

  return <section className="auth-layout">
    <div className="auth-copy"><span className="eyebrow">WELCOME BACK</span><h1>Your next productive day starts here.</h1>
      <p>Login flow mein form state, submit event aur backend response handle karna seekhenge.</p>
      <div className="auth-step"><b>01</b><span><strong>Login API</strong><small>POST /api/auth/login</small></span></div>
      <div className="auth-step"><b>02</b><span><strong>Receive a token</strong><small>Successful response se JWT</small></span></div>
    </div>
    <div className="form-card"><span className="eyebrow">YOUR WORKSPACE</span><h2>Sign in</h2><p className="muted">Apne account ki details enter karo.</p><ApiNotice />
      <form onSubmit={handleSubmit}>
        <Field label="Email address" id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
        <button className="btn primary full" type="submit">Sign in →</button>
      </form>
      <p className="form-bottom">New to StudyFlow? <Link to="/register">Create an account</Link></p>
      <div className="api-hint"><b>API connection point</b><code>POST /api/auth/login</code><small>src/pages/Login.jsx → handleSubmit()</small></div>
    </div>
  </section>;
}
