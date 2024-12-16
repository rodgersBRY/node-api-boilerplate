const {
  getBlogs,
  deleteBlog,
  createBlog,
  getBlog,
  updateBlog,
} = require("../models/blog");
const { throwError } = require("../helpers/error");
const logger = require("../utils/logger");

class BlogPostsService {
  async create(data) {
    try {
      const { author, title } = data;

      const blogExists = await this.findOne({ author, title });
      if (blogExists) throwError("blog already created", 409);

      const blog = await createBlog(data);

      logger.info("blog-created %o", blog._id);

      return blog;
    } catch (err) {
      logger.error("blog-create-error %o", err);

      throw err;
    }
  }

  async get(query) {
    try {
      const blogs = await getBlogs(query);

      if (blogs) {
        logger.info("blogs-fetched %o", blogs.length);

        console.log(blogs);

        return blogs;
      }
    } catch (err) {
      logger.error("blogs-fetch-error %o", err);

      throw err;
    }
  }

  async findOne(query) {
    try {
      const blog = await getBlog(query);

      if (blog) {
        logger.info("blog-fetched %o", blog._id);

        return blog;
      }
    } catch (err) {
      logger.error("blog-fetch-error %o", err);

      throw err;
    }
  }

  async update(query, values) {
    const updatedBlog = await updateBlog(query, values);

    logger.info("updated-blog %o", updatedBlog._id);

    return updatedBlog;
  }

  async delete(id) {
    try {
      const deletedBlog = await deleteBlog(id);

      logger.info("deleted-blog %o", deleteBlog._id);

      return deletedBlog;
    } catch (err) {
      logger.error("blog-delete-error %o", err);

      throw err;
    }
  }
}

module.exports = BlogPostsService;
