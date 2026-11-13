import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Activity,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Download,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Search,
  Bell,
  RefreshCw,
  FolderTree,
  Send,
  Lock,
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
  'Gap Assessment In Progress': 'bg-teal-50 text-teal-700 border-teal-200',
  'Completed & Follow-up': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const ClientDashboard = ({ onNavigate, onOpenEnquiry }) => {
  const { currentUser, loginWithGoogle } = useAuth();

  // Identifier can be email or tracking code
  const [clientIdentifier, setClientIdentifier] = useState(
    currentUser?.email || 'regulatory.director@pharma-client.com'
  );

  const fallbackEnquiries = [
    {
      trackingId: 'REG-2026-1001',
      clientName: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@biocrest-therapeutics.com',
      company: 'BioCrest Therapeutics Inc.',
      serviceRequired: 'Regulatory Documentation Consultancy',
      projectStatus: 'Gap Assessment In Progress',
      createdAt: '2026-10-28T10:00:00.000Z',
      description: 'Initial IND / CTA filing for novel bispecific antibody. Comprehensive Module 3 CMC gap review and eCTD structure indexing before pre-IND meeting.',
      assignedConsultant: {
        name: 'Dr. Eleanor Vance, RAC Senior Consultant',
        email: 'regulatory@regusphere360.com',
      },
      milestones: [
        {
          title: 'Enquiry Received & Scoping Started',
          description: 'Project brief and raw technical dossiers received and categorized.',
          status: 'completed',
        },
        {
          title: 'Preliminary Gap Assessment & Work Breakdown',
          description: 'Audit of Module 3 CMC data vs FDA 21 CFR 312 guidelines.',
          status: 'in-progress',
        },
        {
          title: 'Dossier Structuring & Regulatory Writing Review',
          description: 'Module 2.3 Quality Overall Summary alignment and leaf hyperlinks.',
          status: 'pending',
        },
        {
          title: 'Submission Readiness Validation Gate',
          description: 'Lorenz eCTD Gateway validation & final regulatory sign-off.',
          status: 'pending',
        },
      ],
      uploadedFiles: [
        { originalName: 'BioCrest_IND_Module3_Draft_Index.pdf' },
      ],
    },
  ];

  const [userEnquiries, setUserEnquiries] = useState(fallbackEnquiries);
  const [userLicenses, setUserLicenses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(fallbackEnquiries[0]);
  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' | 'licenses' | 'reminders' | 'documents'
  const [isLoading, setIsLoading] = useState(false);
  const [searchCode, setSearchCode] = useState('');

  useEffect(() => {
    if (currentUser?.email) {
      setClientIdentifier(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchClientData();
  }, [clientIdentifier]);

  const fetchClientData = async () => {
    try {
      const [enqRes, licRes] = await Promise.all([
        axios.get(`${API_BASE}/enquiries/user/${encodeURIComponent(clientIdentifier)}`),
        axios.get(`${API_BASE}/licenses`),
      ]);

      if (enqRes.data.success && enqRes.data.enquiries?.length > 0) {
        setUserEnquiries(enqRes.data.enquiries);
        if (!selectedItem) {
          setSelectedItem(enqRes.data.enquiries[0]);
        }
      }

      if (licRes.data.success && licRes.data.licenses?.length > 0) {
        const matchedLic = licRes.data.licenses.filter(
          (l) =>
            l.email?.toLowerCase() === clientIdentifier.toLowerCase() ||
            clientIdentifier.includes('pharma') ||
            clientIdentifier.includes('admin') ||
            clientIdentifier.includes('sarah')
        );
        setUserLicenses(matchedLic.length > 0 ? matchedLic : licRes.data.licenses.slice(0, 3));
      }
    } catch (err) {
      // Offline fallback already initialized in state
      if (!selectedItem) setSelectedItem(fallbackEnquiries[0]);
    }
  };

  const handleLookupByCode = async (code) => {
    const trimmed = (code || searchCode).trim().toUpperCase();
    if (!trimmed) return;

    try {
      if (trimmed.startsWith('REG-')) {
        const res = await axios.get(`${API_BASE}/enquiries/track/${trimmed}`, { timeout: 3500 });
        if (res.data.success && res.data.enquiry) {
          setSelectedItem(res.data.enquiry);
          setActiveTab('enquiries');
          return;
        }
      } else if (trimmed.startsWith('LIC-')) {
        const res = await axios.get(`${API_BASE}/licenses/${trimmed}`, { timeout: 3500 });
        if (res.data.success && res.data.license) {
          setSelectedItem(res.data.license);
          setActiveTab('licenses');
          return;
        }
      }
    } catch (err) {
      console.warn('Backend lookup unavailable, searching local records for:', trimmed);
    }

    // Check pre-seeded fallback enquiries
    const foundEnq = fallbackEnquiries.find((e) => e.trackingId.toUpperCase() === trimmed);
    if (foundEnq) {
      setSelectedItem(foundEnq);
      setActiveTab('enquiries');
      return;
    }

    // Check pre-seeded fallback licenses
    const foundLic = fallbackLicenses.find((l) => l.applicationId.toUpperCase() === trimmed);
    if (foundLic) {
      setSelectedItem(foundLic);
      setActiveTab('licenses');
      return;
    }

    // Check localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('regusphere_client_enquiries') || '[]');
      const localEnq = stored.find((e) => e.trackingId?.toUpperCase() === trimmed);
      if (localEnq) {
        setSelectedItem(localEnq);
        setActiveTab('enquiries');
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    alert(`Could not find record for reference: ${trimmed}. Try sample REG-2026-1001 or LIC-2026-MFG-882.`);
  };

  // Collect active reminders from licenses
  const remindersList = userLicenses
    .filter((l) => l.nextRenewalDate || l.followUpDate)
    .map((l) => ({
      title: `${l.licenseCategory} Renewal Window`,
      reference: l.applicationId,
      date: l.nextRenewalDate || l.followUpDate,
      authority: l.regulatoryAuthority,
      status: l.currentStatus,
      type: l.currentStatus === 'Renewal Due' ? 'urgent' : 'upcoming',
    }));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-teal-700 text-white shadow-sm">
                <User className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                ReguSphere 360 Client Portal
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Secure client access: track consultations, inspect license renewals, and review audited dossiers
            </p>
          </div>

          {/* Client Identity & Quick Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-sm flex items-center space-x-2">
              <span className="text-slate-400">Account:</span>
              <span className="font-bold text-slate-800">{clientIdentifier}</span>
            </div>

            <button
              onClick={() => onNavigate('consultation-request')}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>New Consultation</span>
            </button>
          </div>
        </div>

        {/* Quick Reference Code Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Track specific Reference ID (e.g. REG-2026-1001 or LIC-2026-MFG-882)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-teal-600"
              onKeyDown={(e) => e.key === 'Enter' && handleLookupByCode()}
            />
          </div>
          <button
            onClick={() => handleLookupByCode()}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1 whitespace-nowrap w-full sm:w-auto justify-center"
          >
            <span>Locate File</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 mb-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 px-3 transition-colors flex items-center space-x-1.5 border-b-2 ${
              activeTab === 'enquiries'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Consultation Requests ({userEnquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('licenses')}
            className={`pb-3 px-3 transition-colors flex items-center space-x-1.5 border-b-2 ${
              activeTab === 'licenses'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>License Tracking Records ({userLicenses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`pb-3 px-3 transition-colors flex items-center space-x-1.5 border-b-2 ${
              activeTab === 'reminders'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Reminders & Follow-ups ({remindersList.length})</span>
          </button>
        </div>

        {/* TAB 1: Consultations */}
        {activeTab === 'enquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                Your Submitted Requests
              </span>
              {userEnquiries.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                  <p>No consultation enquiries found for {clientIdentifier}.</p>
                  <button
                    onClick={() => onNavigate('consultation-request')}
                    className="text-teal-700 font-bold hover:underline"
                  >
                    Submit a new consultation request
                  </button>
                </div>
              ) : (
                userEnquiries.map((enq) => {
                  const isSelected = selectedItem?.trackingId === enq.trackingId;
                  const badgeClass = statusBadgeStyles[enq.projectStatus] || 'bg-slate-100 text-slate-700';

                  return (
                    <div
                      key={enq.trackingId}
                      onClick={() => setSelectedItem(enq)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white border-teal-600 shadow-md ring-1 ring-teal-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-extrabold text-teal-700">{enq.trackingId}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                          {enq.projectStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs mb-1">
                        {enq.serviceRequired || enq.mainServiceCategory}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{enq.company || enq.organization}</p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Submitted: {new Date(enq.createdAt).toLocaleDateString()}</span>
                        <span>{enq.uploadedFiles?.length || 0} files</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Detailed Inspection */}
            <div className="lg:col-span-7">
              {selectedItem && selectedItem.trackingId ? (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                    <div>
                      <span className="font-mono text-xs text-slate-400">Project Reference ID</span>
                      <h3 className="font-mono font-black text-2xl text-slate-900">{selectedItem.trackingId}</h3>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border self-start ${
                        statusBadgeStyles[selectedItem.projectStatus] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {selectedItem.projectStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Service Type</span>
                      <span className="font-bold text-slate-800">
                        {selectedItem.serviceRequired || selectedItem.mainServiceCategory}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Assigned Consultant
                      </span>
                      <span className="font-bold text-teal-700">
                        {selectedItem.assignedConsultant?.name || 'Dr. Eleanor Vance, RAC Senior Consultant'}
                      </span>
                    </div>
                  </div>

                  {/* Description / Scope */}
                  <div>
                    <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                      Submitted Requirements Scope:
                    </span>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {selectedItem.description || selectedItem.projectScopeDetails || 'Standard consultation requested.'}
                    </p>
                  </div>

                  {/* Milestones Timeline */}
                  {selectedItem.milestones && selectedItem.milestones.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-900 uppercase tracking-wider block mb-3">
                        Project Milestones & Review Progression:
                      </span>
                      <div className="space-y-3 relative pl-6 border-l border-slate-200">
                        {selectedItem.milestones.map((m, idx) => (
                          <div key={idx} className="relative">
                            <div
                              className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                                m.status === 'completed'
                                  ? 'bg-emerald-500'
                                  : m.status === 'in-progress'
                                  ? 'bg-amber-500'
                                  : 'bg-slate-300'
                              }`}
                            ></div>
                            <span className="font-bold text-slate-900 block">{m.title}</span>
                            <p className="text-slate-500 text-[11px]">{m.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attached Documents */}
                  <div>
                    <span className="font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Uploaded Client Documents:
                    </span>
                    {selectedItem.uploadedFiles && selectedItem.uploadedFiles.length > 0 ? (
                      <div className="space-y-2">
                        {selectedItem.uploadedFiles.map((f, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                          >
                            <span className="font-mono text-slate-800 line-clamp-1">{f.originalName}</span>
                            <span className="text-teal-700 font-bold">Uploaded & Secured</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">No files attached to this request sequence.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
                  Select a consultation request to inspect full milestone status.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: License Tracking Records */}
        {activeTab === 'licenses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Active Tracked Pharmaceutical Licenses
              </span>
              <button
                onClick={() => onNavigate('services-license-tracking')}
                className="text-xs font-bold text-teal-700 hover:underline flex items-center space-x-1"
              >
                <span>Open Dedicated License Tracking Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userLicenses.map((lic) => {
                const badgeClass = statusBadgeStyles[lic.currentStatus] || 'bg-slate-100 text-slate-700';
                return (
                  <div key={lic.applicationId} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-teal-700">{lic.applicationId}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                        {lic.currentStatus}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">{lic.companyName}</h4>
                      <p className="text-slate-500 text-[11px]">{lic.licenseCategory}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-[11px] space-y-1 text-slate-600">
                      <p>Authority: {lic.regulatoryAuthority}</p>
                      <p>
                        Next Renewal:{' '}
                        <strong className="text-slate-900">
                          {lic.nextRenewalDate ? new Date(lic.nextRenewalDate).toLocaleDateString() : 'Under Review'}
                        </strong>
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2">{lic.remarks}</p>

                    <button
                      onClick={() => onNavigate('services-license-tracking')}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-colors"
                    >
                      View Live Dossier & Timeline
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Reminders & Follow-ups */}
        {activeTab === 'reminders' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Statutory Reminders & Regulatory Deadlines</h3>
              <p className="text-xs text-slate-500 mt-1">
                Automated alerts generated from certified license retention periods and health authority query response clocks
              </p>
            </div>

            <div className="space-y-3">
              {remindersList.map((rem, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    rem.type === 'urgent'
                      ? 'bg-purple-50/70 border-purple-200 text-purple-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-teal-700">{rem.reference}</span>
                      <span className="font-bold text-slate-900">{rem.title}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Authority: {rem.authority} • Status: {rem.status}</p>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Cut-off Date</span>
                      <span className="font-bold text-teal-700">{new Date(rem.date).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry(`Renewal Assistance: ${rem.reference}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px]"
                    >
                      Request Renewal Support
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
