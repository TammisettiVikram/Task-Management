from fastapi import FastAPI
from dotenv import load_dotenv
import logging

from app.db.init_db import init_db

load_dotenv()

app = FastAPI(
    title="Backend Intern Assignment",
    version="1.0.0"
)

logging.basicConfig(
    filename="logs/app.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

@app.on_event("startup")
def on_startup():
    init_db()
    logging.info("Database initialized")

@app.get("/")
def root():
    logging.info("Root endpoint accessed")
    return {"message": "Backend is running"}
