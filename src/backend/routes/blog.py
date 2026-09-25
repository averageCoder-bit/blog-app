from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/blog/{id}")
async def get_blog():
    pass


@router.get("/blogs")
async def get_blogs():
    pass


@router.post("/blog")
async def create_blog():
    pass
