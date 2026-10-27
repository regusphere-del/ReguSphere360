import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  ShieldCheck,
  Search,
  LogIn,
  LogOut,
  User,
  Sparkles,
  ChevronDown,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const Navbar = ({ onOpenEnquiry, onOpenTracker, onOpenReadiness }) => {
  const { currentUser, loginWithGoogle, logout, isFirebaseConfigured } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Regu<span className="text-emerald-400">Sphere</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                360
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Pharmaceutical Regulatory Affairs</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-emerald-400 transition-colors">
            Consultancy Services
          </a>
          <a href="#deliverables" className="hover:text-emerald-400 transition-colors">
            Deliverables
          </a>
          <button
            onClick={onOpenReadiness}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Readiness Audit</span>
          </button>
          <button
            onClick={onOpenTracker}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <Search className="w-4 h-4 text-teal-400" />
            <span>Track Project</span>
          </button>
        </nav>

        {/* Action Buttons & Auth */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 hover:border-emerald-500/40 transition-all text-xs"
              >
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-400"
                />
                <span className="text-slate-200 font-medium hidden sm:inline truncate max-w-[130px]">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl py-2 px-1 text-sm border border-slate-700/80 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="font-semibold text-white truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                      {currentUser.provider === 'firebase-google' ? 'Google Authenticated' : 'Consultancy Portal Demo'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenTracker();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center space-x-2 text-xs"
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>My Regulatory Projects</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center space-x-2 text-xs mt-1"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleClick}
              disabled={isLoggingIn}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
              title="Sign in with Google Firebase"
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
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenEnquiry}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Request Quotation</span>
          </button>
        </div>
      </div>
    </header>
  );
};
