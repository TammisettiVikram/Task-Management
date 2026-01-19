from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.user import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import register_user, authenticate_user
from app.db.deps import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    created_user = register_user(db, user.email, user.password)
    if not created_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return {"message": "User registered successfully"}

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = authenticate_user(db, user.email, user.password)
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    return {"access_token": token}
