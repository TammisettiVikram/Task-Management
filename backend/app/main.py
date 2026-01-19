from fastapi import FastAPI
from dotenv import load_dotenv
import logging

load_dotenv()

app = FastAPI(
    title="Backend Intern Assignment",
    version="1.0.0"
)

# Logging setup
logging.basicConfig(
    filename="logs/app.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

@app.get("/")
def root():
    logging.info("Root endpoint accessed")
    return {"message": "Backend is running"}
