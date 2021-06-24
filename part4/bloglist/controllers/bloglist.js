const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

bloglistRouter.post("/", async (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = bloglistRouter;
