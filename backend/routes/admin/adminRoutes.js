
import express from 'express';
import {
  getPendingUsers,
  approveUser,
  approveUserAndCreateProfile,
  toggleUserStatus,
} from '../../controllers/admin/adminController.js';
import { verifyToken,auth, verifyAdmin } from '../../middleware/auth.js';
import User from '../../models/User.js'; // ✅ Required import

const router = express.Router();

// ✅ Get all pending users
router.get('/pending-users', verifyToken, verifyAdmin, getPendingUsers);

// ✅ Approve user only
router.put('/approve-user/:id', verifyToken, verifyAdmin, approveUser);

router.patch("/user-status/:userId",auth, verifyAdmin, toggleUserStatus);


// ✅ Approve and create team member profile
router.post(
  '/approve-create-profile/:userId',
  verifyToken,
  verifyAdmin,
  approveUserAndCreateProfile
);

// ✅ Get all approved users
router.get('/approved-users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ isApproved: true }).populate('linkedMember');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved users' });
  }
});

export default router;
