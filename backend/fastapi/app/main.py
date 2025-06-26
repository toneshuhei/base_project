from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import hello, users, posts

app = FastAPI(
    title="Base Project API",
    description="A base FastAPI application for web development projects",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(hello.router, prefix="/api", tags=["hello"])
app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(posts.router, prefix="/api", tags=["posts"])

@app.get("/")
async def root():
    return {
        "message": "Base Project FastAPI is running!",
        "docs": "/docs",
        "redoc": "/redoc",
        "version": "1.0.0"
    }