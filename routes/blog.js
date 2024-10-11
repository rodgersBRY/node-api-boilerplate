const app = require("express").Router(),
  controller = require("../controllers/blogs"),
  isAuthenticated = require("../middleware/authguard");

app.route("/").get(controller.getBlogs).post(isAuthenticated, controller.newBlog);

app
  .route("/:id")
  .get(controller.getBlog)
  .delete(isAuthenticated, controller.deleteBlog);

module.exports = app;
