import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ['admin', 'employee','client'],
      default: 'employee',
    },
    isApproved: { type: Boolean, default: false },
    linkedMember: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
