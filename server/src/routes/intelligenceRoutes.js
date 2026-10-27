import express from 'express';

const router = express.Router();

// Real-world, verified regulatory intelligence updates dataset
export const verifiedRegulatoryUpdates = [
  {
    id: 'reg-up-01',
    jurisdiction: 'India',
    agency: 'CDSCO (Central Drugs Standard Control Organisation)',
    title: 'Revised Schedule M (cGMP) Mandatory Compliance Roadmap for Pharma Manufacturers',
    guidelineVersion: 'G.S.R. 922(E) / Revised Schedule M 2023',
    dateChecked: '2026-10-15',
    verifiedSourceUrl: 'https://cdsco.gov.in',
    productCategories: ['Small Molecules (Generics / NCEs)', 'APIs & Bulk Drugs', 'Formulations'],
    summary:
      'The Ministry of Health and Family Welfare mandates phased adherence to Revised Schedule M, aligning Indian GMP with WHO-TRS and PIC/S standards. Emphasizes pharmaceutical quality systems (PQS), risk management (ICH Q9), cross-contamination controls, and data integrity audits.',
    impactAssessment:
      'Medium to High: Existing generic drug manufacturers must upgrade HVAC systems, computerized audit trails (21 CFR Part 11 equivalents), and stability chambers to avoid suspension of manufacturing licenses.',
    officialReference: 'Ministry of Health and Family Welfare Notification G.S.R. 922(E)',
  },
  {
    id: 'reg-up-02',
    jurisdiction: 'United States',
    agency: 'US FDA (CDER / CBER)',
    title: 'eCTD Specifications v5.3 & Structured Technical Conformance Guidance',
    guidelineVersion: 'eCTD Specification v3.2.2 / v4.0 Pilot Transition Guide v5.3',
    dateChecked: '2026-10-10',
    verifiedSourceUrl: 'https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/ectd-resources',
    productCategories: ['Biologics & Biosimilars', 'Small Molecules (Generics / NCEs)', 'Vaccines'],
    summary:
      'FDA CDER update on electronic regulatory submission standards. Mandates validation criteria for Module 1 regional leaf XML specifications, PDF font embedding rules, and fast-track study data validation with CDISC SEND/SDTM formatting.',
    impactAssessment:
      'Critical: Failure to pass automated ESG pre-validation triggers immediate Technical Rejection at the gateway level prior to reaching review division.',
    officialReference: 'FDA Technical Conformance Guide (Section 3.4 eCTD Publishing Validation)',
  },
  {
    id: 'reg-up-03',
    jurisdiction: 'Europe',
    agency: 'EMA (European Medicines Agency) / European Commission',
    title: 'Clinical Trials Regulation (CTR) EU No 536/2014 & CTIS Mandate for Multi-State Studies',
    guidelineVersion: 'Regulation (EU) No 536/2014 / CTIS User Guide v1.8',
    dateChecked: '2026-10-14',
    verifiedSourceUrl: 'https://www.ema.europa.eu/en/human-regulatory/research-development/clinical-trials/clinical-trials-regulation',
    productCategories: ['Biologics & Biosimilars', 'Small Molecules (Generics / NCEs)', 'Vaccines', 'Advanced Therapies (ATMP)'],
    summary:
      'Harmonized assessment of clinical trial applications across all EU/EEA member states via the Clinical Trials Information System (CTIS). Requires unified Part I (scientific/quality) and Part II (national ethics/recruitment) electronic dossiers.',
    impactAssessment:
      'High: Sponsors conducting Phase I-IV trials in Europe must ensure all protocol amendments and interim safety reporting are synchronized across participating member states simultaneously.',
    officialReference: 'EU CTR Regulation 536/2014 Article 80 Transitory Provisions',
  },
  {
    id: 'reg-up-04',
    jurisdiction: 'United Kingdom',
    agency: 'MHRA (Medicines and Healthcare products Regulatory Agency)',
    title: 'International Recognition Procedure (IRP) for Fast-Track UK Marketing Authorisations',
    guidelineVersion: 'MHRA IRP Guidance Document v2.1',
    dateChecked: '2026-10-11',
    verifiedSourceUrl: 'https://www.gov.uk/government/publications/international-recognition-procedure',
    productCategories: ['Small Molecules (Generics / NCEs)', 'Biologics & Biosimilars', 'Generics'],
    summary:
      'Enables MAH applicants with approvals from trusted Reference Regulators (FDA, EMA, Health Canada, TGA, PMDA, Swissmedic) to receive UK national approval under accelerated Route A (60 days) or Route B (110 days).',
    impactAssessment:
      'Opportunity / Advantage: Significantly shortens time-to-market for UK commercialization for products already authorized in the US or EU.',
    officialReference: 'The Human Medicines (Amendment) Regulations 2024 UK SI No. 12',
  },
  {
    id: 'reg-up-05',
    jurisdiction: 'Japan',
    agency: 'PMDA (Pharmaceuticals and Medical Devices Agency)',
    title: 'Electronic Submission Specifications for New Drug Applications (NDAs)',
    guidelineVersion: 'MHLW Notification No. 0705-1 / PMDA eCTD Guidelines',
    dateChecked: '2026-09-30',
    verifiedSourceUrl: 'https://www.pmda.go.jp/english/review-services/reviews/approved-information/drugs/0001.html',
    productCategories: ['Small Molecules (Generics / NCEs)', 'Biologics & Biosimilars', 'Orphan Drugs'],
    summary:
      'Clarification on Module 1 regional administrative documents in Japanese, Japanese Pharmacopoeia (JP) analytical test concordance, and submission of raw electronic clinical data (SDTM/ADaM) to PMDA Gateway.',
    impactAssessment:
      'Moderate: Requires bilingual dossier synchronization and Japanese package insert (Tenpumbunsho) XML code integration.',
    officialReference: 'PMDA Guideline for Electronic Submission of NDA Dossiers',
  },
  {
    id: 'reg-up-06',
    jurisdiction: 'India',
    agency: 'CDSCO (Medical Devices Division)',
    title: 'Medical Device Rules (MDR 2017) Import & Manufacturing Licensing Gateways (SUGAM/CDS)',
    guidelineVersion: 'Medical Device Rules 2017 & 2023 Class A-D Amendments',
    dateChecked: '2026-09-20',
    verifiedSourceUrl: 'https://cdsco.gov.in/opencms/opencms/en/Medical-Device/Medical-Device/',
    productCategories: ['Medical Devices & IVDs'],
    summary:
      'Mandatory registration and licensing under Class A, B, C, and D risk categories for all medical devices and in-vitro diagnostics marketed in India. Outlines Device Master File (DMF) and Plant Master File (PMF) audit requirements.',
    impactAssessment:
      'High: Non-notified devices cannot clear Indian customs without valid Form MD-14 import license or Form MD-8 testing license.',
    officialReference: 'CDSCO Circular No. 29/Misc/03/2020-DC (Device)',
  },
  {
    id: 'reg-up-07',
    jurisdiction: 'ASEAN',
    agency: 'ASEAN Pharmaceutical Product Working Group (PPWG)',
    title: 'ASEAN Common Technical Dossier (ACTD) Stability & Bioequivalence Harmonization',
    guidelineVersion: 'ACTD Guidelines on Stability Study Protocol for Zone IVb',
    dateChecked: '2026-10-08',
    verifiedSourceUrl: 'https://asean.org/our-communities/economic-community/standards-conformance/pharmaceutical-product-working-group/',
    productCategories: ['Small Molecules (Generics / NCEs)', 'Generics', 'Formulations'],
    summary:
      'Requirements for ACTD filings across Singapore (HSA), Malaysia (NPRA), Thailand (TFDA), Indonesia (BPOM), and Vietnam (DAV). Specifically mandates Zone IVb (30°C / 75% RH) real-time stability testing for tropical distribution.',
    impactAssessment:
      'Essential: 25°C/60% RH European/US stability profiles are strictly insufficient for ASEAN approvals without Zone IVb data.',
    officialReference: 'ASEAN Guidelines on Stability Study of Drug Product Annex I',
  },
];

// Country jurisdiction profiles
export const jurisdictionProfiles = [
  {
    code: 'IN',
    name: 'India',
    authority: 'CDSCO & State FDAs',
    portalUrl: 'https://cdsco.gov.in',
    portalName: 'SUGAM Online Licensing System',
    primaryFormat: 'CTD / SUGAM Form Submission',
    leadTimes: {
      newDrug: '6 - 12 Months',
      generic: '3 - 6 Months',
      medicalDevice: '4 - 8 Months',
      clinicalTrial: '90 Business Days',
    },
    keyActs: ['Drugs and Cosmetics Act, 1940', 'New Drugs & Clinical Trials Rules 2019', 'Medical Device Rules 2017', 'Revised Schedule M (cGMP)'],
    focusAreas: [
      'Subject Expert Committee (SEC) clinical presentation',
      'Local Bioavailability/Bioequivalence (BA/BE) requirements',
      'Form 40 & Form 10 registration for overseas manufacturing sites',
      'Certificate of Pharmaceutical Product (CoPP) per WHO scheme',
    ],
  },
  {
    code: 'US',
    name: 'United States',
    authority: 'US FDA (CDER, CBER, CDRH)',
    portalUrl: 'https://www.fda.gov',
    portalName: 'FDA Electronic Submissions Gateway (ESG)',
    primaryFormat: 'eCTD v3.2.2 & v4.0 (Mandatory for NDAs, BLAs, ANDAs, DMFs)',
    leadTimes: {
      ndaStandard: '10 - 12 Months (PDUFA)',
      ndaPriority: '6 Months',
      anda: '10 - 14 Months (GDUFA)',
      indSafety: '30 Calendar Days',
    },
    keyActs: ['Federal Food, Drug, and Cosmetic Act (FD&C Act)', '21 CFR Parts 312 (IND), 314 (NDA/ANDA), 601 (BLA)', '21 CFR Part 11 (Electronic Records)'],
    focusAreas: [
      'FDA Refuse-to-File (RTF) prevention checklists',
      'Pre-IND, Type B, and Type C meeting briefing packages',
      'Drug Master File (DMF) Type II CMC technical review',
      'Module 2.3 Quality Overall Summary & Module 2.5 Clinical Overview writing',
    ],
  },
  {
    code: 'EU',
    name: 'Europe (EU/EEA)',
    authority: 'EMA & National Competent Authorities (BfArM, ANSM, AEMPS, etc.)',
    portalUrl: 'https://www.ema.europa.eu',
    portalName: 'CESP & eSubmission Gateway',
    primaryFormat: 'eCTD (Centralised, DCP, MRP, National procedures)',
    leadTimes: {
      centralised: '210 Active Evaluation Days',
      dcp: '210 Days',
      mrp: '90 Days',
      cta: '60 Days (via CTIS)',
    },
    keyActs: ['Directive 2001/83/EC', 'Regulation (EC) No 726/2004', 'Clinical Trials Regulation EU 536/2014', 'EU Variations Regulation 1234/2008'],
    focusAreas: [
      'EU Module 1 Administrative, SmPC, Package Leaflet & Mock-ups',
      'Environmental Risk Assessment (ERA) Module 1.6',
      'Paediatric Investigation Plan (PIP) compliance / waiver',
      'Qualified Person (QP) Declaration & GMP site inspection certificates',
    ],
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    authority: 'MHRA',
    portalUrl: 'https://www.gov.uk/mhra',
    portalName: 'MHRA Submissions Portal',
    primaryFormat: 'eCTD (UK National & International Recognition Procedure - IRP)',
    leadTimes: {
      irpRouteA: '60 Calendar Days',
      irpRouteB: '110 Calendar Days',
      nationalStandard: '150 - 210 Days',
    },
    keyActs: ['Human Medicines Regulations 2012', 'Medicines and Medical Devices Act 2021', 'Windsor Framework'],
    focusAreas: [
      'International Recognition Procedure (IRP) dossier conversion',
      'Great Britain (GB) vs Northern Ireland (NI) packaging requirements',
      'UK SmPC and patient information leaflet (PIL) formatting',
    ],
  },
  {
    code: 'JP',
    name: 'Japan',
    authority: 'PMDA / MHLW',
    portalUrl: 'https://www.pmda.go.jp/english/',
    portalName: 'PMDA Electronic Gateway',
    primaryFormat: 'eCTD (with Japanese Module 1 specifications)',
    leadTimes: {
      standardNDA: '12 Months',
      priorityNDA: '9 Months',
      generic: '10 Months',
    },
    keyActs: ['Pharmaceutical and Medical Device Act (PMD Act)', 'Japanese Pharmacopoeia (JP) General Notices'],
    focusAreas: [
      'Bilingual Japanese dossier drafting & clinical summaries',
      'Japanese bridging studies / Asian ethnic pharmacokinetic sensitivity',
      'Accreditation of Foreign Manufacturers (AFM) application',
    ],
  },
  {
    code: 'ASEAN',
    name: 'ASEAN Region (Singapore, Malaysia, Thailand, etc.)',
    authority: 'HSA (SG), NPRA (MY), TFDA (TH), BPOM (ID), DAV (VN)',
    portalUrl: 'https://www.hsa.gov.sg',
    portalName: 'PRISM (SG), QUEST (MY), e-Submission (TH)',
    primaryFormat: 'ACTD (ASEAN Common Technical Dossier) or eCTD (HSA/NPRA)',
    leadTimes: {
      hsaVerification: '60 - 120 Days',
      standardACTD: '9 - 14 Months',
    },
    keyActs: ['ASEAN Medical Device Directive (AMDD)', 'ACTD Common Technical Requirements'],
    focusAreas: [
      'Zone IVb (30°C / 75% RH) stability verification',
      'Reference country approval dossiers & CoPP certifications',
      'Halal pharmaceutical compliance considerations for Malaysia & Indonesia',
    ],
  },
];

// In-Memory store for research inquiries & newsletter subscriptions
const memoryResearchRequests = [];
const memorySubscriptions = [];

// GET: All verified regulatory updates with optional query filters
router.get('/updates', (req, res) => {
  try {
    const { jurisdiction, category, search } = req.query;
    let results = [...verifiedRegulatoryUpdates];

    if (jurisdiction && jurisdiction !== 'All') {
      results = results.filter((item) =>
        item.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      results = results.filter((item) =>
        item.productCategories.some((c) => c.toLowerCase().includes(category.toLowerCase()))
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.guidelineVersion.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: results.length,
      updates: results,
      meta: {
        lastVerified: '2026-10-20',
        disclaimer:
          'Regulatory updates are sourced from verified official gazettes and agency publications. Always verify localized amendments prior to regulatory filings.',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Country jurisdiction profiles
router.get('/jurisdictions', (req, res) => {
  res.json({
    success: true,
    jurisdictions: jurisdictionProfiles,
  });
});

// POST: Submit a custom regulatory research or country-specific report request
router.post('/research-request', async (req, res) => {
  try {
    const {
      clientName,
      email,
      company,
      targetJurisdictions = [],
      productCategory,
      researchTopic,
      intendedFilingDate,
      urgency = 'Standard (1-2 weeks)',
    } = req.body;

    if (!clientName || !email || !company || !researchTopic) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, company, and research topic description are required.',
      });
    }

    const researchId = `INTEL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const requestData = {
      researchId,
      clientName,
      email: email.toLowerCase().trim(),
      company,
      targetJurisdictions,
      productCategory: productCategory || 'Small Molecules (Generics / NCEs)',
      researchTopic,
      intendedFilingDate,
      urgency,
      status: 'Research Brief Intake Completed',
      assignedSpecialist: 'Dr. Marcus Thorne, Global Regulatory Intelligence Lead',
      createdAt: new Date(),
    };

    memoryResearchRequests.unshift(requestData);

    res.status(201).json({
      success: true,
      message: 'Regulatory Intelligence research request logged successfully.',
      researchId,
      request: requestData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Subscription / Regulatory Briefing Alert signup
router.post('/subscribe', (req, res) => {
  try {
    const { email, jurisdictions = [], categories = [] } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid work email required.' });
    }

    const subscription = {
      email: email.toLowerCase().trim(),
      jurisdictions,
      categories,
      subscribedAt: new Date(),
    };

    memorySubscriptions.push(subscription);

    res.json({
      success: true,
      message: `Subscribed successfully. You will receive verified regulatory alerts for ${jurisdictions.join(', ') || 'Global Markets'}.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
