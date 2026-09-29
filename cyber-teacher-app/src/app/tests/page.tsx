'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { ALL_UNIT_TESTS, UnitTest, getTestById } from '@/data/ai-tests';
import { TestRunner } from '@/components/tests/TestRunner';
import {
  Clock,
  Award,
  Share2,
  Check,
  FileText
} from 'lucide-react';

export default function TestsPage() {
  const [activeTest, setActiveTest] = useState<UnitTest | null>(null);
  const [activeMode, setActiveMode] = useState<'practice' | 'exam'>('practice');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync test state from URL parameters on client mount & browser back/forward
  useEffect(() => {
    const parseUrlParams = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const unitParam = params.get('unit');
      const modeParam = params.get('mode') as 'practice' | 'exam' | null;

      if (unitParam) {
        const found = getTestById(unitParam);
        if (found) {
          setActiveTest(found);
          if (modeParam === 'exam' || modeParam === 'practice') {
            setActiveMode(modeParam);
          }
          return;
        }
      }
      setActiveTest(null);
    };

    parseUrlParams();
    window.addEventListener('popstate', parseUrlParams);
    return () => window.removeEventListener('popstate', parseUrlParams);
  }, []);

  const handleStartTest = (test: UnitTest, mode: 'practice' | 'exam') => {
    setActiveTest(test);
    setActiveMode(mode);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/tests?unit=${test.id}&mode=${mode}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPortal = () => {
    setActiveTest(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/tests');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      <Navigation />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 md:py-10">
        {activeTest ? (
          <TestRunner
            test={activeTest}
            initialMode={activeMode}
            onBackToPortal={handleBackToPortal}
          />
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Header: Semester 5 Exam & Test Series */}
            <div className="border-b border-slate-800 pb-4 sm:pb-5 space-y-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-sky-400">
                <span>Mumbai University</span>
                <span>•</span>
                <span>TYCS</span>
                <span>•</span>
                <span className="text-white bg-sky-950 px-2 py-0.5 rounded border border-sky-800 text-[10px] sm:text-xs font-medium">
                  Semester 5
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Semester 5 Exam &amp; Test Series
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Curated unit-wise practice tests, past question papers (Papers 1–9), and timed exam simulations for Artificial Intelligence.
              </p>

              {/* Mobile-Friendly Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2">
                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold text-white">116 Qs</div>
                  <div className="text-[11px] text-slate-400">Curated Bank</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold text-white">Units 1, 2, 3</div>
                  <div className="text-[11px] text-slate-400">Full Syllabus</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold text-white">Papers 1–9</div>
                  <div className="text-[11px] text-slate-400">Past Papers</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold text-white">Step-by-Step</div>
                  <div className="text-[11px] text-slate-400">Solved Numericals</div>
                </div>
              </div>
            </div>

            {/* Share Link Banner */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Share2 size={15} className="text-sky-400 shrink-0" />
                <span className="text-slate-300 text-xs sm:text-sm leading-snug">
                  Share tests with classmates — anyone can take the test with zero login required.
                </span>
              </div>
              <button
                onClick={() => handleCopyLink('all')}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 h-10 sm:h-8 px-3.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
              >
                {copiedId === 'all' ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Copy Test Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Available Tests List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Semester 5 Tests
                </h2>
                <span className="text-[11px] sm:text-xs text-slate-400">
                  Practice mode or Timed Exam
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {ALL_UNIT_TESTS.map((test) => (
                  <div
                    key={test.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-colors space-y-3.5"
                  >
                    <div className="space-y-2.5">
                      {/* Unit Tag & Time */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 text-[11px] sm:text-xs">
                          {test.badge}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 text-[11px] sm:text-xs">
                          <Clock size={12} />
                          {test.estimatedMinutes} mins
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                          {test.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {test.description}
                        </p>
                      </div>

                      {/* Key Topics List */}
                      <div className="pt-0.5">
                        <div className="flex flex-wrap gap-1">
                          {test.topicsCovered.slice(0, 3).map((topic, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
                            >
                              {topic}
                            </span>
                          ))}
                          {test.topicsCovered.length > 3 && (
                            <span className="px-1 py-0.5 rounded text-[10px] text-slate-500">
                              +{test.topicsCovered.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer - Touch-Friendly Buttons */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1">
                          <Award size={13} className="text-amber-400" />
                          {test.questions.length} Qs ({test.pyqCount} PYQs)
                        </span>

                        <button
                          onClick={() => handleCopyLink(test.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors active:scale-95"
                          title="Copy link to this test"
                        >
                          {copiedId === test.id ? (
                            <Check size={14} className="text-emerald-400" />
                          ) : (
                            <Share2 size={14} />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
                        <button
                          onClick={() => handleStartTest(test, 'practice')}
                          className="h-11 sm:h-8 px-3.5 rounded-lg text-xs sm:text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all text-center flex items-center justify-center"
                        >
                          Practice
                        </button>

                        <button
                          onClick={() => handleStartTest(test, 'exam')}
                          className="h-11 sm:h-8 px-4 rounded-lg text-xs sm:text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white active:scale-95 transition-all text-center flex items-center justify-center shadow-sm"
                        >
                          Take Exam
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Coverage Footer */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5 sm:p-4 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5 text-xs">
                <FileText size={13} className="text-sky-400" />
                <span>Semester 5 Syllabus &amp; Past Paper Coverage</span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                Includes all major descriptive proofs converted into interactive check questions: A* optimality conditions, Romanian Map problem, Iterative Deepening Search memory bounds, Minimax with Alpha-Beta pruning, Decision Trees, SVM Margins, Backpropagation, Naive Bayes, EM algorithm, K-Means, and solved Association Rule Mining numericals from Papers 6 &amp; 9.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
