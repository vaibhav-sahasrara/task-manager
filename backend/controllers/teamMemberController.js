import TeamMember from "../models/TeamMember.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createTeamMemberFromUser = async (req, res) => {
  const userId = req.params.userId;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user || !user.isApproved || user.role !== "employee") {
      return res
        .status(400)
        .json({ error: "User must be an approved employee" });
    }

    if (user.linkedMember) {
      return res
        .status(400)
        .json({ error: "This user already has a team member profile" });
    }

    const { name, role, avatar, phone, expertise, pastProjects } = req.body;

    const newTeamMember = await TeamMember.create({
      name: name || user.name,
      email: user.email,
      role,
      avatar,
      phone,
      expertise,
      pastProjects,
      userRef: user._id,
    });

    user.linkedMember = newTeamMember._id;
    await user.save();

    res.status(201).json({
      message: "Team member profile created and linked",
      teamMember: newTeamMember,
    });
  } catch (err) {
    console.error("Error linking user to team member:", err);
    res.status(500).json({ error: "Failed to create team member from user" });
  }
};

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // ✅ Basic field validation
    if (!name || !email || !role) {
      return res
        .status(400)
        .json({ error: "Name, email, and role are required" });
    }

    const newMember = new TeamMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    // ✅ Log the error to the console for debugging
    console.error("Error creating team member:", err);

    // ✅ Return a clear message
    res
      .status(400)
      .json({ error: err.message || "Failed to create team member" });
  }
};

// Get a single team member
export const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch member" });
  }
};

// Update a team member
export const updateTeamMember = async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update member" });
  }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete member" });
  }
};

// export const getUnlinkedUsers = async (req, res) => {
//   try {
//     const users = await User.find({
//       role: "employee",
//       isApproved: true,
//       $or: [{ linkedMember: { $exists: false } }, { linkedMember: null }],
//     });

//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching unlinked users:", err);
//     res.status(500).json({ error: "Failed to fetch unlinked users" });
//   }
// };
