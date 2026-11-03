// Vite mein frontend par accessible env variables ka naam VITE_ se shuru hota hai.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const TOKEN_STORAGE_KEY = "studyflow_token";

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers);

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const raw = await response.text();
  let data = {};

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("Server ne invalid response bheja");
    }
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return data;
}

export function authHeaders() {
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? { Authorization: ["Bearer", token].join(" ") } : {};
}

/*
  API requests relevant pages mein is helper ke through bheji jaati hain.

  POST   /api/auth/register  -> Register.jsx ke handleSubmit()
  POST   /api/auth/login     -> Login.jsx ke handleSubmit()
  GET    /api/tasks          -> Dashboard.jsx page load par
  POST   /api/tasks          -> Dashboard.jsx ke handleCreateTask()
  PATCH  /api/tasks/:id      -> Dashboard.jsx ke handleUpdateTask()
  DELETE /api/tasks/:id      -> Dashboard.jsx ke handleDeleteTask()
*/
