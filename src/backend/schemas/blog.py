from datetime import datetime
from pydantic import BaseModel, Field, field_validator


from pydantic import BaseModel, Field, field_validator

from validators import contains_only_english_letters

class BlogCreate(BaseModel):
    header: str = Field(min_length=1, max_length=150)
    content: str = Field(min_length=1)
    excerpt: str | None = Field(default=None, max_length=300)
    category: str = Field(min_length=1, max_length=50)

    @field_validator("content")
    @classmethod
    def validate_word_count(cls, value: str) -> str:
        if len(value.split()) > 5000:
            raise ValueError("Content must be 5000 words or fewer.")

        return value

    @field_validator("header", "content", "excerpt")
    @classmethod
    def validate_english_letters(cls, value: str | None) -> str | None:
        if value is not None and not contains_only_english_letters(value):
            raise ValueError("Only English letters are allowed.")

        return value

# class BlogUpdate(BaseModel):
#     header: str | None = Field(default=None, min_length=1, max_length=150)
#     content: str | None = Field(default=None, min_length=1)
#     excerpt: str | None = Field(default=None, max_length=300)
#     category: str | None = Field(default=None, min_length=1, max_length=50)


class BlogResponse(BaseModel):
    id: int
    header: str
    content: str
    excerpt: str | None
    category: str
    author_username: str
    author_id: int
    created_at: datetime
    updated_at: datetime
    like_count: int
    comment_count: int
    image_url: str | None
    liked: bool
    model_config = {"from_attributes": True}
