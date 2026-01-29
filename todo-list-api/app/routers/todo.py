from fastapi import APIRouter, Query

from app.schemas.todo import PaginatedTodoResponse, TodoCreate, TodoResponse, TodoUpdate
from app.services import todo as todo_service

router = APIRouter(prefix="/api/v1/todos", tags=["todos"])


@router.get("/", response_model=PaginatedTodoResponse)
async def get_all_todos(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
):
    return await todo_service.get_all(page, limit)


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: str):
    return await todo_service.get_by_id(todo_id)


@router.post("/", response_model=TodoResponse, status_code=201)
async def create_todo(data: TodoCreate):
    return await todo_service.create(data)


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: str, data: TodoUpdate):
    return await todo_service.update(todo_id, data)


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(todo_id: str):
    await todo_service.delete(todo_id)
