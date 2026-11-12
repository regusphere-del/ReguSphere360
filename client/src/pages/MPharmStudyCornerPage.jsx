import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderTree,
  Building2,
  ChevronRight,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Lock,
  Unlock,
  Sparkles,
  Share2,
  Clock,
  Printer,
  FileCheck,
  Bookmark,
  Microscope,
  Presentation,
  ClipboardList,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── STATIC DATA & SCHEMES ───────────────────────────────────────────────────

export const UNIVERSITIES = [
  {
    id: 'pci-uniform',
    name: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Master Syllabus for M.Pharm Regulatory Affairs (Regulations 2014/2021)',
    description: 'National standardized statutory syllabus followed across RGUHS, JNTU, AKTU, MUHS, GTU, and affiliated colleges nationwide.',
    authority: 'Pharmacy Council of India (Statutory Body under Ministry of Health & Family Welfare)',
    badgeColor: 'teal',
  },
  {
    id: 'rguhs',
    name: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4 (M.Pharm Drug Regulatory Affairs)',
    description: 'Autonomous health university curriculum in Karnataka with specific sessional examination blueprints and dissertation reviews.',
    authority: 'RGUHS Academic Senate & Faculty of Pharmacy',
    badgeColor: 'indigo',
  },
  {
    id: 'jntu',
    name: 'Jawaharlal Nehru Technological University (JNTU)',
    scheme: 'JNTUH / JNTUK Academic Regulations (R21/R23 CBCS Pattern)',
    description: 'Technical university scheme in Telangana & AP with focus on industrial regulatory compliance and digital submissions.',
    authority: 'JNTU Board of Studies in Pharmacy',
    badgeColor: 'blue',
  },
  {
    id: 'sppu',
    name: 'Savitribai Phule Pune University (SPPU)',
    scheme: 'SPPU CBCS Curriculum for M.Pharm Regulatory Affairs',
    description: 'State university pattern in Maharashtra emphasizing European MAA dossiers, variation classifications, and bioequivalence.',
    authority: 'SPPU Faculty of Science and Technology',
    badgeColor: 'amber',
  },
  {
    id: 'niper',
    name: 'NIPER (National Institute of Pharm. Education & Research)',
    scheme: 'NIPER Autonomous M.S. (Pharm.) Regulatory Toxicology / RA',
    description: 'Institutes of National Importance curriculum covering GLP toxicology, OECD guidelines, and novel biological registrations.',
    authority: 'NIPER Senate & Department of Pharmaceuticals, Govt of India',
    badgeColor: 'purple',
  },
  {
    id: 'jamia-hamdard',
    name: 'Jamia Hamdard University (Deemed University)',
    scheme: 'Jamia Hamdard SPER Specialized RA Curriculum',
    description: 'Specialized syllabus featuring AYUSH regulations, herbal dossier compilation, phytopharmaceutical rules, and global pharmacovigilance.',
    authority: 'Jamia Hamdard School of Pharmaceutical Education and Research',
    badgeColor: 'rose',
  },
];

export const SEMESTER_SUBJECTS = {
  'Semester I': [
    'Good Regulatory Practices (MRA 101T)',
    'Documentation and Regulatory Writing (MRA 102T)',
    'Clinical Research Regulations (MRA 103T)',
    'Regulations and Commercial Aspects of Medical Devices, Biologicals and Herbals (MRA 104T)',
    'Regulatory Affairs Practical I (MRA 105P)',
  ],
  'Semester II': [
    'Regulatory Aspects of Drugs & Cosmetics (MRA 201T)',
    'Regulatory Aspects of Diagnostic & Medical Devices (MRA 202T)',
    'Regulatory Aspects of Food & Nutraceuticals (MRA 203T)',
    'Global Regulatory Strategy (MRA 204T)',
    'Regulatory Affairs Practical II (MRA 205P)',
  ],
  'Semester III': [
    'Research Methodology and Biostatistics (MRM 301T)',
    'Journal Club (Presentation & Critical Appraisal)',
    'Discussion / Synopsis Presentation (Dissertation Proposal)',
    'Research Work (Dissertation Phase I)',
  ],
  'Semester IV': [
    'Journal Club (Recent Regulatory Developments)',
    'Research Work (Dissertation Phase II & Thesis Submission)',
    'Colloquium / Final Defense Viva Voce',
  ],
};

export const RESOURCE_TYPES = [
  'All Types',
  'Semester-wise Syllabus',
  'Subject-wise Study Materials',
  'Unit-wise Notes and Explanations',
  'Short-answer questions (2 marks)',
  'Medium-answer questions (5 marks)',
  'Long-answer questions (10 marks)',
  'Previous examination question papers',
  'Seminar topics and presentation materials',
  'Assignment preparation resources',
  'Research methodology and project guidance',
  'Viva voce questions and answers',
  'Recommended textbooks and reference materials',
];

export const MARKS_CATEGORIES = ['All', '2 Marks', '5 Marks', '10 Marks'];

export const UNITS = ['All Units', 'Unit I', 'Unit II', 'Unit III', 'Unit IV', 'Unit V'];

export const SEMESTERS = ['All Semesters', 'Semester I', 'Semester II', 'Semester III', 'Semester IV'];

// ─── INITIAL FALLBACK DATA ───────────────────────────────────────────────────

const INITIAL_RESOURCES = [
  {
    id: 'RES-SYL-101',
    title: 'PCI Uniform Master Syllabus: Complete M.Pharm Regulatory Affairs Curriculum',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI M.Pharm (DRA) Regulations 2014/2021',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I to V',
    topic: 'Course Units, Credit Hours & Semester Examination Scheme',
    resourceType: 'Semester-wise Syllabus',
    marksCategory: 'All',
    uploadDate: '2026-08-15',
    author: 'Pharmacy Council of India Academic Cell',
    content: `
### Pharmacy Council of India (PCI) — Master of Pharmacy (Regulatory Affairs)
**Subject:** Good Regulatory Practices (Course Code: MRA 101T) | 4 Hours/Week (4 Credits)

#### Comprehensive Syllabus Breakdown:
- **Unit I (12 Hours): Good Regulatory Practices (GRP)**
  * Concept, origin and scope of GRP per WHO guidelines.
  * Role of international regulatory bodies: WHO, WTO, WIPO, ICH.
  * Mutual recognition agreements (MRA), reliance pathways, and bilateral agreements between health agencies.
- **Unit II (12 Hours): Good Manufacturing Practices (cGMP)**
  * Historical milestones (Elixir Sulfanilamide, Thalidomide tragedy).
  * Facility layout, HVAC cascades, environmental classification (ISO 14644 / Class A to D).
  * CDSCO Revised Schedule M (India) compliance vs US 21 CFR Part 210/211 and EU GMP Volume 4.
- **Unit III (12 Hours): Good Laboratory Practice (GLP) & Good Clinical Practice (GCP)**
  * OECD GLP principles, 21 CFR Part 58, role of Study Director and Quality Assurance Unit (QAU).
  * ICH E6(R2/R3) GCP guidelines, Institutional Ethics Committee (IEC), Informed Consent Document (ICD).
- **Unit IV (12 Hours): Good Distribution Practice (GDP) & Good Pharmacovigilance Practice (GVP)**
  * WHO GDP guidelines, cold chain logistics (2–8°C, sub-zero), temperature mapping, and serialization.
  * EMA GVP Modules I–XVI, periodic safety update reports (PSUR / PBRER), and ADR reporting.
- **Unit V (12 Hours): Regulatory Audits & Quality Risk Management (QRM)**
  * Audit classifications: internal self-inspections, vendor audits, regulatory PAI and for-cause audits.
  * ICH Q9 Quality Risk Management principles, FMEA, fishbone diagrams, CAPA protocols.
    `,
  },
  {
    id: 'RES-MAT-102',
    title: 'Documentation and Regulatory Writing: Industrial Master Formula Record (MFR) & BMR Guide',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Documentation and Regulatory Writing (MRA 102T)',
    unit: 'Unit I',
    topic: 'Master Formula Records (MFR), Batch Manufacturing Records (BMR) & Site Master Files (SMF)',
    resourceType: 'Subject-wise Study Materials',
    marksCategory: 'All',
    uploadDate: '2026-09-01',
    author: 'Prof. A. K. Kulkarni, RAC',
    content: `
### Industrial Regulatory Documentation Study Notes
This module covers statutory documentation essential for commercial drug manufacturing licensing and regulatory review.

#### 1. Master Formula Record (MFR):
- The definitive technical recipe prepared by formulation R&D and signed off by QA/Production.
- Contains: full quantitative formula, batch size calculations, equipment list with capacity, detailed manufacturing sequence, in-process control (IPC) checkpoints, theoretical yields, and packaging specifications.

#### 2. Batch Manufacturing Record (BMR):
- Controlled executable record issued by QA with unique batch number.
- Mandates contemporaneous shop-floor logging of operator signatures, weigh-sheet printouts, machine log references, line clearance verification, environmental temperature/humidity readings, and yield reconciliation.

#### 3. Site Master File (SMF):
- Compiled according to PIC/S PE 008 standards; serves as the factory blueprint for regulatory auditors.
- Includes corporate profile, licensed dosage forms, water purification systems (PW and WFI loops), HVAC air handling systems, and validation master plans.
    `,
  },
  {
    id: 'RES-NOT-103',
    title: 'New Drugs and Clinical Trials Rules 2019: Detailed Unit Notes',
    university: 'rguhs',
    universityName: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4',
    semester: 'Semester I',
    subject: 'Clinical Research Regulations (MRA 103T)',
    unit: 'Unit II',
    topic: 'Indian Clinical Trial Authorizations, Timelines & Ethics Committee Requirements',
    resourceType: 'Unit-wise Notes and Explanations',
    marksCategory: 'All',
    uploadDate: '2026-09-15',
    author: 'Dr. Eleanor Vance, RAC',
    content: `
### RGUHS Unit II Study Notes — New Drugs and Clinical Trials Rules (NDCTR) 2019
Published in the Gazette of India on March 19, 2019, replacing Schedule Y of the Drugs and Cosmetics Rules, 1945.

#### Statutory Timelines for Trial Approvals (Rule 22):
- **Locally discovered, developed and manufactured in India:** CDSCO decision timeframe is **30 working days**. If no objection is communicated by CLA within this period, permission is legally deemed granted.
- **Drugs developed outside India:** CDSCO decision timeframe is **90 working days**.
- **Form CT-04:** Application for permission to conduct clinical trials for a new drug / investigational new drug.
- **Form CT-06:** Official statutory grant of permission for clinical trials.

#### Ethics Committee (EC) Governance:
- EC registration with CDSCO is mandatory under Rule 7; registration validity is **5 years**.
- Committee composition: Minimum 7 members (Medical clinicians, pharmacologist, legal expert, social scientist/philosopher, and non-scientific lay person).
- Quorum requirement: Minimum 5 members physically present, including at least one non-scientific member and one member unaffiliated with the clinical trial site.
    `,
  },
  {
    id: 'RES-Q2-201',
    title: 'High-Yield 2-Mark Short Answer Question Bank (Part 1)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I & II',
    topic: 'Definitions, Statutory Forms, Acronyms & Regulatory Clocks',
    resourceType: 'Short-answer questions (2 marks)',
    marksCategory: '2 Marks',
    uploadDate: '2026-09-22',
    author: 'ReguSphere Academic Exam Board',
    content: `
### M.Pharm University Examination — 2-Mark Short Questions & Model Answers:

**Q1: Define Good Regulatory Practices (GRP) per WHO.**
*Model Answer:* GRP is defined by WHO as internationally recognized principles, tools, and practices applied by regulatory authorities to develop, implement, and review regulations to achieve public health objectives through transparency, predictability, consistency, and scientific evidence.

**Q2: What is ALCOA+ in pharmaceutical data integrity?**
*Model Answer:* ALCOA+ represents the international standard for data integrity: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, and Available.

**Q3: Differentiate between Form 25 and Form 28 under Indian Drugs and Cosmetics Rules.**
*Model Answer:* Form 25 is a manufacturing license for drugs other than biologicals/special products (non-Schedules C, C1, and X). Form 28 is specifically for manufacturing biological products and parenterals listed in Schedules C and C(1).

**Q4: Define SUSAR in clinical trials.**
*Model Answer:* SUSAR stands for Suspected Unexpected Serious Adverse Reaction — an adverse event that is serious (resulting in death, hospitalization, or permanent disability) and unexpected (not listed in the Investigator's Brochure), requiring expedited regulatory notification within 7 or 15 days.

**Q5: What is an Established Condition (EC) under ICH Q12?**
*Model Answer:* An Established Condition (EC) is a legally binding parameter in a regulatory dossier that assures product quality. Any post-approval change to an EC requires regulatory authority submission and approval.
    `,
  },
  {
    id: 'RES-Q5-202',
    title: '5-Mark Procedural & Comparative Questions with Structured Answers',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit II & III',
    topic: 'PAI vs Surveillance Audits, Study Director GLP Responsibilities',
    resourceType: 'Medium-answer questions (5 marks)',
    marksCategory: '5 Marks',
    uploadDate: '2026-09-28',
    author: 'ReguSphere Exam Cell',
    content: `
### 5-Mark Question 1: Differentiate between a Pre-Approval Inspection (PAI) and a Routine cGMP Surveillance Inspection.

#### Model Structured Answer (Full 5/5 Marks Blueprint):
| Parameter | Pre-Approval Inspection (PAI) | Routine cGMP Surveillance Inspection |
| :--- | :--- | :--- |
| **Trigger** | Submission of an NDA, BLA, or ANDA to FDA/EMA. | Statutory recurring cycle (mandated every 2 years). |
| **Primary Objective** | Verify application data integrity, bio-batch manufacturing, and commercial scale feasibility. | Verify continuous facility-wide compliance with 21 CFR 210/211 across all commercial products. |
| **Inspection Scope** | Specific to products listed in the pending application, analytical method transfer, and validation batches. | Systems-based audit (Quality, Production, Facilities/Equipment, Lab Controls, Materials, Packaging). |
| **Outcome Impact** | Determines approval or "Withhold Approval" recommendation to CDER. | May lead to FDA Form 483, Warning Letter, or Import Alert. |

---

### 5-Mark Question 2: Outline the duties of the Study Director under OECD Good Laboratory Practice (GLP).

#### Model Structured Answer:
Under 21 CFR Part 58 and OECD GLP:
1. Holds central responsibility for the technical conduct, interpretation, analysis, and reporting of non-clinical safety studies.
2. Approves and signs the study protocol and any subsequent amendments prior to study initiation.
3. Ensures all raw data, computer system records, and specimen retention adhere strictly to GLP guidelines.
4. Confirms that all test, reference, and control articles are characterized with Certificates of Analysis (CoAs).
5. Authors and signs the final study report, stating whether the study was conducted in full compliance with GLP and documenting any protocol deviations.
    `,
  },
  {
    id: 'RES-Q10-203',
    title: '10-Mark Comprehensive Essay Question: ICH CTD Architecture & Module 3 (CMC)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester I',
    subject: 'Documentation and Regulatory Writing (MRA 102T)',
    unit: 'Unit III',
    topic: 'Detailed CTD 5-Module Pyramid & 3.2.S / 3.2.P Chemistry, Manufacturing & Controls',
    resourceType: 'Long-answer questions (10 marks)',
    marksCategory: '10 Marks',
    uploadDate: '2026-10-05',
    author: 'Dr. Eleanor Vance & Aarav Nair',
    content: `
### 10-Mark Question: Describe in detail the organization of the ICH Common Technical Document (CTD). Provide a comprehensive breakdown of Module 3 (Quality/CMC), detailing Drug Substance (3.2.S) and Drug Product (3.2.P).

#### Complete Model Answer (10/10 Marks Structure):

### 1. Introduction to the Common Technical Document (ICH M4) (2 Marks):
The ICH Common Technical Document (CTD) was adopted in 2000 to eliminate redundant reformatting of marketing authorization dossiers across US FDA, EMA, Health Canada, PMDA, and CDSCO.

### 2. The 5 Modules of the CTD Pyramid (2 Marks):
- **Module 1 (Regional Administrative Information):** Non-harmonized; includes regional application forms (FDA 356h, EU Application Form), user fee forms, patent certifications, proposed draft labeling, and environmental assessments.
- **Module 2 (CTD Overviews and Summaries):**
  * 2.1 TOC | 2.2 Introduction | 2.3 Quality Overall Summary (QOS)
  * 2.4 Non-clinical Overview | 2.5 Clinical Overview | 2.6/2.7 Tabulated & Written Summaries
- **Module 3 (Quality):** Comprehensive Chemistry, Manufacturing, and Controls (CMC).
- **Module 4 (Non-clinical Study Reports):** Pharmacology, pharmacokinetics, and toxicology reports.
- **Module 5 (Clinical Study Reports):** Bioequivalence (BA/BE) and Phase I–IV clinical study reports (ICH E3).

### 3. Detailed Structure of Module 3 Quality (CMC) (5 Marks):

#### Part 3.2.S — Drug Substance (Active Pharmaceutical Ingredient):
- **3.2.S.1 General Information:** Nomenclature, chemical name, structural formula, molecular formula/weight, physicochemical properties (solubility, polymorphism, pKa).
- **3.2.S.2 Manufacture:** Manufacturer details, synthetic route flowchart, starting materials control, critical process parameters (CPPs), and process validation.
- **3.2.S.3 Characterization:** Structural elucidation (NMR, FTIR, MS, XRD), impurity profile (organic impurities per ICH Q3A, residual solvents per ICH Q3C, elemental per ICH Q3D, and mutagenic nitrosamines per ICH M7).
- **3.2.S.4 Control of Drug Substance:** Specifications, analytical validation (ICH Q2), and batch analysis (minimum 3 pilot/commercial batches).
- **3.2.S.6 Container Closure System:** Packaging materials, moisture and light barriers.
- **3.2.S.7 Stability:** Accelerated (40°C/75% RH) and long-term stability testing per ICH Q1A(R2).

#### Part 3.2.P — Drug Product (Finished Dosage Form):
- **3.2.P.1 Description & Composition:** Qualitative and quantitative formula.
- **3.2.P.2 Pharmaceutical Development:** Quality by Design (QbD) per ICH Q8, Critical Quality Attributes (CQAs), dissolution method development, overages justification.
- **3.2.P.3 Manufacture:** Batch formula, manufacturing instructions, and process validation.
- **3.2.P.4 Control of Excipients:** Pharmacopoeial monographs (USP, Ph.Eur, IP) and safety justifications.
- **3.2.P.5 Control of Drug Product:** Release and shelf-life specifications, analytical validation.
- **3.2.P.7 Container Closure:** Primary blister/vial compatibility, extractables/leachables data.
- **3.2.P.8 Stability:** 12-month long-term stability data, photostability (ICH Q1B), shelf-life assignment.

### 4. Technical Conclusion & eCTD Integration (1 Mark):
In eCTD submissions, Module 3 is compiled into XML leaf elements linking directly to PDF/A documents, enabling precise post-approval lifecycle operations (New, Replace, Delete).
    `,
  },
  {
    id: 'RES-PQP-301',
    title: 'RGUHS University Annual Examination Question Paper (Winter Session 2025)',
    university: 'rguhs',
    universityName: 'Rajiv Gandhi University of Health Sciences (RGUHS)',
    scheme: 'RGUHS Revised Scheme-4',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I to V',
    topic: 'Official 75-Mark Annual University Examination Paper with Question Distribution Blueprint',
    resourceType: 'Previous examination question papers',
    marksCategory: 'All',
    uploadDate: '2026-02-18',
    author: 'RGUHS Examination Board / University Repository',
    content: `
### Rajiv Gandhi University of Health Sciences, Karnataka
**M.Pharm (Regulatory Affairs) Degree Examination — Semester I**
**Subject:** Good Regulatory Practices (MRA 101T) | **Time:** 3 Hours | **Max Marks:** 75 Marks

#### Long Essays (Answer any 2 out of 3 — 2 x 10 = 20 Marks):
1. Explain the revised Schedule M (cGMP) in India. Highlight changes regarding Pharmaceutical Quality Systems (PQS) and contrast with US FDA 21 CFR Part 211.
2. Discuss the OECD principles of Good Laboratory Practice. Detail the duties of the Study Director and Quality Assurance Unit.
3. Elaborate on WHO Good Regulatory Practices (GRP) for national regulatory authorities. Discuss mutual reliance and work-sharing mechanisms.

#### Short Essays (Answer any 5 out of 7 — 5 x 7 = 35 Marks):
4. Explain the requirements and procedures for bio-batch manufacturing during pre-approval inspections.
5. Describe the principles of Quality Risk Management (QRM) as outlined in ICH Q9.
6. Detail the regulatory requirements for cold chain distribution under Good Distribution Practices (GDP).
7. Explain the composition, quorum, and functioning of an Institutional Ethics Committee under NDCTR 2019.
8. What is ALCOA+? Discuss common data integrity citations issued during US FDA inspections.
9. Explain the steps in conducting a self-inspection (internal audit) in a GxP facility.
10. Describe the requirements for environmental monitoring in cleanrooms per ISO 14644.

#### Short Answers (10 x 2 = 20 Marks):
11. Define GRP per WHO guidelines.
12. Differentiate between Form 25 and Form 28.
13. Expand and define SUSAR.
14. What is the role of a Qualified Person (QP) in the European Union?
15. Define Out of Specification (OOS).
16. Name the four climatic zones recognized by ICH Q1A.
17. What is an Import Alert?
18. Define CAPA.
19. Expand CTIS and explain its purpose in the EU.
20. Mention two triggers for a "For-Cause" regulatory inspection.
    `,
  },
  {
    id: 'RES-SEM-401',
    title: 'Ready-to-Present Seminar Deck: Transition from eCTD v3.2.2 to eCTD v4.0 (HL7 FHIR & RPS)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester II',
    subject: 'Global Regulatory Strategy (MRA 204T)',
    unit: 'Unit II',
    topic: 'Emerging Standards in Electronic Submissions, Metadata Governance & Digital Portals',
    resourceType: 'Seminar topics and presentation materials',
    marksCategory: 'All',
    uploadDate: '2026-10-18',
    author: 'Aarav Nair & ReguSphere Academic Team',
    content: `
### Ready-to-Present M.Pharm Seminar Package
**Topic Title:** Next-Generation Electronic Submissions: Transition from eCTD v3.2.2 to eCTD v4.0 Based on HL7 FHIR Standards

#### Seminar Slide Outline (20 Slides):
- **Slide 1–3:** Historical evolution of eCTD (Paper -> NEES -> eCTD v3.2.2 -> v4.0).
- **Slide 4–7:** Limitations of v3.2.2 (Rigid DTD, heavy manual lifecycle tracking, regional XML divergence).
- **Slide 8–12:** Key technical features of eCTD v4.0 (HL7 Regulated Product Submission - RPS, XML messages, context of use reuse, two-way agency communication).
- **Slide 13–16:** Implementation timelines across FDA, EMA, and PMDA.
- **Slide 17–19:** Impact on pharmaceutical sponsors: RIM system upgrades, change control, and metadata governance.
- **Slide 20:** Conclusion, Q&A defense prompts, and bibliographic references.
    `,
  },
  {
    id: 'RES-ASG-501',
    title: 'Comparative Assignment Guide: US FDA 505(b)(1), 505(b)(2) & 505(j) Pathways',
    university: 'jntu',
    universityName: 'Jawaharlal Nehru Technological University (JNTU)',
    scheme: 'JNTUH R21 Academic Regulations',
    semester: 'Semester II',
    subject: 'Regulatory Aspects of Drugs & Cosmetics (MRA 201T)',
    unit: 'Unit I',
    topic: 'Statutory Mapping, Case Precedents & Bioequivalence Thresholds',
    resourceType: 'Assignment preparation resources',
    marksCategory: 'All',
    uploadDate: '2026-10-25',
    author: 'JNTU Academic Faculty Panel',
    content: `
### Assignment Model Answer Guide
**Assignment Prompt:** Perform a critical comparative analysis of application pathways under Section 505 of the US Federal Food, Drug, and Cosmetic Act with relevant industrial case examples.

#### Core Comparison Framework:
1. **Section 505(b)(1) — Standalone NDA:**
   - Full safety and efficacy trials conducted or licensed by the sponsor.
   - Example: Novel chemical entities like Paxlovid (Nirmatrelvir).
2. **Section 505(b)(2) — Hybrid NDA:**
   - Sponsor bridges to FDA's previous safety findings for an approved Reference Listed Drug (RLD) or published literature.
   - Example: Changing an oral tablet into an oral solution or intravenous formulation.
3. **Section 505(j) — ANDA (Generics):**
   - Demonstrates pharmaceutical equivalence, same active ingredient, route of administration, strength, and bioequivalence (90% Confidence Interval between 80.00% and 125.00%).
    `,
  },
  {
    id: 'RES-RES-601',
    title: 'M.Pharm Regulatory Affairs Thesis & Dissertation Manual',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester III & IV',
    subject: 'Research Methodology and Biostatistics (MRM 301T)',
    unit: 'Research Work',
    topic: 'Research Title Formulation, Questionnaire Design, Patent Landscaping & Plagiarism Guidelines',
    resourceType: 'Research methodology and project guidance',
    marksCategory: 'All',
    uploadDate: '2026-10-29',
    author: 'Dr. Marcus Holloway & ReguSphere Academic Panel',
    content: `
### M.Pharm Regulatory Affairs Dissertation & Research Manual

#### High-Scoring Research Domains in Regulatory Affairs:
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
  },
  {
    id: 'RES-VIV-701',
    title: 'External Examiner Viva Voce Master Preparation Handbook (100 Questions & Answers)',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Uniform Scheme',
    semester: 'Semester II & IV',
    subject: 'Comprehensive Viva & Practical Examination',
    unit: 'All Semesters',
    topic: 'High-Frequency Examiner Prompts, Defensive Argumentation & Practical Scenarios',
    resourceType: 'Viva voce questions and answers',
    marksCategory: 'All',
    uploadDate: '2026-11-02',
    author: 'Senior External Examiners Panel (PCI/RGUHS/SPPU)',
    content: `
### High-Frequency Viva Voce Questions Asked by External Examiners:

**Viva Q1: Examiner asks: "Why do we perform stability testing at 30°C/75% RH in India?"**
*Defensive Answer:* India falls under Climatic Zone IVb (Hot and higher humidity) per ICH Q1A and WHO guidelines. Historical data confirmed Zone IVa (30°C/65% RH) was insufficient to predict degradation in tropical maritime conditions. Hence, long-term testing at 30°C ± 2°C / 75% RH ± 5% RH is statutory for commercial shelf-life registration.

**Viva Q2: Examiner asks: "What is an Orange Book patent certification Paragraph IV filing?"**
*Defensive Answer:* Under 21 CFR 314.94, a generic applicant certifying under Paragraph IV declares that the originator's patent listed in the Orange Book is invalid or will not be infringed. This triggers statutory notification to the patent owner and provides a potential 180-day generic exclusivity incentive for the first applicant.

**Viva Q3: Examiner asks: "Explain the difference between Type IA and Type IB variations in Europe."**
*Defensive Answer:* Type IA is a "Do and Tell" minor variation with no impact on quality, safety, or efficacy, submitted within 12 months after implementation. Type IB is a "Tell and Wait" minor variation requiring notification to the competent authority and a 30-day review period before implementation.
    `,
  },
  {
    id: 'RES-BOK-801',
    title: 'PCI Prescribed Textbooks, Reference Handbooks & Guideline Compendia',
    university: 'pci-uniform',
    universityName: 'Pharmacy Council of India (PCI)',
    scheme: 'PCI Prescribed Reference List',
    semester: 'All Semesters',
    subject: 'All M.Pharm RA Subjects',
    unit: 'All Units',
    topic: 'Standard Authoritative Literature for Academic & Professional Mastery',
    resourceType: 'Recommended textbooks and reference materials',
    marksCategory: 'All',
    uploadDate: '2026-11-06',
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
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export const MPharmStudyCornerPage = ({ onNavigate, onOpenEnquiry }) => {
  // Main state
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [selectedUniversity, setSelectedUniversity] = useState('pci-uniform');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedResourceType, setSelectedResourceType] = useState('All Types');
  const [selectedMarksCategory, setSelectedMarksCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active view modal state
  const [viewingResource, setViewingResource] = useState(null);

  // Admin management mode state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [pinError, setPinError] = useState('');

  // Admin Resource Create / Edit Modal state
  const [editingResource, setEditingResource] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formUniversity, setFormUniversity] = useState('pci-uniform');
  const [formScheme, setFormScheme] = useState('');
  const [formSemester, setFormSemester] = useState('Semester I');
  const [formSubject, setFormSubject] = useState(SEMESTER_SUBJECTS['Semester I'][0]);
  const [formUnit, setFormUnit] = useState('Unit I');
  const [formTopic, setFormTopic] = useState('');
  const [formResourceType, setFormResourceType] = useState('Unit-wise Notes and Explanations');
  const [formMarksCategory, setFormMarksCategory] = useState('All');
  const [formContent, setFormContent] = useState('');
  const [formAuthor, setFormAuthor] = useState('ReguSphere Academic Admin');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Fetch from backend API with fallback
  useEffect(() => {
    fetchAcademicResources();
  }, [selectedUniversity, selectedSemester, selectedSubject, selectedUnit, selectedResourceType, selectedMarksCategory]);

  const fetchAcademicResources = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mpharm-resources`, {
        params: {
          university: selectedUniversity !== 'All' ? selectedUniversity : undefined,
          semester: selectedSemester !== 'All Semesters' ? selectedSemester : undefined,
          subject: selectedSubject !== 'All' ? selectedSubject : undefined,
          unit: selectedUnit !== 'All Units' ? selectedUnit : undefined,
          resourceType: selectedResourceType !== 'All Types' ? selectedResourceType : undefined,
          marksCategory: selectedMarksCategory !== 'All' ? selectedMarksCategory : undefined,
          search: searchQuery || undefined,
        },
      });
      if (res.data.success && res.data.resources?.length > 0) {
        setResources(res.data.resources);
      }
    } catch (e) {
      console.warn('Backend /api/mpharm-resources not reachable, using local academic store:', e.message);
    }
  };

  // Dynamically available subjects for selected semester
  const availableSubjects = useMemo(() => {
    if (selectedSemester === 'All Semesters') {
      const all = Object.values(SEMESTER_SUBJECTS).flat();
      return ['All', ...new Set(all)];
    }
    return ['All', ...(SEMESTER_SUBJECTS[selectedSemester] || [])];
  }, [selectedSemester]);

  // Current active university object
  const currentUniversityObj = useMemo(() => {
    return UNIVERSITIES.find((u) => u.id === selectedUniversity) || UNIVERSITIES[0];
  }, [selectedUniversity]);

  // Client-side filtering
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // University filter
      if (selectedUniversity !== 'All' && res.university !== selectedUniversity && res.university !== 'pci-uniform') {
        return false;
      }

      // Semester filter
      if (selectedSemester !== 'All Semesters' && res.semester !== selectedSemester && res.semester !== 'All Semesters') {
        return false;
      }

      // Subject filter
      if (selectedSubject !== 'All' && res.subject !== selectedSubject && res.subject !== 'All M.Pharm RA Subjects') {
        return false;
      }

      // Unit filter
      if (selectedUnit !== 'All Units' && !res.unit.toLowerCase().includes(selectedUnit.toLowerCase()) && res.unit !== 'All Units') {
        return false;
      }

      // Resource Type filter
      if (selectedResourceType !== 'All Types' && res.resourceType !== selectedResourceType) {
        return false;
      }

      // Marks Category filter
      if (selectedMarksCategory !== 'All' && res.marksCategory !== selectedMarksCategory && res.marksCategory !== 'All') {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSubject = res.subject.toLowerCase().includes(q);
        const matchesTopic = res.topic.toLowerCase().includes(q);
        const matchesContent = res.content.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubject && !matchesTopic && !matchesContent) {
          return false;
        }
      }

      return true;
    });
  }, [resources, selectedUniversity, selectedSemester, selectedSubject, selectedUnit, selectedResourceType, selectedMarksCategory, searchQuery]);

  // Download study material helper
  const handleDownloadResource = (resource, e) => {
    e?.stopPropagation();
    const content = `========================================================================
REGUSPHERE 360 - M.PHARM REGULATORY AFFAIRS STUDY CORNER
ACADEMIC REPOSITORY & EXAMINATION BLUEPRINT
========================================================================
Title: ${resource.title}
University: ${resource.universityName || resource.university}
Academic Scheme: ${resource.scheme}
Semester: ${resource.semester}
Subject: ${resource.subject}
Unit: ${resource.unit} | Topic: ${resource.topic}
Resource Type: ${resource.resourceType}
Marks Category: ${resource.marksCategory}
Publication/Upload Date: ${resource.uploadDate}
Author/Contributor: ${resource.author || 'Academic Board'}
========================================================================

${resource.content.replace(/###/g, '\n---').replace(/\*\*/g, '')}

========================================================================
(c) ReguSphere 360 Academic Study Corner.
Provided for M.Pharm Pharmaceutical Regulatory Affairs students' academic use.
========================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.id}-${resource.title.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 45)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatusMessage(`Downloaded study sheet for: "${resource.title}"`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Admin PIN Unlock
  const handleAdminPinSubmit = (e) => {
    e.preventDefault();
    if (adminPin === 'admin360' || adminPin === 'mpharm2026' || adminPin === 'regusphere') {
      setIsAdminMode(true);
      setShowAdminPinModal(false);
      setAdminPin('');
      setPinError('');
      setStatusMessage('Admin Mode Activated: You can now upload, edit, categorize, and remove academic resources.');
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setPinError('Invalid Admin PIN. (Hint: use admin360 or mpharm2026)');
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setIsCreatingNew(true);
    setEditingResource(null);
    setFormTitle('');
    setFormUniversity(selectedUniversity !== 'All' ? selectedUniversity : 'pci-uniform');
    setFormScheme(currentUniversityObj.scheme);
    setFormSemester('Semester I');
    setFormSubject(SEMESTER_SUBJECTS['Semester I'][0]);
    setFormUnit('Unit I');
    setFormTopic('');
    setFormResourceType('Unit-wise Notes and Explanations');
    setFormMarksCategory('All');
    setFormContent('');
    setFormAuthor('ReguSphere Academic Admin');
  };

  // Open Edit Modal
  const handleOpenEditModal = (resource, e) => {
    e?.stopPropagation();
    setIsCreatingNew(false);
    setEditingResource(resource);
    setFormTitle(resource.title);
    setFormUniversity(resource.university);
    setFormScheme(resource.scheme);
    setFormSemester(resource.semester);
    setFormSubject(resource.subject);
    setFormUnit(resource.unit);
    setFormTopic(resource.topic);
    setFormResourceType(resource.resourceType);
    setFormMarksCategory(resource.marksCategory || 'All');
    setFormContent(resource.content);
    setFormAuthor(resource.author || 'ReguSphere Academic Admin');
  };

  // Admin Save (Create or Update)
  const handleSaveResource = async (e) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      alert('Please fill out Title and Content.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title: formTitle,
        university: formUniversity,
        scheme: formScheme || UNIVERSITIES.find((u) => u.id === formUniversity)?.scheme,
        semester: formSemester,
        subject: formSubject,
        unit: formUnit,
        topic: formTopic || 'General Regulatory Topic',
        resourceType: formResourceType,
        marksCategory: formMarksCategory,
        content: formContent,
        author: formAuthor,
      };

      if (isCreatingNew) {
        // Try backend
        try {
          const res = await axios.post(`${API_BASE}/mpharm-resources`, payload);
          if (res.data.success && res.data.resource) {
            setResources((prev) => [res.data.resource, ...prev]);
          } else {
            throw new Error();
          }
        } catch {
          // Local fallback
          const newLocal = {
            ...payload,
            id: `RES-${Date.now()}`,
            universityName: UNIVERSITIES.find((u) => u.id === formUniversity)?.name || 'Autonomous Institution',
            uploadDate: new Date().toISOString().split('T')[0],
          };
          setResources((prev) => [newLocal, ...prev]);
        }
        setStatusMessage('New academic resource uploaded successfully.');
      } else if (editingResource) {
        // Update
        try {
          const res = await axios.put(`${API_BASE}/mpharm-resources/${editingResource.id}`, payload);
          if (res.data.success && res.data.resource) {
            setResources((prev) => prev.map((r) => (r.id === editingResource.id ? res.data.resource : r)));
          } else {
            throw new Error();
          }
        } catch {
          // Local fallback
          setResources((prev) =>
            prev.map((r) => (r.id === editingResource.id ? { ...r, ...payload } : r))
          );
        }
        setStatusMessage(`Updated resource: "${formTitle}"`);
      }

      setEditingResource(null);
      setIsCreatingNew(false);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to save resource. Please check inputs.');
    } finally {
      setIsSaving(false);
    }
  };

  // Admin Delete
  const handleDeleteResource = async (resourceId, resourceTitle, e) => {
    e?.stopPropagation();
    if (!window.confirm(`Are you sure you want to permanently delete "${resourceTitle}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/mpharm-resources/${resourceId}`);
    } catch {
      // Local fallback
    }
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
    setStatusMessage(`Resource "${resourceTitle}" removed from academic repository.`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Color helper for resource types
  const getResourceTypeBadge = (type) => {
    if (type.includes('Syllabus')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (type.includes('2 marks')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (type.includes('5 marks')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (type.includes('10 marks')) return 'bg-rose-50 text-rose-700 border-rose-200';
    if (type.includes('examination')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (type.includes('Seminar')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (type.includes('Assignment')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    if (type.includes('Research')) return 'bg-teal-50 text-teal-800 border-teal-200';
    if (type.includes('Viva')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (type.includes('textbooks')) return 'bg-slate-100 text-slate-800 border-slate-300';
    return 'bg-teal-50 text-teal-700 border-teal-200';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── TOP BREADCRUMB ────────────────────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold cursor-pointer" onClick={() => onNavigate('home')}>
              ReguSphere 360
            </span>
            <span>/</span>
            <span className="text-slate-400">Education Hub</span>
            <span>/</span>
            <span className="text-white font-semibold">M.Pharm RA Study Corner</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {isAdminMode ? (
              <button
                onClick={() => setIsAdminMode(false)}
                className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700"
              >
                <Unlock className="w-3 h-3" />
                <span>Admin Mode (Unlocked)</span>
              </button>
            ) : (
              <button
                onClick={() => setShowAdminPinModal(true)}
                className="flex items-center space-x-1 text-slate-400 hover:text-teal-400"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-3">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>M.Pharm Regulatory Affairs Academic Repository</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                M.Pharm Regulatory Affairs{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-300 to-cyan-300">
                  Study Corner
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Dedicated academic study portal supporting postgraduate M.Pharm Regulatory Affairs students
                across semesters, university examinations, seminars, assignments, and dissertation research.
              </p>

              {/* 12 Pillar Categories Quick Strip */}
              <div className="mt-6 flex flex-wrap gap-1.5 text-[11px]">
                {[
                  '1. Syllabus',
                  '2. Study Materials',
                  '3. Unit Notes',
                  '4. 2-Mark QA',
                  '5. 5-Mark QA',
                  '6. 10-Mark QA',
                  '7. Past Papers',
                  '8. Seminars',
                  '9. Assignments',
                  '10. Research/Thesis',
                  '11. Viva Voce',
                  '12. Textbooks',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 sm:w-80 flex-shrink-0 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-slate-300">Repository Status</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live & Verified
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Resources:</span>
                  <strong className="text-white font-mono">{resources.length} Available</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Universities Covered:</span>
                  <strong className="text-white font-mono">{UNIVERSITIES.length} Schemes</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Semesters:</span>
                  <strong className="text-teal-400 font-mono">I, II, III & IV</strong>
                </div>
              </div>

              {isAdminMode && (
                <button
                  onClick={handleOpenCreateModal}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Study Resource</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIVERSITY & APPLICABLE ACADEMIC SCHEME SELECTOR BANNER ── */}
      <section className="bg-gradient-to-r from-teal-50 via-slate-50 to-indigo-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  Select University / Autonomous Academic Board:
                </span>
              </div>

              {/* University Pills */}
              <div className="flex flex-wrap gap-2">
                {UNIVERSITIES.map((univ) => {
                  const isSelected = selectedUniversity === univ.id;
                  return (
                    <button
                      key={univ.id}
                      onClick={() => {
                        setSelectedUniversity(univ.id);
                        setSelectedSubject('All');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${isSelected
                          ? 'bg-slate-900 text-white shadow-md ring-2 ring-teal-500/30'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      <span>{univ.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scheme Highlight Card */}
            <div className="p-4 rounded-xl bg-white border border-slate-300 shadow-sm max-w-md lg:w-96 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                Applicable Academic Scheme:
              </span>
              <p className="font-bold text-slate-900 leading-snug mb-1">{currentUniversityObj.scheme}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{currentUniversityObj.description}</p>
              <div className="flex items-center space-x-1.5 text-[10px] text-teal-800 font-semibold pt-1 border-t border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Statutory Authority: {currentUniversityObj.authority}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTIFICATION TOAST ────────────────────────────────────── */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-teal-700 hover:text-teal-900 text-xs font-bold">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── MULTI-DIMENSIONAL FILTER CONTROLS ─────────────────────── */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Row 1: Search & Semesters */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across questions, unit notes, subjects, exams (e.g. Schedule M, eCTD, NDCTR, bio-batch)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Semester Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-xs">
              {SEMESTERS.map((sem) => (
                <button
                  key={sem}
                  onClick={() => {
                    setSelectedSemester(sem);
                    setSelectedSubject('All');
                  }}
                  className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${selectedSemester === sem
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Secondary Dropdowns (Subject, Unit, Mark Category, Resource Type) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Subject Dropdown */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Subject / Paper:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-600 truncate"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Dropdown */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Unit:</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-600"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Mark Category */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Question-Mark Category:</label>
              <select
                value={selectedMarksCategory}
                onChange={(e) => setSelectedMarksCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-600"
              >
                {MARKS_CATEGORIES.map((m) => (
                  <option key={m} value={m}>
                    {m === 'All' ? 'All Questions (2, 5 & 10 Marks)' : `${m} Questions`}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Type Category */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Content / Resource Type:</label>
              <select
                value={selectedResourceType}
                onChange={(e) => setSelectedResourceType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-600"
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Bar: 12 Category Pills */}
          <div className="pt-2 border-t border-slate-200 flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
            <span className="text-slate-400 font-bold whitespace-nowrap uppercase tracking-wider text-[10px] mr-1">
              Jump to Category:
            </span>
            {RESOURCE_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedResourceType(t)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedResourceType === t
                    ? 'bg-teal-700 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES GRID & ACTIVE LISTING ───────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-slate-200 gap-2 text-xs">
            <div className="text-slate-600">
              Showing <strong>{filteredResources.length}</strong> academic resource
              {filteredResources.length !== 1 ? 's' : ''} for{' '}
              <span className="text-slate-900 font-bold">{currentUniversityObj.name}</span>
              {selectedSemester !== 'All Semesters' && (
                <span className="text-teal-700 font-semibold"> • {selectedSemester}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {(searchQuery ||
                selectedSemester !== 'All Semesters' ||
                selectedSubject !== 'All' ||
                selectedUnit !== 'All Units' ||
                selectedResourceType !== 'All Types' ||
                selectedMarksCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSemester('All Semesters');
                      setSelectedSubject('All');
                      setSelectedUnit('All Units');
                      setSelectedResourceType('All Types');
                      setSelectedMarksCategory('All');
                    }}
                    className="text-teal-700 hover:underline font-bold"
                  >
                    Reset Filters
                  </button>
                )}

              {isAdminMode && (
                <button
                  onClick={handleOpenCreateModal}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Resource</span>
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredResources.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <FolderTree className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No study resources found for this filter</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try selecting "All Semesters", "All Subjects", or resetting the search keywords.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSemester('All Semesters');
                  setSelectedSubject('All');
                  setSelectedUnit('All Units');
                  setSelectedResourceType('All Types');
                  setSelectedMarksCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Show All Resources
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Meta Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getResourceTypeBadge(res.resourceType)}`}>
                        {res.resourceType}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{res.uploadDate}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-2">
                      {res.title}
                    </h3>

                    {/* Metadata Matrix */}
                    <div className="space-y-1 text-[11px] text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Semester:</span>
                        <span className="font-semibold text-slate-800">{res.semester}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Subject:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[170px]" title={res.subject}>
                          {res.subject}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Unit / Topic:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[170px]" title={res.unit}>
                          {res.unit}
                        </span>
                      </div>
                      {res.marksCategory && res.marksCategory !== 'All' && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Category:</span>
                          <span className="font-bold text-teal-800">{res.marksCategory} Questions</span>
                        </div>
                      )}
                    </div>

                    {/* Content Snippet */}
                    <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {res.content.replace(/###/g, '').replace(/---/g, '').slice(0, 150)}...
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setViewingResource(res)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1"
                    >
                      <span>Study Resource</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => handleDownloadResource(res, e)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Download study sheet (.txt)"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                      </button>

                      {isAdminMode && (
                        <>
                          <button
                            onClick={(e) => handleOpenEditModal(res, e)}
                            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                            title="Edit Resource"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteResource(res.id, res.title, e)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                            title="Remove Resource"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RESOURCE VIEW MODAL ────────────────────────────────────── */}
      {viewingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl border border-slate-200 shadow-2xl relative my-8 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getResourceTypeBadge(viewingResource.resourceType)}`}>
                    {viewingResource.resourceType}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    {viewingResource.semester}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Uploaded: {viewingResource.uploadDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {viewingResource.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  <strong>Subject:</strong> {viewingResource.subject} • <strong>Unit:</strong> {viewingResource.unit}
                </p>
              </div>

              <button
                onClick={() => setViewingResource(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
              {/* Scheme Context Alert */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs flex items-center justify-between">
                <div>
                  <strong>University / Scheme:</strong> {viewingResource.scheme || currentUniversityObj.scheme}
                </div>
                <span className="text-[10px] text-indigo-700 font-semibold px-2 py-0.5 bg-white rounded border border-indigo-200">
                  {viewingResource.universityName || currentUniversityObj.name}
                </span>
              </div>

              {/* Main Content Area */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed whitespace-pre-line font-sans">
                {viewingResource.content}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Author: {viewingResource.author || 'ReguSphere Academic Faculty'} • Official Statutory Academic Reference
              </span>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={(e) => handleDownloadResource(viewingResource, e)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Study Guide (.txt)</span>
                </button>
                <button
                  onClick={() => setViewingResource(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN PIN LOGIN MODAL ──────────────────────────────────── */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => {
                setShowAdminPinModal(false);
                setPinError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base mb-1">
              <Lock className="w-5 h-5 text-teal-600" />
              <span>Academic Administrator Verification</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enter authorized administrator credentials to manage M.Pharm Regulatory Affairs academic content.
            </p>

            <form onSubmit={handleAdminPinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Administrator PIN / Key:</label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Enter administrator PIN..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  autoFocus
                />
                {pinError && <p className="text-rose-600 text-[11px] font-semibold mt-1">{pinError}</p>}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Unlock Admin Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADMIN CREATE / EDIT RESOURCE MODAL ─────────────────────── */}
      {(isCreatingNew || editingResource) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl relative my-8 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingResource(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-1">
              <Edit3 className="w-5 h-5 text-teal-600" />
              <span>{isCreatingNew ? 'Upload New Academic Resource' : 'Edit Academic Resource'}</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Categorize and publish curriculum-aligned notes, model examination answers, seminar decks, or thesis resources.
            </p>

            <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Unit III Notes: CTD Module 3 Drug Substance Impurity Profiling"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              {/* University & Academic Scheme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">University / Board *</label>
                  <select
                    value={formUniversity}
                    onChange={(e) => {
                      setFormUniversity(e.target.value);
                      const u = UNIVERSITIES.find((item) => item.id === e.target.value);
                      if (u) setFormScheme(u.scheme);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Academic Scheme Name</label>
                  <input
                    type="text"
                    value={formScheme}
                    onChange={(e) => setFormScheme(e.target.value)}
                    placeholder="e.g. PCI Regulations 2014/2021"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Semester & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Semester *</label>
                  <select
                    value={formSemester}
                    onChange={(e) => {
                      setFormSemester(e.target.value);
                      setFormSubject(SEMESTER_SUBJECTS[e.target.value]?.[0] || 'Good Regulatory Practices');
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {Object.keys(SEMESTER_SUBJECTS).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Subject / Paper *</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {(SEMESTER_SUBJECTS[formSemester] || []).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Unit & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Unit</label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {UNITS.filter((u) => u !== 'All Units').map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                    <option value="Unit I to V (Comprehensive)">Unit I to V (Comprehensive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Topic Headline</label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="e.g. Nitrosamines Risk Assessment & ICH M7"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Resource Type & Marks Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Resource Type *</label>
                  <select
                    value={formResourceType}
                    onChange={(e) => setFormResourceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {RESOURCE_TYPES.filter((t) => t !== 'All Types').map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Marks Category</label>
                  <select
                    value={formMarksCategory}
                    onChange={(e) => setFormMarksCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {MARKS_CATEGORIES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Full Text / Study Notes / Model Answer *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Enter detailed academic study notes, question model answers with headings, points, and regulatory references..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-teal-600 font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Author / Academic Source</label>
                <input
                  type="text"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  placeholder="e.g. ReguSphere Academic Board"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingResource(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : isCreatingNew ? 'Publish Resource' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── FOOTER CALLOUT ────────────────────────────────────────── */}
      <section className="py-14 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>M.Pharm Mentorship & Thesis Guidance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Need Expert Review on Your M.Pharm Dissertation or Seminar?
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ReguSphere 360's RAC-certified consultants offer academic mentoring for protocol design,
            health authority gap analyses, and live mock viva preparation.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry('M.Pharm Dissertation & Academic Mentorship')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Request Academic Guidance</span>
            </button>

            <button
              onClick={() => onNavigate('education-hub')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-colors flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Explore Education Hub</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

