const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// create a new user
usersRouter.post("/", async (request, response) => {
  const body = request.body;

  // password checks need to be done here instead of using mongoose validation
  // because the password hash will be stored in the database, not the password
  if (!body.password) {
    return response.status(400).json({ error: "missing password" });
  }

  if (body.password.length < 3) {
    return response.status(400).json({ error: "password is too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

// see the details of all users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
