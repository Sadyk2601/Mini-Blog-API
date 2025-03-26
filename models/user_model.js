const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: [true, "Email is required !!!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "It is not email !!!"],
    },
    username: { type: String, unique: true, required: true, minLength: 4 },
    password: {
      type: String,
      required: [true, "Password is required !!!"],
      minLength: [8, "Password hold 8 letters !!!"],
      validate: {
        validator: function (value) {
          return /[A-Z]/.test(value) && /\d/.test(value);
        },
        message: "Password is weak !!!",
      },
    },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  let password = this.password;
  this.password = await bcrypt.hash(password, 12);
  next();
});

userSchema.post(/^find/, async function () {
  this.where({ password: { select: false } });
});

let user = mongoose.model("User", userSchema);
module.exports = user;
