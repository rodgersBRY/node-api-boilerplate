require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const MongoDB = require("./services/db");
const { PORT } = require("./config/env");
const { createServer } = require("http");

const app = express();

const mongoDB = new MongoDB();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");
const feedbackRoutes = require("./routes/feedback");
const blogRoutes = require("./routes/blog");

app
  .use(logger("dev"))
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use("/uploads", express.static(path.join(__dirname, "uploads")));

const routes = [
  { path: "/api/v1/auth", handler: authRoutes },
  { path: "/api/v1/jobs", handler: jobRoutes },
  { path: "/api/v1/applications", handler: applicationRoutes },
  { path: "/api/v1/feedback", handler: feedbackRoutes },
  { path: "/api/v1/blogs", handler: blogRoutes },
];

routes.forEach((route) => app.use(route.path, route.handler));

app.use("/", (_, res) => {
  res.send("This is the Halisi Travels Official API");
});

app.use((err, _, res, __) => {
  const message = err.message,
    status = err.statusCode || 500,
    data = err.data;

  return res.status(status).json({ error: data, message: message });
});

const server = createServer(app);

async function serve() {
  await mongoDB.init();

  server.listen(PORT, () => {
    console.log(`server-init port: ${PORT}`);
  });
}

serve();

module.exports = app;
