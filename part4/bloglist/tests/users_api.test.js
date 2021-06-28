const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.users.map((user) => new User(user));
  const promises = userObjects.map((userObject) => userObject.save());
  await Promise.all(promises);
});

describe("fetching users", () => {
  // correct status code and format
  test("should return users in JSON format with status code 200", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // correct number of documents returned
  test("should return the correct number of registered users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.users.length);
  });

  // password hash & _id is not included
  test("should not return _id and passwordHash property of the user document", async () => {
    const response = await api.get("/api/users");
    response.body.forEach((user) => {
      expect(user.id).toBeDefined();
      expect(user._id).not.toBeDefined();
      expect(user.passwordHash).not.toBeDefined();
    });
  });
});

describe("creating user", () => {
  // when invalid, returns suitable status code and error message
  // username and password must be given
  test("should require both username and password", async () => {
    const user = {
      username: "dummy username",
      name: "dummy name",
    };
    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("missing password");

    const anotherUser = {
      name: "dummy name",
      password: "dummy password",
    };

    const anotherResult = await api
      .post("/api/users")
      .send(anotherUser)
      .expect(400);

    expect(anotherResult.body.error).toContain("`username` is required");
  });

  // username and password must be at least 3 characters long
  test("should require both username and password to be at least 3 characters long", async () => {
    const user = {
      username: "dummy username",
      name: "dummy name",
      password: "du",
    };

    const result = await api.post("/api/users").send(user).expect(400);
    expect(result.body.error).toContain("password is too short");

    const anotherUser = {
      username: "du",
      name: "dummy name",
      password: "dummy password",
    };

    const anotherResult = await api
      .post("/api/users")
      .send(anotherUser)
      .expect(400);
    expect(anotherResult.body.error).toMatch(
      /`username` \(`.*`\) is shorter than the minimum allowed length \(3\)./
    );
  });

  // unique username
  test("should require unique username", async () => {
    const user = {
      username: helper.users[0].username,
      name: helper.users[0].name,
      password: "password",
    };

    const result = await api.post("/api/users").send(user).expect(400);

    expect(result.body.error).toContain("`username` to be unique");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
