## Backend

Using an authenticated route:

```bash
import requests

url = "localhost:8000/auth/jwt/login"

headers = {
  'Content-Type': 'multipart/form-data'
}

data = {
    'username': 'su@superuser.com',
    'password': 'Superuser12345!$%^'
}

response = requests.request("POST", url, headers=headers, data=data)

if not response.ok:
    raise Exception(response.text)

token = response.json()["access_token"]

url = "localhost:8000/authenticated-route"

headers = {
  'Authorization': f'Bearer {token}'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

```
