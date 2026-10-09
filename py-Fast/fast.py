# FAST API
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "world"} 

users = []

# @app.post("/users")
# def add_user(user : str):
#     users.append(user)
#     return users

@app.post("/users/{user}")
def add_user(user : str):
    users.append(user)
    return users

@app.get("/users/{id}")
def show_user(id : int):
    user = users[id]
    return user

@app.get("/users")
def show_all_user():
    return users
