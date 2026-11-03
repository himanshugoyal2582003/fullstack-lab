# React Frontend Flow

## App start

```text
index.html -> src/main.jsx -> BrowserRouter -> src/App.jsx -> matching page
```

## Routes

- `/` -> Home
- `/register` -> Register
- `/login` -> Login
- `/dashboard` -> Dashboard
- unknown URL -> NotFound

## Register

Form inputs -> `useState` -> `handleSubmit()` -> `apiRequest()` -> `POST /api/auth/register` -> success/error message.

## Login

Email/password -> `handleSubmit()` -> `POST /api/auth/login` -> JWT saved in `sessionStorage` -> `/dashboard` navigation.

## Protected task flows

- Dashboard load -> `GET /api/tasks` in `useEffect`
- Add task -> `POST /api/tasks`
- Update task -> `PATCH /api/tasks/:id`
- Delete task -> `DELETE /api/tasks/:id`

Every task request includes the login JWT in the Authorization header. React state changes only after a successful API response.

## Environment variable

`.env` contains `VITE_API_BASE_URL=http://localhost:3000`. The shared `src/config/api.js` helper combines this base URL with endpoint paths and handles JSON/error responses.

Frontend `.env` must not contain `JWT_SECRET`, MongoDB URI, or database passwords. `VITE_` variables are exposed in the browser bundle.

## Responsibility

- React: form state, loading/error/success display, page navigation, and task rendering.
- Express: request validation, JWT verification, and response.
- MongoDB: persistent data.
- JWT: protected request identity.
- CORS: permission for the frontend origin.
