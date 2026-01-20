from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import register_user, authenticate_user
from app.db.deps import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    if not register_user(db, user.email, user.password):
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User registered successfully"}

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = authenticate_user(db, user.email, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}