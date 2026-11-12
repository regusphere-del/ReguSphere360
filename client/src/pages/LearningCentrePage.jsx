import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Download,
  ChevronRight,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  Globe2,
  Building2,
  Pill,
  Microscope,
  Stethoscope,
  Briefcase,
  AlertCircle,
  HelpCircle,
  FolderTree,
  ChevronDown,
  X,
  Share2,
  BookmarkCheck,
} from 'lucide-react';

// ─── 10 CORE TOPICS DATA ────────────────────────────────────────────────────────

const TOPICS_DATA = [
  {
    id: 1,
    title: 'Introduction to Pharmaceutical Regulatory Affairs',
    level: 'Beginner',
    audience: ['B.Pharm Students', 'Pharmacy Graduates', 'Entry-level Professionals'],
    readTime: '15 min read',
    icon: BookOpen,
    category: 'Foundations',
    summary:
      'Foundational principles governing pharmaceutical regulations worldwide, why regulatory affairs exists, public health mandates, and the historical milestones shaping today’s statutory frameworks.',
    objectives: [
      'Understand the genesis and public health purpose of pharmaceutical regulations.',
      'Analyze the impact of historical drug tragedies (Elixir Sulfanilamide 1937, Thalidomide 1961) on global laws.',
      'Differentiate between legislative statutes, health authority regulations, and non-binding guidance documents.',
      'Define safety, efficacy, and quality as the immutable triad of pharmaceutical regulation.',
    ],
    detailedContent: `
### What is Pharmaceutical Regulatory Affairs?
Pharmaceutical Regulatory Affairs (RA) is a specialized multidisciplinary interface connecting pharmaceutical enterprises, healthcare systems, and sovereign government health authorities. Its primary statutory mission is safeguarding public health by controlling the safety, efficacy, and quality of human and veterinary therapeutics, biological products, and medical devices.

### Historical Evolution & Why Regulations Exist:
1. **The Pure Food and Drugs Act of 1906 (USA):** Initiated basic misbranding and adulteration controls.
2. **The Federal Food, Drug, and Cosmetic (FD&C) Act of 1938:** Triggered by the *Elixir Sulfanilamide tragedy* (which poisoned over 100 people due to diethylene glycol solvent), this act mandated pre-market proof of safety for the very first time.
3. **The Kefauver-Harris Amendment of 1962:** Enacted following the catastrophic *Thalidomide teratogenicity disaster* in Europe and worldwide. It mandated rigorous evidence of drug efficacy through well-controlled clinical trials, introduced informed consent, and instituted adverse drug event reporting.
4. **ICH Formation (1990):** Harmonized disparate testing standards across the US, Europe, and Japan into a unified standard.

### Core Legal Hierarchies in Regulatory Affairs:
- **Acts & Laws (Statutes):** Enacted by sovereign parliaments/congresses (e.g., US FD&C Act, India Drugs and Cosmetics Act 1940).
- **Regulations:** Enforceable codes drafted by agencies (e.g., US 21 CFR, EU Directives).
- **Guidances:** Scientific interpretations representing agency thinking; while legally non-binding, they represent the de facto standard of review.
    `,
    industryExample: {
      scenario: 'Pre-IND Strategy for an Oncology Entity',
      details:
        'A biotech startup synthesizing a novel tyrosine kinase inhibitor must identify whether their entity qualifies as a Chemical New Molecular Entity (NME) or Biologic. Regulatory affairs determines that early non-clinical GLP toxicology packages must fulfill FDA 21 CFR Part 58 before filing an Investigational New Drug (IND) application.',
    },
    officialReferences: [
      { name: 'US FDA – Regulatory Guidance & Laws', url: 'https://www.fda.gov/drugs/guidance-compliance-regulatory-information' },
      { name: 'EMA – Legal Framework for Medicinal Products in the EU', url: 'https://www.ema.europa.eu/en/about-us/how-we-work/legal-framework' },
      { name: 'CDSCO – Drugs & Cosmetics Act 1940 & Rules 1945', url: 'https://cdsco.gov.in/opencms/opencms/en/Acts-and-rules/' },
    ],
    relatedTopicIds: [2, 3, 4],
    downloadFilename: 'Topic-01-Introduction-to-Pharmaceutical-RA.txt',
  },
  {
    id: 2,
    title: 'Role and Responsibilities of Regulatory Affairs Professionals',
    level: 'Beginner',
    audience: ['B.Pharm Students', 'M.Pharm RA Students', 'Pharmacy Graduates'],
    readTime: '18 min read',
    icon: Briefcase,
    category: 'Foundations',
    summary:
      'Detailed job profiles, cross-functional interfaces, statutory accountability, life-cycle coordination, and career paths across R&D, clinical development, manufacturing, and commercialization.',
    objectives: [
      'Map the RA department’s position as the strategic hub between R&D, QC/QA, Clinical, and Marketing.',
      'Understand statutory obligations of an authorized regulatory signatory.',
      'Examine core job verticals: Regulatory Strategy, Dossier Publishing, CMC Review, and Post-Approval Lifecycle.',
      'Develop skills required for health authority correspondence, meetings, and audit defense.',
    ],
    detailedContent: `
### Strategic Mandate of the RA Professional:
Regulatory Affairs professionals are not mere "document compilers" — they are strategic business partners who chart the fastest, safest, and most cost-effective path to bring life-saving drugs from the research bench to the patient.

### Key Functional Responsibilities:
1. **Regulatory Intelligence & Early Strategy:** Formulating Target Product Profiles (TPP), advising research teams on non-clinical toxicology battery requirements, and identifying expedited pathways (Fast Track, Breakthrough, Orphan Drug).
2. **Clinical Regulatory Operations:** Preparing Investigational New Drug (IND) applications and Clinical Trial Applications (CTA), negotiating protocols with Institutional Review Boards (IRB) and Ethics Committees.
3. **Chemistry, Manufacturing & Controls (CMC) Stewardship:** Auditing formulation changes, analytical method validation data, and stability trends against pharmacopoeial monographs (USP, IP, Ph. Eur., BP).
4. **Dossier Publishing & Gateway Management:** Structuring electronic submissions into validated eCTD packages using dedicated software (Lorenz docuBridge, Extedo).
5. **Health Authority Interactions:** Chairing formal Type A, B, and C meetings with the US FDA, Scientific Advice procedures with EMA, or SEC meetings with India's CDSCO.
6. **Commercial Compliance & Label Review:** Vetting Prescribing Information (PI), Summary of Product Characteristics (SmPC), Patient Information Leaflets (PIL), and promotional literature against statutory advertising rules.
    `,
    industryExample: {
      scenario: 'Handling a Health Authority Complete Response Letter (CRL)',
      details:
        'When the US FDA issued a Complete Response Letter citing analytical assay variability in Module 3 CMC, the RA Lead coordinated an emergency cross-functional taskforce between Analytical Development and Quality Control. The RA team authored a comprehensive 45-day Deficiencies Response package with orthogonal validation data, averting a 12-month program delay.',
    },
    officialReferences: [
      { name: 'Regulatory Affairs Professionals Society (RAPS) Scope of Practice', url: 'https://www.raps.org' },
      { name: 'TOPRA – The Organisation for Professionals in Regulatory Affairs', url: 'https://www.topra.org' },
    ],
    relatedTopicIds: [1, 3, 7],
    downloadFilename: 'Topic-02-Role-and-Responsibilities-of-RA-Professionals.txt',
  },
  {
    id: 3,
    title: 'Drug Development and Approval Process',
    level: 'Intermediate',
    audience: ['B.Pharm Students', 'M.Pharm RA Students', 'Industry Professionals'],
    readTime: '24 min read',
    icon: Microscope,
    category: 'Drug Development',
    summary:
      'Step-by-step examination of the drug discovery continuum: target validation, preclinical IND-enabling studies, Phase I–IV clinical trials, NDA/ANDA/BLA marketing authorizations, and accelerated approval mechanisms.',
    objectives: [
      'Trace the 10-15 year timeline from target discovery through commercial approval.',
      'Contrast Phase I (Safety/PK), Phase II (Proof of Concept/Dose Ranging), Phase III (Pivotal Efficacy), and Phase IV (Post-marketing).',
      'Distinguish submission pathways: NDA (505b1), Paper NDA (505b2), ANDA (505j), and BLA (351a/k).',
      'Evaluate accelerated pathways: Accelerated Approval, Breakthrough Therapy, Fast Track, and Priority Review.',
    ],
    detailedContent: `
### The Complete Drug Development Paradigm:
1. **Target Identification & Lead Optimization (Years 1–4):** High-throughput screening, medicinal chemistry, computational SAR, and in-vitro affinity profiling.
2. **Preclinical Development & IND-Enabling Studies (Years 4–6):**
   - In-vivo pharmacology, safety pharmacology (ICH S7A/B covering cardiovascular, CNS, and respiratory systems).
   - In-vitro and in-vivo genotoxicity battery (ICH S2R1).
   - 28-day repeated-dose toxicology in rodent and non-rodent species under strict GLP (21 CFR Part 58).
   - Pre-formulation, solubility determination, and preliminary stability.
3. **Investigational New Drug (IND) Application:**
   - 30-day statutory safety review by FDA CDER/CBER before human dosing may initiate.
4. **Clinical Phases (Years 6–11):**
   - **Phase I (20–80 Healthy Volunteers):** Safety, tolerability, PK/PD parameters, maximum tolerated dose (MTD).
   - **Phase II (100–300 Target Patients):** Therapeutic efficacy, dose-response curve, biomarker validation.
   - **Phase III (1,000–3,000 Multi-center Patients):** Pivotal randomized double-blind controlled trials demonstrating statistical superiority or non-inferiority against standard-of-care.
5. **Marketing Authorization Review (Months 10–12):**
   - PDUFA review clocks (Standard 10 months vs. Priority 6 months). Advisory Committee hearings and Pre-Approval Inspections (PAI).
6. **Phase IV Post-Marketing Surveillance:** Real-world evidence, registry studies, pediatric post-marketing commitments, and REMS programs.
    `,
    industryExample: {
      scenario: 'Repurposing via the US FDA 505(b)(2) Hybrid Pathway',
      details:
        'A company reformulated an existing oral anti-diabetic API into a sustained-release once-weekly injectable. By filing under section 505(b)(2), the sponsor bridged their filing to FDA’s previous findings of safety for the reference listed drug (RLD), cutting Phase III clinical requirements by 60% and shaving 4 years off market entry.',
    },
    officialReferences: [
      { name: 'US FDA – The Drug Development Process (CDER)', url: 'https://www.fda.gov/patients/learn-about-drug-and-device-approvals/drug-development-process' },
      { name: 'EMA – From Laboratory to Patient: The Journey of a Medicine', url: 'https://www.ema.europa.eu/en/human-regulatory/overview/from-laboratory-to-patient-journey-of-a-medicine' },
      { name: 'ClinicalTrials.gov Protocol Registration Database', url: 'https://clinicaltrials.gov' },
    ],
    relatedTopicIds: [1, 6, 7],
    downloadFilename: 'Topic-03-Drug-Development-and-Approval-Process.txt',
  },
  {
    id: 4,
    title: 'Indian Pharmaceutical Regulatory Framework',
    level: 'Intermediate',
    audience: ['B.Pharm Students', 'M.Pharm RA Students', 'Indian Pharma Professionals'],
    readTime: '22 min read',
    icon: Building2,
    category: 'Regional Regulations',
    summary:
      'Comprehensive architecture of India’s pharmaceutical regulatory apparatus: CDSCO, DCGI, State Licensing Authorities (SLA), New Drugs & Clinical Trials Rules 2019, Revised Schedule M (cGMP), and the SUGAM online portal.',
    objectives: [
      'Differentiate central jurisdiction (CDSCO/DCGI) vs state jurisdiction (SLAs).',
      'Navigate the New Drugs and Clinical Trials Rules (NDCTR) 2019 and Schedule Y evolution.',
      'Understand manufacturing licenses (Form 25/28), wholesale licenses (Form 20B/21B), and import registrations (Form 10/41).',
      'Analyze the compliance requirements of Revised Schedule M aligned with WHO-TRS 986.',
    ],
    detailedContent: `
### Governance Hierarchy in India:
The regulatory control over drugs, cosmetics, and medical devices in India is exercised through a dual-governance model under the **Drugs and Cosmetics Act, 1940** and **Rules, 1945**:

1. **Central Level – CDSCO (headed by DCGI):**
   - Approval of New Drugs, Investigational New Drugs (IND), and subsequent new formulations.
   - Clinical trial permissions and ethics committee registrations.
   - Registration and import licensing of drugs (Form 10 / Form 41).
   - Approval of blood banks, Large Volume Parenterals (LVP), vaccines, and recombinant biologics (acting as Central License Approving Authority - CLAA).
   - Setting national standards and pharmacopoeial monographs (Indian Pharmacopoeia Commission - IPC).
2. **State Level – State Licensing Authorities (SLAs / FDA State):**
   - Grant and renewal of manufacturing licenses (Form 25 for non-biologicals, Form 28 for biologicals and injectables).
   - Grant of retail and wholesale sales licenses (Forms 20, 21, 20B, 21B).
   - Routine GMP inspections, market sampling, and state-level enforcement.

### Landmark Regulatory Milestones:
- **New Drugs and Clinical Trials Rules (NDCTR), 2019:** Introduced defined timelines (30 days for local discoveries, 90 days otherwise), standardized compensation matrices for clinical trial-related injury/death, and local clinical trial waiver provisions for pre-approved orphan/rare disease therapeutics from recognized health agencies.
- **Revised Schedule M (2023–2024):** Transitioned India’s cGMP framework to parity with WHO-TRS guidelines, enforcing Pharmaceutical Quality Systems (PQS), computerized system validation (GAMP 5), continuous environmental monitoring, and mandatory self-inspections.
- **SUGAM & ONDLS Digital Portals:** Mandatory unified single-window e-governance systems for filing import licenses, clinical trial protocols, and post-approval variations.
    `,
    industryExample: {
      scenario: 'CDSCO Subject Expert Committee (SEC) Appearance for a Fixed-Dose Combination',
      details:
        'An Indian pharmaceutical manufacturer applied to launch a novel anti-hypertensive FDC (Telmisartan + Chlorthalidone + Cilnidipine). The RA team submitted a formal CT-04 application via SUGAM, compiled clinical bioequivalence comparability data against separate reference formulations, and defended therapeutic rationality before the CDSCO Cardiovascular SEC.',
    },
    officialReferences: [
      { name: 'CDSCO Official Portal (Govt of India)', url: 'https://cdsco.gov.in' },
      { name: 'SUGAM Online Licensing & Application Portal', url: 'https://cdscoonline.gov.in' },
      { name: 'Indian Pharmacopoeia Commission (IPC)', url: 'https://ipc.gov.in' },
    ],
    relatedTopicIds: [1, 5, 8],
    downloadFilename: 'Topic-04-Indian-Pharmaceutical-Regulatory-Framework.txt',
  },
  {
    id: 5,
    title: 'International Regulatory Authorities',
    level: 'Intermediate',
    audience: ['M.Pharm RA Students', 'Pharmacy Graduates', 'Regulatory Associates'],
    readTime: '20 min read',
    icon: Globe2,
    category: 'Regional Regulations',
    summary:
      'Comparative review of premier global health authorities: US FDA, EMA, UK MHRA, Japan PMDA, Health Canada, Australia TGA, and emerging markets (ANVISA, GCC, PIC/S member states).',
    objectives: [
      'Compare approval mechanisms: US FDA (CDER/CBER), EMA (CHMP), PMDA, MHRA, and TGA.',
      'Understand European approval procedures: Centralised, Decentralised (DCP), Mutual Recognition (MRP), and National.',
      'Examine mutual reliance initiatives, Australia-Canada-Singapore-Switzerland-UK (Access Consortium), and PIC/S inspections.',
      'Identify regulatory dossiers and review timeframes across semi-regulated and emerging markets.',
    ],
    detailedContent: `
### Leading Global Health Agencies:
1. **US Food and Drug Administration (FDA):**
   - Centers: CDER (Small molecules, monoclonal antibodies), CBER (Cell/gene therapy, vaccines, blood products), CDRH (Medical devices).
   - Statutory benchmark: 21 CFR (Code of Federal Regulations).
2. **European Medicines Agency (EMA):**
   - Single scientific evaluation committee: Committee for Medicinal Products for Human Use (CHMP).
   - Approval tracks:
     * *Centralised Procedure (CP):* Mandatory for biologics, oncology, orphan drugs; grants a single unified marketing authorization valid across all 27 EU member states.
     * *Decentralised Procedure (DCP):* Simultaneous application across multiple EU member states where no national approval currently exists.
     * *Mutual Recognition Procedure (MRP):* Expanding an existing approval from one Reference Member State (RMS) to Concerned Member States (CMS).
3. **UK Medicines and Healthcare products Regulatory Agency (MHRA):**
   - Post-Brexit sovereign agency operating the International Recognition Procedure (IRP) leveraging trusted approvals from FDA, EMA, and TGA.
4. **Japan Pharmaceuticals and Medical Devices Agency (PMDA):**
   - Operates in tandem with MHLW; recognized for rigorous consultations, ethnic bridging studies, and pioneer accelerated regenerative medicine frameworks.
5. **Australia Therapeutic Goods Administration (TGA):**
   - Operates the Australian Register of Therapeutic Goods (ARTG); active leader in international reliance networks.
    `,
    industryExample: {
      scenario: 'Access Consortium Work-Sharing Submission',
      details:
        'A multinational sponsor simultaneously filed an innovative biologic application across the Access Consortium (Australia TGA, Health Canada, Singapore HSA, Switzerland Swissmedic, and UK MHRA). Review of Module 3 CMC and Module 4 non-clinical safety was divided among participating agencies, yielding synchronized market approvals in 5 territories within 11 months.',
    },
    officialReferences: [
      { name: 'US FDA – International Programs', url: 'https://www.fda.gov/international-programs' },
      { name: 'EMA – National Competent Authorities Directory', url: 'https://www.ema.europa.eu/en/partners-networks/eu-partners/eu-member-states/national-competent-authorities-human' },
      { name: 'Pharmaceutical Inspection Co-operation Scheme (PIC/S)', url: 'https://picscheme.org' },
    ],
    relatedTopicIds: [3, 4, 7],
    downloadFilename: 'Topic-05-International-Regulatory-Authorities.txt',
  },
  {
    id: 6,
    title: 'ICH Guidelines – Quality, Safety, Efficacy and Multidisciplinary',
    level: 'Advanced',
    audience: ['M.Pharm RA Students', 'QA/QC Managers', 'Regulatory Specialists'],
    readTime: '26 min read',
    icon: Layers,
    category: 'Harmonization',
    summary:
      'Master breakdown of the International Council for Harmonisation (ICH) architecture: Q-series (Quality), S-series (Safety), E-series (Efficacy), and M-series (Multidisciplinary), including Q1–Q14 deep-dives.',
    objectives: [
      'Master the four primary ICH guideline pillars: Quality, Safety, Efficacy, Multidisciplinary.',
      'Deconstruct the core Quality guidelines: Q1 (Stability), Q2 (Method Validation), Q3 (Impurities), Q8 (QbD), Q9 (QRM), Q10 (PQS), and Q12 (Lifecycle).',
      'Analyze the Safety package: S1 (Carcinogenicity), S2 (Genotoxicity), S6 (Biologics), S9 (Oncology).',
      'Examine modern Efficacy and Multidisciplinary standards: E6(R2/R3) GCP, E9(R1) Estimands, M4 CTD, M7 Mutagenic Impurities, and M9 BCS Biowaivers.',
    ],
    detailedContent: `
### The 4 Pillars of ICH Harmonization:

#### 1. Quality (Q-Series) — Pharmaceutical & Chemical Science:
- **ICH Q1A–F:** Stability testing protocols across Climatic Zones I through IVb (India/ASEAN IVb: 30°C/75% RH).
- **ICH Q2(R2):** Validation of analytical procedures (accuracy, precision, specificity, linearity, range, LOQ/LOD).
- **ICH Q3A–D:** Impurities thresholds in drug substances (Q3A), drug products (Q3B), residual solvents (Q3C), and elemental impurities (Q3D permitted daily exposure PDE).
- **ICH Q8(R2):** Pharmaceutical Development & Quality by Design (QbD), Design Space, Critical Quality Attributes (CQAs), and Critical Process Parameters (CPPs).
- **ICH Q9(R1):** Quality Risk Management tools (FMEA, FMECA, HACCP, Risk Ranking).
- **ICH Q10:** Modern Pharmaceutical Quality System governing development and commercial lifecycle.
- **ICH Q11:** Development and manufacture of drug substances (chemical and biological entities).
- **ICH Q12:** Technical and regulatory tools for pharmaceutical product lifecycle management (ECDs, PLCM, post-approval changes).
- **ICH Q13 & Q14:** Continuous manufacturing of drug substances/products and analytical procedure lifecycle development.

#### 2. Safety (S-Series) — Non-Clinical Toxicology:
- **ICH S1A–C:** Carcinogenicity testing protocols and rodent bioassay paradigms.
- **ICH S2(R1):** Genotoxicity battery (Ames bacterial reverse mutation + in-vitro chromosomal aberration / in-vivo micronucleus).
- **ICH S5(R3):** Reproductive and developmental toxicology.
- **ICH S6(R1):** Preclinical safety evaluation of biotechnology-derived therapeutics.

#### 3. Efficacy (E-Series) — Clinical Development & Biostatistics:
- **ICH E2A–F:** Clinical safety data management and expedited pharmacovigilance reporting.
- **ICH E6(R2/R3):** Good Clinical Practice (GCP) investigator responsibilities, monitoring, and audit trials.
- **ICH E8(R1):** General considerations for clinical studies.
- **ICH E9(R1):** Addendum on estimands and sensitivity analysis in clinical trials.

#### 4. Multidisciplinary (M-Series) — Cross-Cutting Topics:
- **ICH M4:** The Common Technical Document (CTD) specifications.
- **ICH M7(R2):** Assessment and control of DNA reactive (mutagenic) impurities in pharmaceuticals (Threshold of Toxicological Concern - TTC of 1.5 µg/day).
- **ICH M9:** Biopharmaceutics Classification System (BCS) based biowaivers for immediate-release solid orals.
    `,
    industryExample: {
      scenario: 'Nitrosamine Impurity Risk Assessment (ICH M7 / Q3A Alignment)',
      details:
        'Following global health authority alerts on N-nitrosodimethylamine (NDMA) contamination in sartans and ranitidine, a regulatory affairs team performed a comprehensive root-cause assessment across API synthesis routes (secondary amine reagents + sodium nitrite catalysts) in accordance with ICH M7(R2). Confirmatory LC-MS/MS testing showed levels below the 0.03 ppm limit, preventing product recall.',
    },
    officialReferences: [
      { name: 'ICH Official Guidelines Portal', url: 'https://www.ich.org/page/ich-guidelines' },
      { name: 'ICH Quality Guidelines Index', url: 'https://www.ich.org/page/quality-guidelines' },
      { name: 'US FDA – Implementation of ICH Guidances', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/ich-guidance-documents' },
    ],
    relatedTopicIds: [3, 7, 8],
    downloadFilename: 'Topic-06-ICH-Guidelines-Comprehensive-Reference.txt',
  },
  {
    id: 7,
    title: 'CTD and eCTD Submission Procedures',
    level: 'Advanced',
    audience: ['M.Pharm RA Students', 'Dossier Publishers', 'Regulatory Affairs Executives'],
    readTime: '25 min read',
    icon: FolderTree,
    category: 'Dossier Assembly',
    summary:
      'Deep dive into the 5-module Common Technical Document (CTD) architecture, leaf PDF/A hyperlinking specifications, eCTD v3.2.2 vs v4.0 XML schemas, Lorenz gateway validation, and lifecycle lifecycle sequences.',
    objectives: [
      'Deconstruct the 5-module CTD pyramid from regional Module 1 to clinical Module 5.',
      'Understand granularity requirements, PDF/A compliance, and cross-document bookmarking/hyperlinking rules.',
      'Differentiate eCTD v3.2.2 (DTD-based) and eCTD v4.0 (HL7 FHIR / RPS XML message exchange).',
      'Master eCTD lifecycle management: sequences (0000, 0001, etc.), operation attributes (New, Replace, Append, Delete).',
    ],
    detailedContent: `
### The 5 Modules of the Common Technical Document:
- **Module 1: Regional Administrative Information (Non-CTD):** Country-specific forms (FDA 356h, EU Application Form), user fee coversheets, patent certifications, proposed draft prescribing information, package leaflets, environmental assessments.
- **Module 2: CTD Summaries & Overviews:**
  * 2.1 CTD Table of Contents
  * 2.2 Introduction to the investigational substance
  * 2.3 Quality Overall Summary (QOS) — written narrative of Module 3 CMC
  * 2.4 Non-clinical Overview & 2.6 Non-clinical Written/Tabulated Summaries
  * 2.5 Clinical Overview & 2.7 Clinical Summaries
- **Module 3: Quality (Chemistry, Manufacturing & Controls - CMC):**
  * 3.2.S Drug Substance (General info, manufacture, characterization, control of substance, reference standards, container closure, stability)
  * 3.2.P Drug Product (Description, composition, pharmaceutical development, manufacture, control of excipients, control of product, reference standards, stability)
  * 3.2.A Appendices (Facilities, adventitious agents safety evaluation)
- **Module 4: Non-clinical Study Reports:** Pharmacology, pharmacokinetics, and toxicology complete study reports.
- **Module 5: Clinical Study Reports (CSR):** Biopharmaceutic studies (BA/BE), PK/PD reports, efficacy and safety clinical trial study reports per ICH E3.

### Electronic Common Technical Document (eCTD):
The eCTD is not merely a collection of PDFs in folders — it is an electronic compilation linked together by an **XML backbone (index.xml)** that stores metadata, lifecycle commands, and md5 checksums for every leaf document.

### Technical Conformance Standards:
- **PDF Standards:** PDF version 1.4 to 1.7 or PDF/A-1b/2b; fonts 100% embedded; text searchable; initial view set to "Bookmarks and Page"; zoom set to "Default".
- **Operation Attributes:**
  * **New:** Introducing an entirely new document in sequence 0000.
  * **Replace:** Replacing an existing document from sequence 0000 in sequence 0001 (e.g. updating a stability report).
  * **Delete:** Retiring an obsolete document.
  * **Append:** Appending addenda (rarely used, discouraged by FDA).
    `,
    industryExample: {
      scenario: 'eCTD Sequence 0001: Submitting 12-Month Stability Update',
      details:
        'Upon reaching 12 months long-term stability testing during an ongoing ANDA review at US FDA, the publisher generated sequence 0001. Using the "Replace" operator targeting the 3.2.P.8.3 stability report in sequence 0000, the publisher updated the XML backbone without disturbing unaffected CMC sections, clearing automated FDA Electronic Submissions Gateway (ESG) validation with zero error codes.',
    },
    officialReferences: [
      { name: 'ICH M4 – Organisation of the Common Technical Document', url: 'https://www.ich.org/page/ctd' },
      { name: 'US FDA – Electronic Common Technical Document (eCTD) Technical Conformance', url: 'https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/electronic-common-technical-document-ectd' },
      { name: 'EMA – eSubmission eCTD Specifications & Validation Criteria', url: 'https://esubmission.ema.europa.eu/ectd/' },
    ],
    relatedTopicIds: [2, 3, 6],
    downloadFilename: 'Topic-07-CTD-and-eCTD-Submission-Procedures.txt',
  },
  {
    id: 8,
    title: 'GMP, GLP, GDP and Quality Management Systems',
    level: 'Intermediate',
    audience: ['B.Pharm Students', 'QA/QC Associates', 'Production Executives'],
    readTime: '23 min read',
    icon: ShieldCheck,
    category: 'GxP & Quality',
    summary:
      'The GxP compliance ecosystem: Good Manufacturing Practice (cGMP 21 CFR 210/211 & Schedule M), Good Laboratory Practice (21 CFR Part 58), Good Distribution Practice (GDP), and 21 CFR Part 11 electronic records/signatures.',
    objectives: [
      'Master the fundamental tenets of GxP: documentation, traceability, data integrity, and accountability.',
      'Differentiate cGMP (manufacturing commercial release), GLP (non-clinical safety studies), and GDP (supply chain cold chain).',
      'Examine FDA 21 CFR Part 11 requirements: audit trails, access controls, electronic signatures, and hybrid record controls.',
      'Understand ALCOA+ data integrity principles: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available.',
    ],
    detailedContent: `
### GxP Regulatory Umbrella:
GxP is a collection of quality guidelines and statutory regulations established to ensure medicinal products are safe, effective, and manufactured to high quality standards.

#### 1. Good Manufacturing Practice (cGMP):
Governed under US 21 CFR Part 210/211, EU GMP Volume 4, and India Revised Schedule M:
- Facility design: HVAC systems, differential air pressure cascades, unidirectional personnel/material flows, classified cleanroom environments (ISO 5/Class A to ISO 8/Class D).
- Equipment qualification: Design Qualification (DQ), Installation Qualification (IQ), Operational Qualification (OQ), Performance Qualification (PQ).
- Validation: Process validation (Stage 1 Design, Stage 2 Process Qualification, Stage 3 Continued Process Verification), cleaning validation (worst-case residue limits, swab/rinse recovery).
- Out of Specification (OOS) investigations per FDA Barr Labs judgment: Phase 1 lab investigation vs Phase 2 manufacturing investigation.

#### 2. Good Laboratory Practice (GLP):
Governed under 21 CFR Part 58 and OECD GLP principles: Applies strictly to non-clinical safety testing (toxicology, safety pharmacology, genotoxicity). Mandates independent Quality Assurance Units (QAU), signed study plans, archival of wet specimens and histological blocks for 10+ years.

#### 3. Good Distribution Practice (GDP):
Ensures pharmaceutical integrity throughout transit: Cold chain validation (2–8°C, -20°C, -80°C), temperature data loggers, qualified refrigerated trucks, and anti-counterfeiting serialization track-and-trace.

#### 4. Data Integrity & ALCOA+ Standards:
- **A**ttributable (Who performed the step?)
- **L**egible (Can it be read and comprehended?)
- **C**ontemporaneous (Recorded at the time of execution?)
- **O**riginal (Primary raw data preserved, not copied?)
- **A**ccurate (Truthful, error-free, mathematically verified?)
- Plus: **Complete, Consistent, Enduring, and Available**.
    `,
    industryExample: {
      scenario: 'FDA 483 Remediation for Audit Trail Review Deficiencies',
      details:
        'During a cGMP inspection, an FDA investigator cited an Indian oral solids plant with an FDA Form 483 for disabling computerized HPLC system audit trails. The QA/RA leadership executed an enterprise-wide remediation protocol: implementing 21 CFR Part 11 compliant restricted user roles, automated daily audit trail review SOPs, and retraining all QC analysts.',
    },
    officialReferences: [
      { name: 'US FDA – 21 CFR Part 211 cGMP Regulations', url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=211' },
      { name: 'WHO – Good Manufacturing Practices (GMP) Guidelines', url: 'https://www.who.int/teams/health-product-policy-and-standards/standards-and-specifications/gmp' },
      { name: 'FDA – Data Integrity and Compliance with Drug CGMP Questions and Answers', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-integrity-and-compliance-drug-cgmp-questions-and-answers' },
    ],
    relatedTopicIds: [4, 6, 9],
    downloadFilename: 'Topic-08-GMP-GLP-GDP-and-QMS.txt',
  },
  {
    id: 9,
    title: 'Post-Approval Changes and Product Lifecycle Management',
    level: 'Advanced',
    audience: ['M.Pharm RA Students', 'Post-Approval Associates', 'Regulatory Affairs Managers'],
    readTime: '21 min read',
    icon: Layers,
    category: 'Lifecycle Management',
    summary:
      'Navigating post-approval regulatory changes worldwide: US FDA SUPAC & variation tiers (PAS, CBE-30, CBE-0, Annual Reports), EMA Type IA/IB/II variations, site transfers, and ICH Q12 lifecycle management tools.',
    objectives: [
      'Categorize post-approval CMC variations according to potential risk to safety and efficacy.',
      'Classify US FDA changes: Prior Approval Supplements (PAS), Changes Being Effected (CBE-30, CBE-0), and Annual Reports.',
      'Master the European variation classification guidelines: Minor variations (Type IA, Type IB) and Major variations (Type II).',
      'Leverage ICH Q12 mechanisms: Established Conditions (ECs), Post-Approval Change Management Protocols (PACMP), and Product Lifecycle Management (PLCM).',
    ],
    detailedContent: `
### The Reality of Post-Approval Lifecycle:
Commercial pharmaceutical products rarely remain static over their 20+ year market lives. Formulations are tweaked, synthetic API routes are optimized, batch sizes are scaled up, manufacturing equipment is replaced, and secondary production sites are onboarded. Every single one of these changes requires statutory regulatory evaluation before implementation.

### US FDA Post-Approval Classification (21 CFR 314.70):
1. **Major Changes (Prior Approval Supplement - PAS):**
   - High potential to adversely affect drug identity, strength, quality, purity, or potency.
   - Requires formal FDA review and approval *before* distributing product manufactured with the change (Review clock: 4 months without inspection, 6 months with PAI).
   - Examples: Change in drug substance synthesis route, relaxing an approved dissolution specification, switching from wet granulation to direct compression.
2. **Moderate Changes (Changes Being Effected - CBE):**
   - **CBE-30:** Sponsor submits supplement 30 days prior to commercial distribution. If FDA raises no objections within 30 days, distribution may commence (e.g. addition of duplicate manufacturing site with identical validated equipment).
   - **CBE-0:** Sponsor may distribute immediately upon FDA receipt of the supplement (e.g. tightening a release limit, adding an adverse reaction warning to the label).
3. **Minor Changes (Annual Report):**
   - Minimal potential risk; summarized in the annual marketing authorization update (e.g. secondary packaging changes, batch size increase within 10x validated SUPAC limits).

### European Variation Framework (Regulation (EC) No 1234/2008):
- **Type IA (Do and Tell):** Minor change with no impact on quality; reported within 12 months (or immediate notification IAin).
- **Type IB (Tell and Wait):** Minor variation requiring a 30-day clock before implementation.
- **Type II (Major Variation):** Substantial change requiring prior scientific approval from the competent authority or CHMP (60-day review clock).
- **Extension Applications:** Changes that alter active substance, strength, or route of administration — require an entirely new marketing application.

### ICH Q12: A Paradigm Shift in Post-Approval Agility:
ICH Q12 introduces **Established Conditions (ECs)** — legally binding elements that assure product quality. Changes to ECs require regulatory submission, whereas changes to non-ECs can be handled through the internal Pharmaceutical Quality System (PQS) without prior agency notification, massively reducing the regulatory filing burden.
    `,
    industryExample: {
      scenario: 'Manufacturing Site Transfer via PACMP',
      details:
        'A multinational generic company had an approved Post-Approval Change Management Protocol (PACMP) in their original dossier for transferring oral tablet manufacturing to an Indian facility. Because the exact validation protocols, dissolution criteria, and stability commit were pre-agreed with EMA, the transfer was processed as a rapid 30-day Type IB variation instead of a lengthy 6-month Type II submission.',
    },
    officialReferences: [
      { name: 'US FDA – Postmarketing Changes to an Approved NDA or ANDA', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/changes-approved-nda-or-anda' },
      { name: 'EMA – Variations Guidelines (Procedural Advice)', url: 'https://www.ema.europa.eu/en/human-regulatory/post-authorisation/variations' },
      { name: 'ICH Q12 – Technical and Regulatory Considerations for Pharmaceutical Product Lifecycle Management', url: 'https://www.ich.org/page/quality-guidelines' },
    ],
    relatedTopicIds: [6, 7, 8],
    downloadFilename: 'Topic-09-Post-Approval-Changes-and-PLCM.txt',
  },
  {
    id: 10,
    title: 'Regulatory Intelligence and Emerging Technologies',
    level: 'Advanced',
    audience: ['M.Pharm RA Students', 'Regulatory Directors', 'Industry Researchers'],
    readTime: '19 min read',
    icon: Sparkles,
    category: 'Future of RA',
    summary:
      'The modern frontier of regulatory affairs: proactive regulatory intelligence gathering, AI & Natural Language Processing in dossier authoring, decentralized clinical trials, Real-World Evidence (RWE), and digital health regulations.',
    objectives: [
      'Define regulatory intelligence and set up systematic monitoring networks for health authority updates.',
      'Analyze the impact of Generative AI and automated document generation in CTD Module 2 drafting.',
      'Understand regulatory expectations for Real-World Data (RWD) and Real-World Evidence (RWE) per FDA/EMA guidance.',
      'Evaluate regulatory pathways for Software as a Medical Device (SaMD), digital therapeutics, and decentralized clinical trials (DCT).',
    ],
    detailedContent: `
### What is Regulatory Intelligence (RI)?
Regulatory Intelligence is the systematic and proactive acquisition, analysis, and dissemination of global regulatory guidelines, statutory precedents, agency enforcement actions (Warning Letters, 483s), competitor approvals, and legislative trends. It transforms raw public regulatory information into high-value strategic decision-making assets for executive leadership.

### Emerging Technological Drivers in Regulatory Affairs:
1. **Artificial Intelligence & Automated Dossier Drafting:**
   - Automated ingestion of laboratory electronic notebooks (ELN) and LIMS data directly into draft Module 3 CMC sections.
   - Large Language Models (LLMs) specialized in clinical narratives and Patient Safety Narrative drafting for Module 5 CSRs.
   - Automated hyperlinking, bookmark validation, and eCTD cross-referencing.
2. **Real-World Data (RWD) & Real-World Evidence (RWE):**
   - Electronic Health Records (EHRs), medical billing claims, patient registries, and mobile health wearable streams.
   - Used increasingly to support label expansions for approved drugs, historical control arms in ultra-rare orphan diseases, and post-marketing surveillance validation.
3. **Decentralized Clinical Trials (DCTs) & Tele-Healthcare:**
   - Post-pandemic regulatory frameworks from FDA and EMA permitting remote patient monitoring, direct-to-patient investigational drug shipment, and digital informed consent (eConsent).
4. **Digital Health & Software as a Medical Device (SaMD):**
   - Algorithms diagnosing conditions, prescription digital therapeutics (DTx) for insomnia or substance use disorders.
   - Classification under FDA IMDRF risk categorization frameworks and cybersecurity submission guidelines.
    `,
    industryExample: {
      scenario: 'Using RWE for Pediatric Label Expansion without a Dedicated Phase III Trial',
      details:
        'A sponsor leveraged Real-World Evidence derived from a longitudinal clinical registry of 1,200 pediatric epilepsy patients taking an approved adult anti-convulsant off-label. The RA Intelligence group presented this data under FDA’s RWE Program, securing an expanded pediatric label indication without exposing hundreds of pediatric patients to a placebo-controlled trial.',
    },
    officialReferences: [
      { name: 'US FDA – Real-World Evidence Program', url: 'https://www.fda.gov/science-research/science-and-research-special-topics/real-world-evidence' },
      { name: 'EMA – Big Data & Artificial Intelligence in Medicines Regulation', url: 'https://www.ema.europa.eu/en/about-us/how-we-work/big-data' },
      { name: 'International Medical Device Regulators Forum (IMDRF)', url: 'https://www.imdrf.org' },
    ],
    relatedTopicIds: [1, 2, 3],
    downloadFilename: 'Topic-10-Regulatory-Intelligence-and-Emerging-Technologies.txt',
  },
];

// ─── RECOMMENDED LEARNING PATHS ──────────────────────────────────────────────

const RECOMMENDED_PATHS = [
  {
    id: 'bpharm',
    title: 'B.Pharm Students Foundation Path',
    badge: 'Undergraduate Curriculum',
    color: 'teal',
    description:
      'Designed to give pharmacy students a solid, practical understanding of why regulatory laws exist, how drugs obtain approvals, and how quality is governed in industrial practice.',
    topicIds: [1, 3, 4, 8],
    outcomes: 'Master core concepts of FD&C Act, CDSCO approval hierarchy, and basic cGMP/GLP principles for campus placement readiness.',
  },
  {
    id: 'mpharm',
    title: 'M.Pharm Regulatory Affairs Specialization',
    badge: 'Postgraduate Mastery',
    color: 'indigo',
    description:
      'Targeted for advanced RA postgraduates preparing for roles in dossier compiling, global strategy, eCTD publishing, and health authority liaison operations.',
    topicIds: [2, 5, 6, 7, 9],
    outcomes: 'Hands-on competency in ICH M4 CTD pyramid, XML eCTD lifecycle management, and global post-approval variation filings.',
  },
  {
    id: 'industry',
    title: 'Industry Professional & Career Transition Path',
    badge: 'Industry Upskilling',
    color: 'rose',
    description:
      'Curated for QA/QC executives, formulation scientists, clinical research coordinators, and pharmacy graduates transitioning into specialized regulatory consulting.',
    topicIds: [6, 7, 8, 9, 10],
    outcomes: 'Strategic proficiency in ICH Q1–Q14, 21 CFR Part 11 remediation, post-approval SUPAC changes, and AI-driven regulatory intelligence.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export const LearningCentrePage = ({ onNavigate, onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePathFilter, setActivePathFilter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState(null);

  const categories = ['All', 'Foundations', 'Drug Development', 'Regional Regulations', 'Harmonization', 'Dossier Assembly', 'GxP & Quality', 'Lifecycle Management', 'Future of RA'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter topics
  const filteredTopics = useMemo(() => {
    return TOPICS_DATA.filter((topic) => {
      // Path filter
      if (activePathFilter) {
        const pathObj = RECOMMENDED_PATHS.find((p) => p.id === activePathFilter);
        if (pathObj && !pathObj.topicIds.includes(topic.id)) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(query);
        const matchesSummary = topic.summary.toLowerCase().includes(query);
        const matchesContent = topic.detailedContent.toLowerCase().includes(query);
        const matchesObjectives = topic.objectives.some((obj) => obj.toLowerCase().includes(query));
        const matchesExample = topic.industryExample.scenario.toLowerCase().includes(query) || topic.industryExample.details.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesContent && !matchesObjectives && !matchesExample) {
          return false;
        }
      }

      // Level filter
      if (selectedLevel !== 'All' && topic.level !== selectedLevel) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && topic.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedLevel, selectedCategory, activePathFilter]);

  // Handle study material download
  const handleDownloadStudyNotes = (topic, e) => {
    e?.stopPropagation();
    const content = `========================================================================
REGUSPHERE 360 - PHARMACEUTICAL REGULATORY AFFAIRS LEARNING CENTRE
========================================================================
Topic ${topic.id}: ${topic.title}
Difficulty Level: ${topic.level} | Read Time: ${topic.readTime}
Target Audience: ${topic.audience.join(', ')}
Category: ${topic.category}

------------------------------------------------------------------------
EXECUTIVE SUMMARY:
------------------------------------------------------------------------
${topic.summary}

------------------------------------------------------------------------
KEY LEARNING OBJECTIVES:
------------------------------------------------------------------------
${topic.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

------------------------------------------------------------------------
DETAILED CURRICULUM & STUDY NOTES:
------------------------------------------------------------------------
${topic.detailedContent.replace(/###/g, '\n---').replace(/\*\*/g, '')}

------------------------------------------------------------------------
REAL-WORLD INDUSTRY CASE STUDY / EXAMPLE:
------------------------------------------------------------------------
Scenario: ${topic.industryExample.scenario}
Case Analysis:
${topic.industryExample.details}

------------------------------------------------------------------------
OFFICIAL STATUTORY & REGULATORY REFERENCES:
------------------------------------------------------------------------
${topic.officialReferences.map((ref) => `* ${ref.name}: ${ref.url}`).join('\n')}

========================================================================
(c) ReguSphere 360 - Professional Pharmaceutical Regulatory Affairs
Provided exclusively for academic & professional self-study purposes.
========================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = topic.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessNotice(topic.title);
    setTimeout(() => {
      setDownloadSuccessNotice(null);
    }, 4500);
  };

  const levelBadgeClass = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── TOP BREADCRUMB & CONTEXT BANNER ──────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold">ReguSphere 360</span>
            <span>/</span>
            <span className="text-slate-400">Education & Knowledge</span>
            <span>/</span>
            <span className="text-white font-semibold">Learning Centre</span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Structured Academic Resources</span>
            <span>•</span>
            <span>ICH / FDA / EMA / CDSCO Standards</span>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative py-14 sm:py-18 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-4">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>Pharmaceutical Regulatory Affairs Learning Centre</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Master Global{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300">
                Pharmaceutical Regulatory Affairs
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A comprehensive, structured academic and professional knowledge repository. Designed specifically
              for B.Pharm students, M.Pharm Regulatory Affairs candidates, pharmacy graduates, and pharmaceutical
              industry executives aiming for excellence in global submissions, GxP quality systems, and health
              authority interactions.
            </p>

            {/* Target Audience Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mr-1">Target Audiences:</span>
              {[
                { name: 'B.Pharm Students', icon: GraduationCap },
                { name: 'M.Pharm RA Students', icon: BookOpen },
                { name: 'Pharmacy Graduates', icon: Award },
                { name: 'Industry Professionals', icon: Briefcase },
                { name: 'RA Researchers', icon: Microscope },
              ].map((aud, idx) => {
                const Icon = aud.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3 text-teal-400" />
                    <span>{aud.name}</span>
                  </span>
                );
              })}
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="block text-2xl font-black text-teal-400">10</span>
                <span className="text-[11px] text-slate-400 font-medium">Core Syllabus Modules</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="block text-2xl font-black text-cyan-400">3</span>
                <span className="text-[11px] text-slate-400 font-medium">Difficulty Levels</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="block text-2xl font-black text-amber-400">40+</span>
                <span className="text-[11px] text-slate-400 font-medium">Industry Case Examples</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="block text-2xl font-black text-emerald-400">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Free Academic Notes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED LEARNING PATHS ────────────────────────────── */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
                <FolderTree className="w-3.5 h-3.5 text-teal-600" />
                <span>Tailored Curricula</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recommended Learning Pathways
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Select your academic profile or career stage to instantly highlight your optimal study track.
              </p>
            </div>

            {activePathFilter && (
              <button
                onClick={() => setActivePathFilter(null)}
                className="self-start sm:self-auto text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1 underline"
              >
                <span>Clear Path Filter (Show All 10 Topics)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECOMMENDED_PATHS.map((path) => {
              const isActive = activePathFilter === path.id;
              return (
                <div
                  key={path.id}
                  onClick={() => setActivePathFilter(isActive ? null : path.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-white border-teal-600 shadow-lg ring-2 ring-teal-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {path.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {path.topicIds.length} Core Topics
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{path.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{path.description}</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 mb-4">
                    <strong className="text-slate-800 block mb-1">Target Competency:</strong>
                    <span>{path.outcomes}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-teal-700 flex items-center space-x-1">
                      <span>{isActive ? 'Filtered Active' : 'Filter by this Pathway'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex -space-x-1">
                      {path.topicIds.map((tid) => (
                        <span
                          key={tid}
                          className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white font-mono"
                        >
                          {tid}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEARCH, FILTER & TOPICS GRID ──────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics by keywords (e.g., eCTD, IND, Schedule M, ICH Q9, ALCOA, SUPAC, BE studies)..."
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
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

              {/* Level Filter Dropdown / Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span>Level:</span>
                </span>
                <div className="flex items-center space-x-1 overflow-x-auto">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedLevel === lvl
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-2 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-semibold whitespace-nowrap">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Download Notification Toast */}
          {downloadSuccessNotice && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-sm animate-in fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Study material for <strong>{downloadSuccessNotice}</strong> has been downloaded to your device as a formatted reference guide.
                </span>
              </div>
              <button
                onClick={() => setDownloadSuccessNotice(null)}
                className="text-emerald-700 hover:text-emerald-900 text-xs font-bold ml-4"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
            <div>
              Showing <strong>{filteredTopics.length}</strong> of <strong>{TOPICS_DATA.length}</strong> learning modules
              {activePathFilter && (
                <span className="ml-2 font-semibold text-teal-700">
                  (filtered for {RECOMMENDED_PATHS.find((p) => p.id === activePathFilter)?.title})
                </span>
              )}
            </div>
            {(searchQuery || selectedLevel !== 'All' || selectedCategory !== 'All' || activePathFilter) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('All');
                  setSelectedCategory('All');
                  setActivePathFilter(null);
                }}
                className="text-teal-700 hover:underline font-bold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* TOPIC CARDS GRID */}
          {filteredTopics.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No learning modules matched your criteria</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try searching for broader terms like "eCTD", "ICH", "GMP", or clearing the category and level filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('All');
                  setSelectedCategory('All');
                  setActivePathFilter(null);
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-mono font-black text-xs flex items-center justify-center border border-teal-200">
                            {topic.id < 10 ? `0${topic.id}` : topic.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${levelBadgeClass(topic.level)}`}>
                            {topic.level}
                          </span>
                        </div>
                        <span className="flex items-center space-x-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{topic.readTime}</span>
                        </span>
                      </div>

                      {/* Title & Category */}
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {topic.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mt-0.5">
                          {topic.title}
                        </h3>
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {topic.summary}
                      </p>

                      {/* Key Learning Objectives Pill Preview */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1.5 mb-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Core Competencies:
                        </span>
                        {topic.objectives.slice(0, 2).map((obj, i) => (
                          <div key={i} className="flex items-start space-x-1.5 text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{obj}</span>
                          </div>
                        ))}
                      </div>

                      {/* Practical Industry Example Highlight */}
                      <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-[11px] text-slate-700 mb-4">
                        <span className="font-bold text-teal-900 block mb-0.5 flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-teal-600" />
                          <span>Industry Case Example:</span>
                        </span>
                        <p className="font-semibold text-slate-900 mb-0.5">{topic.industryExample.scenario}</p>
                        <p className="text-slate-600 line-clamp-2 text-[10px] leading-relaxed">
                          {topic.industryExample.details}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => handleDownloadStudyNotes(topic, e)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1.5"
                        title="Download structured study guide for this module"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        <span className="hidden sm:inline">Download Notes</span>
                        <span className="sm:hidden">Notes</span>
                      </button>

                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center space-x-1 shadow-sm group-hover:shadow"
                      >
                        <span>Study Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── EXPANDED DETAILED TOPIC MODAL / STUDY DRAWER ───────────── */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl border border-slate-200 shadow-2xl relative my-8 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[10px] font-mono font-bold">
                    MODULE {selectedTopic.id < 10 ? `0${selectedTopic.id}` : selectedTopic.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${levelBadgeClass(selectedTopic.level)}`}>
                    {selectedTopic.level}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{selectedTopic.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {selectedTopic.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Category: <strong>{selectedTopic.category}</strong> • Target: {selectedTopic.audience.join(', ')}
                </p>
              </div>

              <button
                onClick={() => setSelectedTopic(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
              {/* Executive Overview */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
                <span className="text-[10px] font-bold uppercase text-teal-900 tracking-wider block mb-1">
                  Executive Summary
                </span>
                <p className="text-slate-800 leading-relaxed text-xs sm:text-sm">{selectedTopic.summary}</p>
              </div>

              {/* Key Objectives */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
                  Key Learning Objectives
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTopic.objectives.map((obj, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-depth Detailed Notes */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                  Comprehensive Curriculum Breakdown
                </h4>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed whitespace-pre-line">
                  {selectedTopic.detailedContent}
                </div>
              </div>

              {/* Real World Industry Case Study */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 text-amber-900 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Real-World Industrial Application & Case Study</span>
                </div>
                <h5 className="font-bold text-slate-900 mb-1">{selectedTopic.industryExample.scenario}</h5>
                <p className="text-slate-700 leading-relaxed text-xs">{selectedTopic.industryExample.details}</p>
              </div>

              {/* Official References */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2 flex items-center space-x-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Official Health Authority & Statutory References</span>
                </h4>
                <div className="space-y-2">
                  {selectedTopic.officialReferences.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-500 flex items-center justify-between text-xs text-slate-800 transition-colors group"
                    >
                      <span className="font-semibold group-hover:text-teal-700">{ref.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Topics Cross Links */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                  Related Learning Modules
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.relatedTopicIds.map((rid) => {
                    const rTopic = TOPICS_DATA.find((t) => t.id === rid);
                    if (!rTopic) return null;
                    return (
                      <button
                        key={rid}
                        onClick={() => setSelectedTopic(rTopic)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                      >
                        <span className="font-mono text-[10px] font-bold text-teal-700">#{rTopic.id}</span>
                        <span>{rTopic.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 text-center sm:text-left">
                Study materials comply with ICH, US FDA, EMA, and CDSCO statutory guidelines.
              </span>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={(e) => handleDownloadStudyNotes(selectedTopic, e)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Study Notes (.txt)</span>
                </button>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER CALL TO ACTION ─────────────────────────────────── */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Academic & Industrial Mentorship</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Need Guided Training or Corporate Regulatory Workshops?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ReguSphere 360 delivers hands-on dossier publishing masterclasses, mock health authority audit
            preparation, and customized university guest lectures for B.Pharm and M.Pharm faculties.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Academic Guest Lecture / Corporate Training')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/25 flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Request Training Proposal</span>
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
