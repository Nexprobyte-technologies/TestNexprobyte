import express from "express";
import { WorkReport } from "../models/WorkReport.js";
import { verifyToken } from "../middleware/auth.js";
import { getDbConnected, memoryStore, persistStore } from "../store/memoryStore.js";

const router = express.Router();

// GET Work Reports
router.get("/", verifyToken, async (req, res) => {
  const { empId } = req.query;
  const isEmployee = req.user.role === "employee";
  const targetEmpId = isEmployee ? (req.user.empId || req.user.id) : empId;

  try {
    if (getDbConnected()) {
      const query = targetEmpId ? { employeeId: targetEmpId } : {};
      const reports = await WorkReport.find(query).sort({ date: -1, createdAt: -1 });
      if (reports && reports.length > 0) return res.json(reports);
    }

    let reports = memoryStore.workReports || [];
    if (targetEmpId) {
      reports = reports.filter((r) => r.employeeId === targetEmpId);
    }
    return res.json(reports);
  } catch (err) {
    let reports = memoryStore.workReports || [];
    if (targetEmpId) reports = reports.filter((r) => r.employeeId === targetEmpId);
    return res.json(reports);
  }
});

// POST Daily Work Status (Employee action)
router.post("/", verifyToken, async (req, res) => {
  const { projectTitle, taskDetails, hoursSpent, blockers, status, link, date } = req.body;
  const employeeId = req.user.empId || req.user.id || req.body.employeeId;
  const employeeName = req.user.name || req.body.employeeName || "Employee";

  if (!projectTitle || !taskDetails) {
    return res.status(400).json({ message: "Project title and task details are required" });
  }

  const newReport = {
    _id: `wr-${Date.now()}`,
    employeeId,
    employeeName,
    date: date || new Date().toISOString().split("T")[0],
    projectTitle: projectTitle.trim(),
    hoursSpent: parseFloat(hoursSpent) || 8,
    taskDetails: taskDetails.trim(),
    blockers: blockers ? blockers.trim() : "None",
    status: status || "Completed",
    link: link ? link.trim() : "",
    createdAt: new Date().toISOString(),
  };

  let savedReport = newReport;

  if (getDbConnected()) {
    try {
      savedReport = await WorkReport.create(newReport);
    } catch (err) {
      console.warn("Create work report DB fallback:", err.message);
    }
  }

  if (!memoryStore.workReports) memoryStore.workReports = [];
  memoryStore.workReports.unshift(savedReport || newReport);
  persistStore();
  return res.status(201).json(savedReport || newReport);
});

// PUT: Update Work Report (Employee edits & saves own report)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const allowed = ["date", "projectTitle", "hoursSpent", "taskDetails", "blockers", "status", "link"];
  const patch = {};
  for (const field of allowed) {
    if (updates[field] !== undefined) {
      if (field === "projectTitle") patch[field] = String(updates[field]).trim();
      else if (field === "taskDetails") patch[field] = String(updates[field]).trim();
      else if (field === "blockers") patch[field] = updates[field] ? String(updates[field]).trim() : "None";
      else if (field === "link") patch[field] = updates[field] ? String(updates[field]).trim() : "";
      else if (field === "hoursSpent") patch[field] = parseFloat(updates[field]) || 8;
      else patch[field] = updates[field];
    }
  }
  if (Object.keys(patch).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  if (getDbConnected()) {
    try {
      const updated = await WorkReport.findByIdAndUpdate(id, patch, { new: true });
      if (updated) {
        const index = (memoryStore.workReports || []).findIndex((r) => r._id === id);
        if (index !== -1) {
          memoryStore.workReports[index] = {
            ...memoryStore.workReports[index],
            ...patch,
            updatedAt: new Date().toISOString(),
          };
        }
        persistStore();
        return res.json(updated);
      }
    } catch (err) {
      console.warn("Update work report DB fallback:", err.message);
    }
  }

  const index = (memoryStore.workReports || []).findIndex((r) => r._id === id);
  if (index === -1) return res.status(404).json({ message: "Work report not found" });

  memoryStore.workReports[index] = {
    ...memoryStore.workReports[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  persistStore();
  return res.json(memoryStore.workReports[index]);
});

// DELETE: Remove Work Report (Employee can delete own report)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  if (getDbConnected()) {
    try {
      await WorkReport.findByIdAndDelete(id);
    } catch (err) {
      console.warn("Delete work report DB fallback:", err.message);
    }
  }

  memoryStore.workReports = (memoryStore.workReports || []).filter((r) => r._id !== id);
  persistStore();
  return res.json({ message: "Work report deleted successfully" });
});

export default router;
