import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onOpenEnquiry, onOpenReadiness, onOpenTracker }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-lg font-bold text-white">
                Regu<span className="text-emerald-400">Sphere</span> 360
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Specialized pharmaceutical regulatory affairs consultancy providing world-class eCTD dossier assembly, gap
              assessments, SOP control systems, and health authority submission readiness.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ICH M4 & 21 CFR Part 11 Compliant</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Documentation Consultancy
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  ICH CTD/eCTD Dossier Indexing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Pre-Submission Gap Assessments
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  GxP SOP Preparation & Control
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Submission Readiness Validation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Module 2 Clinical/CMC Writing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Post-Approval Variation Filings
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Client Portals</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenEnquiry} className="hover:text-emerald-400 text-left transition-colors">
                  Instant Quotation Request
                </button>
              </li>
              <li>
                <button onClick={onOpenReadiness} className="hover:text-emerald-400 text-left transition-colors">
                  Readiness Self-Assessment Tool
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-emerald-400 text-left transition-colors">
                  Project Tracking Portal
                </button>
              </li>
              <li>
                <a href="#deliverables" className="hover:text-emerald-400 transition-colors">
                  eCTD Deliverables Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Global Agencies */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Consultancy Office</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>regulatory@regusphere360.com</span>
              </p>
              <p className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>+1 (800) 734-8774 / +44 20 7946 0991</span>
              </p>
              <p className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Life Sciences Park, Boston MA / Basel, Switzerland</span>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                Accepted Standards
              </span>
              <p className="text-[10px] text-slate-400">US FDA • EMA • Health Canada • CDSCO • TGA • PMDA • WHO</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} ReguSphere 360 Inc. All Rights Reserved. Pharmaceutical Regulatory Affairs.</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Confidentiality Agreement (NDA)</span>
            <span className="hover:text-slate-300 cursor-pointer">21 CFR Part 11 Statement</span>
            <span className="hover:text-slate-300 cursor-pointer">Quality Manual</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
