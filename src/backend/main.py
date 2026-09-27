from fastapi import FastAPI

from middleware import setup_middleware

from routes.blog import router as blogs_router


app = FastAPI()
setup_middleware(app)

app.include_router(blogs_router)