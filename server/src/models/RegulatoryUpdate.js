import mongoose from 'mongoose';

const regulatoryUpdateSchema = new mongoose.Schema(
  {
    update_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    regulatory_authority: {
      type: String,
      required: true,
      enum: ['CDSCO', 'USFDA'],
      index: true,
    },
    announcement_title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Drug Approvals',
        'Safety Alerts',
        'Regulatory Guidelines',
        'Clinical Trials',
        'GMP & Manufacturing',
        'Drug Recalls',
        'Notifications & Circulars',
        'Medical Devices',
        'Import & Export',
        'Regulatory Policy Changes',
      ],
      index: true,
    },
    publication_date: {
      type: Date,
      required: true,
      index: true,
    },
    effective_date: {
      type: Date,
    },
    summary: {
      type: String,
      required: true,
    },
    regulatory_significance: {
      type: String,
      required: true,
    },
    official_source_url: {
      type: String,
      required: true,
      trim: true,
    },
    source_reference_number: {
      type: String,
      trim: true,
    },
    source_record_id: {
      type: String,
      index: true,
      trim: true,
    },
    retrieved_at: {
      type: Date,
      default: Date.now,
    },
    last_verified_at: {
      type: Date,
      default: Date.now,
    },
    verification_status: {
      type: String,
      enum: ['Verified', 'Pending Verification', 'Rejected'],
      default: 'Verified',
      index: true,
    },
    publication_status: {
      type: String,
      enum: ['Published', 'Draft', 'Archived'],
      default: 'Published',
      index: true,
    },
    featured_status: {
      type: Boolean,
      default: false,
      index: true,
    },
    // Educational analysis fields for pharmacy & M.Pharm scholars
    what_is_it: { type: String },
    why_issued: { type: String },
    regulatory_importance: { type: String },
    pharma_impact: { type: String },
    ra_takeaway: { type: String },
    student_points: [{ type: String }],
    related_guidelines: [{ type: String }],
  },
  {
    timestamps: true,
    collection: 'regulatory_updates',
  }
);

export const RegulatoryUpdate =
  mongoose.models.RegulatoryUpdate ||
  mongoose.model('RegulatoryUpdate', regulatoryUpdateSchema);
