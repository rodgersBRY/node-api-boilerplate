const express = require("express"),
  logger = require("morgan"),
  cors = require("cors"),
  app = express(),
  path = require("path"),
  connectDB = require("./services/db");

require("dotenv").config();

connectDB();

const authRoutes = require("./routes/auth"),
  jobRoutes = require("./routes/job"),
  applicationRoutes = require("./routes/application");

const port = process.env.PORT || 4000;

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
];

routes.forEach((route) => app.use(route.path, route.handler));

app.use("/", (req, res) => {
  res.send("This is the Halisi Travels Official API");
});

app.use((err, req, res, next) => {
  const message = err.message,
    status = err.statusCode || 500,
    data = err.data;

  return res.status(status).json({ error: data, message: message });
});

app.listen(port, () => {
  console.log(`Port ${port} is ready for requests`);
});

module.exports = app;
