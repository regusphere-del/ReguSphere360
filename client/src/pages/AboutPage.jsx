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
  Sparkles,
  Cpu,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

export const AboutPage = ({ onOpenEnquiry }) => {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold mb-4 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>About ReguSphere 360</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Empowering Pharmaceutical Regulatory Excellence & Technical Innovation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            ReguSphere was founded to bridge pharmaceutical regulatory science, global compliance documentation,
            and modern technology—making regulatory knowledge accessible, reliable, and actionable for students,
            researchers, and life-sciences professionals worldwide.
          </p>
        </div>
      </section>

      {/* Meet The Founders Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="founders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Leadership & Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Meet the Founders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Combining specialized pharmaceutical regulatory science with cutting-edge technology and creative storytelling to make global regulatory intelligence accessible to all.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Founder 1: Sandesh Kalyanshetti */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:border-teal-500/40 transition-all duration-300 hover:shadow-2xl">
              <div>
                {/* Photo Container */}
                <div className="relative bg-gradient-to-b from-slate-100 to-slate-200 aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden group">
                  <img
                    src="/founders/sandesh-kalyanshetti.jpg"
                    alt="Sandesh Kalyanshetti - Creator of ReguSphere"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-extrabold bg-teal-500 text-slate-950 shadow-md">
                      Creator of ReguSphere
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
                      Sandesh Kalyanshetti
                    </h3>
                    <p className="text-teal-300 text-sm font-semibold mt-0.5">
                      Founder & Creator • Pharmaceutical Regulatory Affairs
                    </p>
                  </div>
                </div>

                {/* Biography & Details */}
                <div className="p-7 sm:p-8 space-y-5">
                  <div className="space-y-3 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                    <p>
                      <strong>Sandesh Kalyanshetti</strong> is pursuing an M.Pharm in Pharmaceutical Regulatory Affairs, with a strong interest in regulatory compliance, pharmaceutical documentation, and global regulatory practices. He has completed certifications in Good Regulatory Practices through the CDSCO, WHO India, BRIC and THSTI collaboration, and the USP Certificate of Document and Reference Standards through USP Education.
                    </p>
                    <p>
                      As the creator of <strong>Regusphere</strong>, he aims to make pharmaceutical regulatory knowledge, guidance, and documentation support more accessible to students and industry professionals, promoting quality, safety, and regulatory excellence.
                    </p>
                  </div>

                  {/* Certified Credentials */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>Certifications & Key Expertise</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                        M.Pharm in Regulatory Affairs
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                        CDSCO • WHO India • BRIC • THSTI Certified (Good Regulatory Practices)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                        USP Certificate: Document & Reference Standards (USP Education)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                        ICH CTD Dossier Assembly & Gap Auditing
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Connect Links */}
              <div className="px-7 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Connect with Sandesh:</span>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.linkedin.com/in/regu-sphere-8524b1443?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
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
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Founder 2: Kushal Pattar */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl">
              <div>
                {/* Photo Container */}
                <div className="relative bg-gradient-to-b from-slate-100 to-slate-200 aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden group">
                  <img
                    src="/founders/kushal-pattar.jpg"
                    alt="Kushal Pattar - Co-Founder of ReguSphere"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-extrabold bg-indigo-500 text-white shadow-md">
                      Co-Founder
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
                      Kushal Pattar
                    </h3>
                    <p className="text-indigo-300 text-sm font-semibold mt-0.5">
                      Co-Founder • Technology & Innovation Lead
                    </p>
                  </div>
                </div>

                {/* Biography & Details */}
                <div className="p-7 sm:p-8 space-y-5">
                  <div className="space-y-3 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                    <p>
                      <strong>Kushal Pattar</strong> is someone who enjoys exploring ideas, learning new technologies, and turning creativity into meaningful work. With a background in electronics and communication, he brings a technical perspective, a problem-solving mindset, and a passion for continuous learning. Alongside his academic journey, he has explored his creative side through freelance photography, videography, and visual storytelling, gaining experience in creativity, collaboration, and bringing ideas to life.
                    </p>
                    <p>
                      At <strong>ReguSphere</strong>, he is excited to be part of building something meaningful at the intersection of innovation, knowledge, and technology, with a vision to make pharmaceutical regulatory information more accessible and useful.
                    </p>
                  </div>

                  {/* Skills & Focus Pillars */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Technical & Creative Pillars</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                        Electronics & Communication Engineering
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                        Technology Architecture & Digital Platforms
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                        Visual Storytelling & Creative Collaboration
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                        Problem-Solving & User-Centric Solutions
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Connect Links */}
              <div className="px-7 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Connect with Kushal:</span>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.linkedin.com/in/regu-sphere-8524b1443?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
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
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Founding Synergy */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.2),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-teal-400 text-xs uppercase tracking-wider font-extrabold">
                The ReguSphere Synergy
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Where Regulatory Science Meets Digital Innovation
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By uniting certified pharmaceutical regulatory expertise with modern technology and visual storytelling, ReguSphere 360 delivers an unparalleled platform experience. Whether navigating complex CDSCO and FDA dossier requirements or conducting global guideline research, our mission is to empower professionals and organizations with clarity, speed, and precision.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('general')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
                >
                  <span>Connect with Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Core Guiding Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The fundamental standards that govern every advisory interaction, audit, and educational resource.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Technical Rigor & Quality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero tolerance for formatting ambiguities or scientific gaps. Every leaf document, XML spine, and
                hyperlink matrix is audited against regional health authority electronic gateway validators.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Global Regulatory Perspective</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep localized expertise across India (CDSCO), United States (FDA), Europe (EMA), UK (MHRA),
                Japan (PMDA), and ASEAN markets to help sponsors achieve seamless multi-regional market entry.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Absolute Integrity & Confidentiality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your intellectual property, drug master files, and formulation records are handled under strict
                mutual NDAs, encrypted document controls, and 21 CFR Part 11 audit trails.
              </p>
            </div>
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
              <strong>Non-Affiliation:</strong> ReguSphere 360 is an independent regulatory affairs consultancy platform. We do not claim government affiliation, official regulatory authority status, or accredited university qualification status.
            </p>
            <p className="leading-relaxed">
              <strong>Authority Decisions:</strong> Our services are designed to assist pharmaceutical clients and professionals in understanding guidelines, assembling compliant dossiers, and minimizing submission risks. All final regulatory decisions, marketing authorizations, and approvals belong exclusively to the sovereign health authorities (e.g., US FDA, EMA, CDSCO). No consultancy firm can or should guarantee approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
