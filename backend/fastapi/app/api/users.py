from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from app.database import get_db
from app.models.user import UserResponse

router = APIRouter()

@router.get("/users", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM users ORDER BY id"))
    users = []
    for row in result:
        users.append(UserResponse(
            id=row.id,
            username=row.username,
            email=row.email,
            first_name=row.first_name,
            last_name=row.last_name,
            is_active=row.is_active,
            date_joined=row.date_joined
        ))
    return users

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=row.id,
        username=row.username,
        email=row.email,
        first_name=row.first_name,
        last_name=row.last_name,
        is_active=row.is_active,
        date_joined=row.date_joined
    )