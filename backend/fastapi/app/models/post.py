from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: Optional[str] = None

class PostCreate(PostBase):
    author_id: int

class Post(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PostResponse(BaseModel):
    id: int
    title: str
    content: Optional[str] = None
    author_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True