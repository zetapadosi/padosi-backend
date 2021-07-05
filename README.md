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

- [Register and Signup](lib/registerSignup.md)