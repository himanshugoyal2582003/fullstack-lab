// .env mein VITE_API_BASE_URL backend server ka base URL hai.
// Vite mein frontend par accessible env variables ka naam VITE_ se shuru hota hai.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/*
  Is project mein koi API request implement NAHI ki gayi hai.
  Students ko neeche diye endpoints ko relevant page se connect karna hai.

  POST   /api/auth/register  -> Register.jsx ke handleSubmit()
  POST   /api/auth/login     -> Login.jsx ke handleSubmit()
  GET    /api/tasks          -> Dashboard.jsx page load par
  POST   /api/tasks          -> Dashboard.jsx ke handleCreateTask()
  GET    /api/tasks/:id      -> Future task detail screen
  PATCH  /api/tasks/:id      -> Dashboard.jsx ke handleUpdateTask()
  DELETE /api/tasks/:id      -> Dashboard.jsx ke handleDeleteTask()

  Base URL aur endpoint path ko jodkar full URL banta hai.
  Example: http://localhost:3000 + /api/auth/login
*/
