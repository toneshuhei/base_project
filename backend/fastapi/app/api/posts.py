from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from app.database import get_db
from app.models.post import PostResponse

router = APIRouter()

@router.get("/posts", response_model=List[PostResponse])
async def get_posts(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM posts ORDER BY created_at DESC"))
    posts = []
    for row in result:
        posts.append(PostResponse(
            id=row.id,
            title=row.title,
            content=row.content,
            author_id=row.author_id,
            created_at=row.created_at,
            updated_at=row.updated_at
        ))
    return posts

@router.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM posts WHERE id = :id"), {"id": post_id})
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return PostResponse(
        id=row.id,
        title=row.title,
        content=row.content,
        author_id=row.author_id,
        created_at=row.created_at,
        updated_at=row.updated_at
    )