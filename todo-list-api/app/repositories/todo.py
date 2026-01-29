from bson import ObjectId

from app.database.connection import get_database

COLLECTION_NAME = "todos"


def _get_collection():
    db = get_database()
    return db[COLLECTION_NAME]


def _serialize_todo(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


async def find_all_paginated(page: int, limit: int) -> tuple[list[dict], int]:
    collection = _get_collection()
    total = await collection.count_documents({})
    skip = (page - 1) * limit
    cursor = collection.find().sort(
        [("canceled", 1), ("createdAt", -1)]
    ).skip(skip).limit(limit)
    todos = await cursor.to_list(length=limit)
    return [_serialize_todo(todo) for todo in todos], total


async def find_by_id(todo_id: str) -> dict | None:
    collection = _get_collection()
    doc = await collection.find_one({"_id": ObjectId(todo_id)})
    if doc is None:
        return None
    return _serialize_todo(doc)


async def create(todo_data: dict) -> dict:
    collection = _get_collection()
    result = await collection.insert_one(todo_data)
    todo_data["_id"] = result.inserted_id
    return _serialize_todo(todo_data)


async def update(todo_id: str, update_data: dict) -> dict | None:
    collection = _get_collection()
    await collection.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": update_data},
    )
    return await find_by_id(todo_id)


async def delete(todo_id: str) -> bool:
    collection = _get_collection()
    result = await collection.delete_one({"_id": ObjectId(todo_id)})
    return result.deleted_count == 1
