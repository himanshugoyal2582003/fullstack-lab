import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import ApiNotice from "../components/ApiNotice";
import { apiRequest, TOKEN_STORAGE_KEY } from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
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
        <button className="btn primary full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in →"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="form-bottom">New to StudyFlow? <Link to="/register">Create an account</Link></p>
      <div className="api-hint"><b>API connection point</b><code>POST /api/auth/login</code><small>src/pages/Login.jsx → handleSubmit()</small></div>
    </div>
  </section>;
}
