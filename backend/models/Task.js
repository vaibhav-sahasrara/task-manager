import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    deadline: { type: Date, required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },

    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
     owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    activityLogs: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: String,
        details: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    tags: [String],

    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

  },
  { timestamps: true }
);
export default mongoose.model('Task', taskSchema);


