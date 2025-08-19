import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Task Manager API"
    database_url: str = "postgresql://username:password@localhost/taskmanager"
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()