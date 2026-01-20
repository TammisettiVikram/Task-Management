"""
Test script to verify registration and admin setup
Run this to create test users including an admin
"""
import sys
sys.path.insert(0, '/c/Users/vikra/backend-intern-assignment/backend')

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def create_test_users():
    db = SessionLocal()
    try:
        from app.models.task import Task
        db.query(Task).filter(Task.owner_id.in_(
            db.query(User.id).filter(User.email.in_(["admin@example.com", "user@example.com"]))
        )).delete(synchronize_session=False)
        
        db.query(User).filter(User.email.in_(["admin@example.com", "user@example.com"])).delete()
        db.commit()
        
        admin = User(
            email="admin@example.com",
            hashed_password=hash_password("admin123"),
            role="admin",
            is_active=True
        )
        db.add(admin)
        
        user = User(
            email="user@example.com",
            hashed_password=hash_password("user123"),
            role="user",
            is_active=True
        )
        db.add(user)
        
        db.commit()
        print(" Test users created successfully!")
        print(f"   Admin: admin@example.com / admin123")
        print(f"   User: user@example.com / user123")
        
    except Exception as e:
        print(f" Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_users()
