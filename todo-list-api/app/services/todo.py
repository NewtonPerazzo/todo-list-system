import math

from fastapi import HTTPException

from app.models.todo import todo_document
from app.repositories import todo as todo_repository
from app.schemas.todo import PaginatedTodoResponse, TodoCreate, TodoResponse, TodoUpdate


async def get_all(page: int, limit: int) -> PaginatedTodoResponse:
    todos, total = await todo_repository.find_all_paginated(page, limit)
    pages = math.ceil(total / limit) if total > 0 else 1
    return PaginatedTodoResponse(
        items=[TodoResponse(**todo) for todo in todos],
        total=total,
        page=page,
        limit=limit,
        pages=pages,
    )


async def get_by_id(todo_id: str) -> TodoResponse:
    todo = await todo_repository.find_by_id(todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return TodoResponse(**todo)


async def create(data: TodoCreate) -> TodoResponse:
    doc = todo_document(
        name=data.name,
        description=data.description,
        deadline=data.deadline,
    )
    created = await todo_repository.create(doc)
    return TodoResponse(**created)


async def update(todo_id: str, data: TodoUpdate) -> TodoResponse:
    update_data = data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    updated = await todo_repository.update(todo_id, update_data)
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return TodoResponse(**updated)


async def delete(todo_id: str) -> None:
    deleted = await todo_repository.delete(todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Todo not found")
