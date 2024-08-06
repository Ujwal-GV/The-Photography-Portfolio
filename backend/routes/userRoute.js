const express = require("express");
const { login, signup } = require("../controller/userController");

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/signup", signup);

module.exports = userRoute;