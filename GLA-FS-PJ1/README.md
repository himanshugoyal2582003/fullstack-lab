# StudyFlow React — API Integration Practice

Ye React + Vite frontend, StudyFlow Express/MongoDB/JWT backend ke saath connected hai. Register, login aur protected task CRUD flows implemented hain.

## 1. Requirements
- Node.js 20 ya newer
- npm
- Backend StudyFlow project alag terminal mein
- VS Code

## 2. Frontend setup
```bash
npm install
cp .env.example .env
npm run dev
```
Vite aam taur par `http://localhost:5173` par chalega.

## 3. `.env` setup
`.env.example` ko copy karke `.env` banao:
```env
VITE_API_BASE_URL=http://localhost:3000
```
- Ye backend ka base URL hai, endpoint nahi.
- Backend ke `.env` mein `PORT=3000` hai.
- Vite ke browser-side variables `VITE_` prefix se shuru hote hain.
- Frontend `.env` mein `JWT_SECRET`, MongoDB URI ya database password kabhi mat rakhna. Browser mein exposed variables secret nahi hote.
- `.env` badalne ke baad Vite dev server restart karna.

## 4. Backend alag terminal mein chalao
Backend project folder mein:
```bash
npm install
cp .env.example .env
# Backend .env mein MongoDB Atlas URI aur JWT_SECRET set karo.
npm run dev
```
Frontend `http://localhost:5173`, backend `http://localhost:3000` par hoga. Browser CORS error aaye toh backend mein frontend origin `http://localhost:5173` allow karna hoga.

## 5. API connection map

| Screen/action | File | Method + endpoint |
|---|---|---|
| Register | `src/pages/Register.jsx` | `POST /api/auth/register` |
| Login | `src/pages/Login.jsx` | `POST /api/auth/login` |
| Dashboard load | `src/pages/Dashboard.jsx` | `GET /api/tasks` |
| Add task | `src/pages/Dashboard.jsx` | `POST /api/tasks` |
| View one task (future page) | Abhi page nahi hai | `GET /api/tasks/:id` |
| Update task | `src/pages/Dashboard.jsx` | `PATCH /api/tasks/:id` |
| Delete task | `src/pages/Dashboard.jsx` | `DELETE /api/tasks/:id` |

`src/config/api.js` ka shared helper base URL ke saath endpoint jodta hai aur JSON errors handle karta hai.

Example: base URL `http://localhost:3000` + endpoint `/api/auth/login` = `http://localhost:3000/api/auth/login`.

## 6. Login request mein kya bhejna hoga?
- Method: `POST`
- URL: base URL + `/api/auth/login`
- Header: `Content-Type: application/json`
- Body: `{ email, password }`
- Success response se JWT token lena aur errors handle karna.

Protected task routes mein `Authorization: Bearer <token>` header chahiye. Backend task ka owner verified token se set karta hai; client se owner bhejne ki zaroorat nahi.

## 7. Files ka order
1. `README.md`
2. `src/main.jsx`
3. `src/App.jsx`
4. `src/components/Layout.jsx`
5. `src/config/api.js`
6. `src/pages/Register.jsx`
7. `src/pages/Login.jsx`
8. `src/pages/Dashboard.jsx`

## 8. Dashboard note
Dashboard load par `GET /api/tasks` se logged-in user ke tasks aate hain. Add, toggle aur delete successful API response ke baad UI update karte hain aur database mein save hote hain. Login token current browser session ke `sessionStorage` mein rakha jaata hai.

## 9. Build check
```bash
npm run build
```
