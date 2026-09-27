from datetime import datetime
from pydantic import BaseModel, Field


class CommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=1000)
    author_id: int
    blog_id: int


class CommentResponse(BaseModel):
    id: int
    content: str
    author_id: int
    blog_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
