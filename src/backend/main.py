from fastapi import FastAPI

from middleware import setup_middleware

from routes.blog import router as blogs_router
from routes.users import router as users_router


app = FastAPI()
setup_middleware(app)

app.include_router(blogs_router)
app.include_router(users_router)