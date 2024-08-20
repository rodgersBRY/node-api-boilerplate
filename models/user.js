const { Schema, model } = require("mongoose");

const appSchema = new Schema({
  applicationId: String,
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: false,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "candidate"],
      default: "candidate",
    },
    resumeUrl: {
      type: String,
      required: false,
    },
    applications: [{ appSchema }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
  getUserById: (id) => User.findById(id),
  getUserByEmail: (email) => User.findOne({ email: email }),
  addUser: (values) => new User(values).save().then((user) => user),
  editUser: (id, values) =>
    User.findByIdAndUpdate(id, values, { upsert: true, new: true }),
};
