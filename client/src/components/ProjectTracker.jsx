import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  User,
  ShieldCheck,
  Building2,
  AlertCircle,
  FileCheck2,
  Download,
  Calendar,
  Layers,
  ArrowRight,
  X,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ProjectTracker = ({ initialTrackingId, onClose, onNewEnquiry }) => {
  const { currentUser } = useAuth();
  const [trackingIdInput, setTrackingIdInput] = useState(initialTrackingId || 'REG-2026-1001');
  const [projectData, setProjectData] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch project by tracking ID
  const fallbackProjects = {
    'REG-2026-1001': {
      trackingId: 'REG-2026-1001',
      clientName: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@biocrest-therapeutics.com',
      company: 'BioCrest Therapeutics Inc.',
      companyType: 'Biotech Startup',
      selectedServices: ['ICH CTD Dossier Indexing & Document Structuring', 'Regulatory Document Gap Assessments'],
      serviceRequired: 'Regulatory Documentation Consultancy',
      targetAgencies: ['US FDA', 'EMA (European Medicines Agency)'],
      dossierType: 'IND (Investigational New Drug)',
      therapeuticArea: 'Oncology / Biologics',
      urgency: 'Accelerated Review (10-14 Business Days)',
      projectStatus: 'Gap Assessment In Progress',
      createdAt: '2026-10-28T10:00:00.000Z',
      projectScopeDetails: 'Initial IND / CTA filing for novel bispecific antibody. Comprehensive Module 3 CMC gap review and eCTD structure indexing before pre-IND health authority meeting.',
      assignedConsultant: {
        name: 'Dr. Eleanor Vance, RAC Senior Consultant',
        email: 'regulatory@regusphere360.com',
        role: 'Lead Regulatory Affairs Strategist & EU-CTR Lead'
      },
      milestones: [
        {
          title: 'Enquiry Received & Scoping Started',
          description: 'Project brief and raw technical dossiers received and categorized.',
          status: 'completed',
          updatedAt: '2026-10-28T10:00:00.000Z'
        },
        {
          title: 'Preliminary Gap Assessment & Work Breakdown',
          description: 'Audit of Module 3 CMC data vs FDA 21 CFR 312 guidelines.',
          status: 'in-progress',
          updatedAt: '2026-10-29T14:30:00.000Z'
        },
        {
          title: 'Dossier Structuring & Regulatory Writing Review',
          description: 'Module 2.3 Quality Overall Summary alignment and leaf hyperlinks.',
          status: 'pending'
        },
        {
          title: 'Agency Gate Readiness Certification',
          description: 'Final technical validation against eCTD 3.2.2 DTD specifications.',
          status: 'pending'
        }
      ],
      uploadedFiles: [
        { originalName: 'Module_3_CMC_Drug_Substance_Summary.pdf', size: 4210000, mimeType: 'application/pdf' },
        { originalName: 'BioCrest_PreIND_Briefing_Book_Draft.docx', size: 1850000, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      ]
    },
    'REG-2026-1215': {
      trackingId: 'REG-2026-1215',
      clientName: 'Rajesh Sharma',
      email: 'rajesh.sharma@apexformulations.com',
      company: 'Apex Formulations Ltd.',
      companyType: 'Finished Dosage Manufacturer',
      selectedServices: ['CDSCO Regulatory Documentation & Manufacturing Form 25/28'],
      serviceRequired: 'Regulatory Documentation & License Tracking',
      targetAgencies: ['CDSCO (India)'],
      dossierType: 'Manufacturing License Application',
      therapeuticArea: 'Solid Oral Dosage Forms',
      urgency: 'Standard (20-30 Business Days)',
      projectStatus: 'Application Submitted',
      createdAt: '2026-10-31T09:15:00.000Z',
      projectScopeDetails: 'Full qualification audit and Form 25 manufacturing license filing with SLA inspectorate checklist.',
      assignedConsultant: {
        name: 'Suresh Menon, Ex-Drug Inspector Advisor',
        email: 'licensing@regusphere360.com',
        role: 'SLA & CDSCO Technical Licensing Specialist'
      },
      milestones: [
        {
          title: 'Application Dossier Compiled & Submitted',
          description: 'Site Master File, technical staff appointments, and plant layouts submitted to portal.',
          status: 'completed',
          updatedAt: '2026-10-31T09:15:00.000Z'
        },
        {
          title: 'Joint Regulatory Inspection',
          description: 'State Licensing Authority and CDSCO inspector audit scheduled.',
          status: 'in-progress',
          updatedAt: '2026-11-01T11:00:00.000Z'
        },
        {
          title: 'Verification & Grant of License',
          description: 'Issuance of statutory Form 25 manufacturing certificate.',
          status: 'pending'
        }
      ],
      uploadedFiles: [
        { originalName: 'Site_Master_File_Apex_Unit2.pdf', size: 3100000, mimeType: 'application/pdf' }
      ]
    }
  };

  // Fetch project by tracking ID
  const handleSearch = async (idToSearch) => {
    const id = (idToSearch || trackingIdInput).trim().toUpperCase();
    if (!id) return;
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/enquiries/track/${encodeURIComponent(id)}`, { timeout: 3500 });
      if (res.data.success && res.data.enquiry) {
        setProjectData(res.data.enquiry);
        return;
      }
    } catch (err) {
      console.warn('Backend unavailable, checking client fallback data for:', id);
    } finally {
      setIsLoading(false);
    }

    // Check pre-seeded fallback projects
    if (fallbackProjects[id]) {
      setProjectData(fallbackProjects[id]);
      return;
    }

    // Check localStorage for newly created submissions
    try {
      const stored = JSON.parse(localStorage.getItem('regusphere_client_enquiries') || '[]');
      const found = stored.find((item) => item.trackingId?.toUpperCase() === id);
      if (found) {
        setProjectData(found);
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    setErrorMsg(`Project '${id}' not found. Please verify the code or test with REG-2026-1001 or REG-2026-1215.`);
    setProjectData(null);
  };

  // On mount or if initialTrackingId provided
  useEffect(() => {
    if (initialTrackingId) {
      setTrackingIdInput(initialTrackingId);
      handleSearch(initialTrackingId);
    } else {
      handleSearch('REG-2026-1001');
    }
  }, [initialTrackingId]);

  // If user is logged in, load all their past projects
  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`${API_BASE}/enquiries/user/${encodeURIComponent(currentUser.email)}`)
        .then((res) => {
          if (res.data.success) {
            setUserProjects(res.data.enquiries || []);
          }
        })
        .catch((e) => console.warn('Could not load user projects:', e));
    }
  }, [currentUser]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl my-8 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20">
            <Activity className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Live Regulatory Project Tracking Portal</h3>
            <p className="text-xs text-teal-400 font-medium">Real-Time Milestone Status, RAC Consultant Audits & Dossiers</p>
          </div>
        </div>

        {/* Tracking Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={trackingIdInput}
              onChange={(e) => setTrackingIdInput(e.target.value)}
              placeholder="Enter Project Tracking ID (e.g. REG-2026-1001)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase tracking-wider font-mono focus:outline-none focus:border-emerald-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={isLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 rounded-xl font-bold text-xs hover:from-emerald-400 transition-all shadow-md"
          >
            {isLoading ? 'Searching...' : 'Locate Project'}
          </button>
        </div>

        {/* Quick User Projects Selector if logged in */}
        {userProjects.length > 0 && (
          <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Your Registered Regulatory Projects ({userProjects.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {userProjects.map((p) => (
                <button
                  key={p.trackingId}
                  onClick={() => {
                    setTrackingIdInput(p.trackingId);
                    handleSearch(p.trackingId);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                    projectData?.trackingId === p.trackingId
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {p.trackingId} • {p.company}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => handleSearch('REG-2026-1001')}
              className="text-xs text-emerald-400 font-bold underline ml-3"
            >
              Load Demo Project (REG-2026-1001)
            </button>
          </div>
        )}

        {/* Project Tracking Details Card */}
        {projectData && (
          <div className="space-y-6">
            {/* Overview Banner */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Project Reference</span>
                <p className="text-xl font-mono font-black text-emerald-400 mt-0.5">{projectData.trackingId}</p>
                <div className="mt-1 flex items-center space-x-1.5 text-xs text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold">{projectData.company}</span>
                  <span className="text-slate-500">({projectData.companyType})</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Status & Priority</span>
                <div className="mt-1">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-teal-950 text-teal-300 border border-teal-800/60">
                    {projectData.projectStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-mono">Urgency: {projectData.urgency}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Target Jurisdictions</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {projectData.targetAgencies?.map((ag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium">
                      {ag}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Dossier: {projectData.dossierType}</p>
              </div>
            </div>

            {/* Milestones Visual Timeline */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Regulatory Milestones Timeline</span>
              </h4>

              <div className="space-y-4">
                {projectData.milestones?.map((milestone, idx) => {
                  const isDone = milestone.status === 'completed';
                  const isInProgress = milestone.status === 'in-progress';
                  return (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border ${
                            isDone
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : isInProgress
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse'
                              : 'bg-slate-900 border-slate-700 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                        </div>
                        {idx !== projectData.milestones.length - 1 && (
                          <div
                            className={`w-0.5 h-8 my-1 ${
                              isDone ? 'bg-emerald-500/50' : 'bg-slate-800'
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-bold ${
                              isDone ? 'text-white' : isInProgress ? 'text-amber-300' : 'text-slate-400'
                            }`}
                          >
                            {milestone.title}
                          </p>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              isDone
                                ? 'bg-emerald-950 text-emerald-400'
                                : isInProgress
                                ? 'bg-amber-950 text-amber-400'
                                : 'bg-slate-900 text-slate-600'
                            }`}
                          >
                            {milestone.status}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5 text-[11px]">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consultant & Uploaded Files */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assigned Consultant */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">
                  Assigned Lead RAC Consultant
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">
                      {projectData.assignedConsultant?.name || 'Dr. Eleanor Vance, RAC Senior Consultant'}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {projectData.assignedConsultant?.email || 'regulatory@regusphere360.com'}
                    </p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      Regulatory Affairs Certified (RAC)
                    </span>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">
                  Uploaded Project Files ({projectData.uploadedFiles?.length || 0})
                </span>
                {projectData.uploadedFiles?.length > 0 ? (
                  <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                    {projectData.uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          <FileText className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate text-slate-300">{file.originalName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 ml-2">
                          {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-[11px]">No confidential files uploaded with initial brief.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
            Close Portal
          </button>

          <button
            onClick={onNewEnquiry}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 transition-all shadow-md"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Submit New Documentation Enquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
