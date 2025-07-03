import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String },
    expertise: [{ type: String }],
    pastProjects: [{ type: String }],
    isActive: { type: Boolean, default: true },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);
