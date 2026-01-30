from fastapi import FastAPI
from users import router as users_router
from auth import router as auth_router 

app = FastAPI(title="SAMS Backend")

@app.get("/")
def root():
    return {"message": "SAMS API is running"}

app.include_router(users_router)
app.include_router(auth_router)