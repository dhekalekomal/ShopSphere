# ShopSphere

Single-page e-commerce application (MERN) — assignment-ready.

## Features
- JWT authentication (signup/login)
- Product CRUD (filters: category, price, search)
- Persistent cart saved per user in DB (survives logout)
- Frontend: React (pages: signup, login, products, cart)

## Quick start (local)

### Backend
1. `cd backend`
2. `cp .env.example .env` and fill `MONGO_URI` & `JWT_SECRET`
3. `npm install`
4. `npm run dev`
Server runs on `http://localhost:5000`

### Frontend (Vite)
1. `cd frontend`
2. `npm install`
3. Create `.env` if desired: `VITE_API_BASE=http://localhost:5000/api`
4. `npm run start`
Open the URL shown by Vite (usually http://localhost:5173)

## Deployment
- Backend: Render / Railway / Heroku — set environment variables.
- Frontend: Vercel / Netlify — set `VITE_API_BASE` to backend URL.
- DB: MongoDB Atlas.

## API endpoints
- `POST /api/auth/signup` — {name,email,password}
- `POST /api/auth/login` — {email,password}
- `GET /api/products` — query params: `category`, `minPrice`, `maxPrice`, `q`
- `POST /api/products` — create (auth)
- `GET /api/cart` — get cart (auth)
- `POST /api/cart` — {productId, quantity} (auth)
- `DELETE /api/cart/:productId` — remove (auth)

## Notes
- This repo includes a backend (Express + Mongoose) and a frontend (React + Vite).
- The project is intentionally minimal to be easy to deploy for an internship submission.
