const {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlogById,
} = require("../models/blog");

const { throwError } = require("../helpers");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await getAllBlogs();

    if (!blogs) throwError("Cannot retrieve any blogs!", 404);

    res.status(200).json({ blogs });
  } catch (err) {
    next(err);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    const blog = await getBlogById(blogId);

    if (!blog) throwError("Cannot retrieve blog details!", 404);

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.newBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (title == "" || content == "")
      throwError("Required fields cannot be empty!", 400);

    const blogData = {
      postedBy: req.userId,
      title: title,
      content: content,
      date: new Date.now(),
      image: imageUrl,
    };

    const result = await createBlog(blogData);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    await deleteBlogById(blogId);

    res.status(204);
  } catch (err) {
    next(err);
  }
};
