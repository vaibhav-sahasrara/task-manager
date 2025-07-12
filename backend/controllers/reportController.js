// controllers/reportController.js
import Task from "../models/Task.js";
import TeamMember from "../models/TeamMember.js";
import mongoose from "mongoose";

/**
 * GET /api/reports/me   (or /:userId for admin)
 */
export const getEmployeeReport = async (req, res) => {
  try {
    /* 1️⃣  Resolve IDs ---------------------------------------------------- */
    const userId = req.params.userId || req.user.id;              // User _id (string)
    const userObjId = new mongoose.Types.ObjectId(userId);

    // Try to find the matching TeamMember doc (if any)
    const tmDoc = await TeamMember.findOne({ userRef: userId }).select("_id");
    const teamMemberObjId = tmDoc ? tmDoc._id : null;

    /* 2️⃣  Build a flexible $match --------------------------------------- */
    const matchStage = {
      $match: {
        assignees: {
          $in: [
            userObjId,                     // User _id (future data)
            ...(teamMemberObjId ? [teamMemberObjId] : []) // TeamMember _id (legacy data)
          ]
        }
      }
    };

    /* 3️⃣  Pull plain task list (helpful for table) ---------------------- */
    const tasks = await Task.find(matchStage.$match)
      .populate("project", "name")
      .sort({ deadline: 1 });

    /* 4️⃣  Group by project ---------------------------------------------- */
    const byProject = await Task.aggregate([
      matchStage,
      { $group: { _id: "$project", taskCount: { $sum: 1 } } },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "project"
        }
      },
      { $unwind: "$project" },
      { $project: { projectName: "$project.name", taskCount: 1 } }
    ]);

    res.json({ tasks, byProject });
  } catch (err) {
    console.error("❌ Report error:", err);
    res.status(500).json({ message: "Failed to generate report" });
  }
};

/**
 * Smaller widget: counts only
 */
export const getEmployeeSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const summary = await Task.aggregate([
      { $match: { assignees: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          total: [{ $count: "count" }],
          completed: [{ $match: { status: "Done" } }, { $count: "count" }],
          pending: [
            { $match: { status: { $ne: "Done" } } },
            { $count: "count" },
          ],
        },
      },
    ]);

    res.json(summary[0]);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch summary" });
  }
};

/**
 * Compare all employees (admin dashboard)
 */
export const getTeamComparison = async (_req, res) => {
  try {
    const comparison = await Task.aggregate([
      { $unwind: "$assignees" },
      {
        $group: {
          _id: "$assignees",
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Done"] }, 1, 0],
            },
          },
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { name: "$user.name", total: 1, completed: 1 } },
    ]);

    res.json(comparison);
  } catch (err) {
    res.status(500).json({ message: "Cannot compare team" });
  }
};
