from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .core.database import engine, get_db
from .models import Base
from .api import task, user

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API", version="1.0.0")

app.include_router(task.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(user.router, prefix="/api/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Task Manager API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}