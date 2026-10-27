import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry.js';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// In-Memory store for offline/resilience mode
const memoryEnquiries = [
  {
    trackingId: 'REG-2026-1001',
    clientName: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@biocrest-therapeutics.com',
    phone: '+1 (555) 234-5678',
    company: 'BioCrest Therapeutics Inc.',
    companyType: 'Biotech Startup',
    selectedServices: [
      'ICH CTD/eCTD dossier structure and document indexing',
      'Regulatory document gap assessments',
      'Regulatory submission readiness checklists',
    ],
    targetAgencies: ['US FDA', 'EMA'],
    dossierType: 'eCTD',
    therapeuticArea: 'Oncology / Immunotherapy mAb',
    targetSubmissionDate: '2026-12-15',
    urgency: 'Expedited (2-3 weeks)',
    projectScopeDetails: 'Initial IND / CTA filing for novel bispecific antibody. Need comprehensive Module 3 CMC gap review and eCTD structure indexing before pre-IND meeting.',
    estimatedQuotation: {
      estimatedDays: 18,
      costBand: '$7,200 - $11,500 USD',
      complexity: 'Multi-Disciplinary Regulatory Program',
      deliverables: [
        'Comprehensive Regulatory Scoping Brief',
        'Executive Summary of Compliance Gaps',
        'ICH CTD Granular Module 1-5 XML/TOC Folder Structure & Hyperlinking Matrix',
        'Detailed Regulatory Gap Assessment Matrix with Agency Risk Flagging',
        'Official Health Authority Readiness Validation Checklist & Gate Sign-off',
      ],
    },
    uploadedFiles: [
      {
        originalName: 'BioCrest_IND_Module3_Draft_Index.pdf',
        fileName: 'sample-doc-1.pdf',
        filePath: '/uploads/sample-doc-1.pdf',
        fileSize: 2450000,
        mimeType: 'application/pdf',
        uploadedAt: new Date(Date.now() - 86400000 * 3),
      },
    ],
    projectStatus: 'Gap Assessment In Progress',
    milestones: [
      {
        title: 'Enquiry Received & Scoping Started',
        description: 'Project brief and raw technical dossiers received and categorized.',
        status: 'completed',
        completedAt: new Date(Date.now() - 86400000 * 3),
      },
      {
        title: 'Preliminary Gap Assessment & Work Breakdown',
        description: 'Audit of Module 3 CMC data vs FDA 21 CFR 312 guidelines.',
        status: 'in-progress',
      },
      {
        title: 'Dossier Structuring & Regulatory Writing Review',
        description: 'Module 2.3 Quality Overall Summary alignment and leaf hyperlinks.',
        status: 'pending',
      },
      {
        title: 'Submission Readiness Validation Gate',
        description: 'Lorenz eCTD Gateway validation & final regulatory sign-off.',
        status: 'pending',
      },
    ],
    assignedConsultant: {
      name: 'Dr. Eleanor Vance, RAC Senior Consultant',
      email: 'regulatory@regusphere360.com',
    },
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(),
  },
];

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /pdf|doc|docx|xlsx|xls|zip|txt|csv/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Only regulatory documentation files (.pdf, .doc, .docx, .xlsx, .zip, .csv) are accepted.'));
  },
});

// Helper to compute quotation and timeline estimates
function calculateQuotationEstimate(services = [], urgency = 'Standard (4-6 weeks)', dossierType = 'eCTD') {
  let baseDays = 14;
  let baseMinCost = 3500;
  let baseMaxCost = 6000;
  const deliverables = [
    'Comprehensive Regulatory Scoping Brief',
    'Executive Summary of Compliance Gaps',
  ];

  if (services.includes('ICH CTD/eCTD dossier structure and document indexing')) {
    baseDays += 7;
    baseMinCost += 2200;
    baseMaxCost += 3800;
    deliverables.push('ICH CTD Granular Module 1-5 XML/TOC Folder Structure & Hyperlinking Matrix');
  }

  if (services.includes('Regulatory document gap assessments')) {
    baseDays += 5;
    baseMinCost += 1800;
    baseMaxCost += 3000;
    deliverables.push('Detailed Regulatory Gap Assessment Matrix with Agency Risk Flagging');
  }

  if (services.includes('SOP preparation, review, and document control support')) {
    baseDays += 6;
    baseMinCost += 1500;
    baseMaxCost += 2500;
    deliverables.push('GxP Compliant SOP Dossier, Review Logs, and Document Control Sign-off');
  }

  if (services.includes('Regulatory submission readiness checklists')) {
    baseDays += 4;
    baseMinCost += 1200;
    baseMaxCost += 2000;
    deliverables.push('Official Health Authority Readiness Validation Checklist & Gate Sign-off');
  }

  if (services.includes('Regulatory writing and documentation consistency reviews')) {
    baseDays += 7;
    baseMinCost += 2000;
    baseMaxCost += 3500;
    deliverables.push('Module 2 Clinical/Non-Clinical Overview Consistency & Quality Audit Report');
  }

  if (services.includes('Post-approval change documentation support')) {
    baseDays += 5;
    baseMinCost += 1600;
    baseMaxCost += 2800;
    deliverables.push('Post-Approval Variation Classification Dossier & Agency Notification Package');
  }

  if (urgency.includes('Critical')) {
    baseDays = Math.max(7, Math.round(baseDays * 0.5));
    baseMinCost = Math.round(baseMinCost * 1.35);
    baseMaxCost = Math.round(baseMaxCost * 1.45);
  } else if (urgency.includes('Expedited')) {
    baseDays = Math.max(10, Math.round(baseDays * 0.75));
    baseMinCost = Math.round(baseMinCost * 1.15);
    baseMaxCost = Math.round(baseMaxCost * 1.2);
  }

  return {
    estimatedDays: baseDays,
    costBand: `$${baseMinCost.toLocaleString()} - $${baseMaxCost.toLocaleString()} USD`,
    complexity: services.length > 2 ? 'Multi-Disciplinary Regulatory Program' : 'Targeted Regulatory Engagement',
    deliverables,
  };
}

// Generate unique tracking ID
function generateTrackingId() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `REG-${year}-${randomPart}`;
}

// POST: Create enquiry with optional files
router.post('/', upload.array('files', 5), async (req, res) => {
  try {
    const {
      clientName,
      email,
      phone,
      company,
      companyType,
      selectedServices,
      targetAgencies,
      dossierType,
      therapeuticArea,
      targetSubmissionDate,
      urgency,
      projectScopeDetails,
      firebaseUid,
    } = req.body;

    if (!clientName || !email || !company) {
      return res.status(400).json({
        success: false,
        message: 'Client name, email, and company are required fields.',
      });
    }

    const parsedServices = Array.isArray(selectedServices)
      ? selectedServices
      : typeof selectedServices === 'string'
      ? JSON.parse(selectedServices || '[]')
      : [];

    const parsedAgencies = Array.isArray(targetAgencies)
      ? targetAgencies
      : typeof targetAgencies === 'string'
      ? JSON.parse(targetAgencies || '[]')
      : [];

    const trackingId = generateTrackingId();
    const quote = calculateQuotationEstimate(parsedServices, urgency, dossierType);

    const uploadedFiles = (req.files || []).map((f) => ({
      originalName: f.originalname,
      fileName: f.filename,
      filePath: `/uploads/${f.filename}`,
      fileSize: f.size,
      mimeType: f.mimetype,
      uploadedAt: new Date(),
    }));

    const milestones = [
      {
        title: 'Enquiry Received & Scoping Started',
        description: 'Your project brief and documentation have been queued for senior regulatory scoping.',
        status: 'completed',
        completedAt: new Date(),
      },
      {
        title: 'Preliminary Gap Assessment & Work Breakdown',
        description: 'Evaluation against target health authority guidelines (eCTD/ICH specifications).',
        status: 'in-progress',
      },
      {
        title: 'Dossier Structuring & Regulatory Writing Review',
        description: 'Module index alignment, cross-referencing audit, and technical consistency checks.',
        status: 'pending',
      },
      {
        title: 'Submission Readiness Validation Gate',
        description: 'Validation report generation, electronic submission checklist sign-off.',
        status: 'pending',
      },
    ];

    const enquiryData = {
      trackingId,
      clientName,
      email: email.toLowerCase().trim(),
      phone,
      company,
      companyType: companyType || 'Pharma Enterprise',
      selectedServices: parsedServices,
      targetAgencies: parsedAgencies,
      dossierType: dossierType || 'eCTD',
      therapeuticArea,
      targetSubmissionDate,
      urgency: urgency || 'Standard (4-6 weeks)',
      projectScopeDetails,
      estimatedQuotation: quote,
      uploadedFiles,
      projectStatus: 'Enquiry Submitted',
      milestones,
      assignedConsultant: {
        name: 'Dr. Eleanor Vance, RAC Senior Consultant',
        email: 'regulatory@regusphere360.com',
      },
      firebaseUid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to MongoDB if connected, else fallback to memory
    if (mongoose.connection.readyState === 1) {
      const newEnquiry = new Enquiry(enquiryData);
      await newEnquiry.save();
    }
    
    // Always keep in memory store as cache
    memoryEnquiries.unshift(enquiryData);

    res.status(201).json({
      success: true,
      message: 'Regulatory Documentation Consultancy enquiry submitted successfully.',
      trackingId,
      enquiry: enquiryData,
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error processing enquiry.',
    });
  }
});

// POST: Instant quotation preview endpoint
router.post('/quote-preview', (req, res) => {
  try {
    const { services = [], urgency = 'Standard (4-6 weeks)', dossierType = 'eCTD' } = req.body;
    const quote = calculateQuotationEstimate(services, urgency, dossierType);
    res.json({ success: true, quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Track by Tracking ID
router.get('/track/:trackingId', async (req, res) => {
  try {
    const trackingId = req.params.trackingId.trim().toUpperCase();

    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.findOne({ trackingId });
      if (enquiry) {
        return res.json({ success: true, enquiry });
      }
    }

    // Check memory store
    const memEnquiry = memoryEnquiries.find((e) => e.trackingId.toUpperCase() === trackingId);
    if (memEnquiry) {
      return res.json({ success: true, enquiry: memEnquiry });
    }

    return res.status(404).json({
      success: false,
      message: `No project found with tracking ID: ${trackingId}. Please verify your tracking code or submit a new enquiry.`,
    });
  } catch (error) {
    console.error('Error tracking project:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving project details.' });
  }
});

// GET: Projects by User Email / Firebase UID
router.get('/user/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const query = identifier.includes('@') ? { email: identifier } : { firebaseUid: identifier };
      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      if (enquiries.length > 0) {
        return res.json({ success: true, count: enquiries.length, enquiries });
      }
    }

    // Check memory
    const filtered = memoryEnquiries.filter(
      (e) => e.email.toLowerCase() === identifier || e.firebaseUid === identifier
    );
    res.json({ success: true, count: filtered.length, enquiries: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching client projects.' });
  }
});

// GET: List recent enquiries
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(20);
      if (enquiries.length > 0) {
        return res.json({ success: true, count: enquiries.length, enquiries });
      }
    }
    res.json({ success: true, count: memoryEnquiries.length, enquiries: memoryEnquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving enquiries.' });
  }
});

export default router;
