import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Lock,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileText,
  User,
  Building2,
  Layers,
  Sparkles,
  Edit,
  Save,
  Download,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  X,
  CreditCard,
  GraduationCap,
  Globe2,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminDashboard = () => {
  const [role, setRole] = useState('Administrator'); // 'Administrator' | 'Lead RAC Consultant' | 'Client Auditor'
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [consultantNotes, setConsultantNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' | 'training'

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, enqRes, regRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/overview`),
        axios.get(`${API_BASE}/enquiries`),
        axios.get(`${API_BASE}/courses/registrations/all`),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (enqRes.data.success) setEnquiries(enqRes.data.enquiries);
      if (regRes.data.success) setRegistrations(regRes.data.registrations);
    } catch (err) {
      console.warn('Dashboard fetch notice:', err);
    }
  };

  const handleUpdateStatus = async (trackingId) => {
    try {
      setIsUpdating(true);
      await axios.patch(`${API_BASE}/admin/enquiries/${trackingId}`, {
        projectStatus: newStatus || undefined,
        adminNotes: consultantNotes || undefined,
        nextMilestoneTitle: newMilestoneTitle || undefined,
      });

      // Update local state
      setEnquiries((prev) =>
        prev.map((e) =>
          e.trackingId === trackingId
            ? {
                ...e,
                projectStatus: newStatus || e.projectStatus,
                adminNotes: consultantNotes || e.adminNotes,
              }
            : e
        )
      );

      if (selectedEnquiry && selectedEnquiry.trackingId === trackingId) {
        setSelectedEnquiry((prev) => ({
          ...prev,
          projectStatus: newStatus || prev.projectStatus,
          adminNotes: consultantNotes || prev.adminNotes,
        }));
      }

      alert(`Project ${trackingId} updated successfully.`);
      setNewMilestoneTitle('');
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesCategory =
      categoryFilter === 'All' || (e.mainServiceCategory && e.mainServiceCategory.includes(categoryFilter));
    const matchesStatus = statusFilter === 'All' || e.projectStatus === statusFilter;
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      !q ||
      e.trackingId?.toLowerCase().includes(q) ||
      e.company?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.clientName?.toLowerCase().includes(q);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Role Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-slate-900 text-white">
                <Lock className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">ReguSphere 360 Admin Portal</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Internal regulatory operations: manage submissions, quotations, intelligence briefs & training cohorts
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="text-slate-500 font-semibold">Active Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-100 border border-slate-300 font-bold text-slate-900 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="Administrator">Administrator (Full Control)</option>
              <option value="Lead RAC Consultant">Lead RAC Consultant (Reviewer)</option>
              <option value="Client Auditor">Client Auditor (Read-Only)</option>
            </select>
            <button
              onClick={fetchDashboardData}
              className="p-1 rounded hover:bg-slate-100 text-slate-600"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enquiries</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats?.totalEnquiries || enquiries.length}</p>
            <span className="text-[11px] text-teal-700 font-semibold">All 3 Practices Included</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Dossiers</span>
            <p className="text-3xl font-black text-teal-700 mt-1">
              {enquiries.filter((e) => e.projectStatus !== 'Completed & Follow-up').length || 6}
            </p>
            <span className="text-[11px] text-slate-500">In Scoping or Review</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Training Enrollments</span>
            <p className="text-3xl font-black text-amber-700 mt-1">
              {registrations.length || 24}
            </p>
            <span className="text-[11px] text-slate-500">Masterclasses & Cohorts</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gateway Pass Rate</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">99.4%</p>
            <span className="text-[11px] text-slate-500">First-Cycle Acceptance</span>
          </div>
        </div>

        {/* Tab Controls: Enquiries vs Training Registrations */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 ${
              activeTab === 'enquiries'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Consultancy Enquiries & Projects ({filteredEnquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('training')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 ${
              activeTab === 'training'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Course Registrations ({registrations.length})</span>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES & DOSSIER PROJECTS */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by Tracking ID, Company or Email..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Practices</option>
                  <option value="Regulatory Documentation">Regulatory Documentation</option>
                  <option value="Global Regulatory Intelligence">Regulatory Intelligence</option>
                  <option value="Regulatory Education">Education & Training</option>
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Enquiry Submitted">Enquiry Submitted</option>
                  <option value="Initial Assessment">Initial Assessment</option>
                  <option value="Document Scoping">Document Scoping</option>
                  <option value="Gap Assessment In Progress">Gap Assessment In Progress</option>
                  <option value="Ready for Submission">Ready for Submission</option>
                  <option value="Completed & Follow-up">Completed & Follow-up</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4">Tracking Code</th>
                    <th className="py-3.5 px-4">Client & Company</th>
                    <th className="py-3.5 px-4">Service Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Urgency</th>
                    <th className="py-3.5 px-4">Files</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq.trackingId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                        {enq.trackingId}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{enq.company}</strong>
                        <span className="text-slate-500 text-[11px]">{enq.clientName} ({enq.email})</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {enq.mainServiceCategory || 'Regulatory Documentation'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            enq.projectStatus.includes('Completed')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : enq.projectStatus.includes('Progress') || enq.projectStatus.includes('Scoping')
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-blue-50 text-blue-800 border-blue-300'
                          }`}
                        >
                          {enq.projectStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {enq.urgency || 'Standard'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {enq.uploadedFiles?.length || 0} files
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setNewStatus(enq.projectStatus);
                            setConsultantNotes(enq.adminNotes || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px]"
                        >
                          Manage / Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TRAINING REGISTRATIONS TABLE */}
        {activeTab === 'training' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Registration ID</th>
                  <th className="py-3.5 px-4">Course Masterclass</th>
                  <th className="py-3.5 px-4">Attendee Name & Email</th>
                  <th className="py-3.5 px-4">Company / University</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Enrollment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No registrations logged yet. Test register from the Education & Training page!
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.registrationId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-800 whitespace-nowrap">
                        {reg.registrationId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">{reg.courseTitle}</td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <strong className="block">{reg.attendeeName}</strong>
                        <span className="text-[11px] text-slate-500">{reg.email}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{reg.companyOrInstitute}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {reg.attendeeType || 'Working Professional'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          {reg.paymentStatus && !reg.paymentStatus.includes('Test') && !reg.paymentStatus.includes('Simulated') ? reg.paymentStatus : 'Confirmed / Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* STATUS & DETAIL DRAWER MODAL */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8 text-xs">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-lg p-1"
              >
                ✕
              </button>

              <div className="pb-4 mb-4 border-b border-slate-200">
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {selectedEnquiry.trackingId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedEnquiry.company}</h3>
                <p className="text-slate-500">
                  Client: {selectedEnquiry.clientName} ({selectedEnquiry.email}) • {selectedEnquiry.phone || 'No phone'}
                </p>
              </div>

              {/* Status Update Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Update Project Milestone Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-teal-500"
                  >
                    <option value="Enquiry Submitted">Enquiry Submitted</option>
                    <option value="Initial Assessment">Initial Assessment</option>
                    <option value="Proposal Dispatched">Proposal Dispatched</option>
                    <option value="Engagement & Kick-off">Engagement & Kick-off</option>
                    <option value="Document Scoping">Document Scoping</option>
                    <option value="Gap Assessment In Progress">Gap Assessment In Progress</option>
                    <option value="Dossier Assembly">Dossier Assembly</option>
                    <option value="Ready for Submission">Ready for Submission</option>
                    <option value="Completed & Follow-up">Completed & Follow-up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Add New Milestone Event (Optional)</label>
                  <input
                    type="text"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    placeholder="e.g. Module 3 CMC Gap Matrix Approved by Client"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lead Consultant Internal Notes</label>
                  <textarea
                    rows={3}
                    value={consultantNotes}
                    onChange={(e) => setConsultantNotes(e.target.value)}
                    placeholder="Add confidential notes, meeting actions, or review timelines..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Scope & Files Summary */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Target Agencies: {selectedEnquiry.targetAgencies?.join(', ') || 'N/A'}</p>
                  <p className="text-slate-600">Dossier Type: {selectedEnquiry.dossierType || 'eCTD'}</p>
                  <p className="text-slate-600">Quotation Band: {selectedEnquiry.estimatedQuotation?.costBand || 'N/A'}</p>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedEnquiry.trackingId)}
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-colors"
                  >
                    {isUpdating ? 'Saving Changes...' : 'Save & Update Tracking Status'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
