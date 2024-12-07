require("dotenv").config();

const express = require("express");
const MongoDB = require("./config/db");
const { PORT } = require("./config/env");
const { createServer } = require("http");
const ExpressConfig = require("./config/express");

const app = express();

const mongoDB = new MongoDB();
const expressConfig = new ExpressConfig();

const server = createServer(app);

async function serve() {
  await mongoDB.init();

  expressConfig.init(app);

  server.listen(PORT, () => {
    console.log(`server-init port: ${PORT}`);
  });
}

serve();

module.exports = app;
