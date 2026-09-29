import os
from uuid import uuid4

import boto3
from dotenv import load_dotenv

load_dotenv()


r2_client = boto3.client(
    "s3",
    endpoint_url=f"https://{os.getenv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com",
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
    region_name="auto",
)

R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME")

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

MAX_IMAGE_SIZE = 5 * 1024 * 1024


def upload_blog_image(blog_id: int, image_data: bytes, content_type: str) -> str:
    if content_type not in ALLOWED_TYPES:
        raise ValueError("Unsupported image type.")

    if len(image_data) > MAX_IMAGE_SIZE:
        raise ValueError("Image must be 5 MB or smaller.")

    extension = ALLOWED_TYPES[content_type]
    object_key = f"blogs/{blog_id}/{uuid4()}{extension}"

    r2_client.put_object(
        Bucket=R2_BUCKET_NAME,
        Key=object_key,
        Body=image_data,
        ContentType=content_type,
    )

    return object_key

def get_blog_image_url(image_key: str | None) -> str | None:
    if not image_key:
        return None

    return r2_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": R2_BUCKET_NAME,
            "Key": image_key,
        },
        ExpiresIn=3600,
    )