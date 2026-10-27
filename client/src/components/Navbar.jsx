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
      className={`text-sm font-semibold transition-colors px-1 py-1 relative ${
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
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-900 via-teal-800 to-teal-600 flex items-center justify-center shadow-md ring-1 ring-teal-500/20">
            <ShieldCheck className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
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
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navItem('home', 'Home')}

          {/* Services Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              onMouseEnter={() => setServicesDropdown(true)}
              className={`flex items-center space-x-1.5 text-sm font-semibold transition-colors px-1 py-1 ${
                ['documentation', 'intelligence', 'education'].includes(activePage)
                  ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {servicesDropdown && (
              <div
                onMouseLeave={() => setServicesDropdown(false)}
                className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl p-3 border border-slate-200 z-50 animate-in fade-in duration-150"
              >
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onNavigate('documentation');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">
                        1. Regulatory Documentation
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        eCTD Dossiers, Gap Audits, SOP Control & Readiness
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('intelligence');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                        2. Global Regulatory Intelligence
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        CDSCO, FDA, EMA, MHRA, PMDA & ASEAN verified updates
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('education');
                      setServicesDropdown(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                        3. Education & Corporate Training
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Masterclasses, GxP workshops, quizzes & certificates
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {navItem('process', 'Process')}
          {navItem('about', 'About Us')}
          {navItem('expertise', 'Expertise')}
          {navItem('resources', 'Resources')}
          {navItem('contact', 'Contact')}

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
        <div className="hidden sm:flex items-center space-x-3">
          {/* Project Tracking Search Quick Trigger */}
          <button
            onClick={onOpenTracker}
            className="flex items-center space-x-1 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Track Project</span>
          </button>

          {/* User Auth Profile / Google Sign-in */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 hover:border-teal-500 transition-all text-xs"
              >
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-teal-600"
                />
                <span className="text-slate-800 font-semibold max-w-[110px] truncate">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl p-2 text-xs border border-slate-200 z-50">
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-[10px] text-slate-400">Signed in as</p>
                    <p className="font-bold text-slate-900 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {currentUser.provider === 'firebase-google' ? 'Google Authenticated' : 'Client Demo Access'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      onOpenTracker();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center space-x-2 mt-1"
                  >
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    <span>My Projects & Filings</span>
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
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-300"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in'}</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => onOpenEnquiry(null)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <span>Request a Consultation</span>
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 text-sm">
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-slate-800 border-b border-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('documentation');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-teal-700 border-b border-slate-100"
            >
              1. Regulatory Documentation Consultancy
            </button>
            <button
              onClick={() => {
                onNavigate('intelligence');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-blue-700 border-b border-slate-100"
            >
              2. Global Regulatory Intelligence
            </button>
            <button
              onClick={() => {
                onNavigate('education');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-amber-700 border-b border-slate-100"
            >
              3. Regulatory Education & Corporate Training
            </button>
            <button
              onClick={() => {
                onNavigate('process');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-slate-700 border-b border-slate-100"
            >
              Consultancy Process
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-slate-700 border-b border-slate-100"
            >
              About ReguSphere 360
            </button>
            <button
              onClick={() => {
                onNavigate('resources');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-slate-700 border-b border-slate-100"
            >
              Regulatory Resources
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-semibold text-slate-700 border-b border-slate-100"
            >
              Admin Dashboard
            </button>
          </div>

          <div className="pt-3 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry(null);
              }}
              className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-bold text-center text-xs"
            >
              Request a Consultation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold text-center text-xs"
            >
              Track Project Reference
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
