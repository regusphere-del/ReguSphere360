import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ConsultancyServicesPage } from './pages/ConsultancyServicesPage';
import { EctdConsultancyPage } from './pages/EctdConsultancyPage';
import { LicenseTrackingPage } from './pages/LicenseTrackingPage';
import { RegulatoryDocumentationPage } from './pages/RegulatoryDocumentationPage';
import { GlobalIntelligencePage } from './pages/GlobalIntelligencePage';
import { LicensingGuidancePage } from './pages/LicensingGuidancePage';
import { EducationTrainingPage } from './pages/EducationTrainingPage';
import { ConsultationRequestPage } from './pages/ConsultationRequestPage';
import { ClientDashboard } from './pages/ClientDashboard';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ExpertisePage } from './pages/ExpertisePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';
import { AdminDashboard } from './pages/AdminDashboard';
import { ReadinessChecklistTool } from './components/ReadinessChecklistTool';
import { EnquiryModal } from './components/EnquiryModal';
import { ProjectTracker } from './components/ProjectTracker';

function ConsultancyApp() {
  const [activePage, setActivePage] = useState('home');

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryService, setEnquiryService] = useState(null);
  const [enquiryAuditContext, setEnquiryAuditContext] = useState(null);

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState(null);

  const [isReadinessOpen, setIsReadinessOpen] = useState(false);

  // Scroll to top on page navigation
  const handleNavigate = (pageKey) => {
    setActivePage(pageKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (initialService = null) => {
    setEnquiryService(initialService);
    setEnquiryAuditContext(null);
    setIsEnquiryOpen(true);
  };

  const handleProceedFromReadiness = (auditData) => {
    setIsReadinessOpen(false);
    setEnquiryService('Regulatory document gap assessments');
    setEnquiryAuditContext(auditData);
    setIsEnquiryOpen(true);
  };

  const handleEnquirySuccess = (newTrackingId) => {
    setIsEnquiryOpen(false);
    setActiveTrackingId(newTrackingId);
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-900">
      {/* Top Advisory Bar */}
      <div className="bg-slate-900 text-[11px] text-slate-300 py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
        <span className="font-bold text-white uppercase tracking-wider">Regulatory Operations Notice:</span>
        <span className="text-slate-400">
          ICH eCTD v4.0 Implementation & CDSCO Revised Schedule M (cGMP) transition audits in progress.
        </span>
      </div>

      {/* Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenReadiness={() => setIsReadinessOpen(true)}
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1">
        {/* 1. Consultancy Home */}
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenTracker={() => setIsTrackerOpen(true)}
            onOpenReadiness={() => setIsReadinessOpen(true)}
          />
        )}

        {/* 2. Our Consultancy Services Hub */}
        {activePage === 'consultancy-services' && (
          <ConsultancyServicesPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {/* 3. Service A: eCTD & Regulatory Submission Consultancy */}
        {activePage === 'services-ectd' && (
          <EctdConsultancyPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {/* 4. Service B: Pharmaceutical License Tracking */}
        {activePage === 'services-license-tracking' && (
          <LicenseTrackingPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            initialTrackingId={activeTrackingId}
          />
        )}

        {/* 5. Service C: Regulatory Documentation Consultancy */}
        {activePage === 'documentation' && (
          <RegulatoryDocumentationPage
            onSelectService={handleOpenEnquiry}
            onOpenReadiness={() => setIsReadinessOpen(true)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {/* 6. Service D: Global Regulatory Intelligence */}
        {activePage === 'intelligence' && (
          <GlobalIntelligencePage onOpenEnquiry={handleOpenEnquiry} />
        )}

        {/* 7. Service E: Pharmaceutical Licensing Guidance */}
        {activePage === 'services-licensing-guidance' && (
          <LicensingGuidancePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {/* 8. Service F: Regulatory Education & Training */}
        {activePage === 'education' && (
          <EducationTrainingPage onOpenEnquiry={handleOpenEnquiry} />
        )}

        {/* 9. Request a Consultation Page */}
        {activePage === 'consultation-request' && (
          <ConsultationRequestPage
            onNavigate={handleNavigate}
            preselectedService={enquiryService}
          />
        )}

        {/* 10. Client Portal Dashboard */}
        {activePage === 'client-dashboard' && (
          <ClientDashboard
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {/* Additional Existing Pages (Retained 100% Intact) */}
        {activePage === 'process' && <ProcessPage onOpenEnquiry={handleOpenEnquiry} />}
        {activePage === 'about' && <AboutPage onOpenEnquiry={handleOpenEnquiry} />}
        {activePage === 'expertise' && <ExpertisePage onOpenEnquiry={handleOpenEnquiry} />}
        {activePage === 'resources' && <ResourcesPage onOpenEnquiry={handleOpenEnquiry} />}
        {activePage === 'faq' && <FaqPage onOpenEnquiry={handleOpenEnquiry} />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'legal' && <LegalPages />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenReadiness={() => setIsReadinessOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Modals & Tools */}
      {isEnquiryOpen && (
        <EnquiryModal
          initialService={enquiryService}
          auditContext={enquiryAuditContext}
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
      <ConsultancyApp />
    </AuthProvider>
  );
}
