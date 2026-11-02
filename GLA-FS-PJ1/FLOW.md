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

React Router frontend pages change karta hai; ye backend API call nahi hai.

## Register (API abhi add nahi)
Form inputs -> `useState` -> `handleSubmit()` -> TODO: `POST /api/auth/register` -> TODO: response handle karo.

## Login (API abhi add nahi)
Email/password -> `useState` -> `handleSubmit()` -> TODO: `POST /api/auth/login` -> TODO: JWT response lo -> TODO: protected request mein Bearer token bhejo.

JWT token browser mein kahan store karna hai, ye security trade-off ke saath class mein discuss karna. Is project ne token storage implement nahi kiya hai.

## Tasks (abhi local state)
- Dashboard load -> TODO `GET /api/tasks` (useEffect mein)
- Add task -> TODO `POST /api/tasks`
- Update task -> TODO `PATCH /api/tasks/:id`
- Delete task -> TODO `DELETE /api/tasks/:id`
- Single task detail future page -> `GET /api/tasks/:id`

Abhi buttons React `useState` update karte hain. Ye database CRUD nahi hai.

## Environment variable
`.env` mein `VITE_API_BASE_URL=http://localhost:3000`.
`src/config/api.js` is value ko `API_BASE_URL` ke roop mein export karta hai. Base URL + endpoint = full URL.

Frontend `.env` mein `JWT_SECRET`, MongoDB URI ya database password nahi rakhna. `VITE_` variables browser bundle mein expose ho sakte hain.

## Responsibility
- React: form state, UI, page navigation, loading/error/success display.
- Express: request validation, JWT verification, response.
- MongoDB: persistent data.
- JWT: protected request ki identity verify karne ke liye.
- CORS: browser ko frontend origin se backend request ki permission.
