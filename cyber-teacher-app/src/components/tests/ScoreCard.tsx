import React, { useState } from 'react';
import { TestResultReport } from '@/data/ai-tests/types';
import {
  RotateCcw,
  Eye,
  Share2,
  Check,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface ScoreCardProps {
  report: TestResultReport;
  onRetake: () => void;
  onReview: () => void;
  onBackToPortal: () => void;
}

export function ScoreCard({
  report,
  onRetake,
  onReview,
  onBackToPortal,
}: ScoreCardProps) {
  const [copied, setCopied] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleShare = () => {
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/tests?unit=${report.testId}`
      : 'https://cyber-teacher-app.vercel.app/tests';

    const shareText = `🎓 AI Exam Result: ${report.testTitle}\nScore: ${report.score}/${report.totalQuestions} (${report.percentage}%)\nResult: ${report.grade.title}\nTime: ${formatTime(report.timeSpentSeconds)}\n\nTake the test here: ${shareUrl}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6 md:p-8 shadow-sm space-y-5">
      {/* Header Result */}
      <div className="text-center pb-5 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 mb-2.5">
          <Award size={13} className="text-amber-400" />
          <span>{report.grade.badge}</span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          {report.testTitle}
        </h2>
        <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
          Completed in {formatTime(report.timeSpentSeconds)} • Mode: <span className="capitalize text-slate-300 font-medium">{report.mode}</span>
        </p>

        {/* Big Score Box */}
        <div className="my-5 p-4 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 max-w-xs mx-auto">
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {report.score} <span className="text-lg sm:text-xl text-slate-400 font-normal">/ {report.totalQuestions}</span>
          </div>
          <div className="mt-1 text-sm font-semibold text-sky-400">
            {report.percentage}% Score
          </div>
          <div className="mt-2.5 text-xs text-slate-300 border-t border-slate-700/80 pt-2.5">
            {report.grade.title} — {report.grade.description}
          </div>
        </div>

        {/* Quick Numbers (3-col mobile grid) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-sm mx-auto text-center">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/80">
            <span className="text-[10px] sm:text-xs text-slate-400 block">Correct</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">{report.correctCount}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/80">
            <span className="text-[10px] sm:text-xs text-slate-400 block">Incorrect</span>
            <span className="text-sm sm:text-base font-bold text-rose-400">{report.totalQuestions - report.correctCount}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/80">
            <span className="text-[10px] sm:text-xs text-slate-400 block">Time</span>
            <span className="text-sm sm:text-base font-bold text-slate-200">{formatTime(report.timeSpentSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="py-2 border-b border-slate-800">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-sky-400" />
          Topic-wise Performance Breakdown
        </h3>

        <div className="space-y-2">
          {report.topicBreakdown.map((item, idx) => (
            <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-300 text-[11px] sm:text-xs">{item.topic}</span>
                <span className="font-mono text-slate-400 text-[11px] sm:text-xs">
                  {item.correct} / {item.total} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.percentage >= 70
                      ? 'bg-emerald-500'
                      : item.percentage >= 50
                      ? 'bg-sky-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons - Touch-Friendly (h-11 on mobile) */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <button
          onClick={handleShare}
          className="h-11 sm:h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-300">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              <span>Share Result</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          <button
            onClick={onRetake}
            className="h-11 sm:h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
          >
            <RotateCcw size={13} />
            <span>Retake</span>
          </button>

          <button
            onClick={onReview}
            className="h-11 sm:h-9 inline-flex items-center justify-center gap-1.5 px-4 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white active:scale-95 transition-all shadow-sm"
          >
            <Eye size={13} />
            <span>Review Answers</span>
          </button>
        </div>

        <button
          onClick={onBackToPortal}
          className="h-10 sm:h-9 inline-flex items-center justify-center gap-1 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <span>All Tests</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
