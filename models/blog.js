const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = {
  getAllBlogs: () => Blog.find(),
  getBlogById: (id) =>
    Blog.findById(id).populate("postedBy", "name email -_id"),
  createBlog: (values) => new Blog(values).save().then((blog) => blog),
  deleteBlogById: (id) => Blog.findByIdAndDelete(id),
};
