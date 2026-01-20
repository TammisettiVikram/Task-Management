from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password


def register_user(db: Session, email: str, password: str):
    if db.query(User).filter(User.email == email).first():
        return None

    user = User(
        email=email,
        hashed_password=hash_password(password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
