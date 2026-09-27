from fastapi import APIRouter, HTTPException, Depends
from schemas.blog import BlogCreate, BlogResponse
from db.database import get_db
from sqlalchemy.orm import Session
from models.blog import Blog

router = APIRouter()


@router.get("/blogs/{id}", response_model=BlogResponse)
def get_blog(
    id: int,
    db: Session = Depends(get_db),
):
    blog = db.get(Blog, id)

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    return blog


@router.get("/blogs", response_model=list[BlogResponse])
def get_blogs(
    db: Session = Depends(get_db),
):
    blogs = db.query(Blog).all()

    return blogs


@router.post("/users/{user_id}/blogs", response_model=BlogResponse, status_code=201)
def create_blog(
    user_id: int,
    blog: BlogCreate,
    db: Session = Depends(get_db),
):
    new_blog = Blog(
        **blog.model_dump(),
        author_id=user_id,
    )

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog