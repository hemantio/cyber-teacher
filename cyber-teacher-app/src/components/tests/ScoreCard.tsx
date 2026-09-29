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
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-slate-700 bg-slate-900 p-6 md:p-8 shadow-sm">
      {/* Header Result */}
      <div className="text-center pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 mb-3">
          <Award size={13} className="text-amber-400" />
          <span>{report.grade.badge}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white">
          {report.testTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Completed in {formatTime(report.timeSpentSeconds)} • Mode: <span className="capitalize text-slate-300">{report.mode}</span>
        </p>

        {/* Big Score Box */}
        <div className="my-6 p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 max-w-sm mx-auto">
          <div className="text-4xl md:text-5xl font-extrabold text-white">
            {report.score} <span className="text-xl text-slate-400 font-normal">/ {report.totalQuestions}</span>
          </div>
          <div className="mt-1 text-sm font-semibold text-sky-400">
            {report.percentage}% Score
          </div>
          <div className="mt-3 text-xs text-slate-300 border-t border-slate-700/80 pt-3">
            {report.grade.title} — {report.grade.description}
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
          <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700">
            <span className="text-xs text-slate-400 block">Correct</span>
            <span className="text-base font-bold text-emerald-400">{report.correctCount}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700">
            <span className="text-xs text-slate-400 block">Incorrect</span>
            <span className="text-base font-bold text-rose-400">{report.totalQuestions - report.correctCount}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700">
            <span className="text-xs text-slate-400 block">Time</span>
            <span className="text-base font-bold text-slate-200">{formatTime(report.timeSpentSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="py-6 border-b border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
          <TrendingUp size={15} className="text-sky-400" />
          Topic-wise Performance Breakdown
        </h3>

        <div className="space-y-2.5">
          {report.topicBreakdown.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-300">{item.topic}</span>
                <span className="font-mono text-slate-400">
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

      {/* Footer Buttons */}
      <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
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

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <RotateCcw size={13} />
            Retake
          </button>

          <button
            onClick={onReview}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
          >
            <Eye size={13} />
            Review Answers
          </button>

          <button
            onClick={onBackToPortal}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            All Tests
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
