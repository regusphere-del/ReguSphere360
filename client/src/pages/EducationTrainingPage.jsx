import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  HelpCircle,
  FileText,
  DollarSign,
  Download,
  Users,
  Building2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  PlayCircle,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const EducationTrainingPage = ({ onOpenEnquiry }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('catalogue'); // 'catalogue' | 'quiz' | 'corporate'

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isGradingQuiz, setIsGradingQuiz] = useState(false);

  // Registration modal state
  const [registeringCourse, setRegisteringCourse] = useState(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regAttendeeType, setRegAttendeeType] = useState('Working Professional');
  const [regAttendeeCount, setRegAttendeeCount] = useState(1);
  const [regPaymentMethod, setRegPaymentMethod] = useState('Test Card (Stripe Simulator)');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchQuizQuestions();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/courses`);
      if (res.data.success) {
        setCourses(res.data.courses);
        setSelectedCourse(res.data.courses[0]);
      }
    } catch (e) {
      console.warn('Could not fetch courses from backend:', e);
    }
  };

  const fetchQuizQuestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/courses/quiz/questions`);
      if (res.data.success) {
        setQuizQuestions(res.data.questions);
      }
    } catch (e) {
      console.warn('Could not fetch quiz questions:', e);
    }
  };

  const handleQuizAnswer = (qId, optionIdx) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleGradeQuiz = async () => {
    try {
      setIsGradingQuiz(true);
      const res = await axios.post(`${API_BASE}/courses/quiz/grade`, {
        userAnswers: quizAnswers,
      });
      if (res.data.success) {
        setQuizResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGradingQuiz(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !registeringCourse) return;

    try {
      setIsRegistering(true);
      const res = await axios.post(`${API_BASE}/courses/register`, {
        courseId: registeringCourse.id,
        attendeeName: regName,
        email: regEmail,
        companyOrInstitute: regCompany,
        attendeeType: regAttendeeType,
        attendeeCount: regAttendeeCount,
        paymentMethod: regPaymentMethod,
      });

      if (res.data.success) {
        setRegSuccess(res.data.registration);
      }
    } catch (err) {
      console.error(err);
      alert('Error completing registration.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>Service 3: Regulatory Education & Corporate Training</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Professional Pharmaceutical Regulatory Affairs Education
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Career-defining masterclasses, CTD/eCTD dossier workshops, and corporate training programmes for
            students, freshers, regulatory associates, and pharmaceutical enterprises.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('catalogue')}
              className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Course Catalogue</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Take Regulatory Knowledge Quiz</span>
            </button>

            <button
              onClick={() => onOpenEnquiry('Corporate Regulatory Training Programme')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs transition-colors"
            >
              <span>Request Corporate Training Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tabs Control */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'catalogue'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Masterclasses & Course Catalogue</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'quiz'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Regulatory Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('corporate')}
            className={`py-4 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'corporate'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Corporate Enterprise Training</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COURSE CATALOGUE & DETAIL VIEW */}
      {activeTab === 'catalogue' && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Courses List */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Featured Masterclasses ({courses.length})
                </h3>

                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedCourse?.id === course.id
                        ? 'bg-white border-amber-600 shadow-md ring-1 ring-amber-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {course.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        ${course.priceUsd} USD
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">{course.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{course.shortDescription}</p>

                    <div className="flex items-center space-x-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{course.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Starts: {course.nextCohort}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Detail View */}
              {selectedCourse && (
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {selectedCourse.id}
                      </span>
                      <span className="text-xs text-slate-500">{selectedCourse.level}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedCourse.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedCourse.shortDescription}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 text-xs">
                    <div>
                      <span className="text-slate-400 block">Format:</span>
                      <strong className="text-slate-900">{selectedCourse.format}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Next Cohort:</span>
                      <strong className="text-slate-900">{selectedCourse.nextCohort}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Tuition Fee:</span>
                      <strong className="text-slate-900">${selectedCourse.priceUsd} USD / ₹{selectedCourse.priceInr?.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Modules Breakdown */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
                      Curriculum & Module Syllabus
                    </h4>
                    <div className="space-y-3">
                      {selectedCourse.modules?.map((mod, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <p className="font-bold text-slate-900 mb-1">{mod.title}</p>
                          <ul className="space-y-0.5 text-slate-600 text-[11px] list-disc list-inside">
                            {mod.topics?.map((top, idx) => (
                              <li key={idx}>{top}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables & Certificate */}
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs space-y-2">
                    <span className="font-bold text-amber-900 block flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-amber-700" />
                      <span>Deliverables & Certificate of Course Completion</span>
                    </span>
                    <ul className="space-y-1 text-slate-700 text-xs">
                      {selectedCourse.deliverables?.map((del, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-slate-500 italic pt-1 border-t border-amber-200/50">
                      *Note: A Certificate of Course Completion acknowledges active participation and completion of practical coursework. It is strictly not an accredited university degree or official health authority license.
                    </p>
                  </div>

                  {/* Register Trigger */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Only {selectedCourse.seatsAvailable} seats available for this cohort
                    </span>
                    <button
                      onClick={() => setRegisteringCourse(selectedCourse)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Enroll & Register for Masterclass</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE REGULATORY QUIZ */}
      {activeTab === 'quiz' && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Interactive Pharmaceutical Regulatory Quiz</h3>
                  <p className="text-xs text-slate-500">
                    Test your knowledge across ICH CTD M4, FDA 21 CFR, CDSCO Schedule M, and ASEAN guidelines
                  </p>
                </div>
              </div>

              {quizResult ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Your Quiz Score</span>
                      <div className="flex items-baseline space-x-2 mt-0.5">
                        <span className="text-3xl font-black text-slate-900">{quizResult.score}%</span>
                        <span className="text-xs text-slate-500">
                          ({quizResult.correctCount} of {quizResult.totalQuestions} correct)
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        quizResult.passed
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {quizResult.passed ? 'Passing Proficiency' : 'Foundational Gap'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{quizResult.message}</p>

                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase text-slate-500">Question-by-Question Review:</p>
                    {quizResult.review?.map((rev, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                        <p className="font-semibold text-slate-900 mb-1">{rev.question}</p>
                        <p className="text-slate-600 text-[11px]">
                          Your answer: <strong className={rev.isCorrect ? 'text-emerald-700' : 'text-rose-600'}>{rev.userAnswer}</strong>
                        </p>
                        {!rev.isCorrect && (
                          <p className="text-[11px] text-emerald-800 mt-0.5">
                            Correct answer: <strong>{rev.correctAnswer}</strong>
                          </p>
                        )}
                        <p className="text-[10px] text-slate-500 mt-1 italic">{rev.explanation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setQuizResult(null);
                        setQuizAnswers({});
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {quizQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                      <p className="font-bold text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = quizAnswers[q.id] === oIdx;
                          return (
                            <div
                              key={oIdx}
                              onClick={() => handleQuizAnswer(q.id, oIdx)}
                              className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-amber-50 border-amber-600 text-amber-950 font-semibold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                                }`}
                              >
                                {isSelected && '✓'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleGradeQuiz}
                      disabled={isGradingQuiz}
                      className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      {isGradingQuiz ? 'Evaluating Answers...' : 'Submit Answers & Calculate Score'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: CORPORATE ENTERPRISE TRAINING */}
      {activeTab === 'corporate' && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Corporate & In-House Pharmaceutical Training</h3>
                  <p className="text-xs text-slate-500">
                    Bespoke training programmes designed for cross-functional teams in RA, QA/QC, Manufacturing & Clinical
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">On-Site or Virtual Delivery</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Custom 1-to-3 day intensive sessions conducted at your manufacturing facilities, R&D centers, or via secure virtual classrooms.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Custom Case Studies</h4>
                  <p className="text-slate-600 leading-relaxed">
                    We tailor exercises to your specific product portfolio (Biologics, Generics, Medical Devices, or APIs).
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Includes corporate attendance tracking, learning material licensing, and certificates.
                </p>
                <button
                  onClick={() => onOpenEnquiry('Corporate Regulatory Training Programme')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Request Corporate Training Proposal
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* REGISTRATION & PAYMENT SIMULATION MODAL */}
      {registeringCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8">
            <button
              onClick={() => {
                setRegisteringCourse(null);
                setRegSuccess(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-lg p-1"
            >
              ✕
            </button>

            {regSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Registration Confirmed!</h4>
                <p className="text-xs text-slate-600 mb-4">
                  Registration Code: <strong>{regSuccess.registrationId}</strong>. We have queued your onboarding packet to <strong>{regSuccess.email}</strong>.
                </p>

                {/* Certificate Disclaimer Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-[11px] text-slate-600 mb-6">
                  <p className="font-bold text-slate-800 mb-1">Compliance & Certificate Information:</p>
                  <p>{regSuccess.certificateDisclaimer}</p>
                </div>

                <button
                  onClick={() => {
                    setRegisteringCourse(null);
                    setRegSuccess(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Course Registration
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{registeringCourse.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Cohort Date: {registeringCourse.nextCohort} • Tuition: ${registeringCourse.priceUsd} USD
                  </p>
                </div>

                {/* Payment Gateway Configuration Notice */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-4 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Payment Processing Notice:</strong> Live credit card/UPI processing connects through configured Stripe/Razorpay accounts. Currently running in verified Sandbox/Simulation Mode.
                  </div>
                </div>

                <form onSubmit={handleRegistrationSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Attendee Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Dr. Priya Sharma"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Work / Student Email *</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. priya@pharma-corp.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Company / University</label>
                      <input
                        type="text"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="e.g. Apex Biotech Ltd / BITS Pilani"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Profile Category</label>
                      <select
                        value={regAttendeeType}
                        onChange={(e) => setRegAttendeeType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-amber-600"
                      >
                        <option value="Working Professional">Working Professional (RA/QA/QC)</option>
                        <option value="Fresher / Job Seeker">Fresher / M.Pharm / MS Graduate</option>
                        <option value="Student">Current Student / Academic</option>
                        <option value="Corporate Group Sponsor">Corporate Team Sponsor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Payment Mode (Simulated)</label>
                      <select
                        value={regPaymentMethod}
                        onChange={(e) => setRegPaymentMethod(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-amber-600"
                      >
                        <option value="Test Card (Stripe Simulator)">Test Credit Card (Stripe Sandbox)</option>
                        <option value="UPI / Net Banking (Razorpay Simulator)">UPI / NetBanking (Razorpay Sandbox)</option>
                        <option value="Company Purchase Order (Invoice)">Company Invoice / Purchase Order</option>
                      </select>
                    </div>
                  </div>

                  {/* Disclaimer check */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                    <p>
                      <strong>Certificate Disclaimer:</strong> I acknowledge that completion of this masterclass provides a Certificate of Course Completion documenting hours of practical instruction, and is not an accredited university degree or government regulatory authority license.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">
                      Total: ${registeringCourse.priceUsd} USD
                    </span>
                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      {isRegistering ? 'Processing Enrollment...' : 'Confirm Registration'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
