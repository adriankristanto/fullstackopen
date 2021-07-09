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

describe("fetching blog post(s)", () => {
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

describe("creation of a blog post", () => {
  let token;

  beforeAll(async () => {
    const user = {
      username: "testuser",
      name: "test user",
      password: "test password",
    };

    await api.post("/api/users").send(user);

    const response = await api.post("/api/login").send(user);

    token = response.body.token;
  });

  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "The wayfinding premium",
      author: "Seth Godin",
      url: "https://seths.blog/2021/06/the-wayfinding-premium/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogs.length + 1);

    // removes id property
    const blogContents = blogs.map((blog) => {
      return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      };
    });
    expect(blogContents).toContainEqual(newBlog);
  });

  test("defaults the likes to 0 if the likes property is missing from request", async () => {
    const newBlog = {
      title: "The wayfinding premium",
      author: "Seth Godin",
      url: "https://seths.blog/2021/06/the-wayfinding-premium/",
    };

    const result = await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(result.body.likes).toBe(0);
  });

  test("fails with status code 400 if the new blog does not have title and url", async () => {
    const newBlog = {
      author: "Seth Godin",
    };

    await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(newBlog)
      .expect(400);

    const result = await helper.blogsInDb();
    expect(result).toHaveLength(helper.blogs.length);
  });

  test("fails with status code 401 unauthorized if a token is not provided", async () => {
    await api.post("/api/blogs").send({}).expect(401);
  });
});

describe("deletion of a blog post", () => {
  let token;

  beforeAll(async () => {
    const user = {
      username: "testuser",
      name: "test user",
      password: "test password",
    };

    await api.post("/api/users").send(user);

    const userResponse = await api.post("/api/login").send(user);

    token = userResponse.body.token;
  });

  test("succeeds with status code 204 if id is valid", async () => {
    const blog = {
      title: "test blog",
      author: "test author",
      url: "test url",
      likes: 0,
    };

    const blogResponse = await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(blog);

    const blogToDelete = blogResponse.body;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: "bearer" })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    // since we add another blogpost, removing it will not change the array length
    expect(blogsAtEnd).toHaveLength(helper.blogs.length);

    const blogContents = blogsAtEnd.map((blog) => {
      return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      };
    });
    expect(blogContents).not.toContainEqual({
      title: blogToDelete.title,
      author: blogToDelete.author,
      url: blogToDelete.url,
      likes: blogToDelete.likes,
    });
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "1";
    await api
      .delete(`/api/blogs/${invalidId}`)
      .auth(token, { type: "bearer" })
      .expect(400);
  });
});

describe("updating a blog post", () => {
  test("succeeds with valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: 100 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(100);
  });

  test("fails with status code 400 with invalid id", async () => {
    const invalidId = "1";
    const dummyBlog = {
      title: "dummy title",
      author: "dummy author",
      url: "dummy url",
      likes: "dummy likes",
    };
    await api.put(`/api/blogs/${invalidId}`).send(dummyBlog).expect(400);
  });

  test("fails with invalid data, i.e. missing title and url", async () => {
    const notesAtStart = await helper.blogsInDb();
    const noteToUpdate = notesAtStart[0];

    await api
      .put(`/api/blogs/${noteToUpdate.id}`)
      .send({ likes: 100 })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
