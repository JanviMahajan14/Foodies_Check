import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot include 'password'");
        }
      },
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "root"]
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);