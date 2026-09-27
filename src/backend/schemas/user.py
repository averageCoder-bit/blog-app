from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=1, max_length=100)


class UserResponse(BaseModel):
    id: int
    username: str

    model_config = {"from_attributes": True}
