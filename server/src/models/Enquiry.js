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
    fullName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    country: { type: String, default: 'India' },
    companyType: {
      type: String,
      default: 'Pharma Enterprise',
    },
    serviceRequired: {
      type: String,
      default: 'eCTD Consultancy',
    },
    mainServiceCategory: {
      type: String,
      default: 'eCTD & Regulatory Submission Consultancy',
    },
    enquiryType: {
      type: String,
      default: 'Consultation Request',
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
    preferredConsultationDate: { type: String },
    urgency: {
      type: String,
      default: 'Standard (4-6 weeks)',
    },
    projectScopeDetails: { type: String },
    description: { type: String },
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
      default: 'Application Submitted',
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
