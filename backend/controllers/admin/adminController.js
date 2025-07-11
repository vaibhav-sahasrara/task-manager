import User from "../../models/User.js";
import TeamMember from "../../models/TeamMember.js";

// GET all pending users
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ isApproved: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// APPROVE a user
export const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 👇 If the user doesn't already have a team member profile, create it
    const existingMember = await TeamMember.findOne({ userRef: userId });

    if (!existingMember) {
      const newMember = await TeamMember.create({
        name: user.name,
        email: user.email,
        role: user.role === "employee" ? "Developer" : "Client",
        avatar: "", // You can set a default or allow frontend to update later
        userRef: user._id,
      });

      // Link team member to user
      user.linkedMember = newMember._id;
      await user.save();
    }

    res.json({ message: "User approved and team profile created", user });
  } catch (err) {
    console.error("❌ Failed to approve user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveUserAndCreateProfile = async (req, res) => {
  const { userId } = req.params;
  const { avatar, phone, expertise, pastProjects, role, name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isApproved = true;
    user.role = "employee";

    // Check if profile already exists
    const existingProfile = await TeamMember.findOne({ userRef: userId });

    if (existingProfile) {
      // 🔄 Update existing profile instead of error
      existingProfile.name = name || existingProfile.name;
      existingProfile.role = role || existingProfile.role;
      existingProfile.avatar = avatar || existingProfile.avatar;
      existingProfile.phone = phone || existingProfile.phone;
      existingProfile.expertise = expertise?.length
        ? expertise
        : existingProfile.expertise;
      existingProfile.pastProjects = pastProjects?.length
        ? pastProjects
        : existingProfile.pastProjects;

      await existingProfile.save();

      user.linkedMember = existingProfile._id;
      await user.save();

      return res
        .status(200)
        .json({ message: "Profile updated successfully", user });
    }

    // ✅ Create a new profile if not exists
    const newMember = await TeamMember.create({
      name: name || user.name,
      email: user.email,
      avatar,
      phone,
      expertise,
      pastProjects,
      role,
      userRef: user._id,
    });

    user.linkedMember = newMember._id;
    await user.save();

    res.status(200).json({ message: "User approved & profile created", user });
  } catch (err) {
    console.error("❌ Failed to approve and create profile:", err);
    res.status(500).json({ error: "Failed to approve and create profile" });
  }
};

export const toggleUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      message: `User account ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      user,
    });
  } catch (err) {
    console.error("❌ Failed to update user status:", err);
    res.status(500).json({ error: "Failed to update user status" });
  }
};

