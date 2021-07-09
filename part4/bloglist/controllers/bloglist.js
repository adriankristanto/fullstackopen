const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

bloglistRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;

    const user = request.user;

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
  }
);

bloglistRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(403)
        .json({ error: "the requested blog is not owned by user" });
    }
  }
);

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
