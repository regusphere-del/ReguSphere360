import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceCards } from './components/ServiceCards';
import { DeliverablesSection } from './components/DeliverablesSection';
import { ReadinessChecklistTool } from './components/ReadinessChecklistTool';
import { EnquiryModal } from './components/EnquiryModal';
import { ProjectTracker } from './components/ProjectTracker';
import { Footer } from './components/Footer';
import { FileCheck2, Search, Sparkles, ShieldCheck } from 'lucide-react';

function ConsultancyPlatform() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [auditContext, setAuditContext] = useState(null);

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState(null);

  const [isReadinessOpen, setIsReadinessOpen] = useState(false);

  const handleOpenEnquiryWithService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setAuditContext(null);
    setIsEnquiryOpen(true);
  };

  const handleProceedFromReadiness = (auditData) => {
    setIsReadinessOpen(false);
    setSelectedService('Regulatory document gap assessments');
    setAuditContext(auditData);
    setIsEnquiryOpen(true);
  };

  const handleEnquirySuccess = (newTrackingId) => {
    setIsEnquiryOpen(false);
    setActiveTrackingId(newTrackingId);
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top System Notice for Regulatory Standards */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-b border-emerald-900/30 text-[11px] text-slate-300 py-1.5 px-4 text-center">
        <span className="text-emerald-400 font-bold mr-1.5">● REGULATORY ADVISORY:</span>
        ICH eCTD v4.0 Implementation window active. Submissions for US FDA, EMA, Health Canada, and PMDA accepted with full validation pass.
      </div>

      {/* Navigation */}
      <Navbar
        onOpenEnquiry={() => {
          setSelectedService(null);
          setAuditContext(null);
          setIsEnquiryOpen(true);
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenReadiness={() => setIsReadinessOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onOpenEnquiry={() => {
            setSelectedService(null);
            setAuditContext(null);
            setIsEnquiryOpen(true);
          }}
          onOpenReadiness={() => setIsReadinessOpen(true)}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />

        <ServiceCards
          onSelectService={handleOpenEnquiryWithService}
          onOpenReadiness={() => setIsReadinessOpen(true)}
        />

        <DeliverablesSection
          onOpenEnquiry={() => {
            setSelectedService('ICH CTD/eCTD dossier structure and document indexing');
            setAuditContext(null);
            setIsEnquiryOpen(true);
          }}
        />

        {/* Call to Action Banner */}
        <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ready for Submission Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Eliminate Submission Delays & Health Authority Queries
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you are assembling your first Investigational New Drug (IND) filing or maintaining complex
              commercial variations, ReguSphere 360 gives you senior RAC expertise on demand.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedService(null);
                  setAuditContext(null);
                  setIsEnquiryOpen(true);
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center space-x-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Request Quotation & Scoping</span>
              </button>
              <button
                onClick={() => setIsReadinessOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Run Interactive Readiness Audit</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenEnquiry={() => {
          setSelectedService(null);
          setAuditContext(null);
          setIsEnquiryOpen(true);
        }}
        onOpenReadiness={() => setIsReadinessOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Modals & Tools */}
      {isEnquiryOpen && (
        <EnquiryModal
          initialService={selectedService}
          auditContext={auditContext}
          onClose={() => setIsEnquiryOpen(false)}
          onSuccess={handleEnquirySuccess}
        />
      )}

      {isTrackerOpen && (
        <ProjectTracker
          initialTrackingId={activeTrackingId}
          onClose={() => setIsTrackerOpen(false)}
          onNewEnquiry={() => {
            setIsTrackerOpen(false);
            setIsEnquiryOpen(true);
          }}
        />
      )}

      {isReadinessOpen && (
        <ReadinessChecklistTool
          onClose={() => setIsReadinessOpen(false)}
          onProceedToEnquiry={handleProceedFromReadiness}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConsultancyPlatform />
    </AuthProvider>
  );
}
