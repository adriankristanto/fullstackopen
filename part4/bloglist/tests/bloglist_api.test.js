const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promises);
});

describe("Bloglist", () => {
  test("returns blogs in the JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns all available blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.blogs.length);
  });

  test("defined id property for each blog post, instead of _id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
