import express from 'express';

const router = express.Router();

// Academic schemes & universities metadata
export const UNIVERSITIES_METADATA = [
  {
    id: 'pci-uniform',
    name: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Master Syllabus for M.Pharm Regulatory Affairs (Regulations 2014/2021)',
    description: 'Statutory national standardized curriculum adopted across central, state, and private pharmacy institutions in India.',
    state: 'National / All India',
  },
  {
    id: 'rguhs',
    name: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4 (M.Pharm Drug Regulatory Affairs)',
    description: 'Karnataka State Health Sciences University curriculum with specific sessional exam structures and research review milestones.',
    state: 'Karnataka',
  },
  {
    id: 'jntu',
    name: 'Jawaharlal Nehru Technological University (JNTU)',
    scheme: 'JNTUH / JNTUK R21/R23 Academic Regulations (M.Pharm RA)',
    description: 'Telangana & Andhra Pradesh technical university scheme featuring choice-based credit systems and industrial regulatory projects.',
    state: 'Telangana / Andhra Pradesh',
  },
  {
    id: 'sppu',
    name: 'Savitribai Phule Pune University (SPPU)',
    scheme: 'SPPU Faculty of Medicine & Pharmacy CBCS Pattern',
    description: 'Maharashtra university curriculum with emphasis on industrial GxP compliance and European submission dossiers.',
    state: 'Maharashtra',
  },
  {
    id: 'niper',
    name: 'NIPER (National Institute of Pharm. Education & Research)',
    scheme: 'NIPER Autonomous M.S. (Pharm.) Regulatory Toxicology / Regulatory Affairs',
    description: 'Institute of National Importance autonomous curriculum focusing on advanced biologicals, drug discovery policy, and OECD GLP.',
    state: 'National Institutes',
  },
  {
    id: 'jamia-hamdard',
    name: 'Jamia Hamdard University (Deemed to be University)',
    scheme: 'Jamia Hamdard School of Pharmaceutical Education & Research (SPER) Scheme',
    description: 'Specialized curriculum emphasizing herbal/phytopharmaceutical regulations, pharmacovigilance, and AYUSH regulatory gateways.',
    state: 'New Delhi',
  },
];

// In-memory persistent collection initialized with pre-seeded comprehensive records
let mpharmResources = [
  // 1. SYLLABUS
  {
    id: 'RES-SYL-101',
    title: 'PCI Uniform Syllabus: M.Pharm Regulatory Affairs (Semester I–IV Complete)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI M.Pharm (DRA) Regulations 2014/2021',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I to V',
    topic: 'Course Curriculum, Credit Distribution & Scheme of Examination',
    resourceType: 'Semester-wise Syllabus',
    marksCategory: 'All',
    uploadDate: '2026-08-15',
    author: 'ReguSphere Academic Board',
    content: `
### Pharmacy Council of India (PCI) — Master of Pharmacy (Regulatory Affairs)
**Course Code:** MRA 101T | **Subject:** Good Regulatory Practices (4 Hours/Week - 4 Credits)

#### Detailed Syllabus Breakdown:
- **Unit I (12 Hours): Good Regulatory Practices (GRP)**
  * Definition, scope, and basic principles of GRP per WHO guidelines.
  * Role of international organizations: WHO, WTO, WIPO, ICH.
  * Harmonization initiatives, mutual reliance and work-sharing frameworks among health authorities.
- **Unit II (12 Hours): Good Manufacturing Practices (cGMP)**
  * Basic principles, facility layout, environmental classification (ISO 14644 / EU Annex 1).
  * Quality Control and Quality Assurance duties.
  * Revised Schedule M (India) compliance vs US 21 CFR Part 210/211 and EU GMP Volume 4.
- **Unit III (12 Hours): Good Laboratory Practice (GLP) & Good Clinical Practice (GCP)**
  * OECD GLP Principles, 21 CFR Part 58, role of Study Director and Quality Assurance Unit (QAU).
  * ICH E6(R2/R3) GCP guidelines, institutional ethics committee (IEC), informed consent process, investigator responsibilities.
- **Unit IV (12 Hours): Good Distribution Practice (GDP) & Pharmacovigilance (GVP)**
  * WHO GDP standards for transit, cold chain maintenance (2–8°C), serialization and traceability.
  * Good Pharmacovigilance Practices (GVP Module I–XVI), ADR reporting timelines, PSUR/PBRER requirements.
- **Unit V (12 Hours): Regulatory Audits & Quality Risk Management**
  * Inspection triggers (routine, for-cause, pre-approval inspection PAI).
  * ICH Q9 Quality Risk Management principles, FMEA, CAPA design and audit close-out protocols.
    `,
    fileUrl: '/uploads/academic/pci-mpharm-ra-complete-syllabus.pdf',
    downloadAvailable: true,
  },

  // 2. SUBJECT-WISE STUDY MATERIAL
  {
    id: 'RES-MAT-102',
    title: 'Documentation and Regulatory Writing: Comprehensive Study Deck',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Documentation and Regulatory Writing (MRA 102T)',
    unit: 'Unit I & II',
    topic: 'Master Formula Records (MFR), Batch Manufacturing Records (BMR) & SOP Systems',
    resourceType: 'Subject-wise Study Materials',
    marksCategory: 'All',
    uploadDate: '2026-09-01',
    author: 'Prof. A. K. Kulkarni, M.Pharm RAC',
    content: `
### Module Focus: Technical Pharmaceutical Documentation
This study deck provides comprehensive pedagogical coverage of industrial manufacturing documents required by health authorities during site licensing and pre-approval inspections.

#### Key Document Architectures:
1. **Master Formula Record (MFR):**
   - Authoritative master document created by R&D/Tech Transfer specifying batch size, active and inactive excipients, theoretical yields, critical process parameters (CPPs), and in-process control (IPC) acceptance limits.
2. **Batch Manufacturing Record (BMR) & Batch Packaging Record (BPR):**
   - Executable, uniquely numbered shop-floor records documenting step-by-step execution, contemporaneous sign-offs, reconciliation percentages, and line clearance verification per cGMP.
3. **Site Master File (SMF):**
   - Prepared according to PIC/S PE 008 guidelines; 25–30 page document outlining manufacturing policies, facility footprints, water generation capacities, HVAC layouts, and quality management hierarchies.
    `,
    fileUrl: '/uploads/academic/mra102t-documentation-study-deck.pdf',
    downloadAvailable: true,
  },

  // 3. UNIT-WISE NOTES
  {
    id: 'RES-NOT-103',
    title: 'Unit II Notes: Investigational New Drug (IND) & New Drugs and Clinical Trials Rules 2019',
    university: 'rguhs',
    universityName: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4',
    semester: 'Semester I',
    subject: 'Clinical Research Regulations (MRA 103T)',
    unit: 'Unit II',
    topic: 'Indian Clinical Trial Regulatory Pathways & Ethics Committee Approvals',
    resourceType: 'Unit-wise Notes and Explanations',
    marksCategory: 'All',
    uploadDate: '2026-09-12',
    author: 'Dr. Eleanor Vance, RAC',
    content: `
### RGUHS Semester I — Unit II Detailed Notes: NDCTR 2019
The **New Drugs and Clinical Trials Rules (NDCTR), 2019** replaced Schedule Y of the Drugs and Cosmetics Rules, 1945, modernizing clinical trial authorizations in India.

#### Statutory Timelines for Clinical Trial Applications:
- **Drugs discovered and manufactured in India:** CDSCO decision timeline is **30 working days**. If no communication is received from the Central Licensing Authority (CLA), permission is deemed granted.
- **Drugs developed outside India:** CDSCO decision timeline is **90 working days**.
- **Form CT-04:** Application for permission to conduct clinical trials for new drug/investigational new drug.
- **Form CT-06:** Official grant of permission to conduct clinical trials.

#### Ethics Committee (EC) Statutory Governance:
- EC registration with CDSCO is mandatory under Rule 7; validity is **5 years**.
- Composition: Minimum 7 members (Clinicians, Pharmacologists, Legal expert, Social scientist/Philosopher, and Lay person).
- Quorum requirement: Minimum 5 members including at least one non-scientific member and one independent member unaffiliated with the trial site.
    `,
    fileUrl: '/uploads/academic/unit-2-ndctr-2019-study-notes.pdf',
    downloadAvailable: true,
  },

  // 4. SHORT-ANSWER QUESTIONS (2 MARKS)
  {
    id: 'RES-Q2-201',
    title: 'Essential 2-Mark Question Bank with Model Answers (Part 1)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I & II',
    topic: 'Definitions, Acronyms & Short Statutory Queries',
    resourceType: 'Short-answer questions (2 marks)',
    marksCategory: '2 Marks',
    uploadDate: '2026-09-20',
    author: 'ReguSphere Exam Cell',
    content: `
### 2-Mark Short Answer Examination Questions & Model Answers:

**Q1: Define Good Regulatory Practices (GRP).**
*Model Answer:* Good Regulatory Practices (GRP) are internationally recognized principles, tools, and procedures applied by governments and regulatory authorities to develop, implement, and review regulations to achieve public health goals through transparency, consistency, scientific evidence, and legal clarity.

**Q2: What is ALCOA+ in data integrity?**
*Model Answer:* ALCOA+ stands for Attributable, Legible, Contemporaneous, Original, and Accurate. The "+" extension includes Complete, Consistent, Enduring, and Available. It represents the global cGMP standard for electronic and paper data governance.

**Q3: State the statutory difference between Form 25 and Form 28 in India.**
*Model Answer:* Form 25 is a manufacturing license for drugs other than those specified in Schedules C, C(1), and X (non-biologicals/standard formulations). Form 28 is for manufacturing biological and special products specified in Schedules C and C(1) such as vaccines, sera, and parenterals.

**Q4: Expand and define SUSAR.**
*Model Answer:* SUSAR stands for Suspected Unexpected Serious Adverse Reaction. It is an adverse reaction during a clinical trial that is serious (causing death, hospitalization, or disability) and not listed in the Investigator's Brochure, requiring expedited 7- or 15-day reporting to regulatory authorities.

**Q5: What is the significance of the Hatch-Waxman Act of 1984?**
*Model Answer:* Officially the Drug Price Competition and Patent Term Restoration Act, it created the modern generic drug approval pathway (ANDA under section 505(j)) using bioequivalence instead of repeating clinical trials, while providing patent term extensions for originator innovations.
    `,
    fileUrl: '/uploads/academic/2-mark-question-bank-mra101t.pdf',
    downloadAvailable: true,
  },

  // 5. MEDIUM-ANSWER QUESTIONS (5 MARKS)
  {
    id: 'RES-Q5-202',
    title: '5-Mark Analytical & Procedural Questions with Model Answers',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit II & III',
    topic: 'Comparative Analyses & Statutory Protocols',
    resourceType: 'Medium-answer questions (5 marks)',
    marksCategory: '5 Marks',
    uploadDate: '2026-09-25',
    author: 'ReguSphere Exam Cell',
    content: `
### 5-Mark Question 1: Differentiate between US FDA Pre-Approval Inspection (PAI) and Routine cGMP Surveillance Inspection.

#### Model Structured Answer (Full 5/5 Marks Template):
| Parameter | Pre-Approval Inspection (PAI) | Routine Surveillance Inspection |
| :--- | :--- | :--- |
| **Primary Trigger** | Submission of an NDA, BLA, or ANDA prior to commercial approval. | Statutory inspection cycle (mandated every 2 years by US FDA). |
| **Core Objective** | Verify accuracy of submitted application data and facility readiness to produce commercial scale. | Verify ongoing compliance with 21 CFR Part 210/211 across all approved products. |
| **Focus Areas** | Analytical method transfer, bio-batch manufacturing integrity, process validation feasibility. | Quality management system, environmental monitoring, stability programs, CAPA, OOS. |
| **Outcome Impact** | If deficient, results in "Withhold Approval" recommendation to CDER review division. | May result in Form FDA 483 observations, Warning Letter, or Import Alert. |

---

### 5-Mark Question 2: Explain the roles and responsibilities of the Study Director under OECD Good Laboratory Practice (GLP).

#### Model Structured Answer:
Under 21 CFR Part 58 and OECD GLP:
1. The Study Director has single-point control and responsibility for the overall scientific conduct of non-clinical safety studies.
2. Approves the study protocol, ensuring it complies with GLP before dosing initiates.
3. Ensures all personnel have documented training, CVs, and standard operating procedures (SOPs).
4. Verifies that test, control, and reference substances are properly characterized and logged.
5. Reviews and signs the final study report, certifying that raw data accurately reflects findings and verifying whether GLP deviations occurred.
    `,
    fileUrl: '/uploads/academic/5-mark-analytical-questions.pdf',
    downloadAvailable: true,
  },

  // 6. LONG-ANSWER QUESTIONS (10 MARKS)
  {
    id: 'RES-Q10-203',
    title: '10-Mark Comprehensive Essay Questions with Complete Model Answers',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Documentation and Regulatory Writing (MRA 102T)',
    unit: 'Unit III',
    topic: 'ICH CTD Granularity & Module 3 CMC Architecture',
    resourceType: 'Long-answer questions (10 marks)',
    marksCategory: '10 Marks',
    uploadDate: '2026-10-02',
    author: 'Dr. Eleanor Vance, RAC & Aarav Nair',
    content: `
### 10-Mark Question: Describe in detail the architecture of the ICH Common Technical Document (CTD). Discuss the contents of Module 3 (Quality / CMC) with particular emphasis on 3.2.S (Drug Substance) and 3.2.P (Drug Product).

#### Model Structured 10-Mark Answer:

### 1. Introduction & Background (2 Marks):
The ICH M4 guideline harmonized regulatory submission dossiers into a standard five-module pyramid across the US FDA, EMA, Health Canada, CDSCO, and PMDA. It eliminated redundant reformulations of marketing authorization applications.

### 2. The 5 Modules of CTD (2 Marks):
- **Module 1 (Regional Administrative):** Non-harmonized; includes application forms (FDA 356h / EU application form), user fees, draft labelling, and regional environmental assessments.
- **Module 2 (CTD Overviews and Summaries):**
  * 2.1 TOC | 2.2 Introduction | 2.3 Quality Overall Summary (QOS)
  * 2.4 Non-clinical Overview | 2.5 Clinical Overview | 2.6/2.7 Detailed Summaries
- **Module 3 (Quality):** Comprehensive Chemistry, Manufacturing, and Controls (CMC).
- **Module 4 (Non-clinical Study Reports):** Pharmacology, PK, and Toxicology reports.
- **Module 5 (Clinical Study Reports):** BA/BE and Phase I–IV clinical study reports (ICH E3).

### 3. Detailed Structure of Module 3 (CMC) (4 Marks):

#### Part 3.2.S — Drug Substance (Active Pharmaceutical Ingredient - API):
- **3.2.S.1 General Information:** Nomenclature, IUPAC name, structural formula, molecular weight, physicochemical properties (solubility, polymorphism, pKa).
- **3.2.S.2 Manufacture:** Manufacturer details, synthetic route flowchart, starting materials qualification, critical process parameters (CPPs), and process validation.
- **3.2.S.3 Characterization:** Proof of structure (NMR, FTIR, MS, XRD), impurity profiling (organic, inorganic, residual solvents per ICH Q3C, elemental per ICH Q3D, and mutagenic nitrosamines per ICH M7).
- **3.2.S.4 Control of Drug Substance:** Specification parameters, analytical procedures, validation reports (ICH Q2), and batch analyses (minimum 3 batches).
- **3.2.S.5 Reference Standards:** Primary and secondary reference materials.
- **3.2.S.6 Container Closure System:** Packaging materials, moisture and light barriers.
- **3.2.S.7 Stability:** Long-term and accelerated testing per ICH Q1A(R2) with post-approval stability protocol.

#### Part 3.2.P — Drug Product (Finished Dosage Form):
- **3.2.P.1 Description and Composition:** Quantitative formulation, function of excipients.
- **3.2.P.2 Pharmaceutical Development:** Quality by Design (QbD) per ICH Q8, Critical Quality Attributes (CQAs), dissolution method development, overages justification.
- **3.2.P.3 Manufacture:** Manufacturing formula, master production instructions, critical steps, and validation protocol.
- **3.2.P.4 Control of Excipients:** Pharmacopoeial specifications (USP/NF, Ph.Eur, IP), novel excipients safety justification.
- **3.2.P.5 Control of Drug Product:** Release and shelf-life specifications, analytical method validation, degradation product tracking.
- **3.2.P.7 Container Closure:** Primary blister/vial compatibility and extractables/leachables data.
- **3.2.P.8 Stability:** 12-month long-term stability data, photostability (ICH Q1B), shelf-life assignment.

### 4. Conclusion & eCTD Integration (2 Marks):
Module 3 forms the technical backbone of electronic submissions. In eCTD v3.2.2 and v4.0, every section is indexed with a leaf XML identifier allowing lifecycle operations (New, Replace, Delete) over the product's post-approval lifespan.
    `,
    fileUrl: '/uploads/academic/10-mark-ich-ctd-module3-model-answer.pdf',
    downloadAvailable: true,
  },

  // 7. PREVIOUS EXAMINATION QUESTION PAPERS
  {
    id: 'RES-PQP-301',
    title: 'RGUHS University Past Examination Question Paper (Winter Session 2025)',
    university: 'rguhs',
    universityName: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I to V',
    topic: 'Official Annual University Examination Paper with Question Distribution Analysis',
    resourceType: 'Previous examination question papers',
    marksCategory: 'All',
    uploadDate: '2026-02-15',
    author: 'RGUHS Examination Authority / Verified Academic Repository',
    content: `
### RGUHS M.Pharm (DRA) Annual Examination Paper — MRA 101T
**Time:** 3 Hours | **Maximum Marks:** 75 Marks

#### Section A — Long Essay Questions (Answer any 2 out of 3 — 2 x 10 = 20 Marks):
1. Explain the organization, principles, and implementation of the revised Schedule M (cGMP) in India. Contrast with US FDA 21 CFR 211.
2. Discuss in detail the OECD principles of Good Laboratory Practice. Detail the duties of the Study Director and Quality Assurance Unit.
3. Elaborate on WHO Good Regulatory Practices (GRP) for national regulatory authorities. Discuss mutual reliance and work-sharing mechanisms.

#### Section B — Short Essay Questions (Answer any 5 out of 7 — 5 x 7 = 35 Marks):
4. Explain the requirements and procedures for bio-batch manufacturing during pre-approval inspections.
5. Describe the principles of Quality Risk Management (QRM) as outlined in ICH Q9.
6. Detail the regulatory requirements for cold chain distribution under Good Distribution Practices (GDP).
7. Explain the composition, quorum, and functioning of an Institutional Ethics Committee under NDCTR 2019.
8. What is ALCOA+? Discuss common data integrity citations issued during US FDA inspections.
9. Explain the steps in conducting a self-inspection (internal audit) in a GxP facility.
10. Describe the requirements for environmental monitoring in cleanrooms per ISO 14644.

#### Section C — Short Answers (10 x 2 = 20 Marks):
11. Define GRP per WHO guidelines.
12. What is Form 25 and Form 28?
13. Expand and define SUSAR.
14. What is the role of a Qualified Person (QP) in Europe?
15. Define Out of Specification (OOS).
16. Name four climatic zones recognized by ICH Q1A.
17. What is an import alert?
18. Define CAPA.
19. Expand CTIS and explain its purpose in the EU.
20. Mention two triggers for a "For-Cause" regulatory inspection.
    `,
    fileUrl: '/uploads/academic/rguhs-winter-2025-mra101t-exam-paper.pdf',
    downloadAvailable: true,
  },

  // 8. SEMINAR TOPICS & PRESENTATION MATERIALS
  {
    id: 'RES-SEM-401',
    title: 'M.Pharm Seminar Deck: Transition from eCTD v3.2.2 to eCTD v4.0 (HL7 FHIR & RPS)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester II',
    subject: 'Global Regulatory Strategy (MRA 204T)',
    unit: 'Unit II',
    topic: 'Emerging Standards in Electronic Submissions & Digital Health Authority Gateways',
    resourceType: 'Seminar topics and presentation materials',
    marksCategory: 'All',
    uploadDate: '2026-10-15',
    author: 'Aarav Nair & Prof. S. Kalyanshetti',
    content: `
### Ready-to-Present M.Pharm Seminar Package
**Seminar Title:** Next-Generation Regulatory Submissions: Transition from eCTD v3.2.2 to eCTD v4.0 Based on HL7 FHIR Standards

#### Presentation Slide Outline (20 Slides):
- **Slide 1–3:** Historical evolution of eCTD (Paper -> NEES -> eCTD v3.2.2 -> v4.0).
- **Slide 4–7:** Limitations of v3.2.2 (Rigid DTD, heavy manual lifecycle tracking, regional XML divergence).
- **Slide 8–12:** Key technical features of eCTD v4.0 (HL7 Regulated Product Submission - RPS, XML messages, context of use reuse, two-way agency communication).
- **Slide 13–16:** Implementation timelines across FDA, EMA, and PMDA.
- **Slide 17–19:** Impact on pharmaceutical sponsors: RIM system upgrades, change control, and metadata governance.
- **Slide 20:** Conclusion, Q&A defense prompts, and bibliographic references.
    `,
    fileUrl: '/uploads/academic/seminar-deck-ectd-v4-transition.pptx',
    downloadAvailable: true,
  },

  // 9. ASSIGNMENT PREPARATION RESOURCES
  {
    id: 'RES-ASG-501',
    title: 'Comparative Assignment Guide: US FDA 505(b)(1), 505(b)(2) & 505(j) Pathways',
    university: 'jntu',
    universityName: 'Jawaharlal Nehru Technological University (JNTU)',
    scheme: 'JNTUH R21 Academic Regulations',
    semester: 'Semester II',
    subject: 'Regulatory Aspects of Drugs & Cosmetics (MRA 201T)',
    unit: 'Unit I',
    topic: 'Detailed Regulatory Mapping, Case Precedents & Flowcharts',
    resourceType: 'Assignment preparation resources',
    marksCategory: 'All',
    uploadDate: '2026-10-22',
    author: 'JNTU Academic Mentorship Cell',
    content: `
### Assignment Brief & Submission Model:
**Assignment Question:** Construct a critical comparative review of statutory application pathways available under Section 505 of the US Federal Food, Drug, and Cosmetic Act. Provide case studies for each pathway.

#### Core Analysis Framework Included:
1. **Section 505(b)(1) — Standalone NDA:** Full safety and efficacy dossier where all studies are owned or licensed by sponsor.
2. **Section 505(b)(2) — Hybrid Paper NDA:** Relies on FDA’s previous safety findings for reference listed drugs (RLDs) or published literature; permits changes in dosage form, route, or indication.
3. **Section 505(j) — Abbreviated New Drug Application (ANDA):** Generic drugs demonstrating chemical identity, strength, route, and bioequivalence (90% CI between 80.00% and 125.00%).
    `,
    fileUrl: '/uploads/academic/assignment-guide-us-fda-pathways.pdf',
    downloadAvailable: true,
  },

  // 10. RESEARCH METHODOLOGY & PROJECT GUIDANCE
  {
    id: 'RES-RES-601',
    title: 'M.Pharm Regulatory Affairs Dissertation & Research Project Protocol Guide',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester III & IV',
    subject: 'Research Methodology and Biostatistics (MRM 301T)',
    unit: 'Dissertation Guidance',
    topic: 'Formulating RA Research Titles, Questionnaire Design, Patent Landscaping & Statistical Testing',
    resourceType: 'Research methodology and project guidance',
    marksCategory: 'All',
    uploadDate: '2026-10-28',
    author: 'Dr. Marcus Holloway & ReguSphere Research Panel',
    content: `
### M.Pharm Regulatory Affairs Thesis & Dissertation Manual:
Unlike wet-lab formulation projects, Regulatory Affairs dissertations focus on comparative regulatory intelligence, policy evaluation, gap assessments, nitrosamine risk assessments, or clinical data modeling.

#### Approved Thesis Topic Domains:
1. Harmonization analysis of biosimilar regulatory pathways across USA, EU, India, and ASEAN.
2. Post-approval lifecycle variations impact: Quantitative assessment of approval timelines under ICH Q12.
3. Data integrity deficiencies: A 10-year retrospective analysis of US FDA Form 483s and Warning Letters issued to Asian manufacturers.
4. Regulatory roadmap for Artificial Intelligence / Machine Learning enabled Software as a Medical Device (SaMD).

#### Step-by-Step Research Methodology:
- **Phase 1 (Months 1–3):** Literature review, patent landscape, and hypothesis formulation.
- **Phase 2 (Months 4–7):** Data mining via open health authority databases (FDA Drugs@FDA, EMA EPAR, CDSCO SUGAM, ClinicalTrials.gov).
- **Phase 3 (Months 8–10):** Statistical evaluation (Chi-square, regression analysis, ANOVA via SPSS/R).
- **Phase 4 (Months 11–12):** Thesis compilation per university formatting standards and plagiarism clearance (<10% via Turnitin).
    `,
    fileUrl: '/uploads/academic/mpharm-ra-dissertation-project-guide.pdf',
    downloadAvailable: true,
  },

  // 11. VIVA VOCE QUESTIONS & ANSWERS
  {
    id: 'RES-VIV-701',
    title: 'External Examiner Viva Voce Master Preparation Handbook (100 Questions & Answers)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester II & IV',
    subject: 'Comprehensive Viva & Practical Examination',
    unit: 'All Semesters',
    topic: 'High-Yield Examiner Prompts, Defensive Argumentation & Practical Scenarios',
    resourceType: 'Viva voce questions and answers',
    marksCategory: 'All',
    uploadDate: '2026-11-01',
    author: 'External Examiners Panel (PCI/RGUHS/SPPU)',
    content: `
### High-Frequency Viva Voce Questions Asked by External Examiners:

**Viva Q1: Examiner asks: "Why do we perform stability testing at 30°C/75% RH in India?"**
*Defensive Answer:* India falls under Climatic Zone IVb (Hot and higher humidity) per ICH Q1A and WHO guidelines. Historical data confirmed Zone IVa (30°C/65% RH) was insufficient to predict degradation in tropical maritime conditions. Hence, long-term testing at 30°C ± 2°C / 75% RH ± 5% RH is statutory for commercial shelf-life registration.

**Viva Q2: Examiner asks: "What is an Orange Book patent certification Paragraph IV filing?"**
*Defensive Answer:* Under 21 CFR 314.94, a generic applicant certifying under Paragraph IV declares that the originator's patent listed in the Orange Book is invalid or will not be infringed. This triggers statutory notification to the patent owner and provides a potential 180-day generic exclusivity incentive for the first applicant.

**Viva Q3: Examiner asks: "Explain the difference between Type IA and Type IB variations in Europe."**
*Defensive Answer:* Type IA is a "Do and Tell" minor variation with no impact on quality, safety, or efficacy, submitted within 12 months after implementation. Type IB is a "Tell and Wait" minor variation requiring notification to the competent authority and a 30-day review period before implementation.
    `,
    fileUrl: '/uploads/academic/viva-voce-master-prep-handbook.pdf',
    downloadAvailable: true,
  },

  // 12. RECOMMENDED TEXTBOOKS & REFERENCE MATERIALS
  {
    id: 'RES-BOK-801',
    title: 'Recommended Textbooks, Reference Handbooks & Guideline Compendia',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Prescribed Reference List',
    semester: 'All Semesters',
    subject: 'All M.Pharm RA Subjects',
    unit: 'All Units',
    topic: 'Standard Authoritative Literature for Academic & Professional Mastery',
    resourceType: 'Recommended textbooks and reference materials',
    marksCategory: 'All',
    uploadDate: '2026-11-05',
    author: 'ReguSphere Academic Board',
    content: `
### PCI Prescribed & International Authoritative Literature:

#### Core Textbooks:
1. **Good Manufacturing Practices for Pharmaceuticals** — S.H. Willig and J.R. Stoker (Marcel Dekker).
2. **FDA Regulatory Affairs: A Guide for Prescription Drugs, Medical Devices, and Biologics** — Douglas J. Pisano and David S. Mantus (Informa Healthcare).
3. **Medical Product Regulatory Affairs: Pharmaceuticals, Diagnostics, Medical Devices** — John J. Tobin and Gary Walsh (Wiley-VCH).
4. **Pharmaceutical Process Validation** — Bernard T. Loftus and Robert A. Nash.
5. **New Drug Approval Process** — Richard A. Guarino (Marcel Dekker).

#### Official Pharmacopoeias & Statutory Reference Guidelines:
- Indian Pharmacopoeia (IP 2022 / 2026 Addendum) — Indian Pharmacopoeia Commission.
- United States Pharmacopeia–National Formulary (USP-NF).
- British Pharmacopoeia (BP).
- ICH Harmonised Guidelines (Official Compendium Q, S, E, M).
- Drugs and Cosmetics Act, 1940 and Rules, 1945 (Universal Law Publishing).
    `,
    fileUrl: '/uploads/academic/recommended-textbooks-reference-guide.pdf',
    downloadAvailable: true,
  },
];

// ─── API ENDPOINTS ────────────────────────────────────────────────────────────

// 1. Get all resources with dynamic filtering
router.get('/', (req, res) => {
  try {
    const { university, semester, subject, unit, topic, marksCategory, resourceType, search } = req.query;

    let results = [...mpharmResources];

    if (university && university !== 'All') {
      results = results.filter((r) => r.university === university);
    }

    if (semester && semester !== 'All') {
      results = results.filter((r) => r.semester === semester || r.semester === 'All Semesters');
    }

    if (subject && subject !== 'All') {
      results = results.filter((r) => r.subject === subject || r.subject === 'All M.Pharm RA Subjects');
    }

    if (unit && unit !== 'All') {
      results = results.filter((r) => r.unit.toLowerCase().includes(unit.toLowerCase()) || r.unit === 'All Units');
    }

    if (marksCategory && marksCategory !== 'All') {
      results = results.filter((r) => r.marksCategory === marksCategory || r.marksCategory === 'All');
    }

    if (resourceType && resourceType !== 'All') {
      results = results.filter((r) => r.resourceType === resourceType);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q) ||
          r.scheme.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: results.length,
      resources: results,
      totalAvailable: mpharmResources.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Get single resource by ID
router.get('/:id', (req, res) => {
  const resource = mpharmResources.find((r) => r.id === req.params.id);
  if (!resource) {
    return res.status(404).json({ success: false, message: 'Academic resource not found.' });
  }
  res.json({ success: true, resource });
});

// 3. Metadata: List all recognized universities & schemes
router.get('/meta/universities', (req, res) => {
  res.json({ success: true, universities: UNIVERSITIES_METADATA });
});

// 4. Admin Create / Upload Resource
router.post('/', (req, res) => {
  try {
    const {
      title,
      university,
      scheme,
      semester,
      subject,
      unit,
      topic,
      resourceType,
      marksCategory = 'All',
      content,
      author = 'Administrator',
    } = req.body;

    if (!title || !subject || !semester || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, Subject, Semester, and Content are strictly required.',
      });
    }

    const matchedUniv = UNIVERSITIES_METADATA.find((u) => u.id === university) || {
      name: 'Custom / Autonomous University',
      scheme: scheme || 'Custom Academic Scheme',
    };

    const newResource = {
      id: `RES-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      title,
      university: university || 'pci-uniform',
      universityName: matchedUniv.name,
      scheme: scheme || matchedUniv.scheme,
      semester: semester || 'Semester I',
      subject,
      unit: unit || 'Unit I',
      topic: topic || 'General Regulatory Topic',
      resourceType: resourceType || 'Subject-wise Study Materials',
      marksCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      author,
      content,
      fileUrl: req.body.fileUrl || '/uploads/academic/sample-resource.pdf',
      downloadAvailable: true,
    };

    mpharmResources.unshift(newResource);

    res.status(201).json({
      success: true,
      message: 'Academic study resource published successfully.',
      resource: newResource,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Admin Update / Edit Resource
router.put('/:id', (req, res) => {
  try {
    const idx = mpharmResources.findIndex((r) => r.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Resource not found.' });
    }

    const existing = mpharmResources[idx];
    const updated = {
      ...existing,
      ...req.body,
      id: existing.id, // Immutable ID
      uploadDate: req.body.uploadDate || existing.uploadDate,
    };

    mpharmResources[idx] = updated;

    res.json({
      success: true,
      message: 'Academic study resource updated successfully.',
      resource: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Admin Delete Resource
router.delete('/:id', (req, res) => {
  try {
    const initialLen = mpharmResources.length;
    mpharmResources = mpharmResources.filter((r) => r.id !== req.params.id);

    if (mpharmResources.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Resource not found.' });
    }

    res.json({
      success: true,
      message: `Resource ${req.params.id} has been removed from the repository.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

