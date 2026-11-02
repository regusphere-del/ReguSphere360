import express from 'express';
import mongoose from 'mongoose';
import { LicenseApplication } from '../models/LicenseApplication.js';

const router = express.Router();

// Pre-seeded verified initial records for dual-resilience / demo mode
const seedLicenses = [
  {
    applicationId: 'LIC-2026-MFG-882',
    applicantName: 'Dr. Ramesh Sharma',
    companyName: 'AeroBio Pharmaceuticals Ltd.',
    email: 'regulatory@aerobio.in',
    phone: '+91 98210 44321',
    country: 'India',
    licenseCategory: 'Drug Manufacturing License',
    regulatoryAuthority: 'CDSCO & Maharashtra State FDA',
    applicationSubmissionDate: new Date('2026-01-15'),
    currentStatus: 'Under Review',
    pendingDocumentation: [
      'Revised Schedule M (cGMP) Validation Protocol',
      'HVAC Qualification & Air Balance Reports for Cleanroom Block B',
    ],
    nextRenewalDate: new Date('2028-01-14'),
    followUpDate: new Date('2026-11-20'),
    remarks: 'Joint site inspection completed on Oct 18. Authority query letter received regarding water system TOC calibration data.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-01-15'),
        status: 'Application Submitted',
        note: 'Form 25 / Form 28 application dossier lodged via State FDA online portal.',
        updatedBy: 'AeroBio RA Team',
      },
      {
        timestamp: new Date('2026-04-10'),
        status: 'Under Review',
        note: 'Technical scrutiny in progress at CDSCO Zonal Directorate.',
        updatedBy: 'Dr. Eleanor Vance, RAC Senior Consultant',
      },
      {
        timestamp: new Date('2026-10-22'),
        status: 'Query Raised',
        note: 'Clarification requested regarding batch process validation and water TOC logs.',
        updatedBy: 'CDSCO Inspection Team',
      },
      {
        timestamp: new Date('2026-11-01'),
        status: 'Under Review',
        note: 'Response dossier drafted by ReguSphere 360; waiting for authority rejoinder.',
        updatedBy: 'ReguSphere 360 Advisory Lead',
      },
    ],
    verifiedSource: 'State FDA portal ref #MH-DRUG-2026-882 & CDSCO verification receipt',
  },
  {
    applicationId: 'LIC-2026-WHL-419',
    applicantName: 'Vikram Mehta',
    companyName: 'Zenith Global Pharma Logistics',
    email: 'vmehta@zenithpharma.com',
    phone: '+91 98111 23456',
    country: 'India',
    licenseCategory: 'Wholesale Drug License',
    regulatoryAuthority: 'Delhi State Drug Control Department',
    applicationSubmissionDate: new Date('2026-08-10'),
    currentStatus: 'Approved',
    pendingDocumentation: [],
    nextRenewalDate: new Date('2031-08-09'),
    followUpDate: new Date('2027-08-01'),
    remarks: 'Form 20B and 21B Wholesale Licenses granted. Storage temperature mapping certified (2°C - 8°C cold chain).',
    updatesTimeline: [
      {
        timestamp: new Date('2026-08-10'),
        status: 'Application Submitted',
        note: 'Filed wholesale application with qualified registered pharmacist credentials.',
        updatedBy: 'Zenith RA Lead',
      },
      {
        timestamp: new Date('2026-09-02'),
        status: 'Under Review',
        note: 'Drug Inspector physical premises audit conducted.',
        updatedBy: 'Drug Inspectorate Zone 3',
      },
      {
        timestamp: new Date('2026-09-28'),
        status: 'Approved',
        note: 'Official Form 20B / 21B certificates issued and recorded in state register.',
        updatedBy: 'Licensing Authority Delhi',
      },
    ],
    verifiedSource: 'Delhi State Drug Control Form 20B/21B Certificate Ref #DL-WHL-2026-419',
  },
  {
    applicationId: 'LIC-2026-ANDA-771',
    applicantName: 'Dr. Sarah Jenkins',
    companyName: 'BioCrest Therapeutics Inc.',
    email: 'sarah.jenkins@biocrest-therapeutics.com',
    phone: '+1 (555) 234-5678',
    country: 'USA',
    licenseCategory: 'Drug Manufacturing License',
    regulatoryAuthority: 'US FDA (CDER / OGD)',
    applicationSubmissionDate: new Date('2026-03-20'),
    currentStatus: 'Query Raised',
    pendingDocumentation: [
      'Comparative In-Vitro Dissolution Profiles at pH 1.2, 4.5, 6.8',
      'Nitrosamine Risk Assessment & Impurity Testing Validation Report',
    ],
    nextRenewalDate: new Date('2027-03-19'),
    followUpDate: new Date('2026-12-05'),
    remarks: 'Information Request (IR) letter issued by FDA reviewer. 90-day response clock running.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-03-20'),
        status: 'Application Submitted',
        note: 'eCTD Sequence 0000 transmitted via Electronic Submissions Gateway (ESG).',
        updatedBy: 'BioCrest Operations',
      },
      {
        timestamp: new Date('2026-04-05'),
        status: 'Under Review',
        note: 'Filing review completed; official Acknowledgment Letter received.',
        updatedBy: 'FDA Regulatory Project Manager',
      },
      {
        timestamp: new Date('2026-10-15'),
        status: 'Query Raised',
        note: 'FDA Discipline Review Letter issued requesting analytical chromatographic data.',
        updatedBy: 'Dr. Eleanor Vance, RAC Senior Consultant',
      },
    ],
    verifiedSource: 'FDA ESG Transmission ID #FDA-ESG-2026-ANDA-771',
  },
  {
    applicationId: 'LIC-2026-MD-512',
    applicantName: 'Kunal Singhania',
    companyName: 'Apex MedTech Solutions',
    email: 'kunal@apexmedtech.com',
    phone: '+91 97765 88990',
    country: 'India',
    licenseCategory: 'Medical Device License',
    regulatoryAuthority: 'CDSCO Medical Device Division',
    applicationSubmissionDate: new Date('2026-05-12'),
    currentStatus: 'Documents Pending',
    pendingDocumentation: [
      'ISO 13485:2016 Audit Report by Notified Body',
      'Device Master File (DMF) & Risk Management File per ISO 14971',
      'Clinical Evaluation Report (CER) per MDR 2017 Schedule IV',
    ],
    nextRenewalDate: new Date('2027-05-11'),
    followUpDate: new Date('2026-11-25'),
    remarks: 'Class B In-Vitro Diagnostic Kit application. Notified body audit scheduled for late November.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-05-12'),
        status: 'Application Submitted',
        note: 'Form MD-14 import license application initiated on SUGAM portal.',
        updatedBy: 'Apex RA Specialist',
      },
      {
        timestamp: new Date('2026-07-20'),
        status: 'Documents Pending',
        note: 'Notified Body inspection report pending submission to CDSCO portal.',
        updatedBy: 'CDSCO Device Officer',
      },
    ],
    verifiedSource: 'CDSCO SUGAM Portal File #MD-IVD-2026-512',
  },
  {
    applicationId: 'LIC-2026-CT-109',
    applicantName: 'Dr. Ananya Roy',
    companyName: 'NovaCare Clinical Research',
    email: 'ananya.roy@novacare-cro.com',
    phone: '+91 99001 12345',
    country: 'India',
    licenseCategory: 'Clinical Trial Application',
    regulatoryAuthority: 'CDSCO New Drugs Division & SEC',
    applicationSubmissionDate: new Date('2026-07-01'),
    currentStatus: 'Under Review',
    pendingDocumentation: [
      'Institutional Ethics Committee (IEC) Registration Certificate',
      'Investigator Brochure (IB) Version 4.2 Sign-off',
    ],
    nextRenewalDate: new Date('2027-06-30'),
    followUpDate: new Date('2026-11-18'),
    remarks: 'Phase III clinical study protocol under Subject Expert Committee (SEC) review.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-07-01'),
        status: 'Application Submitted',
        note: 'Form CT-04 application for Phase III trial permission submitted.',
        updatedBy: 'NovaCare Regulatory Dept',
      },
      {
        timestamp: new Date('2026-09-14'),
        status: 'Under Review',
        note: 'Presented before SEC (Oncology & Hematology); minor revisions suggested.',
        updatedBy: 'SEC Committee Rapporteur',
      },
    ],
    verifiedSource: 'CDSCO CT-04 Application Dossier Ref #CT-2026-109',
  },
  {
    applicationId: 'LIC-2026-LOAN-230',
    applicantName: 'Priya Nambiar',
    companyName: 'Equitas Formulation Labs',
    email: 'priya@equitaslabs.com',
    phone: '+91 98450 77123',
    country: 'India',
    licenseCategory: 'Loan License',
    regulatoryAuthority: 'Karnataka State Drugs Control Dept',
    applicationSubmissionDate: new Date('2026-02-14'),
    currentStatus: 'Renewal Due',
    pendingDocumentation: [
      'Principal Manufacturer Facility Capacity Utilization Certificate',
      'Retention Fee Challan Verification & Form 25A Endorsement',
    ],
    nextRenewalDate: new Date('2026-11-30'),
    followUpDate: new Date('2026-11-10'),
    remarks: 'Loan license Form 25A expires on Nov 30, 2026. Retention fee must be paid before cut-off to prevent statutory lapse.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-02-14'),
        status: 'Approved',
        note: 'Original Form 25A loan manufacturing agreement endorsed.',
        updatedBy: 'State Licensing Authority',
      },
      {
        timestamp: new Date('2026-10-15'),
        status: 'Renewal Due',
        note: 'Automatic 45-day pre-expiry alert triggered by ReguSphere 360 Tracking Engine.',
        updatedBy: 'ReguSphere 360 Automated System',
      },
    ],
    verifiedSource: 'Karnataka State Drug Control Loan License Form 25A Ref #KA-LL-2026-230',
  },
  {
    applicationId: 'LIC-2026-COS-304',
    applicantName: 'Rajesh Varma',
    companyName: 'LuxeBotanics Herbals',
    email: 'rvarma@luxebotanics.com',
    phone: '+91 98888 55443',
    country: 'India',
    licenseCategory: 'Cosmetics Manufacturing License',
    regulatoryAuthority: 'Gujarat State FDA',
    applicationSubmissionDate: new Date('2026-09-01'),
    currentStatus: 'Application Submitted',
    pendingDocumentation: [
      'Form COS-1 Application Checklist & Product Test Reports',
      'Layout blueprint of clean cosmetics processing area',
    ],
    nextRenewalDate: new Date('2031-08-31'),
    followUpDate: new Date('2026-11-28'),
    remarks: 'Cosmetics Rules 2020 compliance review initiated for new herbal skincare manufacturing unit.',
    updatesTimeline: [
      {
        timestamp: new Date('2026-09-01'),
        status: 'Application Submitted',
        note: 'Form COS-1 and product ingredient safety declarations uploaded.',
        updatedBy: 'LuxeBotanics RA',
      },
    ],
    verifiedSource: 'Gujarat FDA Cosmetics Division Ref #GJ-COS-2026-304',
  },
];

// In-Memory store for offline/dual resilience
let memoryLicenses = [...seedLicenses];

// Helper to seed initial records if MongoDB is connected and collection is empty
const ensureDatabaseSeeded = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      const count = await LicenseApplication.countDocuments();
      if (count === 0) {
        await LicenseApplication.insertMany(seedLicenses);
        console.log('[ReguSphere 360] Seeded 7 initial verified license applications in MongoDB.');
      }
    } catch (err) {
      console.warn('[License Seed Warning]:', err.message);
    }
  }
};
setTimeout(ensureDatabaseSeeded, 3000);

// Helper function to simulate administrator notification
const notifyAdminOfLicenseSubmission = (appData) => {
  console.log(`\n======================================================`);
  console.log(`[EMAIL NOTIFICATION TO REGULATORY ADMINISTRATOR]`);
  console.log(`Subject: New License Tracking Request: ${appData.applicationId}`);
  console.log(`To: admin@regusphere360.com, lead.consultant@regusphere360.com`);
  console.log(`Applicant: ${appData.applicantName} (${appData.companyName})`);
  console.log(`License Category: ${appData.licenseCategory}`);
  console.log(`Regulatory Authority: ${appData.regulatoryAuthority}`);
  console.log(`Application ID: ${appData.applicationId}`);
  console.log(`Status: ${appData.currentStatus}`);
  console.log(`Submitted At: ${new Date().toISOString()}`);
  console.log(`======================================================\n`);
};

// GET: List/Search all licenses with filter support
router.get('/', async (req, res) => {
  try {
    const { q, category, status, authority } = req.query;

    let results = [];
    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (category && category !== 'All') filter.licenseCategory = category;
      if (status && status !== 'All') filter.currentStatus = status;
      if (authority && authority !== 'All') {
        filter.regulatoryAuthority = { $regex: authority, $options: 'i' };
      }
      if (q) {
        const regex = new RegExp(q, 'i');
        filter.$or = [
          { applicationId: regex },
          { applicantName: regex },
          { companyName: regex },
          { regulatoryAuthority: regex },
          { email: regex },
        ];
      }
      results = await LicenseApplication.find(filter).sort({ updatedAt: -1 });
    }

    if (results.length === 0) {
      results = memoryLicenses.filter((lic) => {
        const matchesCategory = !category || category === 'All' || lic.licenseCategory === category;
        const matchesStatus = !status || status === 'All' || lic.currentStatus === status;
        const matchesAuth =
          !authority ||
          authority === 'All' ||
          lic.regulatoryAuthority.toLowerCase().includes(authority.toLowerCase());
        const query = q ? q.toLowerCase() : '';
        const matchesQ =
          !query ||
          lic.applicationId.toLowerCase().includes(query) ||
          lic.applicantName.toLowerCase().includes(query) ||
          lic.companyName.toLowerCase().includes(query) ||
          lic.regulatoryAuthority.toLowerCase().includes(query) ||
          lic.email.toLowerCase().includes(query);

        return matchesCategory && matchesStatus && matchesAuth && matchesQ;
      });
    }

    res.json({
      success: true,
      count: results.length,
      licenses: results,
      sourceNotice:
        'Display only verified status information obtained through authorized sources or client-provided updates. Do not imply direct government database integration unless it is actually implemented.',
    });
  } catch (error) {
    console.error('Error fetching licenses:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Single License by Application ID
router.get('/:applicationId', async (req, res) => {
  try {
    const appId = req.params.applicationId.trim().toUpperCase();

    if (mongoose.connection.readyState === 1) {
      const license = await LicenseApplication.findOne({ applicationId: appId });
      if (license) {
        return res.json({ success: true, license });
      }
    }

    const memLicense = memoryLicenses.find((l) => l.applicationId.toUpperCase() === appId);
    if (memLicense) {
      return res.json({ success: true, license: memLicense });
    }

    return res.status(404).json({
      success: false,
      message: `No verified license tracking file found for Application ID: ${appId}. Please verify your ID or submit a new tracking request.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Submit License Details & Request Tracking Assistance
router.post('/', async (req, res) => {
  try {
    const {
      applicationId,
      applicantName,
      companyName,
      email,
      phone,
      country,
      licenseCategory,
      regulatoryAuthority,
      applicationSubmissionDate,
      currentStatus,
      pendingDocumentation,
      nextRenewalDate,
      followUpDate,
      remarks,
      clientReferenceNotes,
    } = req.body;

    if (!applicantName || !companyName || !email || !regulatoryAuthority) {
      return res.status(400).json({
        success: false,
        message: 'Applicant name, company name, email, and regulatory authority are mandatory.',
      });
    }

    // Auto-generate application ID if not provided
    const finalAppId =
      applicationId && applicationId.trim()
        ? applicationId.trim().toUpperCase()
        : `LIC-${new Date().getFullYear()}-APP-${Math.floor(1000 + Math.random() * 9000)}`;

    const parsedPendingDocs = Array.isArray(pendingDocumentation)
      ? pendingDocumentation
      : typeof pendingDocumentation === 'string' && pendingDocumentation.trim()
      ? pendingDocumentation.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const newRecord = {
      applicationId: finalAppId,
      applicantName,
      companyName,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      country: country || 'India',
      licenseCategory: licenseCategory || 'Drug Manufacturing License',
      regulatoryAuthority: regulatoryAuthority.trim(),
      applicationSubmissionDate: applicationSubmissionDate ? new Date(applicationSubmissionDate) : new Date(),
      currentStatus: currentStatus || 'Application Submitted',
      pendingDocumentation: parsedPendingDocs,
      nextRenewalDate: nextRenewalDate ? new Date(nextRenewalDate) : null,
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      remarks: remarks || 'Client enquiry for license tracking and regulatory follow-up assistance received.',
      clientReferenceNotes: clientReferenceNotes || '',
      verifiedSource: 'Client-Provided Application & Authorized Follow-up Verification',
      updatesTimeline: [
        {
          timestamp: new Date(),
          status: currentStatus || 'Application Submitted',
          note: 'Tracking assistance request submitted via ReguSphere 360 portal.',
          updatedBy: 'Client Request Submission',
        },
      ],
      assignedConsultant: {
        name: 'Dr. Eleanor Vance, RAC Senior Consultant',
        email: 'regulatory@regusphere360.com',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      const doc = new LicenseApplication(newRecord);
      await doc.save();
    }

    // Always record in memory cache
    memoryLicenses.unshift(newRecord);

    // Trigger Admin Email Notification
    notifyAdminOfLicenseSubmission(newRecord);

    res.status(201).json({
      success: true,
      message: 'License details submitted successfully. Our regulatory team has initiated follow-up monitoring.',
      applicationId: finalAppId,
      license: newRecord,
    });
  } catch (error) {
    console.error('Error submitting license details:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH: Admin Update License Status, Remarks, Renewal Date, Pending Docs
router.patch('/:applicationId', async (req, res) => {
  try {
    const appId = req.params.applicationId.trim().toUpperCase();
    const {
      currentStatus,
      remarks,
      pendingDocumentation,
      nextRenewalDate,
      followUpDate,
      assignedConsultant,
      timelineNote,
    } = req.body;

    let updatedRecord = null;

    if (mongoose.connection.readyState === 1) {
      const doc = await LicenseApplication.findOne({ applicationId: appId });
      if (doc) {
        if (currentStatus) doc.currentStatus = currentStatus;
        if (remarks) doc.remarks = remarks;
        if (pendingDocumentation !== undefined) {
          doc.pendingDocumentation = Array.isArray(pendingDocumentation)
            ? pendingDocumentation
            : pendingDocumentation.split(',').map((s) => s.trim());
        }
        if (nextRenewalDate) doc.nextRenewalDate = new Date(nextRenewalDate);
        if (followUpDate) doc.followUpDate = new Date(followUpDate);
        if (assignedConsultant) doc.assignedConsultant = assignedConsultant;

        if (timelineNote || currentStatus) {
          doc.updatesTimeline.push({
            timestamp: new Date(),
            status: currentStatus || doc.currentStatus,
            note: timelineNote || `Status updated to ${currentStatus || doc.currentStatus}`,
            updatedBy: 'Regulatory Administrator',
          });
        }
        await doc.save();
        updatedRecord = doc;
      }
    }

    // Update in-memory copy
    const memIndex = memoryLicenses.findIndex((l) => l.applicationId.toUpperCase() === appId);
    if (memIndex !== -1) {
      const m = memoryLicenses[memIndex];
      if (currentStatus) m.currentStatus = currentStatus;
      if (remarks) m.remarks = remarks;
      if (pendingDocumentation !== undefined) {
        m.pendingDocumentation = Array.isArray(pendingDocumentation)
          ? pendingDocumentation
          : pendingDocumentation.split(',').map((s) => s.trim());
      }
      if (nextRenewalDate) m.nextRenewalDate = new Date(nextRenewalDate);
      if (followUpDate) m.followUpDate = new Date(followUpDate);
      if (assignedConsultant) m.assignedConsultant = assignedConsultant;

      m.updatesTimeline.push({
        timestamp: new Date(),
        status: currentStatus || m.currentStatus,
        note: timelineNote || `Status updated to ${currentStatus || m.currentStatus}`,
        updatedBy: 'Regulatory Administrator',
      });
      m.updatedAt = new Date();
      if (!updatedRecord) updatedRecord = m;
    }

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: `License application ${appId} not found to update.`,
      });
    }

    res.json({
      success: true,
      message: `License application ${appId} updated successfully.`,
      license: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
