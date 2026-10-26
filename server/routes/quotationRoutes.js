import express from "express";
import { Quotation } from "../models/Quotation.js";
import { verifyToken } from "../middleware/auth.js";
import { getDbConnected, memoryStore, persistStore } from "../store/memoryStore.js";

const router = express.Router();

const VALID_STATUS = ["Draft", "Sent", "Accepted", "Rejected"];
const VALID_TYPES = ["Client", "Office"];

function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((it) => ({
      description: String(it.description || "").trim(),
      qty: Math.max(0, Number(it.qty) || 0),
      rate: Math.max(0, Number(it.rate) || 0),
    }))
    .filter((it) => it.description && (it.qty > 0 || it.rate > 0));
}

function sanitizeTerms(terms) {
  if (!Array.isArray(terms)) return [];
  return terms.map((t) => String(t || "").trim()).filter(Boolean);
}

function applyDefaults(body) {
  const items = sanitizeItems(body.items);
  const subTotal = items.reduce((s, it) => s + it.qty * it.rate, 0);
  const taxRate = Math.max(0, Number(body.taxRate) || 0);
  const discount = Math.max(0, Number(body.discount) || 0);
  const taxable = Math.max(0, subTotal - discount);
  const taxAmount = Math.round((taxable * taxRate) / 100);
  const grandTotal = Math.round(taxable + taxAmount);

  return {
    quoteType: VALID_TYPES.includes(body.quoteType) ? body.quoteType : "Client",
    date: body.date || new Date().toISOString().split("T")[0],
    partyName: String(body.partyName || "").trim(),
    partyCompany: String(body.partyCompany || "").trim(),
    partyEmail: String(body.partyEmail || "").trim(),
    partyPhone: String(body.partyPhone || "").trim(),
    partyAddress: String(body.partyAddress || "").trim(),
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
    items,
    subTotal,
    taxRate,
    discount,
    taxAmount,
    grandTotal,
    terms: sanitizeTerms(body.terms),
    notes: String(body.notes || "").trim(),
    status: VALID_STATUS.includes(body.status) ? body.status : "Draft",
    imageName: String(body.imageName || "").trim(),
    imageData: body.imageData || "",
    createdBy: String(body.createdBy || "").trim() || "NexAdmin",
  };
}

async function nextQuoteNo() {
  if (getDbConnected()) {
    const docs = await Quotation.find();
    let max = 0;
    for (const d of docs) {
      const m = String(d.quoteNo || "").match(/QT-(\d{4})-(\d+)/);
      if (m) max = Math.max(max, parseInt(m[2], 10));
    }
    return `QT-${new Date().getFullYear()}-${String(max + 1).padStart(4, "0")}`;
  }
  let max = 0;
  for (const d of memoryStore.quotations || []) {
    const m = String(d.quoteNo || "").match(/QT-(\d{4})-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[2], 10));
  }
  return `QT-${new Date().getFullYear()}-${String(max + 1).padStart(4, "0")}`;
}

// Create Quotation (POST /api/quotations - Admin Protected)
router.post("/", verifyToken, async (req, res) => {
  const data = applyDefaults(req.body);
  if (!data.title) return res.status(400).json({ message: "Quotation title / work description is required." });
  if (data.items.length === 0) return res.status(400).json({ message: "Add at least one line item." });

  try {
    const quoteNo = await nextQuoteNo();
    const doc = { ...data, quoteNo };
    let saved = null;

    if (getDbConnected()) {
      try {
        saved = await Quotation.create(doc);
      } catch (e) {
        console.warn("Quotation DB create fallback:", e.message);
      }
    }

    if (!saved) {
      saved = { _id: "qtn-" + Date.now(), ...doc, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }

    if (!memoryStore.quotations) memoryStore.quotations = [];
    memoryStore.quotations.unshift(saved);
    persistStore();

    return res.status(201).json({ message: "Quotation created.", entry: saved });
  } catch (e) {
    console.error("Create quotation error:", e);
    const fallbackEntry = {
      _id: "qtn-" + Date.now(),
      quoteNo: `QT-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!memoryStore.quotations) memoryStore.quotations = [];
    memoryStore.quotations.unshift(fallbackEntry);
    persistStore();
    return res.status(201).json({ message: "Quotation created.", entry: fallbackEntry });
  }
});

// Get All Quotations (GET /api/quotations - Admin Protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (getDbConnected()) {
      const docs = await Quotation.find().sort({ createdAt: -1 });
      if (docs && docs.length > 0) return res.json(docs);
    }
    return res.json(memoryStore.quotations || []);
  } catch (e) {
    return res.json(memoryStore.quotations || []);
  }
});

// Get Single Quotation (GET /api/quotations/:id - Admin Protected)
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (getDbConnected()) {
      const doc = await Quotation.findOne({ _id: id });
      if (doc) return res.json(doc);
    }
    const doc = (memoryStore.quotations || []).find((x) => x._id === id);
    if (doc) return res.json(doc);
    return res.status(404).json({ message: "Quotation not found." });
  } catch (e) {
    const doc = (memoryStore.quotations || []).find((x) => x._id === id);
    if (doc) return res.json(doc);
    return res.status(404).json({ message: "Quotation not found." });
  }
});

// Update Quotation (PUT /api/quotations/:id - Admin Protected)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const data = applyDefaults(req.body);

  if (getDbConnected()) {
    try {
      const existing = await Quotation.findOne({ _id: id });
      if (existing) {
        const doc = await Quotation.findByIdAndUpdate(id, { ...data, quoteNo: existing.quoteNo }, { new: true });
        const idx = (memoryStore.quotations || []).findIndex((x) => x._id === id);
        if (idx !== -1) memoryStore.quotations[idx] = { ...memoryStore.quotations[idx], ...data };
        persistStore();
        return res.json(doc);
      }
    } catch (e) {
      console.warn("Quotation DB update fallback:", e.message);
    }
  }

  const idx = (memoryStore.quotations || []).findIndex((x) => x._id === id);
  if (idx === -1) return res.status(404).json({ message: "Quotation not found." });
  memoryStore.quotations[idx] = { ...memoryStore.quotations[idx], ...data };
  persistStore();
  return res.json(memoryStore.quotations[idx]);
});

// Delete Quotation (DELETE /api/quotations/:id - Admin Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (getDbConnected()) {
      await Quotation.findByIdAndDelete(id);
    }
  } catch (e) {
    console.error("Delete quotation error:", e);
  }

  memoryStore.quotations = (memoryStore.quotations || []).filter((x) => x._id !== id);
  persistStore();
  return res.json({ message: "Quotation deleted." });
});

export default router;