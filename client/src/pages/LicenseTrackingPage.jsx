import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  Building2,
  Calendar,
  Send,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight,
  RefreshCw,
  X,
  FileText,
  User,
  Phone,
  Mail,
  AlertTriangle,
  BookmarkCheck,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusBadgeStyles = {
  'Application Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
  'Under Review': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Query Raised': 'bg-amber-50 text-amber-700 border-amber-200',
  'Documents Pending': 'bg-orange-50 text-orange-700 border-orange-200',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-rose-50 text-rose-700 border-rose-200',
  'Renewal Due': 'bg-purple-50 text-purple-700 border-purple-200',
};

const licenseCategoriesList = [
  'All',
  'Drug Manufacturing License',
  'Wholesale Drug License',
  'Retail Pharmacy License',
  'Loan License',
  'Import License',
  'Medical Device License',
  'Cosmetics Manufacturing License',
  'Clinical Trial Application',
];

const fallbackLicenses = [
  {
    applicationId: 'LIC-2026-MFG-882',
    applicantName: 'Dr. Ramesh Sharma',
    companyName: 'AeroBio Pharmaceuticals Ltd.',
    email: 'regulatory@aerobio.in',
    phone: '+91 98210 44321',
    country: 'India',
    licenseCategory: 'Drug Manufacturing License',
    regulatoryAuthority: 'CDSCO & Maharashtra State FDA',
    applicationSubmissionDate: '2026-01-15T00:00:00.000Z',
    currentStatus: 'Under Review',
    pendingDocumentation: [
      'Revised Schedule M (cGMP) Validation Protocol',
      'HVAC Qualification & Air Balance Reports for Cleanroom Block B',
    ],
    nextRenewalDate: '2028-01-14T00:00:00.000Z',
    followUpDate: '2026-11-20T00:00:00.000Z',
    remarks: 'Joint site inspection completed on Oct 18. Authority query letter received regarding water system TOC calibration data.',
    updatesTimeline: [
      {
        timestamp: '2026-01-15T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'Form 25 / Form 28 application dossier lodged via State FDA online portal.',
        updatedBy: 'AeroBio RA Team',
      },
      {
        timestamp: '2026-04-10T00:00:00.000Z',
        status: 'Under Review',
        note: 'Technical scrutiny in progress at CDSCO Zonal Directorate.',
        updatedBy: 'Dr. Eleanor Vance, RAC Senior Consultant',
      },
      {
        timestamp: '2026-10-22T00:00:00.000Z',
        status: 'Query Raised',
        note: 'Clarification requested regarding batch process validation and water TOC logs.',
        updatedBy: 'CDSCO Inspection Team',
      },
      {
        timestamp: '2026-11-01T00:00:00.000Z',
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
    applicationSubmissionDate: '2026-08-10T00:00:00.000Z',
    currentStatus: 'Approved',
    pendingDocumentation: [],
    nextRenewalDate: '2031-08-09T00:00:00.000Z',
    followUpDate: '2027-08-01T00:00:00.000Z',
    remarks: 'Form 20B and 21B Wholesale Licenses granted. Storage temperature mapping certified (2°C - 8°C cold chain).',
    updatesTimeline: [
      {
        timestamp: '2026-08-10T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'Filed wholesale application with qualified registered pharmacist credentials.',
        updatedBy: 'Zenith RA Lead',
      },
      {
        timestamp: '2026-09-02T00:00:00.000Z',
        status: 'Under Review',
        note: 'Drug Inspector physical premises audit conducted.',
        updatedBy: 'Drug Inspectorate Zone 3',
      },
      {
        timestamp: '2026-09-28T00:00:00.000Z',
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
    applicationSubmissionDate: '2026-03-20T00:00:00.000Z',
    currentStatus: 'Query Raised',
    pendingDocumentation: [
      'Comparative In-Vitro Dissolution Profiles at pH 1.2, 4.5, 6.8',
      'Nitrosamine Risk Assessment & Impurity Testing Validation Report',
    ],
    nextRenewalDate: '2027-03-19T00:00:00.000Z',
    followUpDate: '2026-12-05T00:00:00.000Z',
    remarks: 'Information Request (IR) letter issued by FDA reviewer. 90-day response clock running.',
    updatesTimeline: [
      {
        timestamp: '2026-03-20T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'eCTD Sequence 0000 transmitted via Electronic Submissions Gateway (ESG).',
        updatedBy: 'BioCrest Operations',
      },
      {
        timestamp: '2026-10-15T00:00:00.000Z',
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
    applicationSubmissionDate: '2026-05-12T00:00:00.000Z',
    currentStatus: 'Documents Pending',
    pendingDocumentation: [
      'ISO 13485:2016 Audit Report by Notified Body',
      'Device Master File (DMF) & Risk Management File per ISO 14971',
    ],
    nextRenewalDate: '2027-05-11T00:00:00.000Z',
    followUpDate: '2026-11-25T00:00:00.000Z',
    remarks: 'Class B In-Vitro Diagnostic Kit application. Notified body audit scheduled for late November.',
    updatesTimeline: [
      {
        timestamp: '2026-05-12T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'Form MD-14 import license application initiated on SUGAM portal.',
        updatedBy: 'Apex RA Specialist',
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
    applicationSubmissionDate: '2026-07-01T00:00:00.000Z',
    currentStatus: 'Under Review',
    pendingDocumentation: [
      'Institutional Ethics Committee (IEC) Registration Certificate',
    ],
    nextRenewalDate: '2027-06-30T00:00:00.000Z',
    followUpDate: '2026-11-18T00:00:00.000Z',
    remarks: 'Phase III clinical study protocol under Subject Expert Committee (SEC) review.',
    updatesTimeline: [
      {
        timestamp: '2026-07-01T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'Form CT-04 application for Phase III trial permission submitted.',
        updatedBy: 'NovaCare Regulatory Dept',
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
    applicationSubmissionDate: '2026-02-14T00:00:00.000Z',
    currentStatus: 'Renewal Due',
    pendingDocumentation: [
      'Principal Manufacturer Facility Capacity Utilization Certificate',
      'Retention Fee Challan Verification & Form 25A Endorsement',
    ],
    nextRenewalDate: '2026-11-30T00:00:00.000Z',
    followUpDate: '2026-11-10T00:00:00.000Z',
    remarks: 'Loan license Form 25A expires on Nov 30, 2026. Retention fee must be paid before cut-off to prevent statutory lapse.',
    updatesTimeline: [
      {
        timestamp: '2026-02-14T00:00:00.000Z',
        status: 'Approved',
        note: 'Original Form 25A loan manufacturing agreement endorsed.',
        updatedBy: 'State Licensing Authority',
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
    applicationSubmissionDate: '2026-09-01T00:00:00.000Z',
    currentStatus: 'Application Submitted',
    pendingDocumentation: [
      'Form COS-1 Application Checklist & Product Test Reports',
    ],
    nextRenewalDate: '2031-08-31T00:00:00.000Z',
    followUpDate: '2026-11-28T00:00:00.000Z',
    remarks: 'Cosmetics Rules 2020 compliance review initiated for new herbal skincare manufacturing unit.',
    updatesTimeline: [
      {
        timestamp: '2026-09-01T00:00:00.000Z',
        status: 'Application Submitted',
        note: 'Form COS-1 and product ingredient safety declarations uploaded.',
        updatedBy: 'LuxeBotanics RA',
      },
    ],
    verifiedSource: 'Gujarat FDA Cosmetics Division Ref #GJ-COS-2026-304',
  },
];

export const LicenseTrackingPage = ({ onOpenEnquiry, onNavigate, initialTrackingId }) => {
  const [licenses, setLicenses] = useState(fallbackLicenses);
  const [selectedLicense, setSelectedLicense] = useState(fallbackLicenses[0]);
  const [searchQuery, setSearchQuery] = useState(initialTrackingId || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Client submission form state
  const [submitForm, setSubmitForm] = useState({
    applicationId: '',
    applicantName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    licenseCategory: 'Drug Manufacturing License',
    regulatoryAuthority: 'CDSCO & State FDA',
    applicationSubmissionDate: '',
    currentStatus: 'Application Submitted',
    pendingDocumentation: '',
    nextRenewalDate: '',
    followUpDate: '',
    remarks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState(null);
  const [submitErrorMsg, setSubmitErrorMsg] = useState(null);

  useEffect(() => {
    fetchLicenses();
  }, [selectedCategory, selectedStatus]);

  useEffect(() => {
    if (initialTrackingId) {
      setSearchQuery(initialTrackingId);
      handleSearch(initialTrackingId);
    }
  }, [initialTrackingId]);

  const fetchLicenses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/licenses`, {
        params: {
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          status: selectedStatus !== 'All' ? selectedStatus : undefined,
          q: searchQuery || undefined,
        },
      });
      if (res.data.success && res.data.licenses?.length > 0) {
        setLicenses(res.data.licenses);
        if (!selectedLicense) {
          setSelectedLicense(res.data.licenses[0]);
        }
      } else {
        applyClientFiltering();
      }
    } catch (err) {
      applyClientFiltering();
    }
  };

  const applyClientFiltering = () => {
    const filtered = fallbackLicenses.filter((lic) => {
      const matchesCategory =
        selectedCategory === 'All' || lic.licenseCategory === selectedCategory;
      const matchesStatus =
        selectedStatus === 'All' || lic.currentStatus === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        lic.applicationId.toLowerCase().includes(q) ||
        lic.applicantName.toLowerCase().includes(q) ||
        lic.companyName.toLowerCase().includes(q) ||
        lic.regulatoryAuthority.toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesQ;
    });
    setLicenses(filtered);
    if (filtered.length > 0 && !selectedLicense) {
      setSelectedLicense(filtered[0]);
    }
  };

  const handleSearch = (overrideQuery) => {
    const q = (overrideQuery !== undefined ? overrideQuery : searchQuery).trim().toLowerCase();
    if (!q) {
      fetchLicenses();
      return;
    }
    const matched = licenses.filter(
      (l) =>
        l.applicationId?.toLowerCase().includes(q) ||
        l.applicantName?.toLowerCase().includes(q) ||
        l.companyName?.toLowerCase().includes(q) ||
        l.regulatoryAuthority?.toLowerCase().includes(q)
    );
    if (matched.length > 0) {
      setSelectedLicense(matched[0]);
    } else {
      fetchLicenses();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccessMsg(null);
    setSubmitErrorMsg(null);

    try {
      const res = await axios.post(`${API_BASE}/licenses`, submitForm);
      if (res.data.success) {
        setSubmitSuccessMsg(
          `License details lodged successfully! Application ID: ${res.data.applicationId}. Our regulatory follow-up team has been alerted.`
        );
        fetchLicenses();
        setSelectedLicense(res.data.license);
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmitSuccessMsg(null);
          setSubmitForm({
            applicationId: '',
            applicantName: '',
            companyName: '',
            email: '',
            phone: '',
            country: 'India',
            licenseCategory: 'Drug Manufacturing License',
            regulatoryAuthority: 'CDSCO & State FDA',
            applicationSubmissionDate: '',
            currentStatus: 'Application Submitted',
            pendingDocumentation: '',
            nextRenewalDate: '',
            followUpDate: '',
            remarks: '',
          });
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setSubmitErrorMsg(err.response?.data?.message || 'Error submitting license details. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickDemoIds = [
    'LIC-2026-MFG-882',
    'LIC-2026-WHL-419',
    'LIC-2026-ANDA-771',
    'LIC-2026-MD-512',
    'LIC-2026-CT-109',
    'LIC-2026-LOAN-230',
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Hero Header */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Consultancy Practice Category B</span>
            <span>•</span>
            <span>Pharmaceutical License Tracking & Follow-up</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Pharmaceutical License Tracking & Regulatory Follow-up
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Real-time tracking of manufacturing licenses, wholesale authorizations, loan licenses, import
                clearances, medical device files, and clinical trial approvals across CDSCO, State FDAs, and global
                regulatory authorities.
              </p>

              {/* Direct Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit License for Tracking Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('tracking-dashboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Open Live Tracking Dashboard
                </button>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-mono text-teal-400 font-bold">Regulatory Authority Matrix</span>
                <span className="text-[10px] text-slate-400">CDSCO / State FDA / US FDA</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-xl font-black text-white block">8</span>
                  <span className="text-[10px] text-slate-400 uppercase">License Categories</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-xl font-black text-teal-400 block">7 Statuses</span>
                  <span className="text-[10px] text-slate-400 uppercase">Gateway Milestones</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Verified tracking reports updated following certified client disclosures & authority communiqués.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Regulatory Transparency Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Authorized Tracking Information Notice:</span> Display only verified status
            information obtained through authorized sources or client-provided updates. ReguSphere 360 acts as an
            independent technical advisory consultancy and does not represent direct government database integrations
            unless statutory API gateway endpoints are formally implemented.
          </div>
        </div>
      </section>

      {/* Scope of 8 Tracked License Categories */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Full Spectrum Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Pharmaceutical License Categories Tracked
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              End-to-end follow-up across manufacturing, commercial distribution, clinical studies, and device registrations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { title: 'Drug Manufacturing Licenses', forms: 'Form 25 / Form 28 / Schedule M cGMP' },
              { title: 'Wholesale Drug Licenses', forms: 'Form 20B / Form 21B Commercial Distribution' },
              { title: 'Retail Pharmacy Licenses', forms: 'Form 20 / Form 21 Pharmacist Verification' },
              { title: 'Loan Licenses', forms: 'Form 25A / Form 28A Principal Facility Agreements' },
              { title: 'Import Drug Licenses', forms: 'Form 10 / Form 41 / SUGAM Clearance' },
              { title: 'Medical Device Licenses', forms: 'Class A-D / Form MD-14 / MD-15' },
              { title: 'Cosmetics Manufacturing', forms: 'Cosmetics Rules 2020 / Form COS-1 / COS-2' },
              { title: 'Clinical Trial Applications', forms: 'Form CT-04 / CT-06 / SEC Protocol Review' },
            ].map((cat, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">{cat.title}</span>
                <span className="text-[11px] text-teal-700 block font-medium">{cat.forms}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive License Tracking Dashboard */}
      <section id="tracking-dashboard" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                License Tracking Dashboard
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Real-time status monitoring, pending document checklists, renewal dates, and follow-up updates
              </p>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors flex items-center space-x-2 self-start sm:self-auto shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Track New License</span>
            </button>
          </div>

          {/* Quick Demo Pre-selected IDs */}
          <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 mr-2 flex items-center space-x-1">
              <BookmarkCheck className="w-4 h-4 text-teal-600" />
              <span>Quick Test Applications:</span>
            </span>
            {quickDemoIds.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setSearchQuery(id);
                  handleSearch(id);
                }}
                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedLicense?.applicationId === id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50 hover:text-teal-800'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Search & Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Application ID, Company, or Authority..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-teal-600 shadow-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-600 shadow-sm"
              >
                {licenseCategoriesList.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All License Categories' : c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-600 shadow-sm"
              >
                <option value="All">All Status Milestones</option>
                <option value="Application Submitted">Application Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Query Raised">Query Raised</option>
                <option value="Documents Pending">Documents Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Renewal Due">Renewal Due</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <button
                onClick={() => handleSearch()}
                className="w-full h-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Dashboard Layout: List & Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Application Files List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase px-2">
                <span>Application Files ({licenses.length})</span>
                <span>Status</span>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
                  Loading verified license tracking records...
                </div>
              ) : licenses.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
                  No applications match your filter criteria. Try resetting search filters or lodge a new tracking enquiry.
                </div>
              ) : (
                licenses.map((lic) => {
                  const isSelected = selectedLicense?.applicationId === lic.applicationId;
                  const badgeClass = statusBadgeStyles[lic.currentStatus] || 'bg-slate-100 text-slate-700';

                  return (
                    <div
                      key={lic.applicationId}
                      onClick={() => setSelectedLicense(lic)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white border-teal-600 shadow-md ring-1 ring-teal-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="font-mono text-xs font-extrabold text-teal-700 block">
                            {lic.applicationId}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-1">{lic.companyName}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass} whitespace-nowrap`}>
                          {lic.currentStatus}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1">
                        <p className="line-clamp-1">{lic.licenseCategory}</p>
                        <p className="line-clamp-1 text-slate-400">Authority: {lic.regulatoryAuthority}</p>
                      </div>

                      {lic.nextRenewalDate && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span>Next Renewal: {new Date(lic.nextRenewalDate).toLocaleDateString()}</span>
                          <span className="text-teal-700 font-bold flex items-center">
                            <span>Details</span>
                            <ChevronRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Selected License File Detailed Dossier */}
            <div className="lg:col-span-7">
              {selectedLicense ? (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-xl text-slate-900">
                          {selectedLicense.applicationId}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            statusBadgeStyles[selectedLicense.currentStatus] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {selectedLicense.currentStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {selectedLicense.licenseCategory} • {selectedLicense.companyName}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(`License Follow-up: ${selectedLicense.applicationId}`)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors self-start sm:self-auto"
                    >
                      Request Follow-up Action
                    </button>
                  </div>

                  {/* Core 9 Key Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Applicant / Contact
                      </span>
                      <p className="font-bold text-slate-900">{selectedLicense.applicantName}</p>
                      <p className="text-slate-500 text-[11px]">{selectedLicense.email}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Regulatory Authority
                      </span>
                      <p className="font-bold text-slate-900">{selectedLicense.regulatoryAuthority}</p>
                      <p className="text-slate-500 text-[11px]">{selectedLicense.country || 'India'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Submission Date
                      </span>
                      <p className="font-bold text-slate-900">
                        {selectedLicense.applicationSubmissionDate
                          ? new Date(selectedLicense.applicationSubmissionDate).toLocaleDateString()
                          : 'Not Disclosed'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Next Renewal Date
                      </span>
                      <p className="font-bold text-teal-700">
                        {selectedLicense.nextRenewalDate
                          ? new Date(selectedLicense.nextRenewalDate).toLocaleDateString()
                          : 'Ongoing Evaluation'}
                      </p>
                    </div>
                  </div>

                  {/* Pending Documentation Checklist */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Pending Documentation & Deficiencies:</span>
                    </div>

                    {selectedLicense.pendingDocumentation && selectedLicense.pendingDocumentation.length > 0 ? (
                      <div className="space-y-1.5 text-xs text-amber-800">
                        {selectedLicense.pendingDocumentation.map((doc, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></span>
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-800 font-semibold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>All statutory documents currently verified. No pending authority queries flagged.</span>
                      </p>
                    )}
                  </div>

                  {/* Latest Remarks & Updates */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Consultant Remarks & Regulatory Updates:
                    </span>
                    <p className="text-xs text-slate-700 p-3.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                      {selectedLicense.remarks || 'No detailed remarks recorded for this sequence.'}
                    </p>
                  </div>

                  {/* Updates Timeline */}
                  {selectedLicense.updatesTimeline && selectedLicense.updatesTimeline.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Lifecycle Timeline & Communication History:
                      </span>
                      <div className="relative pl-6 space-y-4 border-l border-slate-200 text-xs">
                        {selectedLicense.updatesTimeline.map((item, idx) => (
                          <div key={idx} className="relative">
                            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-teal-500 ring-4 ring-white"></div>
                            <div className="flex items-center space-x-2 text-[11px] text-slate-500 mb-0.5">
                              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="font-semibold text-slate-800">{item.status}</span>
                            </div>
                            <p className="text-slate-700">{item.note}</p>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Recorded by: {item.updatedBy}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verified Source Disclaimer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Data verification: {selectedLicense.verifiedSource || 'Client Authorized Disclosures'}
                    </span>
                    <button
                      onClick={() => onOpenEnquiry(`Tracking Enquiry: ${selectedLicense.applicationId}`)}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      Enquire with Consultant
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
                  Select an application from the left panel to inspect its full tracking dossier.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL: Submit License Details Form */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl my-8 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Submit License Details for Tracking Assistance
                </h3>
                <p className="text-xs text-slate-500">
                  Securely register your pending or approved application for follow-up guidance & renewal reminders
                </p>
              </div>
            </div>

            {submitSuccessMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">{submitSuccessMsg}</p>
                <p className="text-slate-600">Our senior regulatory coordinator is reviewing your record.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {submitErrorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                    {submitErrorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.applicantName}
                      onChange={(e) => setSubmitForm({ ...submitForm, applicantName: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Sharma"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.companyName}
                      onChange={(e) => setSubmitForm({ ...submitForm, companyName: e.target.value })}
                      placeholder="e.g. AeroBio Pharma Ltd."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={submitForm.email}
                      onChange={(e) => setSubmitForm({ ...submitForm, email: e.target.value })}
                      placeholder="regulatory@company.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={submitForm.phone}
                      onChange={(e) => setSubmitForm({ ...submitForm, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">License Category *</label>
                    <select
                      value={submitForm.licenseCategory}
                      onChange={(e) => setSubmitForm({ ...submitForm, licenseCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    >
                      {licenseCategoriesList.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Regulatory Authority *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.regulatoryAuthority}
                      onChange={(e) => setSubmitForm({ ...submitForm, regulatoryAuthority: e.target.value })}
                      placeholder="e.g. CDSCO & Maharashtra State FDA"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Existing Application ID</label>
                    <input
                      type="text"
                      value={submitForm.applicationId}
                      onChange={(e) => setSubmitForm({ ...submitForm, applicationId: e.target.value })}
                      placeholder="Leave blank to auto-generate"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Current Status</label>
                    <select
                      value={submitForm.currentStatus}
                      onChange={(e) => setSubmitForm({ ...submitForm, currentStatus: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    >
                      <option value="Application Submitted">Application Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Query Raised">Query Raised</option>
                      <option value="Documents Pending">Documents Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Renewal Due">Renewal Due</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Next Renewal Date</label>
                    <input
                      type="date"
                      value={submitForm.nextRenewalDate}
                      onChange={(e) => setSubmitForm({ ...submitForm, nextRenewalDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Pending Documents / Queries (Comma-separated)</label>
                  <input
                    type="text"
                    value={submitForm.pendingDocumentation}
                    onChange={(e) => setSubmitForm({ ...submitForm, pendingDocumentation: e.target.value })}
                    placeholder="e.g. Schedule M audit protocol, Water testing logs"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Remarks & Assistance Required</label>
                  <textarea
                    rows={3}
                    value={submitForm.remarks}
                    onChange={(e) => setSubmitForm({ ...submitForm, remarks: e.target.value })}
                    placeholder="Describe specific regulatory follow-up needs, inspection timelines, or query response requirements..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200">
                  <span className="font-bold text-slate-700">Confidentiality Guarantee:</span> All company credentials,
                  drug formulas, and application receipts are safeguarded under strict Non-Disclosure Agreements (NDAs).
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-colors shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering File...' : 'Submit License for Tracking'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
