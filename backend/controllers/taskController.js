import Task from "../models/Task.js";
import moment from "moment";

import mongoose from "mongoose";
// import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      deadline,
      priority,
      status,
      tags,
      assignees = [],
      project,
    } = req.body;

    // ✅ Convert strings to ObjectIds and validate against existing users
    const validAssignees = await User.find({
      _id: { $in: assignees.map((id) => new mongoose.Types.ObjectId(id)) },
    }).select("_id");

    const validAssigneeIds = validAssignees.map((user) => user._id);
    console.log("🔍 Valid Assignees Found:", validAssigneeIds);

    const newTask = new Task({
      name,
      description,
      startDate,
      deadline,
      priority,
      status,
      tags,
      assignees: validAssigneeIds, // ✅ only valid users
      project,
      activityLogs: [
        {
          user: req.user?._id || null,
          action: "Created task",
          details: `Task '${name}' was created.`,
        },
      ],
    });

    const savedTask = await newTask.save();

    const fullTask = await Task.findById(savedTask._id)
      .populate("assignees", "name _id")
      .populate("project", "name");

    console.log("✅ Saved task with populated assignees:", fullTask.assignees);

    res.status(201).json(fullTask);
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// @desc    Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const { assigneeId } = req.query;

    let query = {};
    if (assigneeId) {
      query.assignees = assigneeId; // ✅ Fix key from "assignee.value" to correct MongoDB field
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .populate("assignees", "name _id") // ✅ This line is key
      .populate("creator", "name") // (optional) if you use creator
      .populate("project", "name"); // (optional) if needed

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update a task
// export const updateTask = async (req, res) => {
//   try {
//     // 1️⃣ Perform update
//     await Task.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         $push: {
//           activityLogs: {
//             user: req.user?._id || null,
//             action: "Updated task",
//             details: `Task '${req.body.name}' was updated.`,
//           },
//         },
//       },
//       { new: true }
//     );

//     // 2️⃣ Re-fetch with full population
//     const updatedTask = await Task.findById(req.params.id)
//       .populate("assignees", "name _id")
//       .populate("creator", "name")
//       .populate("project", "name");

//     res.json(updatedTask);
//   } catch (err) {
//     console.error("❌ Error updating task:", err);
//     res.status(400).json({ error: "Invalid update data" });
//   }
// };

export const updateTask = async (req, res) => {
  try {
    const { activityLogs, ...rest } = req.body;

    const updateOps = {
      $set: rest,
      $push: {
        activityLogs: {
          user: req.user?._id || null,
          action: "Updated task",
          details: `Task '${req.body.name}' was updated.`,
        },
      },
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateOps, {
      new: true,
    })
      .populate("assignees", "name _id")
      .populate("creator", "name")
      .populate("project", "name");

    res.json(updatedTask);
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res
      .status(400)
      .json({ error: "Invalid update data", details: err.message });
  }
};

// @desc    Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const allTasks = await Task.find();

    const projectMap = {};
    const now = new Date();
    const endOfWeek = moment().endOf("week").toDate();

    let completedTasks = 0;
    const overdueTasks = [];
    const upcomingDeadlines = [];

    allTasks.forEach((task) => {
      // Completion counter
      if (["done", "completed"].includes(task.status.toLowerCase())) {
        completedTasks++;
      }

      // Overdue
      if (
        task.deadline &&
        new Date(task.deadline) < now &&
        task.status !== "Done"
      ) {
        overdueTasks.push(task);
      }

      // Upcoming deadlines this week
      if (
        task.deadline &&
        new Date(task.deadline) >= now &&
        new Date(task.deadline) <= endOfWeek
      ) {
        upcomingDeadlines.push(task);
      }

      // Project progress map
      const projectId =
        task.project?._id?.toString() || task.project?.toString();
      if (!projectId) return;

      if (!projectMap[projectId]) {
        projectMap[projectId] = {
          projectId,
          total: 0,
          completed: 0,
        };
      }

      projectMap[projectId].total++;
      if (task.status === "Done") {
        projectMap[projectId].completed++;
      }
    });

    const projectProgress = Object.values(projectMap).map((p) => ({
      ...p,
      progress: Math.round((p.completed / p.total) * 100),
    }));

    const completionRate = allTasks.length
      ? Math.round((completedTasks / allTasks.length) * 100)
      : 0;

    res.json({
      projectProgress,
      overdueTasks,
      completionRate,
      upcomingDeadlines,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
