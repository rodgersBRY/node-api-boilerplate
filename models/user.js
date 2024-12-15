const { Schema, model } = require("mongoose");

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
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "candidate", "employer"],
      default: "candidate",
    },
    cvUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = model("User", userSchema);

module.exports = {
  getUsers: () => User.find(),
  getUserById: (id) => User.findById(id),
  getUser: (query) => User.findOne(query),
  addUser: (query, values) =>
    User.findOneAndUpdate(query, values, { upsert: true, new: true }),
};
