# Padosi-backend

- Nodejs, Express and MongoDB backend app for serving the API for the padosi-frontend.

---

## 🏁 The prerequisite

```bash
# node version
node  "16.4.0"
npm   "7.18.1"
yarn  "1.22.5"

# Create the .env file and add the below details
PORT=
MONGO_URL=
JWT_SECRET=
```

## 🏁 The installation and starting script

```bash
#  To add and  install the required dependencies
yarn or npm i

# To start the application in the development mode
yarn dev or
npm run dev

 # To start the app in production monde
 yarn start
 npm start
```

## 🏁 The required Dependencies

### Dependencies

```
"dependencies": {
  "compression": "^1.7.4",
  "cookie-parser": "^1.4.5",
  "cors": "^2.8.5",
  "dotenv": "^10.0.0",
  "ejs": "^3.1.6",
  "express": "^4.17.1",
  "express-jwt": "^6.0.0",
  "express-validator": "^6.12.0",
  "helmet": "^4.6.0",
  "i18n": "^0.13.3",
  "jsonwebtoken": "^8.5.1",
  "lodash": "^4.17.21",
  "mongoose": "^5.12.14",
  "morgan": "^1.10.0",
  "serve-favicon": "^2.5.0"
 },
```

### Dev Dependencies

```
"devDependencies": {
  "@babel/core": "^7.14.3",
  "@babel/preset-env": "^7.14.4",
  "babel-loader": "^8.2.2",
  "nodemon": "^2.0.7",
  "webpack": "^5.38.1",
  "webpack-cli": "^4.7.2",
  "webpack-node-externals": "^3.0.0"
 },
```

---

### 🏁 Day 1️⃣ Work

✔️ Set up the backend as per the requirement and with all the set up of dependencies.
✔️ The Login setup with input fields with google and facebook

### Day 2 Work

✔️ Create New post by the user with all the required fields

---

### 🥇 The Endpoints and the output of the endpoints

#### Register and Signup endpoint

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
