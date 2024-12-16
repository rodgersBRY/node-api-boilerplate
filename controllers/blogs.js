const BlogPostsService = require("../services/blog");
const { uploadFile } = require("../helpers/buffer_stream");
const { throwError } = require("../helpers/error");
const logger = require("../utils/logger");

const blogPostService = new BlogPostsService();

exports.getBlogs = async (req, res, next) => {
  try {
    let query = {};

    if (req.query) {
      query = { ...req.query };
    }

    const blogs = await blogPostService.get(query);
    if (!blogs) throwError("Cannot retrieve any blogs!", 404);

    res.status(200).json({ blogs });
  } catch (err) {
    next(err);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await blogPostService.findOne({ _id: id });

    if (!blog) throwError("Cannot retrieve blog details!", 404);

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.newBlog = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) throwError("Required fields cannot be empty!", 400);

    let imagePath;

    if (req.file) {
      max_size = 10 * 1024 * 1024;

      if (req.file.size > max_size) throwError("Your file exceeds 10MB");

      const { secure_url } = await uploadFile(req.file, "blogs", "image");
      imagePath = secure_url;
    }

    const blogData = {
      author: req.userId,
      title,
      content,
      tags,
      image: imagePath,
    };

    const blog = await blogPostService.create(blogData);

    res.status(201).json({ blog });
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogData = req.body;

    const deletedBlog = await blogPostService.update({ _id: id }, blogData);

    res.status(201).json({ deletedBlog });
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedBlog = await blogPostService.delete(id);

    res.status(201).json({ deletedBlog });
  } catch (err) {
    next(err);
  }
};
