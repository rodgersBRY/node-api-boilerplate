const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
});

const applicationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    cvUrl: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    // skills: [],
    urls: urlSchema,
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1 });
applicationSchema.index({ job: 1 });

const Application = model("Application", applicationSchema);

module.exports = {
  allApplications: (query) =>
    Application.find(query)
      .populate("jobId", "title desc location country client createdAt -_id")
      .populate("userId", "name email -_id"),
  applicationsByUserId: (id) =>
    Application.find({ user: id }).populate("jobId", "title client -_id"),
  applicationById: (id) => Application.findById(id),
  userApplicationByJobId: (jobId, userId) =>
    Application.findOne({ job: jobId, user: userId }),
  newApplication: (values) =>
    new Application(values).save().then((application) => application),
};
