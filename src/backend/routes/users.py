from fastapi import APIRouter, HTTPException, Depends
from schemas.user import UserCreate, UserResponse
from db.database import get_db
from sqlalchemy.orm import Session
from models.user import User

router = APIRouter()

@router.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return users

@router.post("/users", response_model=UserResponse, status_code=201)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    new_user = User(username=user.username)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user