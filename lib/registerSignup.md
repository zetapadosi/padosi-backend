#

## Endpoints request and response

### Register and Signup endpoint

1️⃣ Register endpoint

```bash
# The curl request
curl --location --request POST 'http://localhost:8989/api/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userName": "White",
  "email": "mrwhite@gmail.com",
  "picture": "https://robohash.org/1PU.png?set=set2&size=150x150",
  "userFrom": "google",
  "location": {
   "type": "point",
   "coordinates": [70.8127212524414, 22.2808367460213]
  }
 }'

# the output
# with success response
{
    "statusCode": 200,
    "status": "REGISTRATION_SUCCESS",
    "message": "Registration Success",
    "value": {
        "user": {
            "location": {
                "type": "point",
                "coordinates": [
                    70.8127212524414,
                    22.2808367460213
                ]
            },
            "userFrom": "google",
            "following": [],
            "followers": [],
            "_id": "60e2a59191205d19af881b34",
            "userName": "White",
            "email": "mrwhite@gmail.com",
            "picture": "https://robohash.org/1PU.png?set=set2&size=150x150",
            "userId": "padosiUser-1625466257172bb941c44186d",
            "createdAt": "2021-07-05T06:24:17.177Z",
            "updatedAt": "2021-07-05T06:24:17.177Z",
            "__v": 0
        },
        "token": "Will Be the token trom the backend "
    }
}

# When user is already registered
{
    "statusCode": 400,
    "status": "USER_ALREADY_REGISTERED",
    "error": "User is already registered",
    "message": "User is already registered",
    "value": {}
}
```

2️⃣ Login user

```bash
# Send the login request
curl --location --request POST 'http://localhost:8989/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"mrwhite@gmail.com",
    "userFrom":"google"
}'

# desired output
{
    "statusCode": 200,
    "status": "SIGNED_SUCCESS",
    "message": "Signed Success",
    "value": {
        "user": {
            "location": {
                "type": "point",
                "coordinates": [
                    70.8127212524414,
                    22.2808367460213
                ]
            },
            "userFrom": "google",
            "following": [],
            "followers": [],
            "_id": "60e2a59191205d19af881b34",
            "userName": "White",
            "email": "mrwhite@gmail.com",
            "picture": "https://robohash.org/1PU.png?set=set2&size=150x150",
            "userId": "padosiUser-1625466257172bb941c44186d",
            "createdAt": "2021-07-05T06:24:17.177Z",
            "updatedAt": "2021-07-05T06:24:17.177Z",
            "__v": 0
        },
        "token": "will be the token "
    }
}


# user not found
{
    "statusCode": 400,
    "status": "USER_NOT_FOUND",
    "error": "User not found",
    "message": "User not found",
    "value": {}
}


```
