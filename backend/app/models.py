import datetime
import uuid
from fastapi_users import schemas
from typing import Optional


class UserRead(schemas.BaseUser[uuid.UUID]):
    pass
    # first_name: str
    # birthdate: Optional[datetime.date]


class UserCreate(schemas.BaseUserCreate):
    pass
    # first_name: str
    # birthdate: Optional[datetime.date]


class UserUpdate(schemas.BaseUserUpdate):
    pass
    # first_name: Optional[str]
    # birthdate: Optional[datetime.date]
