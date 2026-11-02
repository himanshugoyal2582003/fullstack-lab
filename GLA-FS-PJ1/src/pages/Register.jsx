import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import ApiNotice from "../components/ApiNotice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function  handleSubmit(event) {
    event.preventDefault();
    
    try{
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {  "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Registration failed");
      }
      console.log(data);

      alert("Registration successful! You can now log in.");
    }catch(error){
      alert(error);
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
        <button className="btn primary full" type="submit">Create account →</button>
      </form>
      <p className="form-bottom">Already registered? <Link to="/login">Sign in</Link></p>
      <div className="api-hint"><b>API connection point</b><code>POST /api/auth/register</code><small>src/pages/Register.jsx → handleSubmit()</small></div>
    </div>
  </section>;
}
