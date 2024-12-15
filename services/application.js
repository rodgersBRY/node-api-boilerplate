const { throwError } = require("../helpers/error");
const {
  queryApplications,
  applicationById,
  findApplication,
  newApplication,
} = require("../models/application");
const logger = require("../utils/logger");

class ApplicationsService {
  async create(data) {
    const { job, cvUrl, country, user } = data;

    const applicationData = {
      user,
      job,
      country,
      cvUrl,
    };

    try {
      const application = await newApplication(applicationData);

      logger.info("new-application: %o", application._id);

      return application;
    } catch (err) {
      logger.error("new-application-error: %o", err);
      throw err;
    }
  }

  async get(query) {
    try {
      const applications = await queryApplications(query);

      logger.info("fetched-applications-length: %o", applications.length);

      return applications;
    } catch (err) {
      logger.error("fetch-applications-error: %o", err);
      throw err;
    }
  }

  async findOne(query) {
    try {
      const application = await findApplication(query);
      if (application) {
        logger.info("fetched-application: %o", application._id);

        return application;
      }
    } catch (err) {
      logger.error("fetch-application-error: %o", err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const deletedApplication = await deleteApplicationById(id);

      logger.info("deleted-application: %o", deletedApplication._id);

      return deletedApplication;
    } catch (err) {
      logger.error("delete-application-error: %o", err);

      throw err;
    }
  }

  async restore(id) {
    try {
      const restoredApplication = await restoreApplication(id);

      logger.info("restored-application: %o", restoredApplication._id);

      return restoredApplication;
    } catch (err) {
      logger.error("restore-application-error: %o", err);

      throw err;
    }
  }
}

module.exports = ApplicationsService;
