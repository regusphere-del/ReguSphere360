import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  ChevronDown,
  Layers,
  Search,
  LogOut,
  Sparkles,
  BookOpen,
  Globe2,
  FileCheck2,
  Lock,
  Menu,
  X,
  Building2,
  GraduationCap,
  FolderTree,
  Activity,
  User,
  ExternalLink,
} from 'lucide-react';

export const Navbar = ({
  activePage,
  onNavigate,
  onOpenEnquiry,
  onOpenTracker,
  onOpenReadiness,
}) => {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleClick = async () => {
    try {
      setIsLoggingIn(true);
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const navItem = (pageKey, label) => (
    <button
      onClick={() => {
        onNavigate(pageKey);
        setMobileMenuOpen(false);
      }}
      className={`text-xs xl:text-sm font-semibold transition-colors px-1 py-1 relative ${
        activePage === pageKey
          ? 'text-teal-700 font-bold border-b-2 border-teal-600'
          : 'text-slate-600 hover:text-teal-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <img
            src="/logo.jpg"
            alt="ReguSphere 360"
            className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 shadow-sm p-0.5 hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                Regu<span className="text-teal-600">Sphere</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                360
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Pharmaceutical Regulatory Affairs Consultancy</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-5 text-xs xl:text-sm font-medium">
          {navItem('home', 'Home')}

          {/* Services Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              onMouseEnter={() => setServicesDropdown(true)}
              className={`flex items-center space-x-1 text-xs xl:text-sm font-semibold transition-colors px-1 py-1 ${
                [
                  'consultancy-services',
                  'services-ectd',
                  'services-license-tracking',
                  'documentation',
                  'intelligence',
                  'services-licensing-guidance',
                  'education',
                  'education-hub',
                  'learning-centre',
                  'mpharm-study-corner',
                  'live-updates',
                ].includes(activePage)
                  ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              <span>Our Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {servicesDropdown && (
              <div
                onMouseLeave={() => setServicesDropdown(false)}
                className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl p-3 border border-slate-200 z-50 animate-in fade-in duration-150"
              >
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Consultancy Practices
                  </span>
                  <button
                    onClick={() => {
                      onNavigate('consultancy-services');
                      setServicesDropdown(false);
                    }}
                    className="text-[11px] font-bold text-teal-700 hover:underline"
                  >
                    View All Services Hub →
                  </button>
                </div>

                <div className="space-y-1 mt-1 max-h-[420px] overflow-y-auto">
                  {/* Service A: eCTD */}
                  <button
                    onClick={() => {
                      onNavigate('services-ectd');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <FolderTree className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">
                        A. eCTD & Regulatory Submission
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Modules 1–5, XML backbone, DTD 3.2.2/4.0 & gateway validation
                      </p>
                    </div>
                  </button>

                  {/* Service B: License Tracking */}
                  <button
                    onClick={() => {
                      onNavigate('services-license-tracking');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                        B. Pharmaceutical License Tracking
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Manufacturing, wholesale, loan, import & device status tracking
                      </p>
                    </div>
                  </button>

                  {/* Service C: Documentation */}
                  <button
                    onClick={() => {
                      onNavigate('documentation');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        C. Regulatory Documentation Consultancy
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        SMF, BMR, MFR, GxP SOPs, CAPA, APQR & Variations
                      </p>
                    </div>
                  </button>

                  {/* Service D: Intelligence */}
                  <button
                    onClick={() => {
                      onNavigate('intelligence');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Globe2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                        D. Global Regulatory Intelligence
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        CDSCO, US FDA, EMA, MHRA, PMDA, TGA & WHO guidance
                      </p>
                    </div>
                  </button>

                  {/* CDSCO & USFDA Live Updates Link */}
                  <button
                    onClick={() => {
                      onNavigate('live-updates');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/50 flex items-start space-x-2.5 transition-colors group border border-emerald-100 bg-emerald-50/30"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors relative">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 animate-ping" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                        CDSCO & USFDA Live Updates
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          LIVE
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Automated live drug approvals, safety alerts, recalls & circulars
                      </p>
                    </div>
                  </button>

                  {/* Service E: Licensing Guidance */}
                  <button
                    onClick={() => {
                      onNavigate('services-licensing-guidance');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                        E. Pharmaceutical Licensing Guidance
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Form 25/28, 20B/21B, Loan, Devices, Cosmetics & New Drugs
                      </p>
                    </div>
                  </button>

                  {/* Service F: Education & Training */}
                  <button
                    onClick={() => {
                      onNavigate('education');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                        F. Regulatory Education & Training
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Masterclasses, GxP workshops, quizzes & certifications
                      </p>
                    </div>
                  </button>

                  {/* Education Hub */}
                  <div className="px-2 pt-2 pb-1">
                    <div className="border-t border-slate-100 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Learning & Academic Hubs</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('education-hub');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 flex items-center gap-1.5">
                        Education Hub
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        ICH guidelines, topic library, RA glossary & self-assessment quiz
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('learning-centre');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                        Learning Centre
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold border border-blue-200">10 TOPICS</span>
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Beginner to advanced modules with industry examples & downloadable notes
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('mpharm-study-corner');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-start space-x-2.5 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 flex items-center gap-1.5">
                        M.Pharm Study Corner
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">M.PHARM RA</span>
                      </p>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        PCI & university syllabi, 2/5/10 mark Q&A, exam papers, seminars & viva
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Navigation Links */}
          {navItem('live-updates', 'Live Updates')}
          {navItem('services-license-tracking', 'Track License')}
          {navItem('education-hub', 'Education Hub')}
          {navItem('mpharm-study-corner', 'M.Pharm Corner')}
          {navItem('process', 'Process')}
          {navItem('about', 'About Us')}
          {navItem('resources', 'Resources')}
          {navItem('contact', 'Contact')}

          {/* Client Portal Link */}
          <button
            onClick={() => onNavigate('client-dashboard')}
            className={`text-xs font-semibold px-2 py-1 rounded border flex items-center space-x-1 ${
              activePage === 'client-dashboard'
                ? 'bg-teal-50 text-teal-800 border-teal-300 font-bold'
                : 'text-slate-600 border-slate-300 hover:text-teal-700'
            }`}
          >
            <User className="w-3 h-3 text-teal-600" />
            <span>Client Portal</span>
          </button>

          {/* Admin link */}
          <button
            onClick={() => onNavigate('admin')}
            className={`text-xs font-semibold px-2 py-1 rounded border flex items-center space-x-1 ${
              activePage === 'admin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-500 border-slate-300 hover:text-slate-900 hover:border-slate-400'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Action Controls & Auth */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Social Links */}
          <div className="flex items-center space-x-1 border-r border-slate-200 pr-2 mr-1">
            <a
              href="https://www.linkedin.com/in/regu-sphere-8524b1443?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              title="ReguSphere 360 on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/regusphere360?exln=MXNzM3U5bWR4aW1jOA=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-slate-100 transition-colors"
              title="ReguSphere 360 on Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          {/* User Auth Profile / Google Sign-in */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 hover:border-teal-500 transition-all text-xs"
              >
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-teal-600"
                />
                <span className="text-slate-800 font-semibold max-w-[90px] truncate">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl p-2 text-xs border border-slate-200 z-50">
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-[10px] text-slate-400">Signed in as</p>
                    <p className="font-bold text-slate-900 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      onNavigate('client-dashboard');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center space-x-2 mt-1"
                  >
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>Client Portal Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      onNavigate('admin');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center space-x-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Admin Operations Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      logout();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center space-x-2 mt-1 border-t border-slate-100"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleClick}
              disabled={isLoggingIn}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-300"
            >
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in'}</span>
            </button>
          )}

          {/* Primary Consultation Trigger */}
          <button
            onClick={() => onNavigate('consultation-request')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <span>Request Consultation</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 text-xs">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-slate-900 border-b border-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('consultancy-services');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-teal-800 border-b border-slate-100"
          >
            Our Consultancy Services Hub
          </button>
          <button
            onClick={() => {
              onNavigate('services-ectd');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • eCTD & Regulatory Submission Consultancy
          </button>
          <button
            onClick={() => {
              onNavigate('services-license-tracking');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • Pharmaceutical License Tracking
          </button>
          <button
            onClick={() => {
              onNavigate('documentation');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • Regulatory Documentation Consultancy
          </button>
          <button
            onClick={() => {
              onNavigate('intelligence');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • Global Regulatory Intelligence
          </button>
          <button
            onClick={() => {
              onNavigate('services-licensing-guidance');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • Pharmaceutical Licensing Guidance
          </button>
          <button
            onClick={() => {
              onNavigate('education');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100 pl-2"
          >
            • Regulatory Education & Training
          </button>
          <button
            onClick={() => {
              onNavigate('live-updates');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-emerald-700 border-b border-slate-100 pl-2 flex items-center gap-2 bg-emerald-50/50"
          >
            • Live Regulatory Updates
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              CDSCO & USFDA
            </span>
          </button>
          <button
            onClick={() => {
              onNavigate('education-hub');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-teal-700 border-b border-slate-100 pl-2 flex items-center gap-2"
          >
            • Education Hub
          </button>
          <button
            onClick={() => {
              onNavigate('learning-centre');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-blue-700 border-b border-slate-100 pl-2 flex items-center gap-2"
          >
            • Learning Centre (10 Modules)
          </button>
          <button
            onClick={() => {
              onNavigate('mpharm-study-corner');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-indigo-700 border-b border-slate-100 pl-2 flex items-center gap-2"
          >
            • M.Pharm Study Corner
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">M.PHARM RA</span>
          </button>
          <button
            onClick={() => {
              onNavigate('client-dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-teal-700 border-b border-slate-100"
          >
            Client Portal Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 border-b border-slate-100"
          >
            Contact Regulatory Team
          </button>
          <button
            onClick={() => {
              onNavigate('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-500 border-b border-slate-100"
          >
            Admin Operations Portal
          </button>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('consultation-request');
              }}
              className="w-full py-2.5 rounded-xl bg-teal-700 text-white font-bold text-center"
            >
              Request a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
