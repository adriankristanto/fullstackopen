const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

bloglistRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!(request.token && decodedToken.id)) {
    return response.json(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(blog);
  await user.save();
  response.status(201).json(savedBlog);
});

bloglistRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

bloglistRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog);
});

module.exports = bloglistRouter;
