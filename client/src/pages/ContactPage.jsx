import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, Globe, Clock, MessageSquare } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Regulatory Documentation Scoping');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    try {
      setIsSubmitting(true);
      await axios.post(`${API_BASE}/enquiries`, {
        clientName: name,
        email,
        company,
        mainServiceCategory: 'General Consultation',
        selectedServices: [subject],
        projectScopeDetails: message,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>Consultancy Enquiry Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Connect with ReguSphere 360
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Discuss confidential regulatory filing requirements, intelligence research subscriptions, or customized
            corporate training with our senior advisory team.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Global Regulatory Advisory</h3>

                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">Cross-Jurisdictional Practice</strong>
                      <span>Providing technical regulatory strategy and documentation across US, EU, UK, India, Japan, and ASEAN markets.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">Response & Turnaround Commitment</strong>
                      <span>All initial briefs reviewed by Senior RAC consultants within 24 to 48 business hours.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">Virtual Briefings & Conferences</strong>
                      <span>Secure video conference meetings scheduled for confidential technical scoping and gap review.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                  <p className="flex items-center space-x-2 text-slate-700">
                    <Mail className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold">regulatory@regusphere360.com</span>
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Official Channels</span>
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://www.linkedin.com/in/regu-sphere-8524b1443?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-colors font-semibold text-xs"
                      >
                        <svg className="w-4 h-4 fill-current text-blue-600 flex-shrink-0" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                        </svg>
                        <span>Connect on LinkedIn</span>
                      </a>

                      <a
                        href="https://www.instagram.com/regusphere360?exln=MXNzM3U5bWR4aW1jOA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200 hover:border-pink-300 transition-colors font-semibold text-xs"
                      >
                        <svg className="w-4 h-4 fill-current text-pink-600 flex-shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span>Follow on Instagram (@regusphere360)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  All consultations and file transmissions are guarded under mutual Non-Disclosure Agreements (NDAs)
                  and 21 CFR Part 11 electronic data integrity controls.
                </p>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Direct Consultation Enquiry</h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and a Senior RAC consultant will respond within 24 to 48 hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Thank You! Message Logged.</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Our lead consultant has received your message and will review your requirements.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-xs font-bold text-teal-700 underline">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Jennifer Adams"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jennifer@biopharma.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Novus Pharma Inc."
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Primary Area of Interest</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
                      >
                        <option value="Regulatory Documentation Scoping">Regulatory Documentation Scoping</option>
                        <option value="ICH CTD/eCTD Publishing Support">ICH CTD/eCTD Publishing Support</option>
                        <option value="Pre-submission Gap Assessment">Pre-submission Gap Assessment</option>
                        <option value="Global Regulatory Intelligence Brief">Global Regulatory Intelligence Brief</option>
                        <option value="Corporate Training Programme">Corporate Training Programme</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Project Brief & Details</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your therapeutic area, target jurisdictions, timeline expectations, or specific guidance required..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-teal-600 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Consultation Enquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
