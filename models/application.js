const { Schema, model } = require("mongoose");

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
  },
  { timestamps: true }
);

const Application = model("Application", applicationSchema);
