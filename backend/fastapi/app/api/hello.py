from fastapi import APIRouter

router = APIRouter()

@router.get("/hello")
async def get_hello():
    return {
        "message": "Hello from FastAPI!",
        "status": "success",
        "service": "base_project_api"
    }

@router.get("/hello/{name}")
async def get_hello_name(name: str):
    return {
        "message": f"Hello, {name}!",
        "status": "success",
        "service": "base_project_api"
    }