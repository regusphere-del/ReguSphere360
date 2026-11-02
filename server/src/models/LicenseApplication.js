import mongoose from 'mongoose';

const licenseUpdateSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true },
  note: { type: String, required: true },
  updatedBy: { type: String, default: 'Regulatory Officer' },
});

const licenseApplicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
    },
    applicantName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    country: { type: String, default: 'India' },
    licenseCategory: {
      type: String,
      required: true,
      enum: [
        'Drug Manufacturing License',
        'Wholesale Drug License',
        'Retail Pharmacy License',
        'Loan License',
        'Import License',
        'Medical Device License',
        'Cosmetics Manufacturing License',
        'Clinical Trial Application',
        'Other Regulatory License',
      ],
      default: 'Drug Manufacturing License',
    },
    regulatoryAuthority: {
      type: String,
      required: true,
      trim: true,
    },
    applicationSubmissionDate: {
      type: Date,
      default: Date.now,
    },
    currentStatus: {
      type: String,
      required: true,
      enum: [
        'Application Submitted',
        'Under Review',
        'Query Raised',
        'Documents Pending',
        'Approved',
        'Rejected',
        'Renewal Due',
      ],
      default: 'Application Submitted',
    },
    pendingDocumentation: [{ type: String }],
    nextRenewalDate: { type: Date },
    followUpDate: { type: Date },
    remarks: { type: String },
    updatesTimeline: [licenseUpdateSchema],
    assignedConsultant: {
      name: { type: String, default: 'Dr. Eleanor Vance, RAC Senior Consultant' },
      email: { type: String, default: 'regulatory@regusphere360.com' },
    },
    clientReferenceNotes: { type: String },
    verifiedSource: {
      type: String,
      default: 'Client-Provided Application & Authorized Regulatory Communications',
    },
  },
  {
    timestamps: true,
  }
);

export const LicenseApplication = mongoose.model('LicenseApplication', licenseApplicationSchema);
