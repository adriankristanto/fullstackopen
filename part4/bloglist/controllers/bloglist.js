const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

bloglistRouter.post("/", async (request, response) => {
  const user = await User.findOne({}).skip(
    Math.floor(Math.random() * (await User.countDocuments({})))
  );
  console.log(user);
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    // randomise user for now
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
