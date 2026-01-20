# Secure Scalable Task Management System

This project is a full-stack application built as part of the **Backend Developer Intern Assignment**.  
It demonstrates the design and implementation of a **secure, scalable REST API** with **authentication, role-based access control**, and a **basic frontend UI** for interacting with the APIs.

The backend is the primary focus, while the frontend is intentionally kept simple to validate API functionality.

---

## Features

### Backend (Primary Focus)
- **User Authentication**
  - User registration and login
  - Password hashing using Bcrypt
  - JWT-based authentication
- **Role-Based Access Control (RBAC)**
  - USER and ADMIN roles
  - Restricted admin-only endpoints
- **CRUD Operations**
  - Full CRUD (Create, Read, Update, Delete) for Tasks
- **API Versioning**
  - All APIs are versioned under `/api/v1/`
- **Validation & Error Handling**
  - Input validation using Pydantic
  - Proper HTTP status codes (400, 401, 403, 404)
- **Database**
  - PostgreSQL with SQLAlchemy ORM
- **API Documentation**
  - Swagger UI available at `/docs`

---

### Frontend (Supportive)
- Built using **React.js**
- Provides a simple UI to:
  - Register and log in users
  - Access a protected dashboard (JWT required)
  - Perform full CRUD actions on tasks
  - Display success and error messages from API responses

---

## Tech Stack

### Backend
- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Passlib (Bcrypt)
- Python-Jose (JWT)

### Frontend
- React.js
- Axios
- CSS

---

## Database Schema

### Users
- `id` (UUID, Primary Key)
- `email` (unique)
- `hashed_password`
- `role` (USER / ADMIN)
- `created_at`

### Tasks
- `id` (UUID, Primary Key)
- `title`
- `description`
- `owner_id` (Foreign Key → users.id)
- `created_at`

---

## How to Run Locally

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL
- Git

---

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

### Create .env file
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/intern_assignment
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

### Run the backend:
uvicorn app.main:app --reload

### Swagger documentation:
http://localhost:8000/docs

### Frontend Setup
cd frontend
npm install
npm start

### Frontend runs at:
http://localhost:3000

### Application log files are included in the repository under:
backend/logs/

### Logs capture:
- Application startup
- Authentication events
- Authorization failures
- CRUD operations
- Error handling
- No sensitive information (passwords or tokens) is logged.

### Scalability Notes
- Stateless Authentication: JWT-based auth enables horizontal scaling behind   load balancers.
- Modular Architecture: Separation of concerns (models, schemas, services APIs) allows easy feature expansion.
- Future Enhancements:
- Redis caching for frequently accessed data
- Microservice separation (Auth, Tasks)
- Containerization using Docker
- Centralized logging and monitoring

### Deliverables Covered

- Backend REST APIs with authentication and full CRUD

- Role-based access control

- PostgreSQL database schema

- Swagger API documentation

- Basic React frontend connected to APIs

- Application logs included

- Scalability considerations documented

### Conclusion
This project fulfills all the requirements of the Backend Developer Intern assignment by focusing on secure API design, clean architecture, and scalability, while providing a minimal frontend to demonstrate functionality.
