import asyncio
import contextlib
import uuid
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from fastapi_users import FastAPIUsers
from app.models import UserRead, UserCreate
from app.users import get_user_manager, auth_backend, current_active_user
from app.db import User, create_db_and_tables, get_async_session, get_user_db
from fastapi_users.exceptions import UserAlreadyExists
from fastapi.middleware.cors import CORSMiddleware


origins = ["http://localhost:3000"]


async def create_superuser():
    get_async_session_context = contextlib.asynccontextmanager(get_async_session)
    get_user_db_context = contextlib.asynccontextmanager(get_user_db)
    get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)
    email = "su@superuser.com"
    password = "Superuser12345!$%^"
    try:
        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.create(
                        UserCreate(email=email, password=password, is_superuser=True)
                    )
                    print(f"Super user created {user.email}")
    except UserAlreadyExists:
        print(f"Super user {email} already exists, skipping initial creation")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create DB Tables
    await create_db_and_tables()
    await create_superuser()
    yield
    # Clean up and release resources
    # clear()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


# @app.post("/create-super-user")
# async def register():
#     await get_user_manager.create(
#         UserCreate(
#             email=email, password=password, is_superuser=is_superuser
#         )
#     )
#     # await create_user("su@superuser.com", "super123user456", is_superuser=True)


# @app.post("/")
# async def register()
