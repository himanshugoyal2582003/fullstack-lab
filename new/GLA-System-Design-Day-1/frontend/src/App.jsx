import { useState } from "react";
import "./App.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [elapsedMs, setElapsedMs] = useState(null);
  const [responseBytes, setResponseBytes] = useState(null);
  const [mode, setMode] = useState("none");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [pagination, setPagination] = useState(null);

  async function requestRecords(url, requestMode) {
    setLoading(true); setError(""); setMode(requestMode);
    const startedAt = performance.now();
    try {
      const response = await fetch(url);
      const raw = await response.text();
      setElapsedMs(performance.now() - startedAt);
      setResponseBytes(new Blob([raw]).size);
      const data = raw ? JSON.parse(raw) : {};
      if (!response.ok) throw new Error(data.message || `Request failed: ${response.status}`);
      setRecords(data.records || []);
      setPagination(data.pagination || null);
      if (data.pagination) { setPage(data.pagination.page); setLimit(data.pagination.limit); }
    } catch (err) { setError(err.message || "Something went wrong"); }
    finally { setLoading(false); }
  }

  function loadAllRecords() {
    setPagination(null);
    return requestRecords(`${API_BASE_URL}/api/records/all`, "all");
  }
  function loadPage(targetPage = 1, targetLimit = limit) {
    return requestRecords(`${API_BASE_URL}/api/records?page=${targetPage}&limit=${targetLimit}`, "paged");
  }

  return <main className="page">
    <header className="hero"><p className="eyebrow">BACKEND PERFORMANCE LAB</p><h1>MongoDB Pagination Lab</h1><p className="subtitle">Load the complete dataset first. Then compare it with one page at a time.</p></header>
    <section className="panel controls">
      <button onClick={loadAllRecords} disabled={loading}>{loading && mode === "all" ? "Loading all records..." : "Load all records"}</button>
      <label>Records per page <select value={limit} onChange={e => setLimit(Number(e.target.value))} disabled={loading}><option value={20}>20</option><option value={50}>50</option><option value={100}>100</option></select></label>
      <button onClick={() => loadPage(1, limit)} disabled={loading}>{loading && mode === "paged" ? "Loading page..." : "Load paginated"}</button>
    </section>
    <section className="metrics">
      <article className="metric"><span>Records received</span><strong>{records.length.toLocaleString()}</strong></article>
      <article className="metric"><span>Browser-observed request</span><strong>{elapsedMs === null ? "—" : `${elapsedMs.toFixed(1)} ms`}</strong></article>
      <article className="metric"><span>Response size (approx.)</span><strong>{responseBytes === null ? "—" : `${(responseBytes / 1024).toFixed(1)} KB`}</strong></article>
      <article className="metric"><span>Mode</span><strong>{mode === "none" ? "Not loaded" : mode === "all" ? "All records" : "Paginated"}</strong></article>
    </section>
    {error && <p className="error">{error}</p>}
    {pagination && <section className="panel pager"><div><strong>Page {pagination.page} of {pagination.totalPages}</strong><p>{pagination.total.toLocaleString()} total records</p></div><div className="pager-actions"><button disabled={loading || !pagination.hasPreviousPage} onClick={() => loadPage(page - 1, limit)}>Previous</button><button disabled={loading || !pagination.hasNextPage} onClick={() => loadPage(page + 1, limit)}>Next</button></div></section>}
    <section className="panel results"><div className="results-heading"><h2>Records</h2><span>{records.length.toLocaleString()} displayed</span></div>
      {loading && <p className="status">Loading records...</p>}{!loading && records.length === 0 && !error && <p className="status">No records loaded yet. Choose a button above.</p>}
      <div className="record-list">{records.map(record => <article className="record" key={record._id}><div><strong>{record.name}</strong><p>{record.email}</p></div><span className="department">{record.department}</span><span className="score">Score: {record.score}</span></article>)}</div>
    </section>
    <footer>The timer measures browser-observed request time through response-body reading, not pure MongoDB execution time or the full React paint.</footer>
  </main>;
}
