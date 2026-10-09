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
