const app = require("express").Router();
const controller = require("../controllers/blogs");
const isAuthenticated = require("../middleware/authguard");
const upload = require("../config/multer");

app
  .route("/")
  .get(controller.getBlogs)
  .post(isAuthenticated, upload.single("image"), controller.newBlog);

app
  .route("/:id")
  .get(controller.getBlog)
  .delete(isAuthenticated, controller.deleteBlog)
  .patch(controller.updateBlog);

module.exports = app;
