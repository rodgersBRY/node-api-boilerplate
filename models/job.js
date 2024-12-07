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
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
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
    requirements: [],
    roles: [],
  },
  { timestamps: true }
);

// Create indexes on frequently queried fields
jobSchema.index({ title: 1 });
jobSchema.index({ salary: 1 });
jobSchema.index({ country: 1 });

jobSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

const Job = model("Job", jobSchema);

module.exports = {
  getAllJobs: (query) => Job.find({ ...query, deleted: false }),
  getJobById: (id) =>
    Job.findById(id)
      .where({ deleted: false })
      .populate("postedBy", "name email -_id"),
  createJob: (values) => new Job(values).save().then((job) => job),
  deleteJobById: (id) =>
    Job.findById(id).then((job) => {
      if (job) return job.softDelete();
    }),
};
