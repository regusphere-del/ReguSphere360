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
  Activity,
  Calendar,
  Send,
  Printer,
  ShieldCheck,
  FileCheck2,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusOptions = [
  'Application Submitted',
  'Under Review',
  'Query Raised',
  'Documents Pending',
  'Approved',
  'Rejected',
  'Renewal Due',
  'Gap Assessment In Progress',
  'Completed & Follow-up',
];

const consultantsList = [
  { name: 'Dr. Eleanor Vance, RAC Senior Consultant', email: 'regulatory@regusphere360.com' },
  { name: 'Dr. Marcus Holloway, CMC Technical Lead', email: 'cmc.lead@regusphere360.com' },
  { name: 'Aarav Nair, Senior eCTD Operations Manager', email: 'ectd.ops@regusphere360.com' },
  { name: 'Priya Sundaram, Global Intelligence Director', email: 'intelligence@regusphere360.com' },
];

export const AdminDashboard = () => {
  const [role, setRole] = useState('Administrator'); // 'Administrator' | 'Lead RAC Consultant' | 'Client Auditor'
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Enquiries management modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [consultantNotes, setConsultantNotes] = useState('');
  const [assignedConsultant, setAssignedConsultant] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // License tracking management modal
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [licStatus, setLicStatus] = useState('');
  const [licRemarks, setLicRemarks] = useState('');
  const [licPendingDocs, setLicPendingDocs] = useState('');
  const [licRenewalDate, setLicRenewalDate] = useState('');
  const [licFollowUpDate, setLicFollowUpDate] = useState('');
  const [isUpdatingLic, setIsUpdatingLic] = useState(false);

  // Status report generation modal
  const [reportData, setReportData] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' | 'licenses' | 'training' | 'academic'

  // Academic Resources management state
  const [academicResources, setAcademicResources] = useState([]);
  const [acadSearch, setAcadSearch] = useState('');
  const [acadUnivFilter, setAcadUnivFilter] = useState('All');
  const [acadTypeFilter, setAcadTypeFilter] = useState('All');
  const [editingAcadResource, setEditingAcadResource] = useState(null);
  const [isCreatingAcad, setIsCreatingAcad] = useState(false);
  const [acadForm, setAcadForm] = useState({
    title: '',
    university: 'pci-uniform',
    scheme: 'PCI Uniform Master Syllabus',
    semester: 'Semester I',
    subject: 'Good Regulatory Practices (MRA 101T)',
    unit: 'Unit I',
    topic: '',
    resourceType: 'Unit-wise Notes and Explanations',
    marksCategory: 'All',
    content: '',
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, enqRes, licRes, regRes, acadRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/overview`).catch(() => ({ data: { success: false } })),
        axios.get(`${API_BASE}/enquiries`).catch(() => ({ data: { success: false } })),
        axios.get(`${API_BASE}/licenses`).catch(() => ({ data: { success: false } })),
        axios.get(`${API_BASE}/courses/registrations/all`).catch(() => ({ data: { success: false } })),
        axios.get(`${API_BASE}/mpharm-resources`).catch(() => ({ data: { success: false } })),
      ]);

      if (statsRes.data?.success) setStats(statsRes.data.stats);
      if (enqRes.data?.success) setEnquiries(enqRes.data.enquiries || []);
      if (licRes.data?.success) setLicenses(licRes.data.licenses || []);
      if (regRes.data?.success) setRegistrations(regRes.data.registrations || []);
      if (acadRes.data?.success) setAcademicResources(acadRes.data.resources || []);
    } catch (err) {
      console.warn('Dashboard fetch notice:', err.message);
    }
  };

  const handleSaveAcadResource = async (e) => {
    e.preventDefault();
    try {
      if (isCreatingAcad) {
        const res = await axios.post(`${API_BASE}/mpharm-resources`, acadForm);
        if (res.data?.success) {
          setAcademicResources((prev) => [res.data.resource, ...prev]);
        }
        alert('Academic resource uploaded successfully.');
      } else if (editingAcadResource) {
        const res = await axios.put(`${API_BASE}/mpharm-resources/${editingAcadResource.id}`, acadForm);
        if (res.data?.success) {
          setAcademicResources((prev) =>
            prev.map((r) => (r.id === editingAcadResource.id ? res.data.resource : r))
          );
        }
        alert('Academic resource updated.');
      }
      setIsCreatingAcad(false);
      setEditingAcadResource(null);
    } catch (err) {
      alert('Error saving academic resource: ' + err.message);
    }
  };

  const handleDeleteAcadResource = async (id, title) => {
    if (!window.confirm(`Delete academic resource "${title}"?`)) return;
    try {
      await axios.delete(`${API_BASE}/mpharm-resources/${id}`);
      setAcademicResources((prev) => prev.filter((r) => r.id !== id));
      alert('Resource removed.');
    } catch (err) {
      alert('Error deleting resource: ' + err.message);
    }
  };

  const handleUpdateEnquiry = async (trackingId) => {
    try {
      setIsUpdating(true);
      await axios.patch(`${API_BASE}/admin/enquiries/${trackingId}`, {
        projectStatus: newStatus || undefined,
        adminNotes: consultantNotes || undefined,
        nextMilestoneTitle: newMilestoneTitle || undefined,
        assignedConsultant: assignedConsultant ? { name: assignedConsultant } : undefined,
      });

      setEnquiries((prev) =>
        prev.map((e) =>
          e.trackingId === trackingId
            ? {
                ...e,
                projectStatus: newStatus || e.projectStatus,
                adminNotes: consultantNotes || e.adminNotes,
                assignedConsultant: assignedConsultant ? { name: assignedConsultant } : e.assignedConsultant,
              }
            : e
        )
      );

      alert(`Consultation file ${trackingId} updated successfully.`);
      setSelectedEnquiry(null);
      setNewMilestoneTitle('');
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateLicense = async (applicationId) => {
    try {
      setIsUpdatingLic(true);
      const res = await axios.patch(`${API_BASE}/licenses/${applicationId}`, {
        currentStatus: licStatus || undefined,
        remarks: licRemarks || undefined,
        pendingDocumentation: licPendingDocs || undefined,
        nextRenewalDate: licRenewalDate || undefined,
        followUpDate: licFollowUpDate || undefined,
      });

      if (res.data.success) {
        setLicenses((prev) =>
          prev.map((l) => (l.applicationId === applicationId ? res.data.license : l))
        );
        alert(`License tracking file ${applicationId} updated successfully.`);
        setSelectedLicense(null);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating license.');
    } finally {
      setIsUpdatingLic(false);
    }
  };

  const handleGenerateReport = async (trackingId) => {
    try {
      setIsGeneratingReport(true);
      const res = await axios.get(`${API_BASE}/admin/reports/${trackingId}`);
      if (res.data.success) {
        setReportData(res.data.report);
      }
    } catch (err) {
      console.error(err);
      alert('Error generating status report.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesCategory =
      categoryFilter === 'All' ||
      (e.mainServiceCategory && e.mainServiceCategory.includes(categoryFilter)) ||
      (e.serviceRequired && e.serviceRequired.includes(categoryFilter));
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
              Internal regulatory operations: manage client enquiries, update license tracking milestones & generate compliance audits
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="text-slate-500 font-semibold">Role:</span>
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
            <span className="text-[11px] text-teal-700 font-semibold">Client Consultations</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tracked Licenses</span>
            <p className="text-3xl font-black text-blue-600 mt-1">{licenses.length || 7}</p>
            <span className="text-[11px] text-slate-500">Active Regulatory Files</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Dossiers</span>
            <p className="text-3xl font-black text-teal-700 mt-1">
              {enquiries.filter((e) => e.projectStatus !== 'Completed & Follow-up').length || 6}
            </p>
            <span className="text-[11px] text-slate-500">In Review Pipeline</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">First-Cycle Pass</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">99.4%</p>
            <span className="text-[11px] text-slate-500">Gateway Acceptance</span>
          </div>
        </div>

        {/* Tab Controls: Enquiries vs Licenses vs Training */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 ${
              activeTab === 'enquiries'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Consultancy Enquiries ({filteredEnquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('licenses')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 ${
              activeTab === 'licenses'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>License Tracking Records ({licenses.length})</span>
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

          <button
            onClick={() => setActiveTab('academic')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 ${
              activeTab === 'academic'
                ? 'bg-indigo-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Academic Resources (M.Pharm) ({academicResources.length})</span>
          </button>
        </div>

        {/* TAB 1: CONSULTANCY ENQUIRIES */}
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
                  <option value="eCTD">eCTD Consultancy</option>
                  <option value="License Tracking">License Tracking</option>
                  <option value="Regulatory Documentation">Regulatory Documentation</option>
                  <option value="Licensing Guidance">Licensing Guidance</option>
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
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4">Tracking ID</th>
                    <th className="py-3.5 px-4">Client & Organization</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Assigned Consultant</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq.trackingId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                        {enq.trackingId}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{enq.company || enq.organization}</strong>
                        <span className="text-slate-500 text-[11px]">
                          {enq.clientName || enq.fullName} ({enq.email})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {enq.serviceRequired || enq.mainServiceCategory}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-teal-50 text-teal-800 border-teal-200">
                          {enq.projectStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {enq.assignedConsultant?.name || 'Dr. Eleanor Vance'}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => handleGenerateReport(enq.trackingId)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px]"
                          title="Generate Client Status Report"
                        >
                          Report
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setNewStatus(enq.projectStatus);
                            setConsultantNotes(enq.adminNotes || '');
                            setAssignedConsultant(enq.assignedConsultant?.name || consultantsList[0].name);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px]"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PHARMACEUTICAL LICENSE TRACKING RECORDS */}
        {activeTab === 'licenses' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Application ID</th>
                  <th className="py-3.5 px-4">Applicant & Company</th>
                  <th className="py-3.5 px-4">License Category</th>
                  <th className="py-3.5 px-4">Authority</th>
                  <th className="py-3.5 px-4">Current Status</th>
                  <th className="py-3.5 px-4">Next Renewal</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {licenses.map((lic) => (
                  <tr key={lic.applicationId} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-800 whitespace-nowrap">
                      {lic.applicationId}
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 block">{lic.companyName}</strong>
                      <span className="text-slate-500 text-[11px]">{lic.applicantName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{lic.licenseCategory}</td>
                    <td className="py-3.5 px-4 text-slate-600">{lic.regulatoryAuthority}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-blue-50 text-blue-800 border-blue-200">
                        {lic.currentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {lic.nextRenewalDate ? new Date(lic.nextRenewalDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedLicense(lic);
                          setLicStatus(lic.currentStatus);
                          setLicRemarks(lic.remarks || '');
                          setLicPendingDocs(lic.pendingDocumentation?.join(', ') || '');
                          setLicRenewalDate(
                            lic.nextRenewalDate
                              ? new Date(lic.nextRenewalDate).toISOString().split('T')[0]
                              : ''
                          );
                          setLicFollowUpDate(
                            lic.followUpDate
                              ? new Date(lic.followUpDate).toISOString().split('T')[0]
                              : ''
                          );
                        }}
                        className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-[11px]"
                      >
                        Update Tracking File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: TRAINING REGISTRATIONS TABLE */}
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
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
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
                        Confirmed / Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: M.PHARM ACADEMIC RESOURCES REPOSITORY */}
        {activeTab === 'academic' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 flex-1 w-full">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={acadSearch}
                    onChange={(e) => setAcadSearch(e.target.value)}
                    placeholder="Search academic resources by title, subject, unit..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <select
                  value={acadUnivFilter}
                  onChange={(e) => setAcadUnivFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="All">All Universities</option>
                  <option value="pci-uniform">PCI Uniform</option>
                  <option value="rguhs">RGUHS</option>
                  <option value="jntu">JNTU</option>
                  <option value="sppu">SPPU</option>
                  <option value="niper">NIPER</option>
                  <option value="jamia-hamdard">Jamia Hamdard</option>
                </select>

                <select
                  value={acadTypeFilter}
                  onChange={(e) => setAcadTypeFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="All">All Resource Types</option>
                  <option value="Semester-wise Syllabus">Syllabus</option>
                  <option value="Subject-wise Study Materials">Study Materials</option>
                  <option value="Unit-wise Notes and Explanations">Unit Notes</option>
                  <option value="Short-answer questions (2 marks)">2-Mark Questions</option>
                  <option value="Medium-answer questions (5 marks)">5-Mark Questions</option>
                  <option value="Long-answer questions (10 marks)">10-Mark Questions</option>
                  <option value="Previous examination question papers">Exam Papers</option>
                  <option value="Seminar topics and presentation materials">Seminars</option>
                  <option value="Assignment preparation resources">Assignments</option>
                  <option value="Research methodology and project guidance">Research/Thesis</option>
                  <option value="Viva voce questions and answers">Viva Voce</option>
                  <option value="Recommended textbooks and reference materials">Textbooks</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setIsCreatingAcad(true);
                  setEditingAcadResource(null);
                  setAcadForm({
                    title: '',
                    university: 'pci-uniform',
                    scheme: 'PCI Uniform Master Syllabus',
                    semester: 'Semester I',
                    subject: 'Good Regulatory Practices (MRA 101T)',
                    unit: 'Unit I',
                    topic: '',
                    resourceType: 'Unit-wise Notes and Explanations',
                    marksCategory: 'All',
                    content: '',
                  });
                }}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Academic Resource</span>
              </button>
            </div>

            {/* Academic Resources Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Title & University</th>
                    <th className="py-3 px-4">Semester & Subject</th>
                    <th className="py-3 px-4">Resource Type</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Upload Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {academicResources
                    .filter((r) => {
                      if (acadUnivFilter !== 'All' && r.university !== acadUnivFilter) return false;
                      if (acadTypeFilter !== 'All' && r.resourceType !== acadTypeFilter) return false;
                      if (acadSearch.trim()) {
                        const q = acadSearch.toLowerCase();
                        return (
                          r.title.toLowerCase().includes(q) ||
                          r.subject.toLowerCase().includes(q) ||
                          r.topic.toLowerCase().includes(q)
                        );
                      }
                      return true;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                          <span className="block">{item.title}</span>
                          <span className="text-[10px] text-indigo-700 font-semibold">{item.scheme || item.university}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          <strong className="block">{item.semester}</strong>
                          <span className="text-[11px] text-slate-500">{item.subject}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {item.resourceType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium font-mono text-[11px]">
                          {item.marksCategory || 'All'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{item.uploadDate}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => {
                                setEditingAcadResource(item);
                                setIsCreatingAcad(false);
                                setAcadForm({
                                  title: item.title,
                                  university: item.university,
                                  scheme: item.scheme,
                                  semester: item.semester,
                                  subject: item.subject,
                                  unit: item.unit,
                                  topic: item.topic,
                                  resourceType: item.resourceType,
                                  marksCategory: item.marksCategory || 'All',
                                  content: item.content,
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold flex items-center space-x-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteAcadResource(item.id, item.title)}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold flex items-center space-x-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ACADEMIC RESOURCE EDIT / CREATE */}
        {(isCreatingAcad || editingAcadResource) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8 text-xs">
              <button
                onClick={() => {
                  setIsCreatingAcad(false);
                  setEditingAcadResource(null);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isCreatingAcad ? 'Upload New M.Pharm Academic Resource' : 'Edit Academic Resource'}
              </h3>
              <p className="text-slate-500 mb-4">Manage academic notes, question banks, or past question papers.</p>

              <form onSubmit={handleSaveAcadResource} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={acadForm.title}
                    onChange={(e) => setAcadForm({ ...acadForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">University</label>
                    <select
                      value={acadForm.university}
                      onChange={(e) => setAcadForm({ ...acadForm, university: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                    >
                      <option value="pci-uniform">PCI Uniform</option>
                      <option value="rguhs">RGUHS</option>
                      <option value="jntu">JNTU</option>
                      <option value="sppu">SPPU</option>
                      <option value="niper">NIPER</option>
                      <option value="jamia-hamdard">Jamia Hamdard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Semester</label>
                    <select
                      value={acadForm.semester}
                      onChange={(e) => setAcadForm({ ...acadForm, semester: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                    >
                      <option value="Semester I">Semester I</option>
                      <option value="Semester II">Semester II</option>
                      <option value="Semester III">Semester III</option>
                      <option value="Semester IV">Semester IV</option>
                      <option value="All Semesters">All Semesters</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Subject</label>
                    <input
                      type="text"
                      value={acadForm.subject}
                      onChange={(e) => setAcadForm({ ...acadForm, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Resource Type</label>
                    <select
                      value={acadForm.resourceType}
                      onChange={(e) => setAcadForm({ ...acadForm, resourceType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                    >
                      <option value="Semester-wise Syllabus">Semester-wise Syllabus</option>
                      <option value="Subject-wise Study Materials">Subject-wise Study Materials</option>
                      <option value="Unit-wise Notes and Explanations">Unit-wise Notes and Explanations</option>
                      <option value="Short-answer questions (2 marks)">Short-answer questions (2 marks)</option>
                      <option value="Medium-answer questions (5 marks)">Medium-answer questions (5 marks)</option>
                      <option value="Long-answer questions (10 marks)">Long-answer questions (10 marks)</option>
                      <option value="Previous examination question papers">Previous examination question papers</option>
                      <option value="Seminar topics and presentation materials">Seminar topics and presentation materials</option>
                      <option value="Assignment preparation resources">Assignment preparation resources</option>
                      <option value="Research methodology and project guidance">Research methodology and project guidance</option>
                      <option value="Viva voce questions and answers">Viva voce questions and answers</option>
                      <option value="Recommended textbooks and reference materials">Recommended textbooks and reference materials</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Content / Study Notes *</label>
                  <textarea
                    rows={6}
                    required
                    value={acadForm.content}
                    onChange={(e) => setAcadForm({ ...acadForm, content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingAcad(false);
                      setEditingAcadResource(null);
                    }}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold"
                  >
                    {isCreatingAcad ? 'Publish Resource' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 1: MANAGE ENQUIRY STATUS & CONSULTANT */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8 text-xs">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-lg p-1"
              >
                ✕
              </button>

              <div className="pb-4 mb-4 border-b border-slate-200">
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {selectedEnquiry.trackingId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedEnquiry.company || selectedEnquiry.organization}</h3>
                <p className="text-slate-500">
                  Applicant: {selectedEnquiry.clientName || selectedEnquiry.fullName} ({selectedEnquiry.email}) • {selectedEnquiry.phone || 'No phone'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Update Status Milestone</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-teal-500"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Assign Lead RAC Consultant</label>
                    <select
                      value={assignedConsultant}
                      onChange={(e) => setAssignedConsultant(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-teal-500"
                    >
                      {consultantsList.map((c) => (
                        <option key={c.email} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Add New Milestone Event (Optional)</label>
                  <input
                    type="text"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    placeholder="e.g. Module 3 CMC Gap Matrix Approved by Client"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Consultant Follow-up Remarks & Notes</label>
                  <textarea
                    rows={3}
                    value={consultantNotes}
                    onChange={(e) => setConsultantNotes(e.target.value)}
                    placeholder="Add confidential notes, meeting actions, or review timelines..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateEnquiry(selectedEnquiry.trackingId)}
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-colors"
                  >
                    {isUpdating ? 'Saving...' : 'Save & Update Tracking File'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: UPDATE LICENSE TRACKING RECORD */}
        {selectedLicense && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8 text-xs">
              <button
                onClick={() => setSelectedLicense(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-lg p-1"
              >
                ✕
              </button>

              <div className="pb-4 mb-4 border-b border-slate-200">
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {selectedLicense.applicationId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedLicense.companyName}</h3>
                <p className="text-slate-500">
                  {selectedLicense.licenseCategory} • Authority: {selectedLicense.regulatoryAuthority}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Current Status *</label>
                    <select
                      value={licStatus}
                      onChange={(e) => setLicStatus(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-teal-500"
                    >
                      <option value="Application Submitted">Application Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Query Raised">Query Raised</option>
                      <option value="Documents Pending">Documents Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Renewal Due">Renewal Due</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Next Renewal Date</label>
                    <input
                      type="date"
                      value={licRenewalDate}
                      onChange={(e) => setLicRenewalDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Follow-up Date</label>
                    <input
                      type="date"
                      value={licFollowUpDate}
                      onChange={(e) => setLicFollowUpDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pending Documentation (Comma-separated)</label>
                  <input
                    type="text"
                    value={licPendingDocs}
                    onChange={(e) => setLicPendingDocs(e.target.value)}
                    placeholder="e.g. Schedule M audit protocol, Water system TOC calibration"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Consultant Remarks & Regulatory Updates</label>
                  <textarea
                    rows={3}
                    value={licRemarks}
                    onChange={(e) => setLicRemarks(e.target.value)}
                    placeholder="Record notes on inspectorate communication, query submissions, or fee receipts..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedLicense(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateLicense(selectedLicense.applicationId)}
                    disabled={isUpdatingLic}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-colors"
                  >
                    {isUpdatingLic ? 'Saving Updates...' : 'Update License Record'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: GENERATE CLIENT STATUS REPORT */}
        {reportData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl relative my-8 text-xs space-y-6">
              <button
                onClick={() => setReportData(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1 rounded-lg"
              >
                ✕
              </button>

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <img src="/logo.jpg" alt="ReguSphere 360" className="w-10 h-10 rounded-lg object-contain border p-0.5" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">ReguSphere 360 Regulatory Status Audit</h3>
                    <p className="text-[11px] text-slate-500">Official Client Dossier Verification Summary</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-teal-700 font-bold block">{reportData.reportId}</span>
                  <span className="text-[10px] text-slate-400">
                    Generated: {new Date(reportData.generatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Organization</span>
                  <p className="font-bold text-slate-900">{reportData.organization}</p>
                  <p className="text-slate-500">{reportData.applicant}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Project Status</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {reportData.currentStatus}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">Executive Summary</span>
                <p className="text-slate-700 leading-relaxed p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  {reportData.executiveSummary}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase tracking-wider block mb-2">Deliverables Status</span>
                <div className="space-y-1.5">
                  {reportData.deliverablesCompleted.map((del, i) => (
                    <div key={i} className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase tracking-wider block mb-2">Recommended Next Actions</span>
                <div className="space-y-1 text-slate-600">
                  {reportData.recommendedNextSteps.map((stp, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span className="font-bold text-teal-700">•</span>
                      <span>{stp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-[10px] text-amber-900 border border-amber-200">
                {reportData.regulatoryDisclaimer}
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Export Audit PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
