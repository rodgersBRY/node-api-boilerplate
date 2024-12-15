const { Schema, model } = require("mongoose");

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
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1 });
applicationSchema.index({ job: 1 });
applicationSchema.index({ country: 1 });

const Application = model("Application", applicationSchema);

module.exports = {
  queryApplications: (query) =>
    Application.find(query)
      .populate("job", "title desc location country -_id")
      .populate("user", "name email -_id"),
  findApplication: (query) => Application.findOne(query),
  applicationById: (id) => Application.findById(id),
  newApplication: (values) =>
    new Application(values).save().then((application) => application),
};
