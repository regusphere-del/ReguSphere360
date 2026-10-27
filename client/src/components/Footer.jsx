import React from 'react';
import { ShieldCheck, Mail, Globe, CheckCircle2, Lock } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenEnquiry, onOpenReadiness, onOpenTracker }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <img
                src="/logo.jpg"
                alt="ReguSphere 360"
                className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-slate-700"
              />
              <span className="text-lg font-bold text-white">
                Regu<span className="text-teal-400">Sphere</span> 360
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Independent pharmaceutical regulatory affairs consultancy providing specialized eCTD dossier assembly,
              global regulatory intelligence across India and international markets, and corporate education.
            </p>
            <div className="flex items-center space-x-2 text-teal-400 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ICH M4, GxP & 21 CFR Part 11 Compliant Frameworks</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Consultancy Practices
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('documentation')}
                  className="hover:text-teal-400 text-left transition-colors"
                >
                  1. Regulatory Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="hover:text-teal-400 text-left transition-colors"
                >
                  2. Global Regulatory Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-teal-400 text-left transition-colors"
                >
                  3. Education & Corporate Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-teal-400 text-left transition-colors"
                >
                  6-Step Engagement Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('expertise')}
                  className="hover:text-teal-400 text-left transition-colors"
                >
                  Therapeutic & Dossier Domains
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Portals */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Tools & Portals</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onOpenEnquiry(null)} className="hover:text-teal-400 text-left transition-colors">
                  Request a Consultation
                </button>
              </li>
              <li>
                <button onClick={onOpenReadiness} className="hover:text-teal-400 text-left transition-colors">
                  Submission Readiness Audit Tool
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-teal-400 text-left transition-colors">
                  Live Project Tracking Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-teal-400 text-left transition-colors">
                  Regulatory Guidelines Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-teal-400 text-left transition-colors">
                  Consultancy & Scope FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Governance */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Connect With Us</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>regulatory@regusphere360.com</span>
              </p>
            </div>

            {/* Official Social Media Links */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Official Channels</span>
              <div className="flex items-center space-x-2.5">
                <a
                  href="https://www.linkedin.com/in/regu-sphere-8524b1443?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/40 transition-colors text-[11px] font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/regusphere360?exln=MXNzM3U5bWR4aW1jOA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 border border-slate-700 hover:border-pink-500/40 transition-colors text-[11px] font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => onNavigate('admin')}
                className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Admin Operations Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory Authority Non-Affiliation Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-8">
          <p>
            <strong className="text-slate-300">Statutory Health Authority Disclaimer:</strong> ReguSphere 360 Inc. is an
            independent technical advisory consultancy and is not an agency, branch, or affiliate of the US Food and Drug
            Administration (FDA), European Medicines Agency (EMA), Central Drugs Standard Control Organisation (CDSCO),
            or any statutory health authority. All final regulatory decisions, marketing authorizations, and approvals belong
            exclusively to the respective sovereign authorities. Course completion certificates document practical
            instruction and do not constitute accredited academic degrees or government regulatory licenses.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} ReguSphere 360 Inc. All Rights Reserved. Pharmaceutical Regulatory Affairs.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">
              Disclaimers & Confidentiality
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
