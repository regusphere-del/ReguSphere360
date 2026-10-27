import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe, CheckCircle2, Lock } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenEnquiry, onOpenReadiness, onOpenTracker }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
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
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Global Offices</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>regulatory@regusphere360.com</span>
              </p>
              <p className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>+1 (800) 734-8774</span>
              </p>
              <p className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Boston, MA • Basel, Switzerland • Mumbai, India</span>
              </p>
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
