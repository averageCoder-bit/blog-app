from db.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)

    blogs = relationship("Blog", back_populates="author")
    comments = relationship("Comment", back_populates="author")
