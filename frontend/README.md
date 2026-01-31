# Task Management Frontend

This is the **frontend application** for the Backend Developer Intern Assignment.  
It provides a simple, clean UI to interact with the FastAPI backend using JWT authentication.

---

## 🧩 Project Overview

The frontend allows users to:

- Register a new account
- Log in securely
- Access a protected dashboard
- Create, view, update, and delete tasks
- Log out safely

It communicates with a REST API built using **FastAPI** and deployed on **Render**.

---

## 🛠 Tech Stack

- React 19
- React Router v7
- Axios
- Tailwind CSS
- Create React App

---

## 🌐 Backend Integration

The frontend consumes APIs from the deployed backend:

**Backend Base URL (Render):**
https://task-management-gpck.onrender.com/api/v1


Authentication is handled using **JWT**, which is stored in `localStorage` and automatically attached to API requests using an Axios interceptor.

---

## 📄 Pages

| Route | Description |
|-----|-------------|
| `/` | Login page |
| `/register` | User registration |
| `/dashboard` | Protected task dashboard |

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
npm install
```
### Start development server
```bash
npm start
```
### 🚀 Run the App
Open your browser and go to:
```text
http://localhost:3000
```
---

# 🔐 Authentication Flow

- User logs in with email & password
- Backend returns a JWT access token
- Token is stored in localStorage
- Axios interceptor attaches token to all protected API requests
- Unauthorized users are redirected to login

---

# 🧪 Features Demonstrated

- Secure authentication flow
- Protected routes
- REST API integration
- Error handling for failed requests
- Clean UI with Tailwind CSS

---

# ☁ Deployment
## Frontend

- Platform: Vercel
- Framework: Create React App
- Routing handled using rewrites

## Backend

- Platform: Render
- API Docs:
https://task-management-gpck.onrender.com/docs

---

# 📌 Notes

- Backend must be running for full functionality
- Free Render tier may sleep after inactivity
- First request may take ~30 seconds

---

# 👨‍💻 Author

- Tammisetti Vikram
- Backend Developer