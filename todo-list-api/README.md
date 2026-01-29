# To Do List API

REST API for a To Do List application built with **FastAPI** and **MongoDB**.

## Stack

- Python
- FastAPI
- Pydantic
- MongoDB (via Motor async driver)
- Uvicorn

## Project Structure

```
app/
├── main.py            # FastAPI application entry point
├── core/config.py     # Environment settings
├── database/          # MongoDB connection
├── models/            # Document builders
├── schemas/           # Pydantic request/response schemas
├── repositories/      # Database access layer
├── services/          # Business logic
└── routers/           # REST endpoint definitions
```

## Setup

### 1. Create and activate virtual environment

```bash
python -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=todo_list_db
```

### 4. Run the API

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

Swagger docs: `http://localhost:8000/docs`

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/v1/todos/` | List all todos |
| GET | `/v1/todos/{id}` | Get todo by ID |
| POST | `/v1/todos/` | Create a new todo |
| PUT | `/v1/todos/{id}` | Update a todo |
| DELETE | `/v1/todos/{id}` | Delete a todo |

## ToDo Schema

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "createdAt": "ISO date string",
  "deadline": "ISO date string",
  "status": "done | not_done",
  "canceled": false
}
```
