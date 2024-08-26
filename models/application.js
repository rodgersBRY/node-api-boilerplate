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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    applicantName: {
      type: String,
      required: true,
    },
    cvUrl: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    pTitle: {
      type: String,
      required: true,
    },
    skills: [],
    urls: urlSchema,
  },
  { timestamps: true }
);

const Application = model("Application", applicationSchema);

module.exports = {
  allApplications: () => Application.find(),
  applicationsByUserId: (id) => Application.find({ userId: id }).populate("jobId", "title client -_id"),
  applicationById: (id) => Application.findById(id),
  userApplicationByJobId: (jobId, userId) =>
    Application.findOne({ jobId: jobId, userId: userId }),
  newApplication: (values) =>
    new Application(values).save().then((application) => application),
};
