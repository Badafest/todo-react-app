const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    //Our password is hashed with bcrypt
    password: {
      type: String,
      required: [true, "can't be blank"],
      min: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
      ],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "is invalid"],
      index: true,
      required: true,
      unique: true,
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
      bio: String,
      address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zip: String,
      },
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model("User", UserSchema);
