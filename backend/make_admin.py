"""
Make a user an admin
Usage: python make_admin.py <email>
"""
import sys
sys.path.insert(0, '.')

from app.db.session import SessionLocal
from app.models.user import User

def make_admin(email):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            print(f" User not found: {email}")
            return False
        
        user.role = "admin"
        db.commit()
        print(f" {email} is now an admin!")
        return True
        
    except Exception as e:
        print(f" Error: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_admin.py <email>")
        print("Example: python make_admin.py user@example.com")
        sys.exit(1)
    
    email = sys.argv[1]
    make_admin(email)
