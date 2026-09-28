from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from services.r2 import upload_blog_image, get_blog_image_url
from schemas.blog import BlogCreate, BlogResponse
from db.database import get_db
from sqlalchemy.orm import Session
from models.blog import Blog



ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

MAX_IMAGE_SIZE = 5 * 1024 * 1024

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

    return {
        "id": blog.id,
        "header": blog.header,
        "content": blog.content,
        "excerpt": blog.excerpt,
        "category": blog.category,
        "author_id": blog.author_id,
        "author_username": blog.author.username,
        "created_at": blog.created_at,
        "updated_at": blog.updated_at,
        "image_url": get_blog_image_url(blog.image_key),
    }


@router.get("/blogs", response_model=list[BlogResponse])
def get_blogs(
    db: Session = Depends(get_db),
):
    blogs = db.query(Blog).all()

    return [
        {
            "id": blog.id,
            "header": blog.header,
            "content": blog.content,
            "excerpt": blog.excerpt,
            "category": blog.category,
            "author_id": blog.author_id,
            "author_username": blog.author.username,
            "created_at": blog.created_at,
            "updated_at": blog.updated_at,
            "image_url": get_blog_image_url(blog.image_key),
        }
        for blog in blogs
    ]


@router.post(
    "/users/{user_id}/blogs",
    response_model=BlogResponse,
    status_code=201,
)
async def create_blog(
    user_id: int,
    header: str = Form(...),
    content: str = Form(...),
    excerpt: str | None = Form(None),
    category: str = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    new_blog = Blog(
        header=header,
        content=content,
        excerpt=excerpt,
        category=category,
        author_id=user_id,
    )

    db.add(new_blog)

    try:
        db.flush()

        if image:
            if image.content_type not in ALLOWED_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported image type.",
                )

            image_data = await image.read()

            if len(image_data) > MAX_IMAGE_SIZE:
                raise HTTPException(
                    status_code=400,
                    detail="Image must be 5 MB or smaller.",
                )

            image_key = upload_blog_image(
                new_blog.id,
                image_data,
                image.content_type,
            )

            new_blog.image_key = image_key

        db.commit()
        db.refresh(new_blog)

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to create blog.",
        )

    return {
        "id": new_blog.id,
        "header": new_blog.header,
        "content": new_blog.content,
        "excerpt": new_blog.excerpt,
        "category": new_blog.category,
        "author_id": new_blog.author_id,
        "author_username": new_blog.author.username,
        "created_at": new_blog.created_at,
        "updated_at": new_blog.updated_at,
        "image_url": get_blog_image_url(new_blog.image_key),
    }

@router.get("/users/{user_id}/blogs", response_model=list[BlogResponse])
def get_user_blogs(
    user_id: int,
    db: Session = Depends(get_db),
):
    blogs = (
        db.query(Blog)
        .filter(Blog.author_id == user_id)
        .all()
    )

    return [
        {
            "id": blog.id,
            "header": blog.header,
            "content": blog.content,
            "excerpt": blog.excerpt,
            "category": blog.category,
            "author_id": blog.author_id,
            "author_username": blog.author.username,
            "created_at": blog.created_at,
            "updated_at": blog.updated_at,
            "image_url": get_blog_image_url(blog.image_key),
        }
        for blog in blogs
    ]