import express from "express";
import { Leave } from "../models/Leave.js";
import { verifyToken } from "../middleware/auth.js";
import { getDbConnected, memoryStore, persistStore } from "../store/memoryStore.js";

const router = express.Router();

// GET Leaves
router.get("/", verifyToken, async (req, res) => {
  const { empId } = req.query;
  const isEmployee = req.user.role === "employee";
  const targetEmpId = isEmployee ? (req.user.empId || req.user.id) : empId;

  try {
    if (getDbConnected()) {
      const query = targetEmpId ? { employeeId: targetEmpId } : {};
      const leaves = await Leave.find(query).sort({ createdAt: -1 });
      if (leaves && leaves.length > 0) return res.json(leaves);
    }

    let leaves = memoryStore.leaves || [];
    if (targetEmpId) {
      leaves = leaves.filter((l) => l.employeeId === targetEmpId);
    }
    return res.json(leaves);
  } catch (err) {
    let leaves = memoryStore.leaves || [];
    if (targetEmpId) leaves = leaves.filter((l) => l.employeeId === targetEmpId);
    return res.json(leaves);
  }
});

// POST Apply Leave (Employee action)
router.post("/", verifyToken, async (req, res) => {
  const { leaveType, fromDate, toDate, days, reason } = req.body;
  const employeeId = req.user.empId || req.user.id || req.body.employeeId;
  const employeeName = req.user.name || req.body.employeeName || "Employee";

  if (!fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "Dates and reason are required" });
  }

  const newLeave = {
    _id: `lv-${Date.now()}`,
    employeeId,
    employeeName,
    leaveType: leaveType || "Casual Leave",
    fromDate,
    toDate,
    days: Number(days) || 1,
    reason: reason.trim(),
    status: "Pending",
    adminRemark: "",
    createdAt: new Date().toISOString(),
  };

  let savedLeave = newLeave;

  if (getDbConnected()) {
    try {
      savedLeave = await Leave.create(newLeave);
    } catch (err) {
      console.warn("Apply leave DB fallback:", err.message);
    }
  }

  if (!memoryStore.leaves) memoryStore.leaves = [];
  memoryStore.leaves.unshift(savedLeave || newLeave);
  persistStore();
  return res.status(201).json(savedLeave || newLeave);
});

// PUT Update Leave Status (Super Admin action)
router.put("/:id/status", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status, adminRemark } = req.body;

  if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Status must be Pending, Approved, or Rejected" });
  }

  if (getDbConnected()) {
    try {
      const leave = await Leave.findById(id);
      if (leave) {
        leave.status = status;
        if (adminRemark !== undefined) leave.adminRemark = adminRemark;
        await leave.save();
        const memLeave = (memoryStore.leaves || []).find((l) => l._id === id);
        if (memLeave) {
          memLeave.status = status;
          if (adminRemark !== undefined) memLeave.adminRemark = adminRemark;
        }
        persistStore();
        return res.json(leave);
      }
    } catch (err) {
      console.warn("Update leave status DB fallback:", err.message);
    }
  }

  const leave = (memoryStore.leaves || []).find((l) => l._id === id);
  if (!leave) return res.status(404).json({ message: "Leave request not found" });

  leave.status = status;
  if (adminRemark !== undefined) leave.adminRemark = adminRemark;
  persistStore();
  return res.json(leave);
});

export default router;
