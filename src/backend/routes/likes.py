from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.blog import Blog
from models.like import Like
from models.user import User
from schemas.like import LikeResponse

router = APIRouter()


@router.post("/blogs/{blog_id}/like", response_model=LikeResponse)
def like_blog(
    blog_id: int,
    user_id: int,
    db: Session = Depends(get_db),
):
    blog = db.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_like = (
        db.query(Like)
        .filter(
            Like.user_id == user_id,
            Like.blog_id == blog_id,
        )
        .first()
    )

    if not existing_like:
        new_like = Like(
            user_id=user_id,
            blog_id=blog_id,
        )
        db.add(new_like)
        db.commit()

    like_count = (
        db.query(Like)
        .filter(Like.blog_id == blog_id)
        .count()
    )

    return {
        "liked": True,
        "like_count": like_count,
    }


@router.delete("/blogs/{blog_id}/like", response_model=LikeResponse)
def unlike_blog(
    blog_id: int,
    user_id: int,
    db: Session = Depends(get_db),
):
    blog = db.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_like = (
        db.query(Like)
        .filter(
            Like.user_id == user_id,
            Like.blog_id == blog_id,
        )
        .first()
    )

    if existing_like:
        db.delete(existing_like)
        db.commit()

    like_count = (
        db.query(Like)
        .filter(Like.blog_id == blog_id)
        .count()
    )

    return {
        "liked": False,
        "like_count": like_count,
    }