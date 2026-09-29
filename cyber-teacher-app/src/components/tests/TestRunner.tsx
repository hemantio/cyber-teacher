import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UnitTest, TestQuestion, TestResultReport } from '@/data/ai-tests/types';
import { calculateGrade } from '@/data/ai-tests';
import { QuestionCard } from './QuestionCard';
import { ScoreCard } from './ScoreCard';
import { useSound } from '@/hooks/use-sound';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Share2,
  Check,
  Grid,
  X
} from 'lucide-react';

interface TestRunnerProps {
  test: UnitTest;
  initialMode?: 'practice' | 'exam';
  onBackToPortal: () => void;
}

export function TestRunner({
  test,
  initialMode = 'practice',
  onBackToPortal,
}: TestRunnerProps) {
  const [mode, setMode] = useState<'practice' | 'exam'>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(test.estimatedMinutes * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { playClick, playSuccess, playError, playVictory, playDefeat } = useSound();

  const questions = test.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const answeredCount = useMemo(() => {
    return Object.values(responses).filter(v => v !== null && v !== undefined).length;
  }, [responses]);

  // Exam Countdown Timer & Elapsed Counter
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);

      if (mode === 'exam') {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, isSubmitted]);

  // Option selection
  const handleSelectOption = useCallback((optionIdx: number) => {
    if (isSubmitted && !isReviewing) return;

    const qId = currentQuestion.id;
    const isCorrect = optionIdx === currentQuestion.correctIndex;

    setResponses(prev => ({
      ...prev,
      [qId]: optionIdx,
    }));

    if (mode === 'practice') {
      if (isCorrect) playSuccess();
      else playError();
    } else {
      playClick();
    }
  }, [currentQuestion, mode, isSubmitted, isReviewing, playSuccess, playError, playClick]);

  // Mark for review
  const handleToggleMarkReview = useCallback(() => {
    const qId = currentQuestion.id;
    setMarkedForReview(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
    playClick();
  }, [currentQuestion, playClick]);

  // Navigation
  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, totalQuestions, playClick]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, playClick]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showConfirmModal || isSubmitted) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        handleSelectOption(parseInt(e.key) - 1);
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const mapping: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        handleSelectOption(mapping[e.key.toLowerCase()]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key.toLowerCase() === 'm' && mode === 'exam') {
        handleToggleMarkReview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectOption, handleNext, handlePrev, handleToggleMarkReview, showConfirmModal, isSubmitted, mode]);

  // Submit test
  const handleSubmitTest = useCallback(() => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
    setIsReviewing(false);

    let correctCount = 0;
    questions.forEach(q => {
      if (responses[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / totalQuestions) * 100);
    if (pct >= 60) {
      playVictory();
    } else {
      playDefeat();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, responses, totalQuestions, playVictory, playDefeat]);

  // Retake test
  const handleRetake = () => {
    setResponses({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimeRemainingSeconds(test.estimatedMinutes * 60);
    setElapsedSeconds(0);
    setIsSubmitted(false);
    setIsReviewing(false);
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share link
  const handleShareLink = () => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/tests?unit=${test.id}&mode=${mode}`
      : `https://cyber-teacher-app.vercel.app/tests?unit=${test.id}&mode=${mode}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Compute final report
  const resultReport: TestResultReport = useMemo(() => {
    let correctCount = 0;
    const topicMap: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const topic = q.topic || 'General AI';
      if (!topicMap[topic]) {
        topicMap[topic] = { total: 0, correct: 0 };
      }
      topicMap[topic].total += 1;

      if (responses[q.id] === q.correctIndex) {
        correctCount++;
        topicMap[topic].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const grade = calculateGrade(percentage);

    const topicBreakdown = Object.entries(topicMap).map(([topic, stats]) => ({
      topic,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100),
    }));

    return {
      testId: test.id,
      testTitle: test.title,
      unitNumber: test.unitNumber,
      mode,
      totalQuestions,
      answeredCount,
      correctCount,
      score: correctCount,
      percentage,
      timeSpentSeconds: elapsedSeconds,
      topicBreakdown,
      grade,
      timestamp: new Date().toISOString(),
    };
  }, [test, questions, responses, totalQuestions, answeredCount, elapsedSeconds, mode]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isSubmitted && !isReviewing) {
    return (
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <ScoreCard
          report={resultReport}
          onRetake={handleRetake}
          onReview={() => setIsReviewing(true)}
          onBackToPortal={onBackToPortal}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5 sm:space-y-5">
      {/* Top Test Navigation Bar - Mobile Responsive 2-Row Stack */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 sm:p-4 space-y-2.5">
        {/* Row 1: Exit + Title + Share */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={isReviewing ? () => setIsReviewing(false) : onBackToPortal}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors shrink-0 active:scale-95"
            >
              <ArrowLeft size={13} />
              <span>{isReviewing ? 'Score' : 'Exit'}</span>
            </button>

            <h2 className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
              {test.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShareLink}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors active:scale-95"
              title="Share test link"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* Row 2: Mode Switcher + Timer + Palette Button */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          {!isSubmitted && (
            <div className="flex items-center p-0.5 rounded-lg bg-slate-800 text-xs">
              <button
                onClick={() => { setMode('practice'); playClick(); }}
                className={`h-7 px-2.5 rounded-md text-[11px] sm:text-xs transition-colors ${
                  mode === 'practice'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Practice
              </button>
              <button
                onClick={() => { setMode('exam'); playClick(); }}
                className={`h-7 px-2.5 rounded-md text-[11px] sm:text-xs transition-colors ${
                  mode === 'exam'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Exam
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Timer Display */}
            <div
              className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border text-xs font-mono font-medium ${
                mode === 'exam' && timeRemainingSeconds < 120
                  ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Clock size={12} className="text-slate-400 shrink-0" />
              <span>{mode === 'exam' ? formatTimer(timeRemainingSeconds) : formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Question Palette Toggle */}
            <button
              onClick={() => setShowPalette(!showPalette)}
              className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border text-xs transition-colors active:scale-95 ${
                showPalette
                  ? 'bg-sky-600 text-white border-sky-500 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Question Palette"
            >
              <Grid size={13} />
              <span>Palette</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="space-y-1 px-0.5">
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} / {totalQuestions} answered</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-200"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Palette Drawer - Mobile Grid */}
      {showPalette && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Question Palette</span>
            <button
              onClick={() => setShowPalette(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-xs text-slate-400 pb-1 border-b border-slate-800">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-sky-600" /> Answered</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Marked</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" /> Unanswered</span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1.5 max-h-60 overflow-y-auto p-0.5">
            {questions.map((q, idx) => {
              const isAns = responses[q.id] !== undefined && responses[q.id] !== null;
              const isMark = markedForReview[q.id];
              const isCur = idx === currentIndex;

              let btnClass = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isCur) {
                btnClass = 'ring-2 ring-sky-400 text-white bg-slate-700 font-bold';
              } else if (isMark) {
                btnClass = 'bg-amber-600 text-white border-amber-500 font-semibold';
              } else if (isAns) {
                btnClass = 'bg-sky-600 text-white border-sky-500 font-semibold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    playClick();
                    setShowPalette(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`h-9 rounded-lg text-xs border flex items-center justify-center transition-colors active:scale-95 touch-manipulation ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedOption={responses[currentQuestion.id] ?? null}
        onSelectOption={handleSelectOption}
        mode={mode}
        isMarkedForReview={Boolean(markedForReview[currentQuestion.id])}
        onToggleMarkReview={handleToggleMarkReview}
        showExplanation={isReviewing}
      />

      {/* Thumb-Friendly Bottom Navigation Bar */}
      <div className="flex items-center justify-between gap-2.5 pt-2 pb-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`h-11 sm:h-10 inline-flex items-center gap-1.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-95 touch-manipulation ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/40'
              : 'border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <ArrowLeft size={15} />
          <span>Previous</span>
        </button>

        {mode === 'exam' && !isSubmitted && responses[currentQuestion.id] !== undefined && (
          <button
            onClick={() => {
              setResponses(prev => {
                const next = { ...prev };
                delete next[currentQuestion.id];
                return next;
              });
              playClick();
            }}
            className="text-xs text-slate-400 hover:text-slate-200 underline px-2 py-1"
          >
            Clear
          </button>
        )}

        <div className="flex items-center gap-2">
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="h-11 sm:h-10 inline-flex items-center gap-1.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all active:scale-95 touch-manipulation shadow-sm"
            >
              <span>Next</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => {
                if (answeredCount < totalQuestions && mode === 'exam') {
                  setShowConfirmModal(true);
                } else {
                  handleSubmitTest();
                }
              }}
              className="h-11 sm:h-10 inline-flex items-center gap-1.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-95 touch-manipulation shadow-sm"
            >
              <CheckCircle2 size={15} />
              <span>{isSubmitted ? 'View Scorecard' : 'Submit Test'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Unanswered Questions */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-400">
              <AlertCircle size={22} className="shrink-0" />
              <h3 className="text-base font-bold text-white">Unanswered Questions</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You answered <strong>{answeredCount}</strong> of <strong>{totalQuestions}</strong> questions.
              {totalQuestions - answeredCount} questions remain unattempted.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="h-10 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95"
              >
                Keep Answering
              </button>
              <button
                onClick={handleSubmitTest}
                className="h-10 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
