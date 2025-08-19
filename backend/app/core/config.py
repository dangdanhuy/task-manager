import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Task Manager API"
    # Use environment variable for database URL, with a default for development
    database_url: str = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/taskmanager")
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()