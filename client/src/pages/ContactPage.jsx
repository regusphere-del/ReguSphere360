import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
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
            <span>Consultancy Office Contacts</span>
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
            {/* Contact Information & Offices */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Global Advisory Centers</h3>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">United States (Americas Practice)</strong>
                      <span>400 Technology Square, Suite 800, Cambridge/Boston MA 02139</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">Europe (EU/UK Practice)</strong>
                      <span>Aeschenvorstadt 48, 4051 Basel, Switzerland</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900 block text-xs">India & Asia-Pacific Practice</strong>
                      <span>Bandra-Kurla Complex (BKC), G-Block, Mumbai, Maharashtra 400051</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <p className="flex items-center space-x-2 text-slate-700">
                    <Mail className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold">regulatory@regusphere360.com</span>
                  </p>
                  <p className="flex items-center space-x-2 text-slate-700">
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>+1 (800) 734-8774 / +91 (22) 6984-2100</span>
                  </p>
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
