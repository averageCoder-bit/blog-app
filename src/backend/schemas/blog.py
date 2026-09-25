from datetime import datetime
from pydantic import BaseModel, Field


class BlogCreate(BaseModel):
    header: str = Field(min_length=1, max_length=150)
    content: str = Field(min_length=1)
    excerpt: str | None = Field(default=None, max_length=300)
    category: str = Field(min_length=1, max_length=50)
    author_id: int


class BlogUpdate(BaseModel):
    header: str | None = Field(default=None, min_length=1, max_length=150)
    content: str | None = Field(default=None, min_length=1)
    excerpt: str | None = Field(default=None, max_length=300)
    category: str | None = Field(default=None, min_length=1, max_length=50)


class BlogResponse(BaseModel):
    id: int
    header: str
    content: str
    excerpt: str | None
    category: str
    author_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
