import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Globe2,
  Award,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Download,
  Search,
  Users,
  Sparkles,
  Star,
  Layers,
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  BookMarked,
  Library,
  Lightbulb,
  Target,
  TrendingUp,
  Microscope,
  Pill,
  ClipboardList,
  ScrollText,
  Landmark,
  MapPin,
  Filter,
  Play,
  Clock,
  BarChart3,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

// ─── DATA ───────────────────────────────────────────────────────────────────

const TARGET_AUDIENCE = [
  { icon: GraduationCap, label: 'B.Pharm Students', color: 'teal', desc: 'Foundational pharmaceutical sciences and regulatory basics' },
  { icon: BookOpen, label: 'M.Pharm RA Students', color: 'indigo', desc: 'Advanced regulatory affairs curriculum and dossier skills' },
  { icon: Stethoscope, label: 'Pharm.D Students', color: 'violet', desc: 'Clinical regulatory pathways and pharmacovigilance' },
  { icon: Award, label: 'Pharmacy Graduates', color: 'amber', desc: 'Career transition into regulatory affairs roles' },
  { icon: Layers, label: 'Industry Professionals', color: 'rose', desc: 'Continuing education and specialized upskilling' },
  { icon: Microscope, label: 'RA Researchers', color: 'emerald', desc: 'Deep-dive into guideline science and regulatory policy' },
];

const HUB_TABS = [
  { id: 'overview', label: 'Learning Pathways', icon: Target },
  { id: 'guidelines', label: 'Official Guidelines', icon: ScrollText },
  { id: 'topics', label: 'Topic Library', icon: Library },
  { id: 'glossary', label: 'RA Glossary', icon: BookMarked },
  { id: 'quiz', label: 'Self-Assessment Quiz', icon: HelpCircle },
  { id: 'portals', label: 'Regulatory Portals', icon: Globe2 },
];

const LEARNING_PATHWAYS = [
  {
    id: 'pathway-student',
    audience: 'B.Pharm & Pharm.D Students',
    color: 'teal',
    icon: GraduationCap,
    level: 'Foundational',
    duration: '3–6 months self-paced',
    modules: [
      { title: 'Introduction to Pharmaceutical Regulatory Affairs', topics: ['What is RA?', 'Role of regulatory bodies', 'Drug development lifecycle', 'GMP/GLP/GCP basics'] },
      { title: 'Drug Approval Pathways', topics: ['NDA / ANDA / BLA concepts', 'India CDSCO New Drug approval', 'Generic drug approval basics', 'OTC vs Prescription classification'] },
      { title: 'Pharmaceutical Quality Basics', topics: ['ICH Q1–Q12 overview', 'Pharmacopoeial standards (IP/BP/USP)', 'Stability testing concepts', 'Specifications and CoA'] },
      { title: 'Labelling & Pharmacovigilance', topics: ['Drug labelling requirements', 'Package insert components', 'ADR reporting basics', 'Pharmacovigilance Programme India (PvPI)'] },
    ],
    resources: ['ICH Q-series guideline summaries', 'CDSCO Drug Approval FAQs', 'WHO Model Formulary Access', 'IP/BP monograph reading guide'],
    outcomes: ['Understand end-to-end drug regulatory process', 'Navigate Indian pharmaceutical regulations', 'Identify key ICH quality guidelines', 'Prepare for industry entry-level RA roles'],
  },
  {
    id: 'pathway-mpharm',
    audience: 'M.Pharm Regulatory Affairs Students',
    color: 'indigo',
    icon: BookOpen,
    level: 'Advanced',
    duration: '6–12 months intensive',
    modules: [
      { title: 'ICH CTD/eCTD Dossier Architecture', topics: ['Module 1–5 structure', 'Regional administrative requirements', 'eCTD v3.2.2 vs v4.0 differences', 'XML backbone and leaf documents'] },
      { title: 'CMC Documentation (Module 3)', topics: ['Drug substance characterization', 'Drug product manufacturing controls', 'Analytical method development', 'Stability protocol design'] },
      { title: 'Clinical & Non-clinical Overviews', topics: ['Module 2.4 Non-clinical written overview', 'Module 2.5 Clinical overview', 'Module 2.7 Clinical summaries', 'CSR alignment with ICH E3'] },
      { title: 'Global Submission Strategy', topics: ['FDA 21 CFR 314/601', 'EMA Centralised Procedure', 'CDSCO Schedule Y', 'Mutual Recognition Agreements'] },
    ],
    resources: ['ICH M4 CTD guideline full text', 'FDA ESG Technical Conformance Guide', 'EMA eSubmission Portal guidance', 'Sample eCTD XML structure templates'],
    outcomes: ['Build complete CTD dossiers independently', 'Navigate eCTD validation requirements', 'Write regulatory overviews and summaries', 'Advise on global registration strategy'],
  },
  {
    id: 'pathway-professional',
    audience: 'Industry Professionals & RA Researchers',
    color: 'rose',
    icon: TrendingUp,
    level: 'Expert / Specialist',
    duration: 'Ongoing / modular',
    modules: [
      { title: 'Post-Approval Regulatory Operations', topics: ['Variation classification (Type IA/IB/II)', 'FDA PAS/CBE-30/CBE-0 submissions', 'Annual product reviews and periodic reports', 'Manufacturing site transfers'] },
      { title: 'Advanced Biologics & Biosimilar Regulation', topics: ['ICH Q5A–Q5E biological guidelines', 'FDA 351(a) vs 351(k) pathways', 'EMA biosimilar regulatory framework', 'Comparability protocols'] },
      { title: 'Digital & Electronic Regulatory Systems', topics: ['FDA 21 CFR Part 11 compliance', 'EU Annex 11 electronic records', 'IDMP implementation (ISO SPOR)', 'RIM system architecture'] },
      { title: 'Health Authority Interaction Strategy', topics: ['Pre-IND Type A/B/C meetings', 'EMA Scientific Advice procedures', 'CDSCO pre-submission consultations', 'Briefing document preparation'] },
    ],
    resources: ['FDA CDER Manual of Procedures', 'EMA Procedural Guidance database', 'ICH M12 DDI guideline', 'ISPE GAMP 5 reference'],
    outcomes: ['Lead complex international dossier submissions', 'Manage regulatory risk and variation strategy', 'Navigate biologics and biosimilar regulations', 'Interface directly with global health authorities'],
  },
];

const OFFICIAL_GUIDELINES = [
  {
    category: 'ICH Quality Guidelines',
    color: 'teal',
    icon: FlaskConical,
    items: [
      { code: 'ICH Q1A–Q1F', title: 'Stability Testing of Drug Substances and Products', url: 'https://www.ich.org/page/quality-guidelines', desc: 'Comprehensive stability testing requirements across climatic zones.' },
      { code: 'ICH Q2(R2)', title: 'Validation of Analytical Procedures', url: 'https://www.ich.org/page/quality-guidelines', desc: 'Method validation parameters: accuracy, precision, specificity, linearity.' },
      { code: 'ICH Q3A/B/C/D', title: 'Impurities Guidelines', url: 'https://www.ich.org/page/quality-guidelines', desc: 'Thresholds and qualification of drug substance/product/residual solvents/elemental impurities.' },
      { code: 'ICH Q8(R2)', title: 'Pharmaceutical Development', url: 'https://www.ich.org/page/quality-guidelines', desc: 'Quality by Design (QbD) approach to pharmaceutical product development.' },
      { code: 'ICH Q9(R1)', title: 'Quality Risk Management', url: 'https://www.ich.org/page/quality-guidelines', desc: 'Risk assessment principles: FMEA, HACCP, risk ranking and filtering.' },
      { code: 'ICH Q10', title: 'Pharmaceutical Quality System', url: 'https://www.ich.org/page/quality-guidelines', desc: 'PQS model covering lifecycle management and continual improvement.' },
    ],
  },
  {
    category: 'ICH Safety Guidelines',
    color: 'rose',
    icon: ShieldCheck,
    items: [
      { code: 'ICH S1A–S1C', title: 'Carcinogenicity Studies', url: 'https://www.ich.org/page/safety-guidelines', desc: 'Need for and design of carcinogenicity studies for pharmaceuticals.' },
      { code: 'ICH S2(R1)', title: 'Genotoxicity Testing', url: 'https://www.ich.org/page/safety-guidelines', desc: 'Standard genotoxicity battery and guidance on ICH-compliant test design.' },
      { code: 'ICH S6(R1)', title: 'Preclinical Safety for Biotechnology Products', url: 'https://www.ich.org/page/safety-guidelines', desc: 'Non-clinical development approach for biotech-derived products.' },
      { code: 'ICH S9', title: 'Nonclinical Evaluation for Anticancer Pharmaceuticals', url: 'https://www.ich.org/page/safety-guidelines', desc: 'Tailored non-clinical safety package for oncology products.' },
    ],
  },
  {
    category: 'ICH Efficacy Guidelines',
    color: 'indigo',
    icon: BarChart3,
    items: [
      { code: 'ICH E1–E6', title: 'Clinical Study Design & GCP', url: 'https://www.ich.org/page/efficacy-guidelines', desc: 'Population exposure, gender, dose-response studies, and GCP principles.' },
      { code: 'ICH E8(R1)', title: 'General Considerations for Clinical Studies', url: 'https://www.ich.org/page/efficacy-guidelines', desc: 'Updated framework for clinical study design and conduct.' },
      { code: 'ICH E9(R1)', title: 'Statistical Principles & Estimands', url: 'https://www.ich.org/page/efficacy-guidelines', desc: 'Estimand framework for clinical trial analysis and reporting.' },
      { code: 'ICH E14/S7B', title: 'QT/QTc Prolongation Assessment', url: 'https://www.ich.org/page/efficacy-guidelines', desc: 'Cardiac safety assessment combining clinical and non-clinical data.' },
    ],
  },
  {
    category: 'ICH Multidisciplinary Guidelines',
    color: 'amber',
    icon: Layers,
    items: [
      { code: 'ICH M4 (CTD)', title: 'Common Technical Document Structure', url: 'https://www.ich.org/page/multidisciplinary-guidelines', desc: 'Module 1–5 CTD/eCTD architecture and content requirements.' },
      { code: 'ICH M7(R2)', title: 'Assessment of Mutagenic Impurities', url: 'https://www.ich.org/page/multidisciplinary-guidelines', desc: 'Control of potentially mutagenic impurities using (Q)SAR and TTC.' },
      { code: 'ICH M9', title: 'Biopharmaceutics Classification System (BCS)', url: 'https://www.ich.org/page/multidisciplinary-guidelines', desc: 'BCS-based biowaivers for immediate-release solid oral dosage forms.' },
      { code: 'ICH M11', title: 'Clinical Electronic Structured Harmonised Protocol', url: 'https://www.ich.org/page/multidisciplinary-guidelines', desc: 'Common protocol template for structured clinical trial applications.' },
    ],
  },
];

const TOPIC_LIBRARY = [
  {
    category: 'Drug Development Fundamentals',
    icon: Pill,
    color: 'teal',
    topics: [
      { title: 'Pharmaceutical Drug Development Lifecycle', level: 'Beginner', readTime: '12 min', desc: 'Discovery → Preclinical → Phase I/II/III → NDA/BLA → Post-market surveillance overview.' },
      { title: 'Generic Drug Regulatory Framework', level: 'Beginner', readTime: '10 min', desc: 'ANDA filing, Paragraph IV certification, bioequivalence study design and Orange Book listings.' },
      { title: 'Biologics & Biosimilars: Regulatory Distinction', level: 'Intermediate', readTime: '18 min', desc: 'BLA vs ANDA pathway, 351(a) originator vs 351(k) biosimilar, interchangeability designation.' },
      { title: 'Orphan Drug Designation & Fast Track', level: 'Intermediate', readTime: '15 min', desc: 'FDA expedited programs: Fast Track, Breakthrough Therapy, Accelerated Approval, Priority Review.' },
    ],
  },
  {
    category: 'Dossier Writing & CTD',
    icon: FileText,
    color: 'indigo',
    topics: [
      { title: 'ICH CTD Module 2 Writing Masterguide', level: 'Advanced', readTime: '25 min', desc: 'Detailed guidance on writing Module 2.3 QOS, 2.4 Non-clinical Overview, 2.5 Clinical Overview.' },
      { title: 'eCTD XML Structure & Validation', level: 'Advanced', readTime: '20 min', desc: 'eCTD backbone XML, leaf document hyperlinking, Lorenz / Extedo validation requirements.' },
      { title: 'Module 3 CMC Documentation Standards', level: 'Advanced', readTime: '22 min', desc: 'Drug substance (3.2.S) and drug product (3.2.P) dossier content and format standards.' },
      { title: 'Clinical Study Report (CSR) Structure', level: 'Intermediate', readTime: '16 min', desc: 'ICH E3 compliant CSR sections, tables, figures, listings and appendix requirements.' },
    ],
  },
  {
    category: 'GxP & Compliance',
    icon: ClipboardList,
    color: 'rose',
    topics: [
      { title: 'GMP Fundamentals for Regulatory Professionals', level: 'Beginner', readTime: '14 min', desc: 'cGMP principles, 21 CFR Part 211, WHO GMP guidelines and Schedule M (India).' },
      { title: '21 CFR Part 11 Electronic Records Compliance', level: 'Intermediate', readTime: '18 min', desc: 'Audit trails, electronic signatures, system validation requirements and hybrid records.' },
      { title: 'SOP Writing for GxP Environments', level: 'Intermediate', readTime: '12 min', desc: 'SOP structure, document numbering conventions, review/approval workflows and change control.' },
      { title: 'Pharmacovigilance & ADR Reporting', level: 'Intermediate', readTime: '20 min', desc: 'ICH E2A/E2B, MedDRA coding, SUSAR reporting, signal detection and RMP preparation.' },
    ],
  },
  {
    category: 'Global Regulatory Agencies',
    icon: Globe2,
    color: 'amber',
    topics: [
      { title: 'US FDA: Structure, Divisions & Submission Pathways', level: 'Beginner', readTime: '16 min', desc: 'CDER, CBER, CDRH overview, NDA/ANDA/BLA submission types and FDA review divisions.' },
      { title: 'EMA Centralised & Decentralised Procedures', level: 'Intermediate', readTime: '14 min', desc: 'EMA Marketing Authorisation Application (MAA), CP/DCP/MRP, CHMP review process.' },
      { title: 'CDSCO Drug Approval in India', level: 'Intermediate', readTime: '15 min', desc: 'Schedule Y, SUGAM portal, New Drug Application process, clinical trial regulations.' },
      { title: 'MHRA Post-Brexit Regulatory Landscape', level: 'Advanced', readTime: '12 min', desc: 'Great Britain vs Northern Ireland regulations, MHRA submissions and reliance procedures.' },
    ],
  },
];

const RA_GLOSSARY = [
  { term: 'ANDA', expansion: 'Abbreviated New Drug Application', definition: 'A regulatory submission to the US FDA for the approval of a generic drug product. ANDAs demonstrate that the generic is bioequivalent to the reference listed drug (RLD).' },
  { term: 'API', expansion: 'Active Pharmaceutical Ingredient', definition: 'The biologically active component in a pharmaceutical drug product that produces the intended therapeutic effect.' },
  { term: 'BLA', expansion: 'Biologics License Application', definition: 'A submission to the US FDA requesting authorization to market a biologic product, governed by Section 351 of the Public Health Service Act.' },
  { term: 'CMC', expansion: 'Chemistry, Manufacturing & Controls', definition: 'The section of a regulatory dossier (Module 3 in CTD) covering drug substance and drug product composition, manufacturing process, analytical controls, and stability.' },
  { term: 'CRO', expansion: 'Contract Research Organization', definition: 'A company that provides research, clinical trial, regulatory and other pharmaceutical services to the biotechnology and pharmaceutical industries.' },
  { term: 'CSR', expansion: 'Clinical Study Report', definition: 'A comprehensive report of an individual clinical study, prepared according to ICH E3 guidelines, submitted as part of a marketing authorization application.' },
  { term: 'CTD', expansion: 'Common Technical Document', definition: 'The harmonized format developed by ICH for organizing regulatory submissions to health authorities in ICH member regions (US, EU, Japan and others).' },
  { term: 'CDSCO', expansion: 'Central Drugs Standard Control Organisation', definition: 'The national regulatory authority of India responsible for regulating drugs, cosmetics, medical devices and diagnostics.' },
  { term: 'DMF', expansion: 'Drug Master File', definition: 'A submission to the US FDA providing confidential information about facilities, processes, or articles used in the manufacturing, processing, or packaging of drugs.' },
  { term: 'eCTD', expansion: 'Electronic Common Technical Document', definition: 'The electronic version of the CTD, organized as a hierarchical XML file structure used for electronic submissions to global health authorities.' },
  { term: 'EMA', expansion: 'European Medicines Agency', definition: 'The regulatory agency responsible for the scientific evaluation, supervision and safety monitoring of medicines in the European Union.' },
  { term: 'GCP', expansion: 'Good Clinical Practice', definition: 'An international ethical and scientific quality standard for designing, conducting, recording, and reporting clinical trials. Defined by ICH E6.' },
  { term: 'GLP', expansion: 'Good Laboratory Practice', definition: 'A set of principles ensuring the quality and integrity of non-clinical safety studies conducted to support regulatory submissions.' },
  { term: 'GMP', expansion: 'Good Manufacturing Practice', definition: 'Regulations ensuring that pharmaceutical products are consistently produced and controlled according to quality standards appropriate to their intended use.' },
  { term: 'ICH', expansion: 'International Council for Harmonisation', definition: 'An international body bringing together regulatory authorities and pharmaceutical industry to develop harmonized guidelines for pharmaceutical product registration.' },
  { term: 'IND', expansion: 'Investigational New Drug Application', definition: 'A US FDA filing that allows pharmaceutical sponsors to begin clinical investigations of a drug candidate in humans before it is approved for sale.' },
  { term: 'MAA', expansion: 'Marketing Authorisation Application', definition: 'The regulatory dossier submitted to the European Medicines Agency (EMA) or national competent authorities to obtain permission to market a medicine in Europe.' },
  { term: 'NDA', expansion: 'New Drug Application', definition: 'A formal US FDA submission by drug sponsors requesting approval to market a new pharmaceutical drug in the United States after satisfactory clinical development.' },
  { term: 'PV / PhV', expansion: 'Pharmacovigilance', definition: 'The science and activities relating to the detection, assessment, understanding and prevention of adverse effects or any other drug-related problems.' },
  { term: 'QbD', expansion: 'Quality by Design', definition: 'A systematic approach to pharmaceutical development that begins with predefined objectives and emphasizes product and process understanding and process control, as defined in ICH Q8.' },
  { term: 'RMP', expansion: 'Risk Management Plan', definition: 'A document required by the EMA for new medicines, describing safety concerns identified, risk minimization measures, and plans for ongoing evaluation.' },
  { term: 'SUSAR', expansion: 'Suspected Unexpected Serious Adverse Reaction', definition: 'An adverse reaction to a medicine that is both unexpected and serious. SUSARs must be reported to health authorities within defined timeframes (7 or 15 days).' },
];

const QUIZ_QUESTIONS = [
  { id: 1, question: 'Which ICH guideline governs the structure of the Common Technical Document (CTD)?', options: ['ICH Q8', 'ICH M4', 'ICH E6', 'ICH S2'], answer: 1, explanation: 'ICH M4 defines the organization of the Common Technical Document (CTD) across its five modules.' },
  { id: 2, question: 'What does "ANDA" stand for in US FDA regulatory submissions?', options: ['Advanced New Drug Application', 'Abbreviated New Drug Application', 'Approved New Drug Authorization', 'Annual New Drug Assessment'], answer: 1, explanation: 'ANDA stands for Abbreviated New Drug Application — the submission pathway for generic drug approvals at FDA.' },
  { id: 3, question: 'Which module of the ICH CTD contains Chemistry, Manufacturing and Controls (CMC) information?', options: ['Module 1', 'Module 2', 'Module 3', 'Module 4'], answer: 2, explanation: 'Module 3 of the CTD contains all CMC information including drug substance (3.2.S) and drug product (3.2.P) documentation.' },
  { id: 4, question: 'The ICH Q9 guideline covers which topic?', options: ['Stability Testing', 'Pharmaceutical Development (QbD)', 'Quality Risk Management', 'Pharmaceutical Quality System'], answer: 2, explanation: 'ICH Q9 provides principles and tools for quality risk management, including FMEA, HACCP, and fault tree analysis.' },
  { id: 5, question: 'Which regulatory body in India is responsible for drug approvals?', options: ['WHO', 'CDSCO', 'EMA', 'TGA'], answer: 1, explanation: 'CDSCO (Central Drugs Standard Control Organisation) is the national regulatory authority of India responsible for drug approvals.' },
  { id: 6, question: 'What is the primary purpose of a Drug Master File (DMF)?', options: ['To register a new brand name', 'To submit confidential manufacturing or component information to FDA', 'To apply for GMP certification', 'To report adverse drug reactions'], answer: 1, explanation: 'A DMF allows pharmaceutical manufacturers to submit confidential information about drug ingredients or manufacturing to FDA, without full disclosure to the drug applicant.' },
  { id: 7, question: 'ICH E6(R2) describes standards for which practice?', options: ['Good Manufacturing Practice', 'Good Laboratory Practice', 'Good Clinical Practice', 'Good Distribution Practice'], answer: 2, explanation: 'ICH E6(R2) is the global standard for Good Clinical Practice (GCP), governing the design, conduct and reporting of clinical trials.' },
  { id: 8, question: 'The term "eCTD" refers to which regulatory concept?', options: ['Electronic Certificate of Testing Document', 'Electronic Common Technical Document', 'European CTD format only', 'Enhanced Clinical Trial Document'], answer: 1, explanation: 'eCTD (Electronic Common Technical Document) is the XML-based electronic format for organizing and submitting regulatory dossiers to health authorities.' },
  { id: 9, question: 'What is a SUSAR in pharmacovigilance?', options: ['Standard Unexpected Safety Assessment Report', 'Suspected Unexpected Serious Adverse Reaction', 'Systematic Unified Signal and Risk Report', 'Safety Update Study and Review'], answer: 1, explanation: 'SUSAR stands for Suspected Unexpected Serious Adverse Reaction — a serious adverse reaction not listed in the product information that must be reported urgently.' },
  { id: 10, question: 'Which ICH guideline introduced the "estimand" framework for clinical trials?', options: ['ICH E6(R2)', 'ICH E8(R1)', 'ICH E9(R1)', 'ICH E14'], answer: 2, explanation: 'ICH E9(R1) introduced the estimand framework to align clinical trial objectives with statistical analysis and handle intercurrent events.' },
];

const REGULATORY_PORTALS = [
  { name: 'US FDA – Drugs', url: 'https://www.fda.gov/drugs', region: 'United States', desc: 'Drug approvals, NDAs, ANDAs, guidances and label databases.', color: 'teal' },
  { name: 'US FDA Electronic Submissions Gateway', url: 'https://www.fda.gov/industry/electronic-submissions-gateway', region: 'United States', desc: 'ESG for submitting eCTD applications electronically to FDA.', color: 'teal' },
  { name: 'European Medicines Agency (EMA)', url: 'https://www.ema.europa.eu', region: 'European Union', desc: 'EMA product database, CHMP opinions, and eSubmission guidance.', color: 'indigo' },
  { name: 'EMA eSubmission Portal', url: 'https://esubmission.ema.europa.eu', region: 'European Union', desc: 'Official portal for submitting regulatory applications to EMA.', color: 'indigo' },
  { name: 'CDSCO – India', url: 'https://cdsco.gov.in', region: 'India', desc: 'SUGAM online portal for drug approvals, clinical trial applications.', color: 'amber' },
  { name: 'UK MHRA', url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency', region: 'United Kingdom', desc: 'MHRA submissions, product information and regulatory news.', color: 'rose' },
  { name: 'Japan PMDA', url: 'https://www.pmda.go.jp/english/', region: 'Japan', desc: 'Japanese regulatory authority for drugs, medical devices and biologics.', color: 'violet' },
  { name: 'Health Canada – Drugs', url: 'https://www.canada.ca/en/health-canada/services/drugs-health-products.html', region: 'Canada', desc: 'Health Canada drug review, NOC and product monograph database.', color: 'rose' },
  { name: 'TGA – Australia', url: 'https://www.tga.gov.au', region: 'Australia', desc: 'Australian Register of Therapeutic Goods (ARTG) and guidance portal.', color: 'emerald' },
  { name: 'ICH Official Guideline Library', url: 'https://www.ich.org/page/ich-guidelines', region: 'International', desc: 'Full library of Q, S, E and M harmonized ICH guidelines.', color: 'slate' },
  { name: 'WHO Essential Medicines', url: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists', region: 'International', desc: 'WHO Model List of Essential Medicines and complementary list.', color: 'slate' },
  { name: 'PubMed / MEDLINE', url: 'https://pubmed.ncbi.nlm.nih.gov/', region: 'Research', desc: 'Biomedical literature database for regulatory science and clinical research.', color: 'emerald' },
];

// ─── COLOUR HELPERS ──────────────────────────────────────────────────────────

const colorMap = {
  teal: { badge: 'bg-teal-50 text-teal-700 border-teal-200', icon: 'bg-teal-50 text-teal-600', ring: 'border-teal-500 ring-teal-500/20', dot: 'bg-teal-500', btn: 'bg-teal-600 hover:bg-teal-700', text: 'text-teal-700' },
  indigo: { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: 'bg-indigo-50 text-indigo-600', ring: 'border-indigo-500 ring-indigo-500/20', dot: 'bg-indigo-500', btn: 'bg-indigo-600 hover:bg-indigo-700', text: 'text-indigo-700' },
  amber: { badge: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'bg-amber-50 text-amber-600', ring: 'border-amber-500 ring-amber-500/20', dot: 'bg-amber-500', btn: 'bg-amber-600 hover:bg-amber-700', text: 'text-amber-700' },
  rose: { badge: 'bg-rose-50 text-rose-700 border-rose-200', icon: 'bg-rose-50 text-rose-600', ring: 'border-rose-500 ring-rose-500/20', dot: 'bg-rose-500', btn: 'bg-rose-600 hover:bg-rose-700', text: 'text-rose-700' },
  violet: { badge: 'bg-violet-50 text-violet-700 border-violet-200', icon: 'bg-violet-50 text-violet-600', ring: 'border-violet-500 ring-violet-500/20', dot: 'bg-violet-500', btn: 'bg-violet-600 hover:bg-violet-700', text: 'text-violet-700' },
  emerald: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: 'bg-emerald-50 text-emerald-600', ring: 'border-emerald-500 ring-emerald-500/20', dot: 'bg-emerald-500', btn: 'bg-emerald-600 hover:bg-emerald-700', text: 'text-emerald-700' },
  slate: { badge: 'bg-slate-100 text-slate-700 border-slate-200', icon: 'bg-slate-100 text-slate-600', ring: 'border-slate-400 ring-slate-400/20', dot: 'bg-slate-500', btn: 'bg-slate-700 hover:bg-slate-800', text: 'text-slate-700' },
};

const levelColor = { Beginner: 'bg-teal-50 text-teal-700 border-teal-200', Intermediate: 'bg-amber-50 text-amber-700 border-amber-200', Advanced: 'bg-rose-50 text-rose-700 border-rose-200', Expert: 'bg-violet-50 text-violet-700 border-violet-200' };

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const LearningPathwaysTab = ({ onOpenEnquiry }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-10">
      {/* Pathway Cards */}
      {LEARNING_PATHWAYS.map((pathway) => {
        const c = colorMap[pathway.color];
        const Icon = pathway.icon;
        const isOpen = expanded === pathway.id;

        return (
          <div key={pathway.id} className={`bg-white rounded-2xl border-2 transition-all duration-200 shadow-sm overflow-hidden ${isOpen ? `${c.ring} shadow-md ring-1` : 'border-slate-200 hover:border-slate-300'}`}>
            {/* Header */}
            <button
              className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4"
              onClick={() => setExpanded(isOpen ? null : pathway.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${c.badge} mr-2`}>{pathway.level}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{pathway.duration}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{pathway.audience}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pathway.modules.length} learning modules · {pathway.outcomes.length} professional outcomes</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable Body */}
            {isOpen && (
              <div className="px-6 sm:px-8 pb-8 space-y-6 border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                  {/* Modules */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Curriculum Modules</h4>
                    <div className="space-y-3">
                      {pathway.modules.map((mod, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="text-sm font-bold text-slate-900 mb-2">{mod.title}</p>
                          <ul className="space-y-1">
                            {mod.topics.map((t, ti) => (
                              <li key={ti} className="flex items-start gap-2 text-[11px] text-slate-600">
                                <ChevronRight className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes + Resources */}
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Learning Outcomes</h4>
                      <ul className="space-y-2">
                        {pathway.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${c.text}`} />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border ${c.badge}`}>
                      <h4 className="text-xs font-bold mb-2 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5" />
                        Recommended Study Resources
                      </h4>
                      <ul className="space-y-1">
                        {pathway.resources.map((r, i) => (
                          <li key={i} className="text-[11px] flex items-start gap-1.5">
                            <Star className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-70" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry('Regulatory Education & Corporate Training')}
                      className={`w-full py-3 px-5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm ${c.btn}`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Enquire About This Learning Path
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const GuidelinesTab = () => {
  const [search, setSearch] = useState('');

  const filtered = OFFICIAL_GUIDELINES.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search guidelines by code or topic (e.g. Q9, stability, impurities)…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 shadow-sm"
        />
      </div>

      {filtered.map((cat) => {
        const c = colorMap[cat.color];
        const CatIcon = cat.icon;
        return (
          <div key={cat.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
                <CatIcon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{cat.category}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.badge}`}>{cat.items.length} guidelines</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.items.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${c.badge}`}>{item.code}</span>
                      <p className="text-sm font-bold text-slate-900 mt-2 leading-tight">{item.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 flex-shrink-0 mt-1 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No guidelines match your search.</p>
          <p className="text-xs mt-1">Try searching by code (e.g. "Q8") or topic (e.g. "stability").</p>
        </div>
      )}
    </div>
  );
};

const TopicLibraryTab = () => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = TOPIC_LIBRARY.map(cat => ({
    ...cat,
    topics: cat.topics.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
      const matchLevel = levelFilter === 'All' || t.level === levelFilter;
      return matchSearch && matchLevel;
    }),
  })).filter(cat => cat.topics.length > 0);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={`text-xs px-3 py-2 rounded-lg border font-semibold transition-colors ${levelFilter === l ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {filtered.map(cat => {
        const c = colorMap[cat.color];
        const CatIcon = cat.icon;
        return (
          <div key={cat.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
                <CatIcon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{cat.category}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.topics.map((topic, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group cursor-default">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${levelColor[topic.level] || levelColor['Beginner']}`}>{topic.level}</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {topic.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">{topic.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No topics match your filters.</p>
        </div>
      )}
    </div>
  );
};

const GlossaryTab = () => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const letters = ['All', ...Array.from(new Set(RA_GLOSSARY.map(g => g.term[0]))).sort()];

  const filtered = RA_GLOSSARY.filter(g => {
    const matchSearch = g.term.toLowerCase().includes(search.toLowerCase()) || g.expansion.toLowerCase().includes(search.toLowerCase()) || g.definition.toLowerCase().includes(search.toLowerCase());
    const matchLetter = selectedLetter === 'All' || g.term.startsWith(selectedLetter);
    return matchSearch && matchLetter;
  });

  return (
    <div className="space-y-6">
      {/* Search + Alpha Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search term, abbreviation or definition…"
            value={search}
            onChange={e => { setSearch(e.target.value); setSelectedLetter('All'); }}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm"
          />
        </div>
      </div>

      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-1.5">
        {letters.map(l => (
          <button
            key={l}
            onClick={() => setSelectedLetter(l)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-bold transition-colors ${selectedLetter === l ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-400 hover:text-teal-700'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-slate-500">{filtered.length} term{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((g, i) => (
          <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-sm transition-all">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-black text-teal-700 font-mono">{g.term}</span>
              <span className="text-[10px] text-slate-400 font-medium">— {g.expansion}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{g.definition}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookMarked className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No glossary terms match your search.</p>
        </div>
      )}
    </div>
  );
};

const QuizTab = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const totalQ = QUIZ_QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const score = submitted ? QUIZ_QUESTIONS.filter(q => answers[q.id] === q.answer).length : 0;
  const percent = submitted ? Math.round((score / totalQ) * 100) : 0;

  const handleSelect = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    if (answered < totalQ) return;
    setSubmitted(true);
    setCurrentQ(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  };

  if (submitted) {
    const tier = percent >= 80 ? { label: 'Expert Proficiency', color: 'emerald', msg: 'Outstanding! You have a strong command of pharmaceutical regulatory affairs fundamentals.' }
      : percent >= 60 ? { label: 'Intermediate Knowledge', color: 'amber', msg: 'Good foundation! Review the topics where you missed answers to strengthen your knowledge.' }
      : { label: 'Foundational Gap Identified', color: 'rose', msg: 'Explore the Topic Library and Official Guidelines sections to build your regulatory knowledge base.' };
    const tc = colorMap[tier.color];

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score Card */}
        <div className={`p-8 rounded-2xl border-2 ${tc.ring} bg-white text-center`}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${tc.badge} mb-4`}>
            <Award className="w-4 h-4" /> {tier.label}
          </div>
          <div className="text-6xl font-black text-slate-900 mb-1">{percent}%</div>
          <p className="text-sm text-slate-500 mb-4">{score} of {totalQ} questions correct</p>
          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className={`h-full rounded-full transition-all ${tc.btn}`} style={{ width: `${percent}%` }} />
          </div>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">{tier.msg}</p>
        </div>

        {/* Question Review */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Question-by-Question Review</h3>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCorrect = answers[q.id] === q.answer;
            return (
              <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <p className="text-sm font-bold text-slate-900 mb-2">{idx + 1}. {q.question}</p>
                <p className={`text-xs font-semibold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isCorrect ? '✓ Correct' : `✗ You selected: "${q.options[answers[q.id]]}"`}
                </p>
                {!isCorrect && <p className="text-xs text-emerald-700 font-medium mb-1">Correct answer: "{q.options[q.answer]}"</p>}
                <p className="text-[11px] text-slate-600 italic">{q.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-600">Question {currentQ + 1} of {totalQ}</span>
          <span className="text-xs text-slate-400">{answered} answered</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <p className="text-base font-bold text-slate-900 leading-snug">{q.question}</p>

        <div className="space-y-2.5">
          {q.options.map((opt, oIdx) => {
            const isSelected = answers[q.id] === oIdx;
            return (
              <button
                key={oIdx}
                onClick={() => handleSelect(q.id, oIdx)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold shadow-sm ring-1 ring-teal-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-black ${isSelected ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300'}`}>
                  {isSelected && '✓'}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors px-3 py-2"
          >
            ← Previous
          </button>

          {currentQ < totalQ - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answered < totalQ}
              className={`px-6 py-2.5 rounded-xl text-white font-bold text-xs transition-colors shadow-sm ${answered < totalQ ? 'bg-slate-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
            >
              {answered < totalQ ? `Answer all (${totalQ - answered} remaining)` : 'Submit & See Results'}
            </button>
          )}
        </div>
      </div>

      {/* All questions mini-nav */}
      <div className="flex flex-wrap gap-2 justify-center">
        {QUIZ_QUESTIONS.map((qq, idx) => (
          <button
            key={qq.id}
            onClick={() => setCurrentQ(idx)}
            className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all ${
              idx === currentQ ? 'bg-teal-600 text-white border-teal-600' :
              answers[qq.id] !== undefined ? 'bg-teal-50 text-teal-700 border-teal-300' :
              'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const PortalsTab = () => {
  const regions = ['All', ...Array.from(new Set(REGULATORY_PORTALS.map(p => p.region)))];
  const [regionFilter, setRegionFilter] = useState('All');

  const filtered = REGULATORY_PORTALS.filter(p => regionFilter === 'All' || p.region === regionFilter);

  return (
    <div className="space-y-6">
      {/* Region Filter */}
      <div className="flex flex-wrap gap-2">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className={`text-xs px-3 py-2 rounded-lg border font-semibold transition-colors ${regionFilter === r ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((portal, i) => {
          const c = colorMap[portal.color];
          return (
            <a
              key={i}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.badge}`}>{portal.region}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-700 transition-colors">{portal.name}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{portal.desc}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export const EducationHubPage = ({ onNavigate, onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-teal-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ReguSphere 360 — Education Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Learn.{' '}
            <span className="text-teal-400">Explore.</span>{' '}
            Understand.{' '}
            <span className="text-teal-400">Excel.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
            in Pharmaceutical Regulatory Affairs.
          </p>
          <p className="mt-4 text-base text-slate-400 max-w-2xl leading-relaxed">
            Your dedicated learning destination for pharmaceutical regulatory knowledge, academic resources, global guidelines and professional development.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-teal-500/20"
            >
              <Play className="w-4 h-4" />
              Start Learning
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Take Self-Assessment Quiz
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <ScrollText className="w-4 h-4" />
              Browse ICH Guidelines
            </button>
            <button
              onClick={() => onNavigate('mpharm-study-corner')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow-lg"
            >
              <GraduationCap className="w-4 h-4" />
              M.Pharm Study Corner
            </button>
            <button
              onClick={() => onNavigate('learning-centre')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-cyan-300" />
              Learning Centre (10 Topics)
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '6+', label: 'Target Audiences', icon: Users },
              { value: '20+', label: 'ICH Guidelines Covered', icon: ScrollText },
              { value: '16+', label: 'In-depth Topic Articles', icon: BookOpen },
              { value: '22+', label: 'RA Glossary Terms', icon: BookMarked },
            ].map((stat, i) => {
              const SIcon = stat.icon;
              return (
                <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                  <SIcon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE STRIP ────────────────────────────────── */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-400 text-center mb-6">Designed for every stage of your pharmaceutical career</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TARGET_AUDIENCE.map((aud, i) => {
              const AIcon = aud.icon;
              const c = colorMap[aud.color];
              return (
                <div key={i} className={`p-4 rounded-xl border text-center transition-colors hover:shadow-sm cursor-default ${c.badge}`}>
                  <AIcon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-bold leading-tight">{aud.label}</p>
                  <p className="text-[10px] mt-1 opacity-70 leading-tight hidden sm:block">{aud.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TAB BAR ──────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {HUB_TABS.map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 min-h-96">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Header */}
          {(() => {
            const tabMeta = {
              overview: { title: 'Learning Pathways', subtitle: 'Structured curriculum tracks for every stage of your pharmaceutical regulatory career.', icon: Target },
              guidelines: { title: 'Official ICH Guideline Library', subtitle: 'Direct access to harmonized Q, S, E and M guidelines from the International Council for Harmonisation.', icon: ScrollText },
              topics: { title: 'Regulatory Topic Library', subtitle: 'In-depth articles and study notes covering key pharmaceutical regulatory affairs concepts.', icon: Library },
              glossary: { title: 'Regulatory Affairs Glossary', subtitle: 'Comprehensive A–Z definitions of essential pharmaceutical regulatory abbreviations and terminology.', icon: BookMarked },
              quiz: { title: 'Self-Assessment Quiz', subtitle: 'Test your regulatory knowledge with 10 curated questions across ICH guidelines, drug approval pathways and GxP compliance.', icon: HelpCircle },
              portals: { title: 'Global Regulatory Authority Portals', subtitle: 'Direct links to official health authority websites for US FDA, EMA, CDSCO, MHRA, TGA, PMDA and more.', icon: Globe2 },
            };
            const meta = tabMeta[activeTab];
            const MetaIcon = meta.icon;
            return (
              <div className="mb-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <MetaIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{meta.title}</h2>
                  <p className="text-sm text-slate-500 mt-1 max-w-2xl">{meta.subtitle}</p>
                </div>
              </div>
            );
          })()}

          {/* Render Tab */}
          {activeTab === 'overview' && <LearningPathwaysTab onOpenEnquiry={onOpenEnquiry} />}
          {activeTab === 'guidelines' && <GuidelinesTab />}
          {activeTab === 'topics' && <TopicLibraryTab />}
          {activeTab === 'glossary' && <GlossaryTab />}
          {activeTab === 'quiz' && <QuizTab />}
          {activeTab === 'portals' && <PortalsTab />}
        </div>
      </section>

      {/* ── CTA FOOTER BAND ──────────────────────────────────────── */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Professional Development
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Advance Your Regulatory Career?
          </h2>
          <p className="text-slate-400 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Our expert regulatory consultants offer personalized guidance, masterclasses, and corporate training programmes designed specifically for pharmaceutical professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Regulatory Education & Corporate Training')}
              className="px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-teal-500/20"
            >
              <GraduationCap className="w-4 h-4" />
              Enquire About Training
            </button>
            <button
              onClick={() => onNavigate('education')}
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Masterclass Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

