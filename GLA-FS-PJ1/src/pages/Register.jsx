import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import ApiNotice from "../components/ApiNotice";
import { apiRequest } from "../config/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setName("");
      setEmail("");
      setPassword("");
      setMessage("Registration successful! You can now log in.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <section className="auth-layout">
    <div className="auth-copy"><span className="eyebrow">START SIMPLE</span><h1>A clearer space for everything you need to do.</h1>
      <p>Registration form mein controlled inputs aur submit event samjho. Agle step mein isi data ko backend bhejna hai.</p>
      <div className="steps"><span>01 <small>Collect details</small></span><span>02 <small>Send to backend</small></span><span>03 <small>Handle response</small></span></div>
    </div>
    <div className="form-card"><span className="eyebrow">CREATE YOUR ACCOUNT</span><h2>Get started</h2><p className="muted">Basic details bhar kar shuru karo.</p><ApiNotice />
      <form onSubmit={handleSubmit}>
        <Field label="Full name" id="register-name" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Sharma" autoComplete="name" />
        <Field label="Email address" id="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" id="register-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
        <button className="btn primary full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account →"}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p className="form-bottom">Already registered? <Link to="/login">Sign in</Link></p>
      <div className="api-hint"><b>API connection point</b><code>POST /api/auth/register</code><small>src/pages/Register.jsx → handleSubmit()</small></div>
    </div>
  </section>;
}
