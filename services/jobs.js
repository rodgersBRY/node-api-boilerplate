const { throwError } = require("../helpers/error");
const {
  createJob,
  getJob,
  restoreJob,
  getAllJobs,
  deleteJobById,
} = require("../models/job");
const logger = require("../utils/logger");

class JobsService {
  async create(data, userId) {
    const {
      title,
      country,
      type,
      desc,
      salary,
      currency,
      requirements,
      reqs,
      role,
      roles,
    } = data;

    const jobExists = await this.getOne({ title, country });
    if (jobExists) throwError("job exists", 409);

    let jobRoles;
    let jobReqs;

    if (requirements.length > 0 && roles.length > 0) {
      jobRoles = roles;
      jobReqs = requirements;
    } else {
      jobRoles = role.split(",").map((role) => role.trim());
      jobReqs = reqs.split(",").map((req) => req.trim());
    }

    const jobData = {
      userId,
      title,
      type,
      salary,
      currency,
      country,
      requirements: jobReqs,
      roles: jobRoles,
      desc,
    };

    try {
      const job = await createJob(jobData);

      logger.info("job-created: %o", job._id);

      return job;
    } catch (err) {
      logger.error("job-create-error: %o", err);
      throw err;
    }
  }

  async get(query) {
    try {
      const jobs = await getAllJobs(query);

      logger.info("fetched-jobs-length: %o", jobs.length);

      return jobs;
    } catch (err) {
      logger.error("fetch-jobs-error: %o", err);
      throw err;
    }
  }

  async getOne(query) {
    try {
      const job = await getJob(query);
      if (!job) return;

      logger.info("fetched-job: %o", job);

      return job;
    } catch (err) {
      logger.error("fetch-job-error: %o", err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const deletedJob = await deleteJobById(id);

      logger.info("deleted-job: %o", deletedJob._id);

      return deletedJob;
    } catch (err) {
      logger.error("delete-job-error: %o", err);

      throw err;
    }
  }

  async restore(id) {
    try {
      const restoredJob = await restoreJob(id);

      logger.info("restored-job: %o", restoredJob._id);

      return restoredJob;
    } catch (err) {
      logger.error("restore-job-error: %o", err);

      throw err;
    }
  }
}

module.exports = JobsService;
