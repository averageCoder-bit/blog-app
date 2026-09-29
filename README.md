# Chronicle

A simple full-stack blog application developed for the **AWS Learning Club - UST Development Committee application exam**.

Chronicle allows users to create, browse, and interact with blog posts through a rich-text blogging experience.

## Features

### Blog Posts

- Create blog posts with:
  - Title
  - Rich-text content
  - Excerpt
  - Category
  - Optional image
- View all blog posts
- View individual blog posts
- View posts created by a specific user
- Search posts by title or excerpt
- Filter posts by category
- Sort posts by:
  - Date
  - Title
  - Likes
  - Comments
- Sort in ascending or descending order
- Rich-text editing using **TipTap**
- Support for formatted text, headings, lists, links, blockquotes, and code blocks

### Comments

- Add comments to blog posts
- Delete comments
- Filter comments by:
  - All comments
  - Current user's comments
- Sort comments by newest or oldest
- Paginate comments

### Likes

- Like blog posts
- Unlike blog posts
- Display total like count
- Prevent duplicate likes from the same user

### Users

- Multiple users can interact with the application
- Users can be selected as the current demo user
- Blog posts and comments are associated with their respective users

### Images

- Upload an optional image when creating a blog post
- Images are stored using **Cloudflare R2**
- Blog posts can display their associated image

---

## Tech Stack

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **TanStack Query** — server-state management and API caching
- **Axios** — HTTP requests
- **React Router** — client-side routing
- **Zod** — frontend validation
- **Lucide React** — icons
- **TipTap** — rich-text editor

### Backend

- **Python**
- **FastAPI**
- **SQLAlchemy**
- **PostgreSQL**
- **Alembic** — database migrations
- **Pydantic** — request and response validation
- **Psycopg 3** — PostgreSQL driver

### Infrastructure / Deployment

- **Cloudflare Workers** — frontend deployment
- **Render** — backend API deployment
- **PostgreSQL** — production database
- **Cloudflare R2** — image storage
- **Git / GitHub** — source control

---

## Project Structure

```text
blog-app/
├── src/
│   ├── backend/
│   │   ├── db/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── migrations/
│   │   └── main.py
│   │
│   └── frontend/
│       ├── api/
│       ├── components/
│       ├── forms/
│       ├── layout/
│       ├── pages/
│       ├── validator/
│       └── main.tsx
│
├── requirements.txt
├── package.json
└── README.md
```

---

## API Endpoints

The backend exposes REST API endpoints through FastAPI.

### Users

| Method | Endpoint                 | Description                      |
| ------ | ------------------------ | -------------------------------- |
| `GET`  | `/users`                 | Retrieve all users               |
| `GET`  | `/users/{user_id}/blogs` | Retrieve blogs created by a user |

### Blogs

| Method   | Endpoint                 | Description            |
| -------- | ------------------------ | ---------------------- |
| `GET`    | `/blogs`                 | Retrieve all blogs     |
| `GET`    | `/blogs/{blog_id}`       | Retrieve a single blog |
| `POST`   | `/users/{user_id}/blogs` | Create a blog          |
| `PUT`    | `/blogs/{blog_id}`       | Update a blog          |
| `DELETE` | `/blogs/{blog_id}`       | Delete a blog          |

### Comments

| Method   | Endpoint                    | Description                  |
| -------- | --------------------------- | ---------------------------- |
| `GET`    | `/blogs/{blog_id}/comments` | Retrieve comments for a blog |
| `POST`   | `/blogs/{blog_id}/comments` | Create a comment             |
| `DELETE` | `/comments/{comment_id}`    | Delete a comment             |

### Likes

| Method   | Endpoint                | Description   |
| -------- | ----------------------- | ------------- |
| `POST`   | `/blogs/{blog_id}/like` | Like a blog   |
| `DELETE` | `/blogs/{blog_id}/like` | Unlike a blog |

Interactive API documentation is automatically provided by FastAPI through Swagger UI.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Python 3.10+
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone https://github.com/averageCoder-bit/blog-app.git
cd blog-app
```

---

## Local Development

The application consists of a React frontend and a FastAPI backend.

### Backend

Navigate to the backend:

```bash
cd src/backend
```

Create and activate a virtual environment:

```bash
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the database connection through the appropriate environment variables.

Run database migrations:

```bash
alembic upgrade head
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The local API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend

From the project root:

```bash
cd src/frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

---

## Production Environment

Chronicle is also deployed as a production application.

### Frontend

The React frontend is deployed using Cloudflare Workers.

```text
https://blog-app.kyleeva53.workers.dev
```

### Backend

The FastAPI backend is deployed using Render.

```text
https://chronicle-api-6uuu.onrender.com
```

Production API documentation:

```text
https://chronicle-api-6uuu.onrender.com/docs
```

### Database

The production backend uses PostgreSQL hosted through Render.

Database schema changes are managed using Alembic migrations.

### Image Storage

Uploaded blog images are stored using Cloudflare R2 rather than being stored directly inside the application server.

---

## How to Use Chronicle

### 1. Select a User

The current version does not include authentication. A user can be selected as the current demo user for testing interactions.

### 2. Create a Blog

Create a post by providing:

- Title
- Rich-text content
- Excerpt
- Category
- Optional image

The TipTap editor can be used to format the content.

### 3. Browse Blogs

The main blog page allows users to:

- Search for posts
- Filter by category
- Sort by date, title, likes, or comments
- Change the sort direction

### 4. Interact With Posts

Users can:

- Open a blog post
- Like or unlike a post
- View comments
- Add comments
- Delete their own comments

### 5. Test Multiple Users

Because authentication is not currently implemented, different users can be selected manually to test interactions such as:

- Multiple users liking the same post
- Different users commenting
- Filtering comments by the current user

---

## Limitations

Chronicle is currently a learning and application-exam project rather than a production-ready blogging platform.

### Authentication

Authentication has not yet been implemented.

The current application uses manually selected demo users instead of a complete authentication system.

### User Profiles

Profile creation and profile-image management are not currently available.

A default avatar is used when displaying users.

### Authorization

Because authentication is not implemented, the current application does not provide a complete production-grade authorization system.

### Comment Pagination

Comments are currently retrieved and paginated on the frontend.

A production implementation could move pagination to the backend to avoid retrieving large numbers of comments at once.

### Image Management

Image uploads currently support the application's configured image limits and storage flow, but a complete media-management system has not been implemented.

### Notifications

There is currently no notification system for events such as:

- New comments
- Likes
- Other user activity

### Additional Blog Features

The current application does not include features such as:

- Draft posts
- Post scheduling
- Bookmarks
- Followers
- Content moderation
- Advanced analytics
- User-to-user messaging

---

## Future Integrations

The architecture can be extended with additional services and functionality.

### Authentication

Integrate an authentication provider such as **Clerk** to provide:

- User registration
- Login
- Session management
- OAuth
- Email verification
- Account management

### Payment / Monetization

A payment provider such as **PayMongo** could be integrated if the application is later extended with paid content or other monetization features.

### AI Features

Potential AI integrations include:

- Writing assistance
- Automatic summaries
- Content categorization
- Suggested tags
- Moderation assistance
- Semantic search

### Delivery / External Services

The backend architecture can also be extended with external APIs and services as needed.

### Improved Storage

Cloudflare R2 can be expanded into a more complete media-management system for:

- Profile images
- Blog images
- Additional media formats
- Image processing

---

## Development Notes

Chronicle was built as a full-stack application to demonstrate practical experience across frontend development, backend API development, database management, validation, deployment, and cloud services.

The project is intentionally kept relatively simple so that its core functionality and architecture remain easy to understand and maintain.
