from datetime import datetime


def todo_document(
    name: str,
    description: str,
    deadline: str,
) -> dict:
    return {
        "name": name,
        "description": description,
        "createdAt": datetime.utcnow().isoformat(),
        "deadline": deadline,
        "status": "not_done",
        "canceled": False,
    }
