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
  },
  { _id: false }
);

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
    location: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
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
