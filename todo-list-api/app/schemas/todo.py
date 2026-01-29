from pydantic import BaseModel


class TodoCreate(BaseModel):
    name: str
    description: str
    deadline: str


class TodoUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    deadline: str | None = None
    status: str | None = None
    canceled: bool | None = None


class TodoResponse(BaseModel):
    id: str
    name: str
    description: str
    createdAt: str
    deadline: str
    status: str
    canceled: bool


class PaginatedTodoResponse(BaseModel):
    items: list[TodoResponse]
    total: int
    page: int
    limit: int
    pages: int
