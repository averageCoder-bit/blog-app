from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.base import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)

    author_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    blog_id = Column(
        Integer,
        ForeignKey("blogs.id"),
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    author = relationship("User", back_populates="comments")
    blog = relationship("Blog", back_populates="comments")
