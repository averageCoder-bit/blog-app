from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from db.base import Base
from models.user import User
from models.blog import Blog
from models.comment import Comment

load_dotenv()

database_url = os.getenv("DATABASE_URL")

if database_url and database_url.startswith("postgresql://"):
    database_url = database_url.replace(
        "postgresql://",
        "postgresql+psycopg://",
        1,
    )

engine = create_engine(
    database_url,
    echo=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

