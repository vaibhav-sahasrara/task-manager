import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeamMember',
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember',
      },
    ],
    tags: [String],
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
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
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    activityLogs: [
      {
        action: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
