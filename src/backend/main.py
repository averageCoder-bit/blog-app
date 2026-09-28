from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from middleware import setup_middleware

from routes.blog import router as blogs_router
from routes.users import router as users_router
from routes.comments import router as comments_router


UPLOAD_DIR = Path("uploads/blogs")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI()
setup_middleware(app)

app.include_router(blogs_router)
app.include_router(users_router)
app.include_router(comments_router)

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR.parent),
    name="uploads",
)