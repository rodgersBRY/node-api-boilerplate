const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    companyEmail: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    remote: {
      type: Boolean,
      required: true,
    },
    client: companySchema,
    datePosted: {
      type: String,
      required: false,
    },
    applicationEmail: {
      type: String,
      required: true,
    },
    tags: [],

    requirements: [],
    roles: [],
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);

module.exports = {
  getAllJobs: () => Job.find(),
  getJobById: (id) => Job.findById(id),
  createJob: (values) => new Job(values).save().then((job) => job),
  deleteJobById: (id) => Job.findByIdAndDelete(id),
};
