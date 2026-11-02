import { Link, NavLink } from "react-router-dom";

// Common header/footer ko ek component mein rakha hai taaki har page par repeat na karna pade.
export default function Layout({ children }) {
  return <div className="app-shell">
    <header className="topbar">
      <Link className="brand" to="/"><span className="brand-mark">S</span> StudyFlow</Link>
      <nav>
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </header>
    <main>{children}</main>
    <footer><span>StudyFlow API integration practice</span><span>React + Vite</span></footer>
  </div>;
}
