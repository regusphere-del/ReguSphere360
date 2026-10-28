import express from 'express';

const router = express.Router();

export const coursesCatalog = [
  {
    id: 'REG-CRS-101',
    title: 'ICH CTD/eCTD Dossier Publishing & Validation Masterclass',
    badge: 'Flagship Practical Workshop',
    level: 'Intermediate to Advanced',
    targetAudience: 'Regulatory Affairs Associates, QA/QC Specialists, Freshers & M.Pharm Graduates',
    duration: '4 Weeks (8 Live Sessions + Hands-on Dossier Lab)',
    format: 'Live Virtual Workshop + Portfolio Project',
    nextCohort: '15th November 2026',
    seatsAvailable: 12,
    shortDescription:
      'Master the assembly of ICH Modules 1 to 5, XML backbone configuration, leaf document bookmarking, and Lorenz/FDA ESG gateway validation pass criteria.',
    modules: [
      {
        title: 'Module 1: The Regulatory Architecture of ICH Common Technical Document (CTD)',
        topics: ['ICH M4 Harmonization Principles', 'Granularity Guidelines', 'Module 1 Regional Differences (FDA vs EMA vs CDSCO)'],
      },
      {
        title: 'Module 2: Technical Specifications & eCTD XML DTD Backbone',
        topics: ['XML Schema v3.2.2 & v4.0', 'TOC compilation', 'Folder taxonomy and leaf naming conventions'],
      },
      {
        title: 'Module 3: Document Quality Control & PDF/A Optimization',
        topics: ['Acrobat Pro bookmarks', 'Cross-module hyperlinking protocols', 'Font embedding & checksum verification'],
      },
      {
        title: 'Module 4: Health Authority Electronic Gateway Simulation Lab',
        topics: ['Simulated FDA ESG & EMA CESP gate submissions', 'Technical rejection troubleshooting', 'Sequence lifecycle tracking'],
      },
    ],
    deliverables: [
      'Personal Portfolio: Complete eCTD Sequence 0000 dossier',
      'eCTD Validation Checklist Template (Word/Excel)',
      'Certificate of Course Completion (Documenting 32 hours of practical training)',
    ],
  },
  {
    id: 'REG-CRS-102',
    title: 'Global Regulatory Harmonization: US FDA, EMA & CDSCO Comparative Standards',
    badge: 'Executive Training',
    level: 'Comprehensive',
    targetAudience: 'Regulatory Affairs Managers, Regulatory Strategists, Biotech Founders',
    duration: '3 Weeks (6 Evening Sessions)',
    format: 'Executive Virtual Cohort',
    nextCohort: '1st December 2026',
    seatsAvailable: 15,
    shortDescription:
      'A deep comparative analysis of registration pathways, submission dossiers, and review timelines across the United States, European Union, and India.',
    modules: [
      {
        title: 'Module 1: US FDA Pathway (IND, NDA, BLA, ANDA, DMF)',
        topics: ['21 CFR 312 & 314', 'Pre-IND consultation strategy', 'PDUFA vs GDUFA timelines'],
      },
      {
        title: 'Module 2: European Medicines Agency (Centralised, DCP, MRP)',
        topics: ['Directive 2001/83/EC', 'Day 80/120 LoQ response strategies', 'Paediatric Investigation Plans (PIP)'],
      },
      {
        title: 'Module 3: CDSCO India Regulatory Framework',
        topics: ['New Drugs & Clinical Trials Rules 2019', 'SUGAM portal workflows', 'Subject Expert Committee (SEC) hearings'],
      },
      {
        title: 'Module 4: Global Bridging Studies & CoPP Strategy',
        topics: ['ICH E5 Ethnic Factors', 'WHO Certification Scheme', 'International Recognition Procedure (UK MHRA)'],
      },
    ],
    deliverables: [
      'Multi-Jurisdiction Registration Comparison Matrix',
      'Pre-submission Briefing Document Template',
      'Certificate of Course Completion (24 Hours of Executive Training)',
    ],
  },
  {
    id: 'REG-CRS-103',
    title: 'Regulatory Medical Writing & Module 2 Quality Overall Summary (QOS) Drafting',
    badge: 'Writing & Technical Review',
    level: 'Intermediate',
    targetAudience: 'Medical Writers, Clinical Research Associates, Regulatory Associates',
    duration: '2 Weeks (4 Intensive Weekend Workshops)',
    format: 'Hands-on Writing Lab',
    nextCohort: '8th November 2026',
    seatsAvailable: 10,
    shortDescription:
      'Learn how to draft clear, persuasive Module 2 overviews (QOS 2.3, Non-clinical 2.4, Clinical 2.5) that satisfy health authority review committees.',
    modules: [
      {
        title: 'Module 1: ICH M4E Guidelines & Scientific Narrative Structuring',
        topics: ['Transforming raw study data into executive summaries', 'Clarity and regulatory tone'],
      },
      {
        title: 'Module 2: Module 2.3 Quality Overall Summary (QOS) Drafting',
        topics: ['Critical Quality Attributes (CQAs)', 'Justifying manufacturing specifications', 'Stability extrapolation narratives'],
      },
      {
        title: 'Module 3: Module 2.5 Clinical Overview & Benefit-Risk Balance',
        topics: ['Efficacy vs safety balance', 'Bridging pharmacokinetic studies', 'Addressing adverse event signals'],
      },
      {
        title: 'Module 4: Labeling Documents (SmPC, PIL & US Package Insert)',
        topics: ['Cross-alignment with Section 2.5', 'Handling contraindications', 'Black box warning guidelines'],
      },
    ],
    deliverables: [
      'Sample QOS & Clinical Overview Written Portfolio',
      'Regulatory Writer’s Style Guide & Concordance Checklist',
      'Certificate of Course Completion',
    ],
  },
  {
    id: 'REG-CRS-104',
    title: 'Corporate GxP SOP Control & Data Integrity Compliance (21 CFR Part 11)',
    badge: 'Corporate Program',
    level: 'Corporate / Enterprise',
    targetAudience: 'Pharma Companies, CROs, QA/QC Departments, Manufacturing Facilities',
    duration: 'Custom (1 to 3 Days on-site or virtual)',
    format: 'Tailored Corporate Training',
    nextCohort: 'On-Demand / Flexible Dates',
    seatsAvailable: 99,
    shortDescription:
      'Customized enterprise program to train internal teams on standardizing SOP architectures, revision management, electronic signature audits, and inspection readiness.',
    modules: [
      {
        title: 'Module 1: SOP Hierarchy & Life-Cycle Governance',
        topics: ['Writing effective GxP work instructions', 'Version control matrices', 'Review logs'],
      },
      {
        title: 'Module 2: Document Change Control & Impact Analysis',
        topics: ['Assessing regulatory filing impact of manufacturing changes', 'ICH Q10 change management'],
      },
      {
        title: 'Module 3: 21 CFR Part 11 & EU Annex 11 Compliance',
        topics: ['Electronic signatures', 'Audit trails', 'Data integrity principles (ALCOA+)'],
      },
      {
        title: 'Module 4: Mock Inspection & Document Retrieval Drills',
        topics: ['Handling health authority auditors (FDA 483 prevention)', 'Rapid document retrieval protocols'],
      },
    ],
    deliverables: [
      'Corporate SOP Master Template Pack (RA, QA, PV)',
      'Internal Audit Checklist & Data Integrity Audit Kit',
      'Corporate Training Attendance Verification & Certificates',
    ],
  },
];

// Regulatory Quiz questions (Comprehensive 25-Question Assessment)
export const regulatoryQuizQuestions = [
  {
    id: 'q1',
    question: 'Under the ICH CTD hierarchy, which module contains the Quality Overall Summary (QOS)?',
    options: ['Module 1.2', 'Module 2.3', 'Module 3.2.S', 'Module 4.1'],
    correctIndex: 1,
    explanation: 'Module 2.3 contains the Quality Overall Summary (QOS), synthesizing the detailed CMC data from Module 3 into an executive evaluation for regulatory reviewers.',
  },
  {
    id: 'q2',
    question: 'Under US FDA regulations, how many calendar days does an Investigational New Drug (IND) application remain under safety review before human trials may proceed?',
    options: ['14 Days', '30 Calendar Days', '60 Business Days', '90 Days'],
    correctIndex: 1,
    explanation: 'Per 21 CFR 312.20, an IND goes into effect 30 calendar days after FDA receipt, unless the FDA issues a formal Clinical Hold.',
  },
  {
    id: 'q3',
    question: 'Which climatic zone conditions must stability studies satisfy for pharmaceutical registration in ASEAN markets (e.g. Malaysia, Singapore, Thailand)?',
    options: ['Zone I (21°C / 45% RH)', 'Zone II (25°C / 60% RH)', 'Zone IVa (30°C / 65% RH)', 'Zone IVb (30°C / 75% RH)'],
    correctIndex: 3,
    explanation: 'The ASEAN Common Technical Requirements mandate Zone IVb (30°C ± 2°C / 75% RH ± 5% RH) long-term real-time stability testing to account for tropical climates.',
  },
  {
    id: 'q4',
    question: 'In India, which schedule of the Drugs and Cosmetics Rules defines Good Manufacturing Practices (cGMP) that underwent major revision to align with WHO-TRS and PIC/S standards?',
    options: ['Schedule M', 'Schedule Y', 'Schedule M-III', 'Schedule K'],
    correctIndex: 0,
    explanation: 'Schedule M outlines Good Manufacturing Practices (GMP) and requirements of premises, plant, and equipment for pharmaceutical products in India.',
  },
  {
    id: 'q5',
    question: 'Under FDA 21 CFR Part 11, what is required for electronic records and signatures to be considered legally equivalent to paper records?',
    options: [
      'Simple PDF password protection',
      'Computerized system validation, secure computer-generated audit trails, authority checks, and human-readable copies',
      'Printed copies scanned at 300 DPI resolution',
      'Storage on any public unencrypted cloud drive',
    ],
    correctIndex: 1,
    explanation: '21 CFR Part 11 mandates formal system validation, time-stamped independent audit trails, operational controls, and secure electronic signature attribution.',
  },
  {
    id: 'q6',
    question: 'Under ICH Q1A(R2), what are the standard accelerated storage conditions for long-term room temperature drug substances and products?',
    options: [
      '25°C ± 2°C / 60% RH ± 5% RH',
      '30°C ± 2°C / 65% RH ± 5% RH',
      '40°C ± 2°C / 75% RH ± 5% RH',
      '50°C ± 2°C / 80% RH ± 5% RH',
    ],
    correctIndex: 2,
    explanation: 'ICH Q1A(R2) specifies accelerated testing conditions of 40°C ± 2°C / 75% RH ± 5% RH for a minimum duration of 6 months.',
  },
  {
    id: 'q7',
    question: 'In the US FDA regulatory framework, which statutory application route is used for an Abbreviated New Drug Application (generic drug) relying on an approved Reference Listed Drug (RLD)?',
    options: [
      'Section 505(b)(1) Full NDA',
      'Section 505(b)(2) Hybrid NDA',
      'Section 505(j) ANDA',
      'Section 351(k) Biosimilar BLA',
    ],
    correctIndex: 2,
    explanation: 'Section 505(j) of the FD&C Act governs Abbreviated New Drug Applications (ANDAs), requiring proof of pharmaceutical equivalence and bioequivalence to the RLD.',
  },
  {
    id: 'q8',
    question: 'What is the primary architectural difference between the ICH CTD dossier structure and the ACTD (ASEAN Common Technical Dossier)?',
    options: [
      'ICH CTD has 5 Modules, while ACTD is organized into 4 Parts with technical summaries integrated directly rather than a standalone Module 2',
      'ACTD requires 7 Modules including regional patent certifications',
      'ACTD omits clinical efficacy data entirely',
      'ICH CTD does not accept Module 3 CMC documentation',
    ],
    correctIndex: 0,
    explanation: 'The ACTD is organized into Part I (Administrative), Part II (Quality), Part III (Nonclinical), and Part IV (Clinical), embedding executive summaries within each part instead of a distinct Module 2.',
  },
  {
    id: 'q9',
    question: 'Under ICH M7 guidelines, what is the default Threshold of Toxicological Concern (TTC) for a mutagenic/DNA-reactive impurity in a drug intended for lifetime clinical administration?',
    options: ['0.15 µg/day', '1.5 µg/day', '15 µg/day', '150 µg/day'],
    correctIndex: 1,
    explanation: 'ICH M7 establishes a Threshold of Toxicological Concern (TTC) of 1.5 µg/day for most mutagenic impurities in pharmaceuticals intended for lifetime chronic administration, representing a 10^-5 excess cancer risk.',
  },
  {
    id: 'q10',
    question: 'In the European Union, which marketing authorization procedure is legally mandatory for biotechnology-derived medicines and Advanced Therapy Medicinal Products (ATMPs)?',
    options: [
      'National Procedure (NP)',
      'Mutual Recognition Procedure (MRP)',
      'Decentralised Procedure (DCP)',
      'Centralised Procedure (CP)',
    ],
    correctIndex: 3,
    explanation: 'Under EU Regulation (EC) No 726/2004, the Centralised Procedure evaluated by EMA is legally mandatory for all biotechnology medicines, orphan drugs, and ATMPs across all EU Member States.',
  },
  {
    id: 'q11',
    question: 'Which official FDA publication lists approved drug products with therapeutic equivalence evaluations, reference listed drugs (RLDs), and patent/exclusivity data?',
    options: [
      'The Pink Sheet',
      'The Orange Book (Approved Drug Products with Therapeutic Equivalence Evaluations)',
      'The Purple Book',
      'The Green Book',
    ],
    correctIndex: 1,
    explanation: 'The FDA Orange Book lists therapeutic equivalence ratings (such as "AB"), active patents, and marketing exclusivity periods for drug products approved under Section 505 of the FD&C Act.',
  },
  {
    id: 'q12',
    question: 'Which ICH guideline establishes the international standard structure and content for Clinical Study Reports (CSRs) submitted in Module 5?',
    options: ['ICH E3', 'ICH E6(R2)', 'ICH E8', 'ICH E9'],
    correctIndex: 0,
    explanation: 'ICH E3 defines the structure and content of Clinical Study Reports (CSRs) forming the core of Module 5 clinical trial documentation.',
  },
  {
    id: 'q13',
    question: 'In India, clinical trials for new drugs, investigational products, and ethics committees are governed by which comprehensive rules enacted in 2019?',
    options: [
      'Drugs and Cosmetics Act, Section 10',
      'New Drugs and Clinical Trials (NDCT) Rules, 2019',
      'Pharmacy Practice Regulations, 2015',
      'Medical Devices Rules, 1945',
    ],
    correctIndex: 1,
    explanation: 'The New Drugs and Clinical Trials (NDCT) Rules, 2019 comprehensively superseded Schedule Y to govern ethics committees, clinical trials, and new drug permissions in India.',
  },
  {
    id: 'q14',
    question: 'What is the primary function and significance of an FDA Form 483 issued at the conclusion of a pharmaceutical site inspection?',
    options: [
      'Immediate revocation of the manufacturing license',
      'A formal written notification of inspectional observations where investigators noted potential violations of cGMP',
      'Formal marketing authorization approval to commence commercial distribution',
      'A certificate of unrestricted cGMP compliance',
    ],
    correctIndex: 1,
    explanation: 'FDA Form 483 notifies company management of adverse conditions observed by FDA investigators during an inspection. The firm typically has 15 business days to submit a detailed written response.',
  },
  {
    id: 'q15',
    question: 'Under ICH Q9, what are the two primary principles of Quality Risk Management in pharmaceutical manufacturing?',
    options: [
      'Cost reduction and rapid market introduction',
      'Risk evaluation based on scientific knowledge linked to patient protection, and level of effort commensurate with the level of risk',
      'Mandatory 100% destructive testing of all finished batches and automated visual inspection',
      'Zero documentation discrepancies and daily internal audits',
    ],
    correctIndex: 1,
    explanation: 'ICH Q9 establishes that risk evaluations should be based on scientific knowledge ultimately linked to patient protection, with the level of effort, formality, and documentation commensurate with the level of risk.',
  },
  {
    id: 'q16',
    question: 'In eCTD dossier publishing, what electronic file format is universally mandated for narrative documents, study reports, and appendices?',
    options: [
      'Microsoft Word (.docx)',
      'PDF version 1.4 to 1.7 with embedded fonts, hyperlinking rules, and no security passwords',
      'Rich Text Format (.rtf)',
      'Raw unformatted HTML5',
    ],
    correctIndex: 1,
    explanation: 'eCTD specifications mandate PDF files (v1.4 to v1.7) formatted with embedded fonts, hyperlinking rules, fast web view optimization, and no security encryption passwords.',
  },
  {
    id: 'q17',
    question: 'Which ICH guideline establishes international standards and qualification thresholds for degradation products / impurities in finished drug products?',
    options: ['ICH Q1A', 'ICH Q3B(R2)', 'ICH Q6A', 'ICH Q8(R2)'],
    correctIndex: 1,
    explanation: 'ICH Q3B(R2) addresses degradation products in new drug products, setting specific thresholds based on maximum daily dose for reporting, identification, and qualification.',
  },
  {
    id: 'q18',
    question: 'Under the EU Clinical Trials Regulation (CTR EU No 536/2014), which single-window digital portal is mandatory for all clinical trial submissions and lifecycle management across EU/EEA?',
    options: [
      'EudraVigilance',
      'CTIS (Clinical Trials Information System)',
      'CESP (Common European Submission Platform)',
      'EudraGMDP',
    ],
    correctIndex: 1,
    explanation: 'CTIS is the single entry point for sponsors and regulators in the EU/EEA for the submission, assessment, and reporting of clinical trial data under the Clinical Trials Regulation.',
  },
  {
    id: 'q19',
    question: 'Under the US FDA Prescription Drug User Fee Act (PDUFA), what are the standard target review timelines for a Standard NDA versus a Priority Review NDA?',
    options: [
      'Standard: 10 Months; Priority: 6 Months',
      'Standard: 12 Months; Priority: 3 Months',
      'Standard: 6 Months; Priority: 2 Months',
      'Standard: 18 Months; Priority: 12 Months',
    ],
    correctIndex: 0,
    explanation: 'Under PDUFA, standard NDA reviews have a 10-month target timeline from filing, while Priority Review applications targeting serious conditions or unmet medical needs target a 6-month timeline.',
  },
  {
    id: 'q20',
    question: 'What confidential chemistry, manufacturing, and controls (CMC) information is typically submitted under a Type II Drug Master File (DMF) to the US FDA?',
    options: [
      'Manufacturing site environmental impact assessments and operating personnel logs',
      'Drug Substance, Drug Substance Intermediate, and Material used in their preparation, or Drug Product',
      'Primary packaging materials and container-closure integrity data only',
      'Nonclinical toxicology and animal pharmacology data',
    ],
    correctIndex: 1,
    explanation: 'Type II DMFs contain confidential proprietary CMC information regarding the Drug Substance, intermediate, or Drug Product, allowing sponsors to reference it via a Letter of Authorization (LOA).',
  },
  {
    id: 'q21',
    question: 'In India, which digital portal launched by the CDSCO serves as the primary online gateway for filing import licenses, registration certificates, and clinical trial clearances?',
    options: ['E-Sanjeevani', 'SUGAM Portal', 'Ayushman Digital Gateway', 'PharmaSahi Portal'],
    correctIndex: 1,
    explanation: 'The CDSCO SUGAM online portal enables applicants to submit applications for import registrations (Form 40/Form 10), new drug permissions, and clinical trial approvals electronically.',
  },
  {
    id: 'q22',
    question: 'According to US FDA and WHO regulatory standards, what is the accepted statistical criterion for establishing Bioequivalence (BE) between a generic and reference formulation?',
    options: [
      'The 90% confidence intervals for the geometric mean ratios of AUC and Cmax must fall within 80.00% to 125.00%',
      'The generic and reference formulations must have identical physical tablet shape and color',
      'The in-vitro dissolution profiles must match 100.0% within the first 5 minutes in all buffers',
      'Both products must be manufactured using the same brand of tablet compression machine',
    ],
    correctIndex: 0,
    explanation: 'Bioequivalence requires that the 90% confidence intervals for AUC and Cmax geometric mean ratios fall within the standard bioequivalence acceptance limits of 80.00% to 125.00%.',
  },
  {
    id: 'q23',
    question: 'Under the fundamental ALCOA+ data integrity framework enforced by FDA, MHRA, and WHO, what do the core letters A-L-C-O-A stand for?',
    options: [
      'Accurate, Legible, Contemporaneous, Original, Attributable',
      'Attributable, Legible, Contemporaneous, Original, Accurate',
      'Automated, Linear, Controlled, Operational, Audited',
      'Authorized, Locked, Certified, Organized, Archived',
    ],
    correctIndex: 1,
    explanation: 'ALCOA defines data integrity: Attributable (who created it), Legible (readable), Contemporaneous (recorded at time of execution), Original (first recording), and Accurate (free of errors). Plus (+) adds complete, consistent, enduring, and available.',
  },
  {
    id: 'q24',
    question: 'Within Module 3 (Quality) of the ICH CTD dossier, which specific sections are designated for the Characterisation and Control of the Drug Substance?',
    options: ['3.2.S.1.1 and 3.2.S.1.2', '3.2.S.3 and 3.2.S.4', '3.2.P.1 and 3.2.P.2', '3.2.A.1 and 3.2.A.2'],
    correctIndex: 1,
    explanation: 'In Module 3, section 3.2.S.3 covers Characterisation (elucidation of chemical structure and potential impurities) and 3.2.S.4 covers Control of Drug Substance (specifications, analytical procedures, and validation).',
  },
  {
    id: 'q25',
    question: 'Under European Union pharmaceutical legislation (Directive 2001/83/EC), what is the mandatory legal obligation of a Qualified Person (QP)?',
    options: [
      'Directing commercial marketing strategies and consumer price positioning',
      'Personally certifying that each commercial production batch has been manufactured and tested in accordance with EU GMP and the approved Marketing Authorisation prior to batch release',
      'Directly recruiting clinical trial patients across EU investigational sites',
      'Submitting annual tax statements to the European Commission',
    ],
    correctIndex: 1,
    explanation: 'The Qualified Person (QP) carries personal legal responsibility in the EU to verify and certify that each batch of medicinal product meets EU GMP standards and conforms to the approved Marketing Authorisation prior to commercial distribution.',
  },
];

const memoryRegistrations = [];

// GET: Course catalogue
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: coursesCatalog.length,
    courses: coursesCatalog,
  });
});

// GET: Specific course details
router.get('/:courseId', (req, res) => {
  const course = coursesCatalog.find((c) => c.id === req.params.courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, course });
});

// GET: Regulatory quiz questions
router.get('/quiz/questions', (req, res) => {
  // Return questions without disclosing correctIndex in the initial question payload
  const publicQuestions = regulatoryQuizQuestions.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }));
  res.json({ success: true, questions: publicQuestions });
});

// POST: Grade quiz
router.post('/quiz/grade', (req, res) => {
  try {
    const { userAnswers = {} } = req.body; // { q1: 1, q2: 1 ... }
    let correctCount = 0;
    const review = [];

    regulatoryQuizQuestions.forEach((q) => {
      const selectedOption = userAnswers[q.id];
      const isCorrect = selectedOption === q.correctIndex;
      if (isCorrect) correctCount++;
      review.push({
        id: q.id,
        question: q.question,
        userAnswer: selectedOption !== undefined ? q.options[selectedOption] : 'Not Answered',
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation,
      });
    });

    const scorePercentage = Math.round((correctCount / regulatoryQuizQuestions.length) * 100);

    res.json({
      success: true,
      score: scorePercentage,
      correctCount,
      totalQuestions: regulatoryQuizQuestions.length,
      passed: scorePercentage >= 60,
      review,
      message:
        scorePercentage >= 80
          ? 'Exceptional regulatory proficiency! You demonstrate high readiness for eCTD dossier leadership.'
          : scorePercentage >= 60
          ? 'Good regulatory foundation. You would benefit from our Masterclass in eCTD Publishing & Harmonization.'
          : 'Fundamental gaps identified. We recommend starting with our CTD Fundamentals & Global Standards training.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Course enrollment / registration with simulated payment option
router.post('/register', (req, res) => {
  try {
    const {
      courseId,
      attendeeName,
      email,
      phone,
      companyOrInstitute,
      attendeeType = 'Working Professional',
      attendeeCount = 1,
      paymentMethod = 'Test Card (Simulation)',
      trainingMode = 'Live Virtual Workshop',
    } = req.body;

    if (!courseId || !attendeeName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Course selection, name, and email are required.',
      });
    }

    const course = coursesCatalog.find((c) => c.id === courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Invalid course ID.' });
    }

    const registrationId = `REG-EDU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const registrationData = {
      registrationId,
      courseId,
      courseTitle: course.title,
      attendeeName,
      email: email.toLowerCase().trim(),
      phone,
      companyOrInstitute: companyOrInstitute || 'Individual Learner',
      attendeeType,
      attendeeCount: Number(attendeeCount) || 1,
      paymentMethod: paymentMethod || 'Direct Enrollment',
      paymentStatus: 'Confirmed / Active',
      trainingMode,
      certificateDisclaimer:
        'Upon successful attendance and coursework completion, candidate will receive a Certificate of Course Completion. This certificate documents continuing professional education and is not an accredited university degree or official health authority credential.',
      registeredAt: new Date(),
    };

    memoryRegistrations.unshift(registrationData);

    res.status(201).json({
      success: true,
      message: 'Course registration processed successfully.',
      registrationId,
      registration: registrationData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: All registrations (for Admin)
router.get('/registrations/all', (req, res) => {
  res.json({
    success: true,
    count: memoryRegistrations.length,
    registrations: memoryRegistrations,
  });
});

export default router;
