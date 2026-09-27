from fastapi import APIRouter, HTTPException, Depends
from schemas.blog import BlogCreate, BlogResponse
from db.database import get_db
from sqlalchemy.orm import Session
from models.blog import Blog

router = APIRouter()


@router.get("/blog/{id}")
async def get_blog():
    pass


@router.get("/blogs")
async def get_blogs():
    pass


@router.post("/blogs", response_model=BlogResponse, status_code=201)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    new_blog = Blog(**blog.model_dump())

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog


