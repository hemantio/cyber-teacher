'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { ALL_UNIT_TESTS, UnitTest, getTestById } from '@/data/ai-tests';
import { TestRunner } from '@/components/tests/TestRunner';
import {
  BookOpen,
  Clock,
  Award,
  Share2,
  Check,
  Play,
  FileText,
  CheckCircle2,
  HelpCircle,
  Calculator,
  Layers,
  ChevronRight
} from 'lucide-react';

function TestsPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const unitParam = searchParams.get('unit');
  const modeParam = searchParams.get('mode') as 'practice' | 'exam' | null;

  const [activeTest, setActiveTest] = useState<UnitTest | null>(() => {
    return unitParam ? getTestById(unitParam) ?? null : null;
  });
  const [activeMode, setActiveMode] = useState<'practice' | 'exam'>(() => {
    return (modeParam === 'exam' || modeParam === 'practice') ? modeParam : 'practice';
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (unitParam) {
      const found = getTestById(unitParam);
      if (found) {
        setActiveTest(found);
        if (modeParam === 'exam' || modeParam === 'practice') {
          setActiveMode(modeParam);
        }
      }
    } else {
      setActiveTest(null);
    }
  }, [unitParam, modeParam]);

  const handleStartTest = (test: UnitTest, mode: 'practice' | 'exam') => {
    setActiveTest(test);
    setActiveMode(mode);
    router.push(`/tests?unit=${test.id}&mode=${mode}`, { scroll: false });
  };

  const handleBackToPortal = () => {
    setActiveTest(null);
    router.push('/tests', { scroll: false });
  };

  const handleCopyLink = (testId: string) => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/tests?unit=${testId}`
      : `https://cyber-teacher-app.vercel.app/tests?unit=${testId}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(testId);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navigation />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {activeTest ? (
          <TestRunner
            test={activeTest}
            initialMode={activeMode}
            onBackToPortal={handleBackToPortal}
          />
        ) : (
          <div className="space-y-8">
            {/* Simple, Academic Header */}
            <div className="border-b border-slate-800 pb-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <span>Mumbai University</span>
                <span>•</span>
                <span>Computer Science (TYCS)</span>
                <span>•</span>
                <span>Semester VI</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Artificial Intelligence (AI) Practice & Mock Tests
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
                Unit-wise test series prepared using university lecture notes and past question papers (Papers 1 through 9).
                Choose <strong>Practice Mode</strong> for instant solutions with diagrams, or <strong>Exam Mode</strong> for timed self-assessment.
              </p>

              {/* Simple Quick Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-white">116 Questions</div>
                  <div className="text-xs text-slate-400">Curated & Verified</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-white">3 Units</div>
                  <div className="text-xs text-slate-400">Complete Syllabus</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-white">Papers 1–9</div>
                  <div className="text-xs text-slate-400">Previous Year Papers</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-xl font-bold text-white">Step-by-Step</div>
                  <div className="text-xs text-slate-400">Solved Numericals</div>
                </div>
              </div>
            </div>

            {/* Share Link Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm">
              <div className="flex items-center gap-2.5">
                <Share2 size={16} className="text-sky-400 shrink-0" />
                <span className="text-slate-300">
                  Need to share tests with classmates? Send them direct links to any unit with zero login required.
                </span>
              </div>
              <button
                onClick={() => handleCopyLink('all')}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                {copiedId === 'all' ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Portal Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Copy Portal Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Unit Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Available Tests
                </h2>
                <span className="text-xs text-slate-400">
                  Click 'Practice' for immediate explanations or 'Take Exam' for timer
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_UNIT_TESTS.map((test) => {
                  return (
                    <div
                      key={test.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Unit Header */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                            {test.badge}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {test.estimatedMinutes} mins
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-base font-bold text-white leading-snug">
                            {test.title}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                            {test.description}
                          </p>
                        </div>

                        {/* Key Topics List */}
                        <div className="pt-1">
                          <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                            Topics covered:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {test.topicsCovered.slice(0, 4).map((topic, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
                              >
                                {topic}
                              </span>
                            ))}
                            {test.topicsCovered.length > 4 && (
                              <span className="px-1.5 py-0.5 rounded text-[11px] text-slate-500">
                                +{test.topicsCovered.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Award size={13} className="text-amber-400" />
                          {test.questions.length} Questions ({test.pyqCount} PYQs)
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyLink(test.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors"
                            title="Copy link to this test"
                          >
                            {copiedId === test.id ? (
                              <Check size={14} className="text-emerald-400" />
                            ) : (
                              <Share2 size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => handleStartTest(test, 'practice')}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                          >
                            Practice
                          </button>

                          <button
                            onClick={() => handleStartTest(test, 'exam')}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                          >
                            Take Exam
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* University Syllabus Reference Note */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText size={14} className="text-sky-400" />
                <span>Syllabus & Past Paper Coverage</span>
              </div>
              <p className="leading-relaxed">
                Includes all major descriptive proofs converted into interactive check questions: A* optimality conditions (Admissibility & Monotonicity), Romanian Map problem, Iterative Deepening Search memory bounds, Minimax with Alpha-Beta pruning, Decision Trees with Entropy & Information Gain, Support Vector Machines with Margins, Artificial Neural Network Backpropagation, Naive Bayes conditional independence, Expectation-Maximization (EM) algorithm, K-Means & Dendrograms, and full solved Association Rule Mining numericals (Momos/Pani Puri and Pizza/Burger database from Papers 6 & 9).
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TestsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
          <div className="text-sm">Loading AI Test Portal...</div>
        </div>
      }
    >
      <TestsPortalContent />
    </Suspense>
  );
}
