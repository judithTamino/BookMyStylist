import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false }
},
  {
    timestamps: true,
    toJSON: {
      transform(ret) {
        delete ret.password;
        delete ret.isAdmin;
        return ret;
      }
    }
  });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;