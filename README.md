# auth.app — Full-Stack Authentication System

> React 19 • Vite • Tailwind CSS • Node.js • Express • MongoDB

---

## 📋 Project Overview

auth.app is a complete full-stack authentication system featuring user registration, login, JWT-based session management, email verification via OTP, and a 3-step password reset flow. The frontend uses React 19 with Tailwind CSS (dark emerald theme), and the backend is powered by Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
Authentication/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Navbar, Header
│   │   ├── context/         # AppContext (global auth state)
│   │   ├── pages/           # Login, Home, EmailVerify, ResetPassword
│   │   └── assets/          # Icons and images
│   ├── .env
│   └── package.json
│
└── server/                  # Node.js backend
    ├── config/              # MongoDB connection
    ├── controllers/         # Auth & user logic
    ├── middleware/          # JWT auth middleware
    ├── models/              # User schema (Mongoose)
    ├── routers/             # API route definitions
    ├── .env
    └── server.js            # Entry point
```

---

## ✅ Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- SMTP email credentials (Gmail, Mailtrap, etc.)
- npm or yarn

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auth-app.git
cd auth-app
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
SENDER_EMAIL=your_email@gmail.com
PORT=4000
```

Start the server:

```bash
npm run server    # development (nodemon)
npm start         # production (node)
```

### 3. Setup the Client

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Example | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas connection string |
| `JWT_SECRET` | `mysecretkey123` | Secret key for signing JWTs |
| `SMTP_HOST` | `smtp.gmail.com` | Email SMTP host |
| `SMTP_PORT` | `587` | SMTP port (587 for TLS) |
| `SMTP_USER` | `you@gmail.com` | SMTP login email |
| `SMTP_PASS` | `app_password` | SMTP app password |
| `SENDER_EMAIL` | `you@gmail.com` | From address in emails |
| `PORT` | `4000` | Server port (default 4000) |

### Client (`client/.env`)

| Variable | Example | Description |
|---|---|---|
| `VITE_BACKEND_URL` | `http://localhost:4000` | Backend API base URL |

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user account | No |
| `POST` | `/login` | Login and receive JWT cookie | No |
| `POST` | `/logout` | Logout and clear JWT cookie | No |
| `POST` | `/send-verify-otp` | Send OTP to verify email | Yes |
| `POST` | `/verify-account` | Verify email with OTP code | Yes |
| `POST` | `/send-reset-otp` | Send OTP for password reset | No |
| `POST` | `/reset-password` | Reset password using OTP | No |

### User Routes — `/api/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/data` | Get authenticated user profile data | Yes |

---

## 🛠 Tech Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | ^19.2.0 | UI library |
| Vite | ^7.2.4 | Build tool and dev server |
| Tailwind CSS | ^4.1.18 | Utility-first styling |
| React Router DOM | ^7.10.1 | Client-side routing |
| Axios | ^1.13.2 | HTTP requests |
| React Toastify | ^11.0.5 | Toast notifications |

### Backend

| Package | Version | Purpose |
|---|---|---|
| Express | ^5.1.0 | REST API server |
| Mongoose | ^9.0.0 | MongoDB ODM |
| bcryptjs | ^3.0.3 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT auth tokens |
| nodemailer | ^7.0.11 | Email sending (OTP) |
| cookie-parser | ^1.4.7 | Cookie middleware |
| cors | ^2.8.5 | Cross-origin requests |
| dotenv | ^17.2.3 | Environment variables |
| nodemon | ^3.1.11 | Auto-restart in development |

---

## ✨ Features

- ✅ User registration with bcrypt password hashing
- ✅ Login with JWT stored in HttpOnly cookie
- ✅ Email verification via 6-digit OTP
- ✅ 3-step password reset (request → OTP → new password)
- ✅ Protected routes using auth middleware
- ✅ Global auth state via React Context API
- ✅ Dark emerald themed UI with Tailwind CSS
- ✅ Responsive design for mobile and desktop

---

## 📜 Available Scripts

### Client

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Server

```bash
npm run server    # Start with nodemon (development)
npm start         # Start with node (production)
```

---

*Built with ❤️ using React, Node.js & MongoDB*
