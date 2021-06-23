const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce(
        (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
        blogs[0]
      );
};

const mostBlogs = (blogs) => {
  const reducer = (authors, blog) => {
    // if the author doesn't exist, add the author, otherwise, update blogs count
    const authorIndex = authors.findIndex(
      (author) => author.author === blog.author
    );
    if (authorIndex === -1) {
      return authors.concat({ author: blog.author, blogs: 1 });
    } else {
      authors.splice(authorIndex, 1, {
        author: authors[authorIndex].author,
        blogs: authors[authorIndex].blogs + 1,
      });
      return authors;
    }
  };

  const authors = blogs.reduce(reducer, []);

  return authors.length === 0
    ? {}
    : authors.reduce(
        (maxAuthor, author) =>
          author.blogs > maxAuthor.blogs ? author : maxAuthor,
        authors[0]
      );
};

const mostLikes = (blogs) => {
  const reducer = (authors, blog) => {
    const authorIndex = authors.findIndex(
      (author) => author.author === blog.author
    );
    if (authorIndex === -1) {
      return authors.concat({ author: blog.author, likes: blog.likes });
    } else {
      authors.splice(authorIndex, 1, {
        author: authors[authorIndex].author,
        likes: authors[authorIndex].likes + blog.likes,
      });
      return authors;
    }
  };
  const authors = blogs.reduce(reducer, []);
  return authors.length === 0
    ? {}
    : authors.reduce(
        (maxAuthor, author) =>
          author.likes > maxAuthor.likes ? author : maxAuthor,
        authors[0]
      );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
