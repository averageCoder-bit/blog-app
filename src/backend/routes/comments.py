from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.comment import Comment
from models.blog import Blog
from models.user import User
from schemas.comment import CommentCreate, CommentResponse


router = APIRouter()


@router.get(
    "/blogs/{blog_id}/comments",
    response_model=list[CommentResponse],
)
def get_comments(
    blog_id: int,
    db: Session = Depends(get_db),
):
    blog = db.get(Blog, blog_id)

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    comments = (
        db.query(Comment)
        .filter(Comment.blog_id == blog_id)
        .order_by(Comment.created_at.desc())
        .all()
    )

    return comments


@router.post(
    "/blogs/{blog_id}/comments",
    response_model=CommentResponse,
    status_code=201,
)
def create_comment(
    blog_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
):
    blog = db.get(Blog, blog_id)

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    user = db.get(User, comment.author_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    new_comment = Comment(
        content=comment.content,
        author_id=comment.author_id,
        blog_id=blog_id,
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


@router.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    user_id: int,
    db: Session = Depends(get_db),
):
    comment = db.get(Comment, comment_id)

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found",
        )

    if comment.author_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own comments.",
        )

    db.delete(comment)
    db.commit()

    return {"message": "Comment deleted successfully"}