import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Globe,
  FileCheck2,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const AboutPage = ({ onOpenEnquiry }) => {
  const leadership = [
    {
      name: 'Dr. Eleanor Vance, PhD, RAC',
      role: 'Senior Partner & Lead Regulatory Strategist',
      bio: 'Over 22 years of global regulatory affairs leadership overseeing 180+ successful IND, NDA, and MAA electronic dossier submissions. Regulatory Affairs Certified (RAC) with specialized expertise in ICH M4 CTD harmonization, FDA CDER interactions, and complex CMC quality reviews.',
      credentials: 'PhD in Pharmaceutical Chemistry • RAC (US/EU) • Former Senior Director of Regulatory Affairs',
    },
    {
      name: 'Dr. Marcus Thorne, MD, RAC',
      role: 'Global Regulatory Intelligence Lead & Medical Writing Director',
      bio: 'Physician and regulatory scientist with 18 years of clinical development and regulatory affairs experience across Europe and the United States. Author of 60+ Clinical Study Reports (ICH E3) and expert on EMA Clinical Trials Regulation (CTR EU 536/2014) and CTIS filings.',
      credentials: 'MD (Internal Medicine) • Member of TOPRA & DIA • Expert in EMA & MHRA Procedures',
    },
    {
      name: 'Rajesh K. Nambiar, M.Pharm',
      role: 'India & Emerging Markets Regulatory Practice Head',
      bio: '19 years of hands-on experience navigating CDSCO, State FDAs, and ASEAN regulatory authorities. Specialized in New Drugs & Clinical Trials Rules (NDCT 2019), Revised Schedule M (cGMP) compliance, and overseas manufacturing site Form 40/Form 10 licensing.',
      credentials: 'M.Pharm (Quality Assurance) • Former CDSCO Liaison Specialist • Member of IPA Regulatory Forum',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-4">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>About ReguSphere 360</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Independent Pharmaceutical Regulatory Affairs Excellence
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            ReguSphere 360 was founded by senior regulatory affairs professionals to provide high-stakes
            pharmaceutical, biotech, and generic sponsors with rigorous technical dossier assembly, gap auditing,
            and global regulatory intelligence.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Technical Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero tolerance for formatting ambiguities or scientific gaps. Every leaf document, XML spine, and
                hyperlink matrix is audited against regional health authority electronic gateway validators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Global Perspective</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep localized expertise across India (CDSCO), United States (FDA), Europe (EMA), UK (MHRA),
                Japan (PMDA), and ASEAN markets to help sponsors achieve seamless multi-regional market entry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Absolute Confidentiality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your intellectual property, drug master files, and clinical records are handled under strict
                mutual NDAs, encrypted document controls, and 21 CFR Part 11 audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Biographies */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Senior Regulatory Affairs Leadership
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Our consultants bring certified RAC credentials and decades of real-world agency interaction experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div key={i} className="executive-card rounded-2xl p-7 bg-white border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-black text-sm mb-4 border border-slate-300">
                    {leader.name.split(' ')[1]?.[0] || 'R'}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-xs text-teal-700 font-bold mb-3">{leader.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{leader.bio}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  {leader.credentials}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Governance & Trust Disclaimer */}
      <section className="py-14 bg-white text-xs text-slate-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Regulatory Integrity & Independence Statement</span>
            </div>
            <p className="leading-relaxed">
              <strong>Non-Affiliation:</strong> ReguSphere 360 is an independent regulatory affairs consultancy firm. We do not claim government affiliation, official regulatory authority status, or accredited university qualification status.
            </p>
            <p className="leading-relaxed">
              <strong>Authority Decisions:</strong> Our services are designed to assist pharmaceutical clients in understanding guidelines, assembling compliant dossiers, and minimizing submission risks. All final regulatory decisions, marketing authorizations, and approvals belong exclusively to the sovereign health authorities (e.g., US FDA, EMA, CDSCO). No consultancy firm can or should guarantee approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
