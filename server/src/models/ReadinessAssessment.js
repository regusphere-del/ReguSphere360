import mongoose from 'mongoose';

const readinessAssessmentSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    dossierFormat: { type: String, default: 'eCTD v3.2.2' },
    targetMarket: { type: String, default: 'US FDA' },
    overallScore: { type: Number, required: true }, // 0 to 100
    readinessTier: {
      type: String,
      enum: ['High Risk (Major Gaps)', 'Moderate Readiness (Action Needed)', 'Submission Ready (Minor Polishing)'],
      required: true,
    },
    categoryBreakdown: {
      module1Admin: { type: Number, default: 0 },
      module2Summaries: { type: Number, default: 0 },
      module3QualityCMC: { type: Number, default: 0 },
      module4Nonclinical: { type: Number, default: 0 },
      module5Clinical: { type: Number, default: 0 },
      sopCompliance: { type: Number, default: 0 },
    },
    flaggedGaps: [{ type: String }],
    recommendations: [{ type: String }],
    assessmentSummary: { type: String },
    firebaseUid: { type: String },
  },
  { timestamps: true }
);

export const ReadinessAssessment = mongoose.model('ReadinessAssessment', readinessAssessmentSchema);
