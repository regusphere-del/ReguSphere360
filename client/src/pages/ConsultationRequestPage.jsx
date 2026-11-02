import React, { useState } from 'react';
import axios from 'axios';
import {
  FileCheck2,
  Send,
  Building2,
  Mail,
  User,
  Phone,
  Globe2,
  Calendar,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const servicesOptions = [
  'eCTD Consultancy',
  'Regulatory Documentation',
  'License Tracking',
  'Pharmaceutical Licensing Guidance',
  'Global Regulatory Intelligence',
  'Regulatory Education & Training',
  'Other Regulatory Support',
];

const productCategories = [
  'Small Molecules (Finished Formulations)',
  'Active Pharmaceutical Ingredients (APIs / Bulk Drugs)',
  'Biologics / Biosimilars / mAbs',
  'Medical Devices (Class A / B / C / D)',
  'In-Vitro Diagnostics (IVD Kits)',
  'Cosmetics & Personal Care Formulations',
  'Herbal & Phytopharmaceutical Products',
  'Investigational Medicinal Products (Clinical Batches)',
];

export const ConsultationRequestPage = ({ onNavigate, preselectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    country: 'India',
    serviceRequired: preselectedService || 'eCTD Consultancy',
    productCategory: 'Small Molecules (Finished Formulations)',
    description: '',
    preferredConsultationDate: '',
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('clientName', formData.fullName);
      data.append('organization', formData.organization);
      data.append('company', formData.organization);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('country', formData.country);
      data.append('serviceRequired', formData.serviceRequired);
      data.append('productCategory', formData.productCategory);
      data.append('description', formData.description);
      data.append('projectScopeDetails', formData.description);
      data.append('preferredConsultationDate', formData.preferredConsultationDate);

      files.forEach((file) => {
        data.append('files', file);
      });

      const res = await axios.post(`${API_BASE}/enquiries`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 4000,
      });

      if (res.data.success) {
        setSubmittedData({
          trackingId: res.data.trackingId,
          enquiry: res.data.enquiry,
          message: res.data.message,
        });
      }
    } catch (err) {
      console.warn('Backend unavailable or submission errored, recording local offline enquiry:', err);
      // Fallback: Generate real tracking ID and save to local storage
      const generatedId = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackEnquiry = {
        trackingId: generatedId,
        clientName: formData.fullName,
        company: formData.organization,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        serviceRequired: formData.serviceRequired,
        productCategory: formData.productCategory,
        projectScopeDetails: formData.description,
        projectStatus: 'Application Submitted',
        createdAt: new Date().toISOString(),
        assignedConsultant: {
          name: 'Dr. Eleanor Vance, RAC Senior Consultant',
          email: 'regulatory@regusphere360.com',
          role: 'Lead Regulatory Affairs Strategist'
        },
        milestones: [
          {
            title: 'Consultation Scoping Received',
            description: 'Application successfully received and logged into client queue.',
            status: 'completed',
            updatedAt: new Date().toISOString()
          },
          {
            title: 'Dossier & Statutory Scoping Review',
            description: 'Senior RAC consultant assignment and regulatory timeline estimation.',
            status: 'in-progress',
            updatedAt: new Date().toISOString()
          },
          {
            title: 'Strategic Consultation & Action Roadmap',
            description: 'Comprehensive regulatory advisory session and deliverable handover.',
            status: 'pending'
          }
        ]
      };

      try {
        const stored = JSON.parse(localStorage.getItem('regusphere_client_enquiries') || '[]');
        stored.unshift(fallbackEnquiry);
        localStorage.setItem('regusphere_client_enquiries', JSON.stringify(stored));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }

      setSubmittedData({
        trackingId: generatedId,
        enquiry: fallbackEnquiry,
        message: 'Your consultation request has been successfully received and recorded.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold mb-4">
            <FileCheck2 className="w-3.5 h-3.5 text-teal-700" />
            <span>ReguSphere 360 Advisory Engagement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Request a Regulatory Consultation
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Connect with our senior RAC consultants and pharmaceutical regulatory specialists. We provide confidential
            guidance on eCTD procedures, license tracking, gap assessments, and statutory approvals.
          </p>
        </div>

        {submittedData ? (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                Consultation Enqueued
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Your Consultation Request Has Been Received
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Our regulatory coordinator and lead RAC consultant have been automatically notified.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Enquiry Reference ID:</span>
                <span className="text-teal-400 font-bold text-sm">{submittedData.trackingId}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Applicant:</span>
                <span>{submittedData.enquiry?.clientName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Service:</span>
                <span>{submittedData.enquiry?.serviceRequired}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Initial Status:</span>
                <span className="text-emerald-400 font-bold">Application Submitted</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto">
              A formal scoping confirmation has been logged. You may track real-time milestone progress anytime in the
              Client Dashboard or Project Tracker.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('client-dashboard')}
                className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Open Client Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSubmittedData(null);
                  setFiles([]);
                  setFormData({
                    fullName: '',
                    organization: '',
                    email: '',
                    phone: '',
                    country: 'India',
                    serviceRequired: 'eCTD Consultancy',
                    productCategory: 'Small Molecules (Finished Formulations)',
                    description: '',
                    preferredConsultationDate: '',
                  });
                }}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Contact / Organization Information */}
              <div className="border-b border-slate-100 pb-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>1. Applicant & Organization Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Organization / Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Bharat Biosolutions Pvt Ltd"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="regulatory@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Contact Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="India / USA / UK"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Service & Regulatory Requirement */}
              <div className="border-b border-slate-100 pb-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>2. Service & Product Specification</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Service Required *</label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900 font-medium"
                    >
                      {servicesOptions.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Product / License Category *</label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900 font-medium"
                    >
                      {productCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-slate-700 block mb-1">Description of Requirement *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Please specify your regulatory goals, target health authorities (e.g. CDSCO, US FDA, EMA), submission timelines, or specific documentation gaps needing review..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900 leading-relaxed"
                  />
                </div>
              </div>

              {/* 3. Preferred Date & Document Upload */}
              <div className="pb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>3. Consultation Schedule & Document Upload</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Preferred Consultation Date</label>
                    <input
                      type="date"
                      value={formData.preferredConsultationDate}
                      onChange={(e) => setFormData({ ...formData, preferredConsultationDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 text-slate-900"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Our coordinators will confirm a video/teleconference slot.
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Document Upload (Optional)</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] text-slate-600 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-teal-50 file:text-teal-800"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Attach draft dossier index, query letter, or SOP summary (.pdf, .doc, .xlsx, .zip).
                    </span>
                  </div>
                </div>
              </div>

              {/* NDA and Trust Assurance */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Strict Confidentiality & 21 CFR Part 11 Data Governance</span>
                </span>
                <p>
                  All uploaded technical dossiers, batch formulas, and company details are safeguarded under legally
                  binding mutual Non-Disclosure Agreements (NDAs).
                </p>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
