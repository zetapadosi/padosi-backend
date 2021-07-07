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

```b
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

```b
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

## Work updates

- ### 🏁 Day 1️⃣ Work

  - [x]  Set up the backend as per the requirement and with all the set up of dependencies.

  - [x] The Login setup with input fields with google and facebook

- ### 🏁 Day 2️⃣ Work

  - [x]  Create New post by the user with all the required fields
    - [x] Add the input validation to the inputs as for post and tags that are created
    - [ ] Unit testing of the post route.

  - [x] Create the get method for getting the details of the post for the login user wall.
    - [x] Get the data of the post from the desired radious of 5 Km area.
    - [ ] Unit testing of getting the post data.

  - [x] Create the post method for the comment on the post with multiple users
    - [x] Add the input validation to the inputs as comment length.
    - [ ] Unit testing of comments

  - [x] Create the post method for the like and unlike the post and comments as well
    - [ ] Unit testing of the like and dislike

  - [x] Add the user profile page to get the user data with his/her posts
    - [ ] Unit testing of the page

- ### 🏁 Day 3️⃣ Work

  - [x] Add search by Tags route and get the posts
    - [x] Get all the tags value and search the tags
    - [ ] Unit tesing for the test Route

  - [ ] Add the follower and following routes to get the follower and following
    - [ ] Unit testing for the Follower and following

---

### 🥇 The Endpoints and the output of the endpoints

- #### [Register and Signup](lib/registerSignup.md)

- #### [Creat Add a Post](lib/addPost.md)
