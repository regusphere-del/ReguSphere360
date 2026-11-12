import express from 'express';
import { RegulatoryUpdate } from '../models/RegulatoryUpdate.js';
import {
  regulatorySyncService,
  inMemoryUpdates,
} from '../services/regulatorySyncService.js';

const router = express.Router();

// 1. GET ALL REGULATORY UPDATES WITH ADVANCED FILTERS
router.get('/', async (req, res) => {
  try {
    const {
      authority,
      category,
      search,
      sort = 'newest',
      status = 'Published',
      featured,
    } = req.query;

    let updates = [];

    // Attempt MongoDB retrieval first
    try {
      const query = {};
      if (authority && authority !== 'All') {
        query.regulatory_authority = authority;
      }
      if (category && category !== 'All') {
        query.category = category;
      }
      if (status && status !== 'All') {
        query.publication_status = status;
      }
      if (featured === 'true') {
        query.featured_status = true;
      }
      if (search && search.trim()) {
        const qRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { announcement_title: qRegex },
          { summary: qRegex },
          { source_reference_number: qRegex },
          { regulatory_significance: qRegex },
        ];
      }

      const sortOption =
        sort === 'oldest' ? { publication_date: 1 } : { publication_date: -1 };

      const dbUpdates = await RegulatoryUpdate.find(query).sort(sortOption).lean();
      if (dbUpdates && dbUpdates.length > 0) {
        updates = dbUpdates;
      }
    } catch (dbErr) {
      // Fallback to in-memory store
    }

    // In-memory fallback if DB returned empty or offline
    if (updates.length === 0) {
      let filtered = [...inMemoryUpdates];

      if (authority && authority !== 'All') {
        filtered = filtered.filter((u) => u.regulatory_authority === authority);
      }
      if (category && category !== 'All') {
        filtered = filtered.filter((u) => u.category === category);
      }
      if (status && status !== 'All') {
        filtered = filtered.filter((u) => u.publication_status === status);
      }
      if (featured === 'true') {
        filtered = filtered.filter((u) => u.featured_status === true);
      }
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.announcement_title.toLowerCase().includes(q) ||
            u.summary.toLowerCase().includes(q) ||
            u.regulatory_significance.toLowerCase().includes(q) ||
            (u.source_reference_number && u.source_reference_number.toLowerCase().includes(q))
        );
      }

      filtered.sort((a, b) => {
        const da = new Date(a.publication_date).getTime();
        const db = new Date(b.publication_date).getTime();
        return sort === 'oldest' ? da - db : db - da;
      });

      updates = filtered;
    }

    res.json({
      success: true,
      count: updates.length,
      updates,
      syncInfo: regulatorySyncService.getSyncStatus(),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. GET LIVE SYNCHRONIZATION STATUS & KPIS
router.get('/sync-status', (req, res) => {
  try {
    const status = regulatorySyncService.getSyncStatus();
    res.json({ success: true, status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. TRIGGER MANUAL SYNC ON DEMAND
router.post('/sync-now', async (req, res) => {
  try {
    const syncResult = await regulatorySyncService.runSync(true);
    res.json({
      success: true,
      message: 'Regulatory synchronization executed successfully.',
      result: syncResult,
      status: regulatorySyncService.getSyncStatus(),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. CONFIGURE REFRESH INTERVAL (ADMIN)
router.post('/set-interval', (req, res) => {
  try {
    const { minutes } = req.body;
    const newInterval = regulatorySyncService.setRefreshInterval(minutes);
    res.json({
      success: true,
      message: `Automatic refresh interval updated to every ${newInterval} minutes.`,
      refreshIntervalMinutes: newInterval,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 5. GET SINGLE UPDATE BY ID
router.get('/:id', async (req, res) => {
  try {
    let update = null;
    try {
      update = await RegulatoryUpdate.findOne({ update_id: req.params.id }).lean();
    } catch (e) {}

    if (!update) {
      update = inMemoryUpdates.find((u) => u.update_id === req.params.id);
    }

    if (!update) {
      return res.status(404).json({ success: false, message: 'Regulatory update not found.' });
    }

    res.json({ success: true, update });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. CREATE MANUAL REGULATORY UPDATE (ADMIN)
router.post('/', async (req, res) => {
  try {
    const {
      regulatory_authority,
      announcement_title,
      category,
      publication_date,
      effective_date,
      summary,
      regulatory_significance,
      official_source_url,
      source_reference_number,
      what_is_it,
      why_issued,
      regulatory_importance,
      pharma_impact,
      ra_takeaway,
      student_points,
      related_guidelines,
      publication_status = 'Published',
      featured_status = false,
    } = req.body;

    if (
      !regulatory_authority ||
      !announcement_title ||
      !category ||
      !publication_date ||
      !summary ||
      !regulatory_significance ||
      !official_source_url
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Authority, title, category, publication date, summary, significance, and official source link are strictly required.',
      });
    }

    const newId = `UPD-${regulatory_authority}-${Date.now()}-${Math.floor(
      Math.random() * 900 + 100
    )}`;

    const newUpdate = {
      update_id: newId,
      regulatory_authority,
      announcement_title: announcement_title.trim(),
      category,
      publication_date: new Date(publication_date),
      effective_date: effective_date ? new Date(effective_date) : undefined,
      summary: summary.trim(),
      regulatory_significance: regulatory_significance.trim(),
      official_source_url: official_source_url.trim(),
      source_reference_number: source_reference_number?.trim() || `REF-${Date.now()}`,
      source_record_id: `MANUAL-${Date.now()}`,
      retrieved_at: new Date(),
      last_verified_at: new Date(),
      verification_status: 'Verified',
      publication_status,
      featured_status: Boolean(featured_status),
      what_is_it: what_is_it || summary,
      why_issued: why_issued || regulatory_significance,
      regulatory_importance: regulatory_importance || regulatory_significance,
      pharma_impact: pharma_impact || 'Impacts compliance standards for licensed pharmaceutical entities.',
      ra_takeaway: ra_takeaway || 'Audit internal documentation and adjust filing strategies accordingly.',
      student_points: Array.isArray(student_points)
        ? student_points
        : student_points
        ? [student_points]
        : ['Essential study update for M.Pharm and B.Pharm Regulatory Affairs candidates.'],
      related_guidelines: Array.isArray(related_guidelines)
        ? related_guidelines
        : related_guidelines
        ? [related_guidelines]
        : ['Statutory Health Authority Guidance'],
    };

    // Save to in-memory store
    inMemoryUpdates.unshift(newUpdate);

    // Save to DB if possible
    try {
      await RegulatoryUpdate.create(newUpdate);
    } catch (e) {
      console.warn('DB create note (using in-memory):', e.message);
    }

    res.status(201).json({
      success: true,
      message: 'Regulatory announcement published successfully.',
      update: newUpdate,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. EDIT REGULATORY UPDATE (ADMIN)
router.put('/:id', async (req, res) => {
  try {
    const updateId = req.params.id;
    let found = false;

    // In-memory update
    const idx = inMemoryUpdates.findIndex((u) => u.update_id === updateId);
    if (idx !== -1) {
      inMemoryUpdates[idx] = {
        ...inMemoryUpdates[idx],
        ...req.body,
        update_id: updateId,
        last_verified_at: new Date(),
      };
      found = true;
    }

    // DB update
    try {
      const updatedDb = await RegulatoryUpdate.findOneAndUpdate(
        { update_id: updateId },
        { ...req.body, last_verified_at: new Date() },
        { new: true }
      );
      if (updatedDb) found = true;
    } catch (e) {}

    if (!found) {
      return res.status(404).json({ success: false, message: 'Update record not found.' });
    }

    res.json({
      success: true,
      message: `Regulatory update ${updateId} updated successfully.`,
      update: inMemoryUpdates[idx],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 8. DELETE REGULATORY UPDATE (ADMIN)
router.delete('/:id', async (req, res) => {
  try {
    const updateId = req.params.id;
    const initialLen = inMemoryUpdates.length;
    const filtered = inMemoryUpdates.filter((u) => u.update_id !== updateId);
    inMemoryUpdates.length = 0;
    inMemoryUpdates.push(...filtered);

    try {
      await RegulatoryUpdate.deleteOne({ update_id: updateId });
    } catch (e) {}

    if (inMemoryUpdates.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Update not found.' });
    }

    res.json({
      success: true,
      message: `Regulatory update ${updateId} deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
