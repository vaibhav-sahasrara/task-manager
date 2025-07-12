import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "employee", "client"],
      default: "employee",
    },
    isApproved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    linkedMember: { type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
