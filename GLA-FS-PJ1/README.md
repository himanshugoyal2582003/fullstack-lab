# StudyFlow React — API Integration Practice

Ye React + Vite frontend, pehle se bane StudyFlow Express/MongoDB/JWT backend ke saath connect karne ki practice ke liye hai.

**Important:** Is project mein API calls implement nahi ki gayi hain. `fetch()` ya Axios nahi hai. Relevant components mein TODO comments hain jahan students ko API call add karni hai.

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

TODO comments relevant `handleSubmit`, `handleCreateTask`, `handleUpdateTask` aur `handleDeleteTask` functions mein hain.

Example: base URL `http://localhost:3000` + endpoint `/api/auth/login` = `http://localhost:3000/api/auth/login`. Ye sirf URL example hai; actual API request add nahi ki gayi.

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
Dashboard ke demo tasks React state mein hain. Add, toggle aur delete sirf local state badalte hain; database mein save nahi hota. Refresh karoge toh demo data reset ho jayega. Students ka task hai TODO ke hisaab se API calls add karna aur real response ke basis par UI update karna.

## 9. Build check
```bash
npm run build
```
