const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000,
    },
    image: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
      index: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

blogSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

blogSchema.methods.restore = function () {
  this.deleted = false;
  this.deletedAt = null;
  return this.save();
};

const Blog = model("Blog", blogSchema);

module.exports = {
  getBlogs: (query) =>
    Blog.find({ ...query, deleted: false }).sort({ createdAt: 1 }),
  getBlog: (query) =>
    Blog.findOne(query).populate("author", "name email -_id"),
  createBlog: (values) => new Blog(values).save().then((blog) => blog),
  updateBlog: (query, values) =>
    Blog.findOneAndUpdate(query, values, { upsert: true, new: true }),
  deleteBlog: (id) =>
    Blog.findById(id).then((blog) => {
      if (blog) return blog.softDelete();
    }),
  restoreBlog: (id) =>
    Blog.findById(id).then((blog) => {
      if (blog) return blog.restore();
    }),
};
