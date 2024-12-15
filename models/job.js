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
      lowercase: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
    desc: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      required: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
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

// Create indexes
jobSchema.index({ title: 1 });
jobSchema.index({ salary: 1 });
jobSchema.index({ country: 1 });

jobSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

jobSchema.methods.restore = function () {
  this.deleted = false;
  this.deletedAt = null;
  return this.save();
};

const Job = model("Job", jobSchema);

module.exports = {
  getAllJobs: (query) =>
    Job.find({ ...query, deleted: false }).sort({ createdAt: 1 }),
  getJobById: (id) =>
    Job.findById(id)
      .where({ deleted: false })
      .populate("postedBy", "name email -_id"),
  getJob: (query) => Job.findOne(query).populate("postedBy", "name email -_id"),
  createJob: (values) => new Job(values).save().then((job) => job),
  deleteJobById: (id) =>
    Job.findById(id).then((job) => {
      if (job) return job.softDelete();
    }),
  restoreJob: (id) =>
    Job.findById(id).then((job) => {
      if (job) return job.restore();
    }),
};
