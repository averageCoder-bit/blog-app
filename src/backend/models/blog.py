from db.base import Base
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True)
    header = Column(String(150), nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(String(300))
    category = Column(String(50), nullable=False)

    author_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    author = relationship("User", back_populates="blogs")
    comments = relationship("Comment", back_populates="blog")
