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
    priceUsd: 495,
    priceInr: 38500,
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
    priceUsd: 590,
    priceInr: 45000,
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
    priceUsd: 380,
    priceInr: 29500,
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
    priceUsd: 1400,
    priceInr: 110000,
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

// Regulatory Quiz questions
export const regulatoryQuizQuestions = [
  {
    id: 'q1',
    question: 'Under the ICH CTD hierarchy, which module contains the Quality Overall Summary (QOS)?',
    options: ['Module 1.2', 'Module 2.3', 'Module 3.2.S', 'Module 4.1'],
    correctIndex: 1,
    explanation: 'Module 2.3 represents the Quality Overall Summary (QOS), synthesizing the detailed CMC data from Module 3.',
  },
  {
    id: 'q2',
    question: 'Under US FDA regulations, how many calendar days does an Investigational New Drug (IND) application remain under safety review before human trials may proceed?',
    options: ['14 Days', '30 Calendar Days', '60 Business Days', '90 Days'],
    correctIndex: 1,
    explanation: 'Per 21 CFR 312.20, an IND goes into effect 30 calendar days after the FDA receives it, unless a Clinical Hold is issued.',
  },
  {
    id: 'q3',
    question: 'Which climatic zone conditions must stability studies satisfy for pharmaceutical registration in ASEAN markets (e.g. Malaysia, Singapore)?',
    options: ['Zone I (21°C / 45% RH)', 'Zone II (25°C / 60% RH)', 'Zone IVa (30°C / 65% RH)', 'Zone IVb (30°C / 75% RH)'],
    correctIndex: 3,
    explanation: 'The ASEAN Common Technical Requirements mandate Zone IVb (30°C / 75% RH) real-time stability data due to high humidity and temperature in tropical regions.',
  },
  {
    id: 'q4',
    question: 'In India, which schedule of the Drugs and Cosmetics Rules defines the Good Manufacturing Practices (cGMP) that underwent major revision recently?',
    options: ['Schedule M', 'Schedule Y', 'Schedule M-III', 'Schedule K'],
    correctIndex: 0,
    explanation: 'Schedule M outlines Good Manufacturing Practices (GMP) in India, which was revised to harmonize with WHO-TRS and PIC/S standards.',
  },
  {
    id: 'q5',
    question: 'Under FDA 21 CFR Part 11, what is required for electronic records to be considered equivalent to paper records?',
    options: [
      'Simple PDF conversion with password protection',
      'Computerized validation, secure audit trails, authority checks, and human readable copies',
      'Printed copies scanned at 300 DPI',
      'Storage on any public cloud server',
    ],
    correctIndex: 1,
    explanation: '21 CFR Part 11 mandates system validation, continuous automated audit trails, operational controls, and secure electronic signatures.',
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
      totalAmountUsd: course.priceUsd * (Number(attendeeCount) || 1),
      paymentMethod,
      paymentStatus: paymentMethod.includes('Test') ? 'Simulated / Test Passed' : 'Invoice Requested',
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
