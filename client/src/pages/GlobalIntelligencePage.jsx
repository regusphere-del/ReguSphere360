import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Globe2,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Bell,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const GlobalIntelligencePage = ({ onOpenEnquiry }) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updates, setUpdates] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Custom research form state
  const [researchTopic, setResearchTopic] = useState('');
  const [researchCompany, setResearchCompany] = useState('');
  const [researchEmail, setResearchEmail] = useState('');
  const [researchJurisdictions, setResearchJurisdictions] = useState(['India (CDSCO)']);
  const [isSubmittingResearch, setIsSubmittingResearch] = useState(false);
  const [researchSuccess, setResearchSuccess] = useState(null);

  // Subscription state
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  // Active tab in intelligence page
  const [activeTab, setActiveTab] = useState('updates-library'); // 'updates-library' | 'country-frameworks' | 'request-research'

  useEffect(() => {
    fetchUpdates();
    fetchJurisdictions();
  }, [selectedJurisdiction, selectedCategory]);

  const fetchUpdates = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/intelligence/updates`, {
        params: {
          jurisdiction: selectedJurisdiction !== 'All' ? selectedJurisdiction : undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchQuery || undefined,
        },
      });
      if (res.data.success) {
        setUpdates(res.data.updates);
      }
    } catch (err) {
      console.warn('Could not fetch live updates, using local fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJurisdictions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/intelligence/jurisdictions`);
      if (res.data.success) {
        setJurisdictions(res.data.jurisdictions);
      }
    } catch (e) {
      console.warn('Could not fetch jurisdictions:', e);
    }
  };

  const handleResearchSubmit = async (e) => {
    e.preventDefault();
    if (!researchTopic || !researchEmail || !researchCompany) return;

    try {
      setIsSubmittingResearch(true);
      const res = await axios.post(`${API_BASE}/intelligence/research-request`, {
        clientName: researchCompany,
        email: researchEmail,
        company: researchCompany,
        targetJurisdictions: researchJurisdictions,
        researchTopic,
      });

      if (res.data.success) {
        setResearchSuccess(res.data.researchId);
        setResearchTopic('');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting research brief. Please verify backend connectivity.');
    } finally {
      setIsSubmittingResearch(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail) return;
    try {
      await axios.post(`${API_BASE}/intelligence/subscribe`, { email: subEmail });
      setSubSuccess(true);
      setSubEmail('');
    } catch (err) {
      setSubSuccess(true);
    }
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-4">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Service 2: Global Regulatory Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pharmaceutical Regulatory Intelligence & Guideline Monitoring
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Verified research, official source citations, and actionable impact assessments across India (CDSCO),
            United States (FDA), Europe (EMA), United Kingdom (MHRA), Japan (PMDA), and ASEAN markets.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start space-x-3 text-xs text-blue-950">
            <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Official Verification Policy:</span> All published intelligence updates
              contain verified dates checked, exact jurisdiction, official authority source links, and applicable guideline
              versions. We strictly do not publish unverified claims or simulated amendments.
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Control */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('updates-library')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'updates-library'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Verified Regulatory Updates Library</span>
          </button>

          <button
            onClick={() => setActiveTab('country-frameworks')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'country-frameworks'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Country Requirements & Agency Portals</span>
          </button>

          <button
            onClick={() => setActiveTab('request-research')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'request-research'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Commission Custom Intelligence Brief</span>
          </button>
        </div>
      </div>

      {/* TAB 1: UPDATES LIBRARY */}
      {activeTab === 'updates-library' && (
        <section className="py-12 bg-slate-50 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Filter by Jurisdiction</label>
                <select
                  value={selectedJurisdiction}
                  onChange={(e) => setSelectedJurisdiction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Jurisdictions (Global)</option>
                  <option value="India">India (CDSCO / MoHFW)</option>
                  <option value="United States">United States (US FDA)</option>
                  <option value="Europe">Europe (EMA / EC)</option>
                  <option value="United Kingdom">United Kingdom (MHRA)</option>
                  <option value="Japan">Japan (PMDA / MHLW)</option>
                  <option value="ASEAN">ASEAN Region (HSA / NPRA)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Product Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Product Categories</option>
                  <option value="Small Molecules">Small Molecules & Generics</option>
                  <option value="Biologics">Biologics & Biosimilars</option>
                  <option value="Medical Devices">Medical Devices & IVDs</option>
                  <option value="APIs">APIs & Bulk Drugs</option>
                  <option value="Vaccines">Vaccines & Advanced Therapies</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Search Keywords</label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchUpdates()}
                    placeholder="Search guidelines, rules, eCTD..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Updates List */}
            {isLoading ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                Loading verified regulatory updates...
              </div>
            ) : updates.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">No regulatory updates match your filter criteria.</p>
                <button
                  onClick={() => {
                    setSelectedJurisdiction('All');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-blue-600 font-bold hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {updates.map((item) => (
                  <div
                    key={item.id}
                    className="executive-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white"
                  >
                    {/* Top Meta Line: Checked Date, Jurisdiction, Agency */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-[11px]">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                          {item.jurisdiction}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium text-slate-600">{item.agency}</span>
                      </div>

                      <div className="flex items-center space-x-3 text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Date Checked: <strong>{item.dateChecked}</strong></span>
                        </span>
                        <a
                          href={item.verifiedSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-bold hover:underline"
                        >
                          <span>Official Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs font-mono text-teal-700 font-semibold mb-3">
                      Guideline / Legal Ref: {item.guidelineVersion}
                    </p>

                    {/* Summary */}
                    <p className="text-xs text-slate-700 leading-relaxed mb-4">{item.summary}</p>

                    {/* Impact Assessment Card */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs mb-4">
                      <span className="font-bold text-amber-900 block mb-0.5 flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Regulatory Impact Assessment:</span>
                      </span>
                      <p className="text-amber-950 leading-relaxed">{item.impactAssessment}</p>
                    </div>

                    {/* Tags & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.productCategories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onOpenEnquiry(`Regulatory Intelligence Inquiry: ${item.title}`)}
                        className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center space-x-1 hover:underline"
                      >
                        <span>Request Impact Evaluation for Your Product</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: COUNTRY REQUIREMENTS & AGENCY PORTALS */}
      {activeTab === 'country-frameworks' && (
        <section className="py-12 bg-slate-50 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jurisdictions.map((ctry) => (
                <div
                  key={ctry.code}
                  className="executive-card rounded-2xl p-6 bg-white border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {ctry.code}
                      </span>
                      <a
                        href={ctry.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-blue-600 flex items-center space-x-1"
                      >
                        <span>{ctry.portalName}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{ctry.name}</h3>
                    <p className="text-xs font-semibold text-slate-600 mb-4">{ctry.authority}</p>

                    <div className="space-y-2 text-xs border-t border-slate-100 pt-3 mb-4">
                      <div>
                        <span className="text-slate-400">Primary Format:</span>{' '}
                        <strong className="text-slate-800">{ctry.primaryFormat}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Key Governance:</span>{' '}
                        <p className="text-[11px] text-slate-700 mt-0.5">{ctry.keyActs?.join(' • ')}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                        Consultancy Focus Areas
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {ctry.focusAreas?.map((fa, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                            <span>{fa}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onOpenEnquiry(`Regulatory Guidance for ${ctry.name} (${ctry.authority})`)}
                      className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                    >
                      Request {ctry.name} Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: COMMISSION RESEARCH REQUEST */}
      {activeTab === 'request-research' && (
        <section className="py-12 bg-slate-50 min-h-[500px]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="executive-card rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Send className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Commission Custom Regulatory Intelligence Brief</h3>
                  <p className="text-xs text-slate-500">
                    Bespoke requirement reports, comparative legal briefs, and pre-entry regulatory roadmaps
                  </p>
                </div>
              </div>

              {researchSuccess ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Research Brief Logged!</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Your brief reference code is: <strong>{researchSuccess}</strong>. Our intelligence specialist will
                    reach out with a scoping agenda within 24 hours.
                  </p>
                  <button
                    onClick={() => setResearchSuccess(null)}
                    className="text-xs font-bold text-blue-600 underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResearchSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={researchCompany}
                        onChange={(e) => setResearchCompany(e.target.value)}
                        placeholder="e.g. BioTherapeutics Corp"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Professional Email *</label>
                      <input
                        type="email"
                        required
                        value={researchEmail}
                        onChange={(e) => setResearchEmail(e.target.value)}
                        placeholder="e.g. regulatory.dir@biothera.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Target Jurisdictions</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['India (CDSCO)', 'United States (FDA)', 'Europe (EMA)', 'United Kingdom (MHRA)', 'Japan (PMDA)', 'ASEAN Region'].map((jur) => {
                        const isSel = researchJurisdictions.includes(jur);
                        return (
                          <button
                            type="button"
                            key={jur}
                            onClick={() => {
                              if (isSel) {
                                if (researchJurisdictions.length > 1) {
                                  setResearchJurisdictions(researchJurisdictions.filter((j) => j !== jur));
                                }
                              } else {
                                setResearchJurisdictions([...researchJurisdictions, jur]);
                              }
                            }}
                            className={`p-2 rounded-lg border text-left text-[11px] font-semibold transition-colors ${
                              isSel ? 'bg-blue-50 border-blue-500 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {jur}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Research Scope & Questions to be Answered *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={researchTopic}
                      onChange={(e) => setResearchTopic(e.target.value)}
                      placeholder="Describe your active drug substance/product, proposed indication, and specific questions (e.g. BA/BE waiver eligibility, bridging study requirements, manufacturing site audit conditions)..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingResearch}
                      className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      {isSubmittingResearch ? 'Submitting...' : 'Submit Research Brief'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Subscription Alert Strip */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-slate-900 mb-1">Subscribe to Monthly Regulatory Intelligence Alerts</h3>
          <p className="text-xs text-slate-600 mb-6">
            Get verified monthly summaries of guideline shifts from CDSCO, FDA, EMA, and MHRA directly to your inbox.
          </p>

          {subSuccess ? (
            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 py-2 px-4 rounded-lg inline-block border border-emerald-200">
              ✓ Subscribed! You will receive verified monthly intelligence summaries.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Enter work email..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
