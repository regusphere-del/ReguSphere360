import React, { useState } from 'react';
import {
  Building2,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ClipboardList,
  FileText,
  Truck,
  Stethoscope,
  Sparkles,
  FlaskConical,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const LicensingGuidancePage = ({ onOpenEnquiry, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('manufacturing'); // 'manufacturing' | 'wholesale' | 'loan' | 'import' | 'devices' | 'cosmetics' | 'newdrugs' | 'trials' | 'renewals'

  const licensingProcedures = [
    {
      id: 'manufacturing',
      title: 'Drug Manufacturing License Procedures',
      forms: 'Form 25 (Non-Biological) & Form 28 (Biological / Schedule C/C1)',
      authority: 'State Licensing Authority (SLA) & CDSCO Zonal Directorate',
      overview:
        'Governed under the Drugs and Cosmetics Act 1940 and Rules 1945. Mandates strict compliance with Revised Schedule M (cGMP), qualified technical personnel, air handling systems (HVAC), and continuous water system validation.',
      steps: [
        'Submission of Form 24 / Form 27 application via State FDA online portal.',
        'Site Master File (SMF), plant layout blueprint approval, and HVAC validation protocols.',
        'Appointment of Approved Manufacturing Chemist (B.Pharm with 18+ months experience) and Analytical Chemist.',
        'Joint physical factory inspection by State Drug Inspector and CDSCO Senior Drug Inspector.',
        'Compliance report submission and formal grant of Form 25 / Form 28 license.',
      ],
      checklists: [
        'Approved building plan & site master file per Schedule M',
        'Equipment qualification logs (DQ, IQ, OQ, PQ)',
        'List of technical staff with bio-data & appointment letters',
        'Valid NOC from Pollution Control Board and Local Municipality',
        'Water system qualification & microbial testing protocols',
      ],
    },
    {
      id: 'wholesale',
      title: 'Wholesale & Retail Drug License Procedures',
      forms: 'Form 20B / 21B (Wholesale) and Form 20 / 21 (Retail Pharmacy)',
      authority: 'State Drug Control Administration (Zonal Drug Inspectorate)',
      overview:
        'Establishes authorized commercial drug sales and distribution channels. Requires qualified registered pharmacists, minimum carpet area (15 sq. meters for wholesale, 10 sq. meters for retail), and certified cold-chain refrigeration.',
      steps: [
        'Filing of Form 19 application along with statutory treasury challan fees.',
        'Physical premises measurement and storage inspection by Zonal Drug Inspector.',
        'Verification of Registered Pharmacist (registered under State Pharmacy Council).',
        'Validation of temperature-controlled storage (refrigerators, deep freezers with calibrated data loggers).',
        'Grant of Form 20B/21B wholesale or Form 20/21 retail sales licenses.',
      ],
      checklists: [
        'Registered Pharmacist diploma/degree and state registration renewal card',
        'Premises ownership proof or registered rent agreement (> 15 sq. meters for wholesale)',
        'Refrigerator purchase invoice & 24/7 temperature monitoring log',
        'Schedule H & H1 sales register format and purchase invoice logs',
        'Affidavit of registered pharmacist and proprietor declaration',
      ],
    },
    {
      id: 'loan',
      title: 'Loan License Procedures',
      forms: 'Form 25A (Non-Biological) & Form 28A (Biological Products)',
      authority: 'State Licensing Authority where parent manufacturing unit is situated',
      overview:
        'Enables pharmaceutical marketing companies or startups to manufacture formulations utilizing surplus capacity of an already licensed manufacturing facility without owning physical manufacturing infrastructure.',
      steps: [
        'Filing Form 24A or 27A along with consent and agreement from the primary manufacturing unit.',
        'Verification that primary manufacturing unit has spare capacity and valid Form 25/28 license.',
        'Technical staff supervision confirmation and master formula verification.',
        'Drug Inspector inspection of parent site for loan licensing capability.',
        'Issuance of Form 25A or Form 28A loan license endorsement.',
      ],
      checklists: [
        'Mutual loan license manufacturing tripartite agreement',
        'Parent unit valid Form 25/28 license and Schedule M cGMP certificate',
        'Undertaking regarding spare capacity utilization',
        'Product master formulas and analytical specifications',
        'Batch testing agreements between principal and loan licensee',
      ],
    },
    {
      id: 'import',
      title: 'Import & Export Regulatory Requirements',
      forms: 'Form 10 (Import License) & Form 41 (Registration Certificate)',
      authority: 'CDSCO Headquarters (Import & Registration Division)',
      overview:
        'Governs commercial importation of active pharmaceutical ingredients (APIs) and finished drug formulations into India via the SUGAM portal under the Drugs and Cosmetics Rules.',
      steps: [
        'Online submission of Form 40 application for foreign manufacturing site registration.',
        'CDSCO evaluation of Plant Master File, WHO-GMP Certificate, and Certificate of Pharmaceutical Product (CoPP).',
        'Grant of Form 41 Registration Certificate (valid for 3 years).',
        'Indian authorized agent files Form 8/8A application for Form 10 Import License.',
        'Customs clearance at notified port of entry with test license endorsements.',
      ],
      checklists: [
        'Site Master File and Manufacturing License of foreign manufacturer',
        'WHO-GMP or CoPP in WHO format issued by national authority',
        'Power of Attorney issued to Authorized Indian Agent',
        'DMF / Technical Product Dossier in ASEAN/ICH CTD format',
        'Free Sale Certificate from country of origin',
      ],
    },
    {
      id: 'devices',
      title: 'Medical Device Registration & Licensing',
      forms: 'MD-14 (Import), MD-15 (License), MD-5 (Manufacturing Class A/B), MD-9 (Class C/D)',
      authority: 'State Licensing Authority (Class A/B) & CDSCO Central Licensing Authority (Class C/D)',
      overview:
        'Under Medical Device Rules 2017. Strict risk-based classification into Class A (Low Risk), Class B (Low-Moderate), Class C (Moderate-High), and Class D (High Risk, e.g. cardiac stents, implants).',
      steps: [
        'Risk-based classification of device and identification of notified body standards.',
        'Preparation of Device Master File (DMF) and Plant Master File (PMF).',
        'Audit by Notified Body accredited by CDSCO for QMS compliance (ISO 13485:2016).',
        'Filing application via CDSCO Online Medical Device Portal.',
        'Issuance of manufacturing license (MD-5 / MD-9) or import license (MD-15).',
      ],
      checklists: [
        'Device Master File (DMF) per Schedule IV of MDR 2017',
        'ISO 13485:2016 Quality Management System Certificate',
        'Risk Management Report conforming to ISO 14971',
        'Biocompatibility test reports & clinical evaluation report (CER)',
        'Instruction for Use (IFU) and labeling mockups',
      ],
    },
    {
      id: 'cosmetics',
      title: 'Cosmetics Licensing Procedures',
      forms: 'Form COS-1 / COS-2 (Import) & Form 32 (Manufacturing under Cosmetics Rules 2020)',
      authority: 'State Licensing Authority & CDSCO Cosmetics Division',
      overview:
        'Governed under the comprehensive Cosmetics Rules 2020. Mandates rigorous heavy metal testing, prohibition of animal testing declarations, and ingredient safety assessments per IS 4707 standards.',
      steps: [
        'Preparation of cosmetic formulation specifications and ingredient safety data.',
        'Testing of heavy metals (Lead, Arsenic, Mercury) and microbial limits per Bureau of Indian Standards (BIS).',
        'Filing online application on SUGAM cosmetics portal (COS-1 for import registration).',
        'Premises layout and water quality verification for domestic manufacturing.',
        'Grant of Form COS-2 registration certificate or SLA manufacturing license.',
      ],
      checklists: [
        'List of ingredients with percentages and safety declarations per IS 4707',
        'Heavy metal & microbial test reports from accredited laboratory',
        'Declaration of non-animal testing per Rule 13 of Cosmetics Rules 2020',
        'Labeling samples with batch number, MRP, and manufacturing date',
        'Manufacturing license of foreign site (for import registrations)',
      ],
    },
    {
      id: 'newdrugs',
      title: 'New Drug Approval Pathways',
      forms: 'Form 44 / Form CT-04 (NDCT Rules 2019)',
      authority: 'CDSCO New Drugs Division & Subject Expert Committee (SEC)',
      overview:
        'Rigorous regulatory approval pathway for New Chemical Entities (NCEs), New Biological Entities (NBEs), Fixed Dose Combinations (FDCs), and Modified Release Formulations under New Drugs and Clinical Trials Rules 2019.',
      steps: [
        'Preparation of comprehensive non-clinical and clinical study dossier (Modules 1–5).',
        'Filing Form 44 application on SUGAM portal with prescribed fee treasury receipt.',
        'Oral technical presentation before the Subject Expert Committee (SEC).',
        'SEC recommendation, Clinical Trial Waiver evaluation, or Phase III trial mandate.',
        'Final Marketing Authorization granted in Form CT-20 / Form CT-23.',
      ],
      checklists: [
        'Complete CTD Module 1 to 5 dossier',
        'Pre-clinical toxicology & pharmacology animal study summaries',
        'Clinical trial reports (Phases I, II, and III data)',
        'Proposed draft Prescribing Information (Package Insert) & SmPC',
        'Pharmacovigilance Risk Management Plan (RMP)',
      ],
    },
    {
      id: 'renewals',
      title: 'License Renewal & Retention Procedures',
      forms: 'Retention Fee Challans & Periodic Validity Endorsement Letters',
      authority: 'State Licensing Authority & Central Licensing Authority',
      overview:
        'Licenses are maintained perpetual subject to timely statutory retention fee deposits every 5 years before expiry cutoff dates, along with compliance self-certification under prevailing rules.',
      steps: [
        'Calculation of statutory retention fee challan amount before deadline cut-off.',
        'Conduct of self-inspection audit per Schedule M / Good Distribution Practices.',
        'Remittance of retention fee via state treasury or online Bharatkosh portal.',
        'Submission of proof of deposit to licensing authority with validity declaration.',
        'Receipt of official license retention acknowledgment endorsement.',
      ],
      checklists: [
        'Original license copies with all prior endorsements & product lists',
        'Treasury Challan receipt of statutory retention fee deposit',
        'Annual Product Quality Review (APQR) summaries',
        'Self-inspection internal audit completion report',
        'List of approved technical personnel currently in active employment',
      ],
    },
  ];

  const currentProc = licensingProcedures.find((p) => p.id === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Consultancy Practice Category E</span>
            <span>•</span>
            <span>Statutory Licensing & Authorizations</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Pharmaceutical Licensing & Approval Guidance
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Educational roadmaps, documentation checklists, and procedural guidance for drug manufacturing
              authorizations, wholesale and retail sales licenses, medical devices, cosmetics, and new drug
              approvals under Indian and international regulatory frameworks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenEnquiry('Pharmaceutical Licensing Guidance')}
                className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Request Licensing Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services-license-tracking')}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
              >
                View Live License Tracker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Statutory Authority Disclaimer */}
      <section className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Statutory Authority Exclusivity Notice:</span> ReguSphere 360 provides
            professional educational guidance, regulatory document compilation, and checklist auditing. Final
            licensing decisions, approvals, inspections, and statutory permissions are issued exclusively by the
            relevant competent regulatory authorities (such as CDSCO, State Drug Control Administrations, and US FDA).
          </div>
        </div>
      </section>

      {/* Main Interactive Procedures Navigator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Standardized Pathways
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Comprehensive Licensing Pathways & Checklists
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select a licensing domain below to review official forms, step-by-step procedural workflows, and documentation requirements.
            </p>
          </div>

          {/* Domain Selector Navigation Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {licensingProcedures.map((proc) => (
              <button
                key={proc.id}
                onClick={() => setActiveTab(proc.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === proc.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-teal-500'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {proc.title.replace(' Procedures', '')}
              </button>
            ))}
          </div>

          {/* Active Procedure Detail Dossier */}
          {currentProc && (
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider block">
                    Statutory Framework
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{currentProc.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Official Forms: {currentProc.forms}</p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Competent Authority</span>
                  <span className="text-xs font-bold text-slate-900">{currentProc.authority}</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Procedural Overview</h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {currentProc.overview}
                </p>
              </div>

              {/* Step-by-Step Pathway vs Required Documentation Checklists */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Steps */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step-by-Step Approval Workflow:
                  </h4>
                  <div className="relative pl-6 space-y-4 border-l border-slate-200 text-xs">
                    {currentProc.steps.map((st, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-slate-900 text-teal-400 font-mono text-[9px] flex items-center justify-center font-bold ring-4 ring-white">
                          {i + 1}
                        </div>
                        <p className="text-slate-700 leading-relaxed">{st}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklists */}
                <div className="lg:col-span-5 bg-teal-50/50 p-6 rounded-2xl border border-teal-200 space-y-4">
                  <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wider flex items-center space-x-1.5">
                    <ClipboardList className="w-4 h-4 text-teal-700" />
                    <span>Mandatory Documentation Checklist:</span>
                  </h4>

                  <div className="space-y-2.5 text-xs text-teal-900">
                    {currentProc.checklists.map((chk, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                        <span>{chk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-teal-200/60">
                    <button
                      onClick={() => onOpenEnquiry(`Licensing Assistance: ${currentProc.title}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center space-x-2"
                    >
                      <span>Request Dossier Checklist Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">
            Accelerate Pharmaceutical Licensing with Flawless Dossiers
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminate document deficiencies and inspection queries. Our certified RAC specialists review your
            plant layout, HVAC protocols, technical staff appointments, and Form applications before official filing.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Pharmaceutical Licensing Guidance')}
              className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20"
            >
              Consult with Senior RAC Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
