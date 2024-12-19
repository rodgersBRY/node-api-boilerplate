const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const responseLogger = require("../utils/response");

class ExpressConfig {
  async init(app) {
    app
      .use(helmet())
      .use(logger("dev"))
      .use(
        cors({
          origin: [""], //specify the origins to allow access to API
        })
      )
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(responseLogger);

    const routes = [
      // add your route resources
    ];

    routes.forEach((route) => app.use(route.path, route.handler));

    // error middleware
    app.use((err, _, res, __) => {
      const message = err.message,
        status = err.statusCode || 500,
        data = err.data;

      return res.status(status).json({ error: data, message: message });
    });

    return app;
  }
}

module.exports = ExpressConfig;
