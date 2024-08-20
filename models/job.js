const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    client: {
      type: String,
      required: true,
    },
    datePosted: {
      type: String,
      required: false,
    },
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
