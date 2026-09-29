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
  Bookmark
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
    }
  }, [currentIndex, totalQuestions, playClick]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      playClick();
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
  const handleSubmitTest = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);

    let correct = 0;
    questions.forEach(q => {
      if (responses[q.id] === q.correctIndex) correct++;
    });

    const pct = Math.round((correct / totalQuestions) * 100);
    if (pct >= 60) playVictory();
    else playDefeat();
  };

  const handleRetake = () => {
    setResponses({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimeRemainingSeconds(test.estimatedMinutes * 60);
    setElapsedSeconds(0);
    setIsSubmitted(false);
    setIsReviewing(false);
    playClick();
  };

  const handleShareLink = () => {
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/tests?unit=${test.id}&mode=${mode}`
      : `https://cyber-teacher-app.vercel.app/tests?unit=${test.id}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Compile report
  const resultReport: TestResultReport = useMemo(() => {
    let correctCount = 0;
    const topicMap: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const isCorrect = responses[q.id] === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!topicMap[q.topic]) {
        topicMap[q.topic] = { total: 0, correct: 0 };
      }
      topicMap[q.topic].total += 1;
      if (isCorrect) topicMap[q.topic].correct += 1;
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
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
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
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Top Test Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 md:p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <button
            onClick={isReviewing ? () => setIsReviewing(false) : onBackToPortal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>{isReviewing ? 'Scorecard' : 'Exit'}</span>
          </button>

          <div>
            <h2 className="text-sm font-semibold text-slate-200 truncate max-w-xs md:max-w-md">
              {test.title}
            </h2>
            <span className="text-[11px] text-slate-400">
              {test.pyqCount} University PYQs Included
            </span>
          </div>
        </div>

        {/* Mode Selector & Timer */}
        <div className="flex items-center gap-2">
          {!isSubmitted && (
            <div className="flex items-center p-0.5 rounded-lg bg-slate-800 text-xs font-medium">
              <button
                onClick={() => { setMode('practice'); playClick(); }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mode === 'practice'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Practice
              </button>
              <button
                onClick={() => { setMode('exam'); playClick(); }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mode === 'exam'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Exam
              </button>
            </div>
          )}

          {/* Timer */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
              mode === 'exam' && timeRemainingSeconds < 120
                ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <Clock size={13} className="text-slate-400" />
            <span>{mode === 'exam' ? formatTimer(timeRemainingSeconds) : formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Question Grid Button */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showPalette ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Question Grid"
          >
            <Grid size={15} />
          </button>

          {/* Copy Link */}
          <button
            onClick={handleShareLink}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Share test link"
          >
            {copiedLink ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} of {totalQuestions} answered</span>
        </div>
        <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-200"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Palette Drawer */}
      {showPalette && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Question Palette</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-600" /> Answered</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Review</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700" /> Unanswered</span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1.5">
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
                  onClick={() => { setCurrentIndex(idx); playClick(); }}
                  className={`h-8 rounded text-xs border flex items-center justify-center transition-colors ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Question Card */}
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

      {/* Footer Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-medium border transition-colors ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/40'
              : 'border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <ArrowLeft size={14} />
          Previous
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
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Clear Response
          </button>
        )}

        <div className="flex items-center gap-2">
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs md:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              Next
              <ArrowRight size={14} />
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
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs md:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <CheckCircle2 size={14} />
              {isSubmitted ? 'View Scorecard' : 'Submit Test'}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm p-5 rounded-xl bg-slate-900 border border-slate-700 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <AlertCircle size={18} />
              <span>Unanswered Questions</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You answered {answeredCount} of {totalQuestions} questions. Are you sure you want to finish and submit?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
