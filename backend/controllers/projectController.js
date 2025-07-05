import Project from "../models/Project.js";
import slugify from "slugify";

// Create new project
export const createProject = async (req, res) => {
  try {
    const { name, company, ...rest } = req.body;

    // 1. Generate base code from company and project name
    const baseSlug = slugify(`${company || "PRJ"}-${name}`, {
      lower: true,
      strict: true,
    }).toUpperCase();

    // 2. Count how many projects already have similar slug
    const existingCount = await Project.countDocuments({
      projectCode: new RegExp(`^${baseSlug}`),
    });

    // 3. Generate unique code
    const projectCode = `${baseSlug}-${(existingCount + 1)
      .toString()
      .padStart(3, "0")}`;

    // 4. Create and save project
    const project = new Project({
      name,
      company,
      projectCode,
      ...rest,
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects (with optional filters)
export const getAllProjects = async (req, res) => {
  try {
    const { status, priority, archived } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (archived !== undefined) filter.archived = archived === "true";

    const projects = await Project.find(filter).populate(
      "owner team",
      "name email avatar"
    );
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner team",
      "name email avatar"
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get projects by owner or team member (userId)
export const getProjectsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const projects = await Project.find({
      $or: [{ owner: userId }, { team: userId }],
    }).populate("owner team", "name email avatar");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
