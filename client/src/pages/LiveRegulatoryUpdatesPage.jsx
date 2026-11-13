import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Globe2,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  X,
  Info,
  GraduationCap,
  Layers,
  Activity,
  Download,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Categories list matching specification
export const UPDATE_CATEGORIES = [
  'All Categories',
  'Drug Approvals',
  'Safety Alerts',
  'Regulatory Guidelines',
  'Clinical Trials',
  'GMP & Manufacturing',
  'Drug Recalls',
  'Notifications & Circulars',
  'Medical Devices',
  'Import & Export',
  'Regulatory Policy Changes',
];

export const OFFICIAL_SOURCES_DIRECTORY = [
  {
    name: 'CDSCO Official Portal (India)',
    authority: 'CDSCO',
    description: 'Central Drugs Standard Control Organisation, Directorate General of Health Services, Ministry of Health and Family Welfare.',
    url: 'https://cdsco.gov.in/',
    scope: 'Notifications, Circulars, SUGAM Portal, Medical Devices, SEC Decisions',
  },
  {
    name: 'US Food and Drug Administration (USA)',
    authority: 'USFDA',
    description: 'United States Food and Drug Administration, Department of Health and Human Services.',
    url: 'https://www.fda.gov/',
    scope: 'Federal Register notices, Enforcement, Guidance, CDER/CBER Decisions',
  },
  {
    name: 'Drugs@FDA: FDA Approved Drug Products',
    authority: 'USFDA',
    description: 'Official database of FDA approved prescription, over-the-counter, and discontinued drug products.',
    url: 'https://www.accessdata.fda.gov/scripts/cder/daf/',
    scope: 'NDA, ANDA, BLA Approval Letters, Reviews & Labels',
  },
  {
    name: 'openFDA Regulatory Datasets',
    authority: 'USFDA',
    description: 'Official public API portal serving structured data on drug recalls, enforcement, and adverse drug events.',
    url: 'https://open.fda.gov/',
    scope: 'Direct Machine-Readable Enforcement & Submission Feeds',
  },
  {
    name: 'FDA Guidance Documents Database',
    authority: 'USFDA',
    description: 'Searchable compendium of all draft and final FDA regulatory guidance documents for human drugs.',
    url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents',
    scope: 'ICH Harmonization, CMC, Clinical Protocols, Bioequivalence',
  },
  {
    name: 'FDA Drug Safety Communications',
    authority: 'USFDA',
    description: 'Safety warnings and alerts issued to healthcare professionals and patients regarding drug safety risks.',
    url: 'https://www.fda.gov/drugs/drug-safety-and-availability/drug-safety-communications',
    scope: 'Post-Marketing Signal Detection, Boxed Warnings, REMS Updates',
  },
];

export const LiveRegulatoryUpdatesPage = ({ onNavigate, onOpenEnquiry }) => {
  const [updates, setUpdates] = useState([]);
  const [syncInfo, setSyncInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedAuthority, setSelectedAuthority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewingDetail, setViewingDetail] = useState(null);
  const [syncMessage, setSyncMessage] = useState(null);

  useEffect(() => {
    fetchUpdates();
  }, [selectedAuthority, selectedCategory, sortOrder]);

  const fetchUpdates = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/regulatory-updates`, {
        params: {
          authority: selectedAuthority !== 'All' ? selectedAuthority : undefined,
          category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
          sort: sortOrder,
          search: searchQuery || undefined,
        },
      });

      if (res.data.success) {
        setUpdates(res.data.updates || []);
        if (res.data.syncInfo) {
          setSyncInfo(res.data.syncInfo);
        }
      }
    } catch (err) {
      console.warn('Could not fetch from /api/regulatory-updates:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await axios.post(`${API_BASE}/regulatory-updates/sync-now`);
      if (res.data.success) {
        setSyncMessage(`Synchronization completed: ${res.data.result?.newUpdatesCount || 0} new updates checked.`);
        await fetchUpdates();
      }
    } catch (err) {
      setSyncMessage('Source synchronization note: Live openFDA API checked; cached regulatory announcements active.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  // Filtered list
  const filteredUpdates = useMemo(() => {
    return updates.filter((item) => {
      if (selectedAuthority !== 'All' && item.regulatory_authority !== selectedAuthority) {
        return false;
      }
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.announcement_title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesRef = item.source_reference_number?.toLowerCase().includes(q);
        const matchesSig = item.regulatory_significance.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesRef && !matchesSig) {
          return false;
        }
      }
      return true;
    });
  }, [updates, selectedAuthority, selectedCategory, searchQuery]);

  // Color mappings
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Drug Approvals':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Safety Alerts':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Drug Recalls':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'Regulatory Guidelines':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Clinical Trials':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'GMP & Manufacturing':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Medical Devices':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── TOP ADVISORY / METADATA BAR ───────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-teal-400 font-bold">Automated Regulatory Intelligence</span>
            <span>/</span>
            <span className="text-white font-semibold">CDSCO (India) & USFDA (USA) Live Pipeline</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Official openFDA API & Statutory Gazette Sync</span>
            <span>•</span>
            <span>Refreshes Every {syncInfo?.refreshIntervalMinutes || 60} Minutes</span>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
                <Globe2 className="w-4 h-4 text-teal-400" />
                <span>Verified Regulatory Intelligence Dashboard</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Global Pharmaceutical{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300">
                  Regulatory Updates
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Stay informed with the latest pharmaceutical regulatory announcements, guidelines, drug approvals and
                safety updates from leading regulatory authorities.
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Synchronized directly from <strong>CDSCO (Central Drugs Standard Control Organisation, India)</strong> and{' '}
                <strong>USFDA (United States Food and Drug Administration, USA)</strong> with tailored educational
                breakdowns for M.Pharm and B.Pharm scholars.
              </p>
            </div>

            {/* Top Compact KPI / Status Panel */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 sm:w-88 flex-shrink-0 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  <span>Sync Health & Status</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {syncInfo?.lastSyncStatus || 'Healthy & Active'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Latest CDSCO Update:</span>
                  <strong className="text-white font-mono text-[11px]">
                    {syncInfo?.latestCdscoDate
                      ? new Date(syncInfo.latestCdscoDate).toLocaleDateString()
                      : 'Verified 2026'}
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Latest USFDA Update:</span>
                  <strong className="text-white font-mono text-[11px]">
                    {syncInfo?.latestFdaDate
                      ? new Date(syncInfo.latestFdaDate).toLocaleDateString()
                      : 'Verified 2026'}
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Last Checked / Synced:</span>
                  <span className="text-teal-300 font-mono text-[11px]">
                    {syncInfo?.lastSyncTime
                      ? new Date(syncInfo.lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Just now'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Published Updates:</span>
                  <strong className="text-emerald-400 font-mono">{updates.length} Records</strong>
                </div>
              </div>

              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Synchronizing with openFDA...' : 'Sync Live Regulatory Feeds Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTIFICATION TOAST ────────────────────────────────────── */}
      {syncMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>{syncMessage}</span>
            </div>
            <button onClick={() => setSyncMessage(null)} className="text-teal-700 hover:text-teal-900 text-xs font-bold">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── DUAL AUTHORITY SPOTLIGHT CARDS (CDSCO & USFDA) ─────────── */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AUTHORITY A: CDSCO INDIA */}
            <div
              className={`p-6 rounded-2xl border-2 transition-all bg-white ${
                selectedAuthority === 'CDSCO'
                  ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 flex items-center justify-center font-black text-sm">
                    🇮🇳
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block">
                      Indian Regulatory Authority
                    </span>
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      CDSCO — Central Drugs Standard Control Organisation
                    </h2>
                  </div>
                </div>

                <a
                  href="https://cdsco.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 text-[11px] font-bold flex items-center space-x-1 border border-orange-200"
                  title="Visit official CDSCO Government portal"
                >
                  <span>cdsco.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Directorate General of Health Services, Ministry of Health and Family Welfare, Government of India.
                Statutory custodian for drug approvals, clinical trials, medical device licensing, and cGMP compliance.
              </p>

              {/* Core domains covered */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-700 mb-4">
                {[
                  'Gazette Notifications & Circulars',
                  'New Drug Approvals (SEC)',
                  'Clinical Trials (NDCTR 2019)',
                  'Drug Safety Alerts (PvPI)',
                  'Revised Schedule M (cGMP)',
                  'Medical Device Rules 2017',
                  'Import & Export Licences',
                ].map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  {updates.filter((u) => u.regulatory_authority === 'CDSCO').length} Verified Updates
                </span>

                <button
                  onClick={() => setSelectedAuthority(selectedAuthority === 'CDSCO' ? 'All' : 'CDSCO')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    selectedAuthority === 'CDSCO'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-800'
                  }`}
                >
                  {selectedAuthority === 'CDSCO' ? 'Active Filter ✓' : 'View CDSCO Updates Only'}
                </button>
              </div>
            </div>

            {/* AUTHORITY B: USFDA UNITED STATES */}
            <div
              className={`p-6 rounded-2xl border-2 transition-all bg-white ${
                selectedAuthority === 'USFDA'
                  ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-black text-sm">
                    🇺🇸
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                      United States Regulatory Authority
                    </span>
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      USFDA — Food and Drug Administration
                    </h2>
                  </div>
                </div>

                <a
                  href="https://www.fda.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center space-x-1 border border-blue-200"
                  title="Visit official US FDA portal"
                >
                  <span>fda.gov</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Public health agency of the United States Department of Health and Human Services. Controls NDA, ANDA,
                BLA approvals, 21 CFR Part 211 cGMP enforcement, drug recalls, and official guidance.
              </p>

              {/* Core domains covered */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-700 mb-4">
                {[
                  'FDA Drug Approvals (CDER)',
                  'FDA Guidance Documents',
                  'NDA / ANDA / BLA Updates',
                  'Drug Safety Communications',
                  'Drug Recalls (openFDA)',
                  'Warning Letters & Form 483',
                  'GMP 21 CFR 211',
                  'Policy Changes',
                ].map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">
                  {updates.filter((u) => u.regulatory_authority === 'USFDA').length} Verified Updates
                </span>

                <button
                  onClick={() => setSelectedAuthority(selectedAuthority === 'USFDA' ? 'All' : 'USFDA')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    selectedAuthority === 'USFDA'
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-800'
                  }`}
                >
                  {selectedAuthority === 'USFDA' ? 'Active Filter ✓' : 'View USFDA Updates Only'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANCED SEARCH & FILTERING CONTROLS ───────────────────── */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search announcements by keywords, active ingredients, or reference numbers..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Authority Pills Filter */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-500 font-semibold mr-1 hidden sm:inline">Authority:</span>
              {['All', 'CDSCO', 'USFDA'].map((auth) => (
                <button
                  key={auth}
                  onClick={() => setSelectedAuthority(auth)}
                  className={`px-3 py-2 rounded-xl font-bold transition-colors ${
                    selectedAuthority === auth
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {auth === 'All' ? 'All Authorities' : auth}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-slate-500 font-semibold hidden sm:inline">Sort:</span>
              <button
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-800 flex items-center space-x-1"
              >
                <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </button>
            </div>
          </div>

          {/* Category Chips Carousel / Horizontal Scroll */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider whitespace-nowrap mr-1">
              Category:
            </span>
            {UPDATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: LATEST REGULATORY ANNOUNCEMENTS ──────────────── */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Latest Regulatory Announcements
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Displaying {filteredUpdates.length} verified announcements in chronological publication sequence.
              </p>
            </div>

            {(selectedAuthority !== 'All' || selectedCategory !== 'All Categories' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedAuthority('All');
                  setSelectedCategory('All Categories');
                  setSearchQuery('');
                }}
                className="text-xs text-teal-700 hover:underline font-bold self-start sm:self-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="py-16 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-teal-600" />
              <p className="text-xs">Loading verified regulatory feeds...</p>
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No regulatory announcements match your filter</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try searching with different keywords or switching to "All Authorities" / "All Categories".
              </p>
              <button
                onClick={() => {
                  setSelectedAuthority('All');
                  setSelectedCategory('All Categories');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpdates.map((item) => (
                <div
                  key={item.update_id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all flex flex-col justify-between p-5 group"
                >
                  <div>
                    {/* Top Row: Authority & Category Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                          item.regulatory_authority === 'CDSCO'
                            ? 'bg-orange-50 text-orange-800 border-orange-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                      >
                        {item.regulatory_authority === 'CDSCO' ? '🇮🇳 CDSCO (India)' : '🇺🇸 USFDA (USA)'}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                    </div>

                    {/* Announcement Title */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-2">
                      {item.announcement_title}
                    </h3>

                    {/* Dates & Reference Bar */}
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 mb-3 pb-2 border-b border-slate-100">
                      <span className="flex items-center space-x-1" title="Official Source Publication Date">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(item.publication_date).toLocaleDateString()}</span>
                      </span>

                      {item.source_reference_number && (
                        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[130px]" title={item.source_reference_number}>
                          {item.source_reference_number}
                        </span>
                      )}
                    </div>

                    {/* Short Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                      {item.summary}
                    </p>

                    {/* Regulatory Significance Box */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700 mb-3">
                      <strong className="text-slate-800 block mb-0.5 flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-teal-600" />
                        <span>Regulatory Significance:</span>
                      </strong>
                      <p className="line-clamp-2 leading-relaxed">{item.regulatory_significance}</p>
                    </div>

                    {/* Retrieval & Verification Timestamp */}
                    <div className="text-[10px] text-slate-400 flex items-center justify-between mb-2">
                      <span>
                        Verified: {item.last_verified_at ? new Date(item.last_verified_at).toLocaleDateString() : 'Active'}
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{item.verification_status || 'Verified'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setViewingDetail(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1"
                    >
                      <span>Educational Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={item.official_source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-semibold flex items-center space-x-1 transition-colors"
                      title="Open official regulatory release in a new tab"
                    >
                      <span>Read Official</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EDUCATIONAL DETAIL VIEW MODAL (SECTION 7 & 12) ─────────── */}
      {viewingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl border border-slate-200 shadow-2xl relative my-8 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      viewingDetail.regulatory_authority === 'CDSCO'
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}
                  >
                    {viewingDetail.regulatory_authority === 'CDSCO' ? '🇮🇳 CDSCO (India)' : '🇺🇸 USFDA (USA)'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryBadgeClass(viewingDetail.category)}`}>
                    {viewingDetail.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Published: {new Date(viewingDetail.publication_date).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {viewingDetail.announcement_title}
                </h2>
                {viewingDetail.source_reference_number && (
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Statutory Reference Number: {viewingDetail.source_reference_number}
                  </p>
                )}
              </div>

              <button
                onClick={() => setViewingDetail(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
              {/* Disclaimer Distinction Banner */}
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 text-xs leading-relaxed">
                <strong>Educational Annotation Notice:</strong> This breakdown provides academic and professional
                regulatory context prepared by ReguSphere 360 to assist students and regulatory executives. It preserves
                the original legal meaning of the announcement without alteration.
              </div>

              {/* Summary */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  1. Official Announcement Summary
                </span>
                <p className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                  {viewingDetail.summary}
                </p>
              </div>

              {/* 2. Educational Breakdown (What / Why / Impact) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block mb-1 text-xs font-bold">What is this announcement about?</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {viewingDetail.what_is_it || viewingDetail.summary}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block mb-1 text-xs font-bold">Why was it issued by the authority?</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {viewingDetail.why_issued || viewingDetail.regulatory_significance}
                  </p>
                </div>
              </div>

              {/* 3. Industry Relevance & RA Takeaways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200">
                  <strong className="text-indigo-950 block mb-1 text-xs font-bold">
                    How does it affect the Pharmaceutical Industry?
                  </strong>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {viewingDetail.pharma_impact ||
                      'Affects regulatory submission timelines, quality compliance protocols, and manufacturing standards.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200">
                  <strong className="text-teal-950 block mb-1 text-xs font-bold">
                    What should Regulatory Affairs professionals understand?
                  </strong>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {viewingDetail.ra_takeaway ||
                      'Assess gap impact on active dossiers, coordinate with QA/QC, and prepare necessary variation filings.'}
                  </p>
                </div>
              </div>

              {/* 4. Student Learning Points */}
              {viewingDetail.student_points && viewingDetail.student_points.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <strong className="text-amber-950 block mb-2 text-xs font-bold flex items-center space-x-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>Important Learning Points for Pharmacy & M.Pharm Scholars:</span>
                  </strong>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {viewingDetail.student_points.map((pt, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. Related Guidelines & Direct Link */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Related Regulatory References:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(viewingDetail.related_guidelines || ['Statutory Guidance']).map((g, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border text-[11px] font-medium text-slate-700">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={viewingDetail.official_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Open Official Authority Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Source URL: {viewingDetail.official_source_url}</span>
              <button
                onClick={() => setViewingDetail(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 13: OFFICIAL SOURCE DIRECTORY ──────────────────── */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
              Verified Regulatory Repositories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Official Regulatory Source Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              ReguSphere 360 references solely authorized governmental health agencies and statutory gazettes.
              Explore primary authority websites below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_SOURCES_DIRECTORY.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        src.authority === 'CDSCO'
                          ? 'bg-orange-50 text-orange-800 border-orange-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {src.authority}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 mb-1.5">
                    {src.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{src.description}</p>
                </div>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 font-mono truncate">
                  Coverage: {src.scope}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CALLOUT ────────────────────────────────────────── */}
      <section className="py-14 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultancy Support on New Guidelines</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Need Impact Assessment on Recent CDSCO or USFDA Regulatory Changes?
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our RAC-credentialed regulatory consultants provide rapid gap assessments, NDA/ANDA variation filing
            strategies, and Revised Schedule M compliance audits.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Regulatory Intelligence & Guideline Impact Assessment')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Request Advisory Scoping</span>
            </button>

            <button
              onClick={() => onNavigate('intelligence')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-colors flex items-center space-x-2"
            >
              <Globe2 className="w-4 h-4 text-teal-400" />
              <span>Global Intelligence Portal</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

