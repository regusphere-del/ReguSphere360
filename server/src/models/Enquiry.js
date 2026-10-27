import mongoose from 'mongoose';

const uploadedFileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  completedAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
});

const enquirySchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    companyType: {
      type: String,
      default: 'Pharma Enterprise',
    },
    mainServiceCategory: {
      type: String,
      enum: [
        'Regulatory Documentation Consultancy',
        'Global Regulatory Intelligence',
        'Regulatory Education & Corporate Training',
        'General Consultation',
      ],
      default: 'Regulatory Documentation Consultancy',
    },
    enquiryType: {
      type: String,
      default: 'Quotation Request',
    },
    selectedServices: [{ type: String }],
    targetAgencies: [{ type: String }],
    dossierType: { type: String, default: 'eCTD' },
    productCategory: {
      type: String,
      default: 'Small Molecules (Generics / NCEs)',
    },
    countryScope: [{ type: String }],
    therapeuticArea: { type: String },
    targetSubmissionDate: { type: String },
    urgency: {
      type: String,
      enum: ['Standard (4-6 weeks)', 'Expedited (2-3 weeks)', 'Critical (< 2 weeks)'],
      default: 'Standard (4-6 weeks)',
    },
    projectScopeDetails: { type: String },
    estimatedQuotation: {
      estimatedDays: { type: Number, default: 21 },
      costBand: { type: String, default: '$4,500 - $8,500' },
      complexity: { type: String, default: 'Standard Regulatory Review' },
      deliverables: [{ type: String }],
    },
    // Training-specific fields
    trainingDetails: {
      courseId: { type: String },
      courseTitle: { type: String },
      attendeeCount: { type: Number, default: 1 },
      trainingMode: { type: String, enum: ['Live Virtual Workshop', 'Self-Paced Portal', 'Corporate On-Premise', 'Webinar'] },
      cohortDate: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Simulated / Test Passed', 'Invoice Required', 'Not Applicable'],
      default: 'Pending',
    },
    uploadedFiles: [uploadedFileSchema],
    projectStatus: {
      type: String,
      enum: [
        'Enquiry Submitted',
        'Initial Assessment',
        'Proposal Dispatched',
        'Engagement & Kick-off',
        'Document Scoping',
        'Quotation Approved',
        'Gap Assessment In Progress',
        'Dossier Assembly',
        'Ready for Submission',
        'Completed & Follow-up',
      ],
      default: 'Enquiry Submitted',
    },
    milestones: [milestoneSchema],
    assignedConsultant: {
      name: { type: String, default: 'Dr. Eleanor Vance, RAC Senior Consultant' },
      email: { type: String, default: 'regulatory@regusphere360.com' },
    },
    adminNotes: { type: String },
    clientNotes: { type: String },
    firebaseUid: { type: String, index: true },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
