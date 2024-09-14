const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    salary: {
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
    applicationEmail: {
      type: String,
      required: true,
    },
    requirements: [],
    roles: [],
  },
  { timestamps: true }
);

// Create indexes on frequently queried fields
jobSchema.index({ title: 1 });
jobSchema.index({ salary: 1 });
jobSchema.index({ country: 1 });

const Job = model("Job", jobSchema);

module.exports = {
  getAllJobs: (query) => Job.find(query),
  getJobById: (id) => Job.findById(id),
  createJob: (values) => new Job(values).save().then((job) => job),
  deleteJobById: (id) => Job.findByIdAndDelete(id),
};
