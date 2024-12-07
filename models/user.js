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
      unique: true,
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
  getUserByEmail: (email) => User.findOne({ email: email }),
  addUser: (values) => new User(values).save().then((user) => user),
  editUser: (id, values) =>
    User.findByIdAndUpdate(id, values, { upsert: true, new: true }),
};
