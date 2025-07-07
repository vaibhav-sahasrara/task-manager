import Task from "../models/Task.js";
import moment from "moment";
import mongoose from "mongoose";
import User from "../models/User.js";
import TeamMember from "../models/TeamMember.js";
import Project from "../models/Project.js";
import { sendMail } from "../utils/mailer.js";
import { taskAssignedTemplate } from "../utils/templates/taskAssignedTemplate.js";

// ✅ Create Task
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

    const projectDoc = await Project.findById(project).select("name team");
    if (!projectDoc)
      return res.status(404).json({ error: "Project not found" });

    const validAssignees = await TeamMember.find({
      _id: { $in: assignees.map((id) => new mongoose.Types.ObjectId(id)) },
    }).select("_id email name userRef");

    const validAssigneeIds = validAssignees.map((tm) => tm._id.toString());
    const projectTeamIds = projectDoc.team.map((id) => id.toString());

    const invalidAssignees = validAssigneeIds.filter(
      (id) => !projectTeamIds.includes(id)
    );
    if (invalidAssignees.length > 0) {
      return res.status(400).json({
        error: "Some assignees are not part of the project's team",
        invalidAssignees,
      });
    }

    const newTask = new Task({
      name,
      description,
      startDate,
      deadline,
      priority,
      status,
      tags,
      assignees: validAssigneeIds,
      project,
      creator: req.user?._id || null,
      activityLogs: [
        {
          user: req.user?._id || null,
          action: "Created task",
          details: `Task '${name}' was created.`,
        },
      ],
    });

    const savedTask = await newTask.save();

    // ✅ Send email to assignees
    for (const member of validAssignees) {
      if (!member.userRef) continue;
      const user = await User.findById(member.userRef).select("email name");
      if (user?.email) {
        const { subject, html } = taskAssignedTemplate({
          name,
          userName: user.name,
          deadline,
        });
        await sendMail({ to: user.email, subject, html });
      }
    }

    const fullTask = await Task.findById(savedTask._id)
      .populate("assignees", "name email _id")
      .populate({
        path: "project",
        select: "name owner",
        populate: {
          path: "owner",
          select: "name email",
        },
      });

    res.status(201).json(fullTask);
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// ✅ Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const { assigneeId } = req.query;

    let query = {};
    if (assigneeId) query.assignees = assigneeId;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .populate("assignees", "name email")
      .populate("creator", "name")
      .populate({
        path: "project",
        select: "name owner",
        populate: {
          path: "owner",
          select: "name email",
        },
      });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignees", "name email")
      .populate("creator", "name")
      .populate({
        path: "project",
        select: "name owner",
        populate: {
          path: "owner",
          select: "name email",
        },
      });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update Task
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
      .populate("assignees", "name email")
      .populate("creator", "name")
      .populate({
        path: "project",
        select: "name owner",
        populate: {
          path: "owner",
          select: "name email",
        },
      });

    res.json(updatedTask);
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res
      .status(400)
      .json({ error: "Invalid update data", details: err.message });
  }
};

// ✅ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Task Stats
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
      if (["done", "completed"].includes(task.status?.toLowerCase())) {
        completedTasks++;
      }

      if (
        task.deadline &&
        new Date(task.deadline) < now &&
        task.status !== "Done"
      ) {
        overdueTasks.push(task);
      }

      if (
        task.deadline &&
        new Date(task.deadline) >= now &&
        new Date(task.deadline) <= endOfWeek
      ) {
        upcomingDeadlines.push(task);
      }

      const projectId =
        task.project?._id?.toString() || task.project?.toString();
      if (!projectId) return;

      if (!projectMap[projectId]) {
        projectMap[projectId] = { projectId, total: 0, completed: 0 };
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


// ✅ GET Tasks Assigned to a Client User (via userRef in TeamMember)
export const getTasksForClientUser = async (req, res) => {
  try {
    const { userId } = req.params; // This is the User._id (from req.params)

    // Step 1: Find corresponding TeamMember
    const teamMember = await TeamMember.findOne({ userRef: userId });
    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found for user." });
    }

    // Step 2: Fetch Tasks where this TeamMember is assigned
    const tasks = await Task.find({ assignees: teamMember._id })
      .sort({ createdAt: -1 })
      .populate("assignees", "name email")
      .populate("creator", "name")
      .populate({
        path: "project",
        select: "name owner",
        populate: {
          path: "owner",
          select: "name email",
        },
      });

    res.json({ tasks, assignedTo: teamMember.name });
  } catch (err) {
    console.error("❌ Error fetching tasks for client:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
