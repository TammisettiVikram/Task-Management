from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, tasks
from app.db.base import Base
from app.db.session import engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Scalable Intern API", version="1.0.0")

# Essential for the Frontend requirement: Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Versioning Logic
app.include_router(auth.router, prefix="/api/v1")
app.include_router(tasks.router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "active", "version": "v1.0.0"}