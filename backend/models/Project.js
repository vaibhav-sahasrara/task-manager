
import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, trim: true },
    deadline: Date,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "On Hold", "Cancelled"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" }],
    tags: [String],
    progress: { type: Number, min: 0, max: 100, default: 0 },
    milestones: [
      {
        title: String,
        description: String,
        dueDate: Date,
        completed: { type: Boolean, default: false },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    activityLogs: [
      {
        action: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    archived: { type: Boolean, default: false },

    // ✅ Unique project code
    projectCode: {
      type: String,
      unique: true,
      index: true,
    },

    // Optional company or department
    company: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Auto-generate projectCode before saving
projectSchema.pre("save", async function (next) {
  if (!this.isNew || this.projectCode) return next();

  const baseSlug = slugify(
    `${this.company || "PRJ"}-${this.name}`,
    { lower: true, strict: true }
  ).toUpperCase();

  // Count existing similar slugs
  const count = await mongoose.model("Project").countDocuments({
    projectCode: new RegExp(`^${baseSlug}`),
  });

  this.projectCode = `${baseSlug}-${(count + 1).toString().padStart(3, "0")}`;
  next();
});

export default mongoose.model("Project", projectSchema);
