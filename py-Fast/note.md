Install FastAPI

pip install fastapi
pip install uvicorn

OR

py -m pip install fastapi uvicorn

Backend file - [filename] .py

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


Loading the app/server

py -m uvicorn [filename ]:app --reload

Making a Post Request

curl.exe -X POST "http://127.0.0.1:8000/users" `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"John\",\"age\":20}'

OR
curl.exe -X POST "http://127.0.0.1:8000/users" -H "Content-Type: application/json" -d '{\"name\":\"John\",\"age\":20}'

OR



Front/Backend requested file - [filename] .py

# Tests
import requests

#  Get request

url = "http://127.0.0.1:8000/users"
response = requests.get(url)
print(response.json())


data = "Tee"

# post request through url

response = requests.post(
    "http://127.0.0.1:8000/users/add/{}".format(data)
)

print(response.json())

# Post request
response = requests.post("http://127.0.0.1:8000/users/remove/", data = data).json()

print(response)
print(response['users'])


# data = 'Vee'
# response = requests.post(
#     "http://127.0.0.1:8000/users/{}".format(data),
#     json=data
# )

# print(response.json())



