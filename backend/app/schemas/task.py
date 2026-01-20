from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True