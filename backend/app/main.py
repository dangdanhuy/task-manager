from fastapi import FastAPI

app = FastAPI(title="Task Manager API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to Task Manager API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}