import express from "express";
import { InterviewData } from "../models/InterviewData.js";
import { verifyToken } from "../middleware/auth.js";
import { getDbConnected, memoryStore, persistStore } from "../store/memoryStore.js";

const router = express.Router();

// Create Interview Data Entry (POST /api/interview-data - Public)
router.post("/", async (req, res) => {
  const {
    name,
    dob,
    email,
    address,
    experienceType,
    experienceYears,
    resumeFileName,
    resumeData,
    resumeSize,
  } = req.body;

  if (!name || !name.trim()) return res.status(400).json({ message: "Name is required." });
  if (!email || !email.includes("@")) return res.status(400).json({ message: "Valid Email is required." });

  const newEntry = {
    _id: "ivw-" + Date.now(),
    name: name.trim(),
    dob: dob || "",
    email: email.trim(),
    address: address?.trim() || "",
    experienceType: experienceType === "Experienced" ? "Experienced" : "Fresher",
    experienceYears: experienceYears?.trim() || "",
    resumeFileName: resumeFileName || "",
    resumeData: resumeData || "",
    resumeSize: resumeSize || "",
    status: "New",
    createdAt: new Date().toISOString(),
  };

  let savedDoc = newEntry;

  if (getDbConnected()) {
    try {
      savedDoc = await InterviewData.create(newEntry);
    } catch (e) {
      console.warn("PostgreSQL interview data create fallback:", e.message);
    }
  }

  if (!memoryStore.interviewData) memoryStore.interviewData = [];
  memoryStore.interviewData.unshift(savedDoc || newEntry);
  persistStore();

  return res.status(201).json({
    message: "Interview data saved successfully!",
    entry: savedDoc || newEntry,
  });
});

// Get All Interview Data (GET /api/interview-data - Admin Protected)
router.get("/", verifyToken, async (req, res) => {
  if (getDbConnected()) {
    try {
      const docs = await InterviewData.find().sort({ createdAt: -1 });
      if (docs && docs.length > 0) return res.json(docs);
    } catch (e) {
      console.error(e);
    }
  }
  return res.json(memoryStore.interviewData || []);
});

// Update Interview Data Status (PUT /api/interview-data/:id - Admin Protected)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (getDbConnected()) {
    try {
      const doc = await InterviewData.findByIdAndUpdate(id, { status }, { new: true });
      if (doc) {
        const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
        if (item) item.status = status;
        persistStore();
        return res.json(doc);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
  if (item) {
    item.status = status;
    persistStore();
    return res.json(item);
  }
  return res.status(404).json({ message: "Entry not found." });
});

// Save Onboarding Details for Joined Employee (PUT /api/interview-data/:id/onboarding - Super Admin Protected)
router.put("/:id/onboarding", verifyToken, async (req, res) => {
  const { id } = req.params;
  const user = req.user || {};

  // Super admin only
  if (!user.isSuperAdmin && user.role !== "admin") {
    return res.status(403).json({ message: "Only Super Admin can upload onboarding details." });
  }

  const allowedFields = [
    "contactPhone", "address", "bloodGroup", "college",
    "bankName", "bankAccountNumber", "bankIFSC",
    "profileImageName", "profileImageData",
    "aadharFileName", "aadharFileData", "aadharFileSize",
    "panFileName", "panFileData", "panFileSize",
    "experienceCertFileName", "experienceCertFileData", "experienceCertFileSize",
    "otherCertFileName", "otherCertFileData", "otherCertFileSize",
  ];

  const onboardingPatch = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) onboardingPatch[key] = req.body[key] || "";
  }
  if (Object.keys(onboardingPatch).length === 0) {
    return res.status(400).json({ message: "No onboarding details provided." });
  }

  if (getDbConnected()) {
    try {
      const doc = await InterviewData.findById(id);
      if (doc) {
        doc.onboarding = { ...(doc.onboarding || {}), ...onboardingPatch };
        await doc.save();
        const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
        if (item) item.onboarding = { ...item.onboarding, ...onboardingPatch };
        persistStore();
        return res.json({ message: "Onboarding details saved.", entry: doc });
      }
    } catch (e) {
      console.error(e);
    }
  }

  const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
  if (item) {
    item.onboarding = { ...item.onboarding, ...onboardingPatch };
    persistStore();
    return res.json({ message: "Onboarding details saved.", entry: item });
  }
  return res.status(404).json({ message: "Entry not found." });
});

// Update Full Interview Data Entry (PUT /api/interview-data/:id/full - Admin Protected)
router.put("/:id/full", verifyToken, async (req, res) => {
  const { id } = req.params;
  const patch = req.body;

  if (getDbConnected()) {
    try {
      const doc = await InterviewData.findByIdAndUpdate(id, patch, { new: true });
      if (doc) {
        const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
        if (item) Object.assign(item, patch, { _id: item._id });
        persistStore();
        return res.json(doc);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const item = (memoryStore.interviewData || []).find((x) => x._id === id || x.id === id);
  if (item) {
    Object.assign(item, patch, { _id: item._id });
    persistStore();
    return res.json(item);
  }
  return res.status(404).json({ message: "Entry not found." });
});

// Delete Interview Data Entry (DELETE /api/interview-data/:id - Admin Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  if (getDbConnected()) {
    try {
      await InterviewData.findByIdAndDelete(id);
    } catch (e) {
      console.error(e);
    }
  }

  memoryStore.interviewData = (memoryStore.interviewData || []).filter((x) => x._id !== id && x.id !== id);
  persistStore();
  return res.json({ message: "Entry deleted successfully." });
});

export default router;
