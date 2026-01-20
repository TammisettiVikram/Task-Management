from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserRegister(UserBase):
    password: str = Field(..., min_length=8, max_length=64)

class UserLogin(UserBase):
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(UserBase):
    id: int
    role: str
    class Config:
        from_attributes = True