import React from 'react';
import { TestQuestion } from '@/data/ai-tests/types';
import { QuestionDiagram } from './QuestionDiagram';
import { CheckCircle, XCircle, Bookmark, BookOpen, Calculator, Award } from 'lucide-react';

interface QuestionCardProps {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  mode: 'practice' | 'exam';
  isMarkedForReview: boolean;
  onToggleMarkReview: () => void;
  showExplanation?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  mode,
  isMarkedForReview,
  onToggleMarkReview,
  showExplanation = false,
}: QuestionCardProps) {
  const isAnswered = selectedOption !== null;
  const isPractice = mode === 'practice';
  const isCorrect = isAnswered && selectedOption === question.correctIndex;

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full rounded-xl border border-slate-700 bg-slate-900/90 p-3.5 sm:p-5 md:p-6 shadow-sm transition-colors">
      {/* Top Header Information */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-3.5 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
          <span className="font-bold text-slate-200 bg-slate-800 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-700">
            Q {questionNumber} of {totalQuestions}
          </span>
          <span className="text-slate-400 bg-slate-800/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-800 font-medium">
            {question.topic}
          </span>
          <span className="text-slate-400 capitalize hidden xs:inline">
            • {question.difficulty}
          </span>
          {question.category === 'numerical' && (
            <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/60 font-medium text-[10px] sm:text-[11px]">
              <Calculator size={11} />
              Numerical
            </span>
          )}
        </div>

        {/* Mark for Review (in Exam Mode) */}
        {mode === 'exam' && (
          <button
            onClick={onToggleMarkReview}
            className={`inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-md text-[11px] sm:text-xs font-medium border transition-colors active:scale-95 ${
              isMarkedForReview
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700'
            }`}
          >
            <Bookmark size={12} className={isMarkedForReview ? 'fill-amber-400 text-amber-400' : ''} />
            <span>{isMarkedForReview ? 'Marked' : 'Mark Review'}</span>
          </button>
        )}
      </div>

      {/* University Exam Citation */}
      {question.appearedIn && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] sm:text-xs font-normal">
          <Award size={13} className="text-amber-400 shrink-0" />
          <span>Mumbai University: <strong className="text-slate-200 font-medium">{question.appearedIn}</strong></span>
        </div>
      )}

      {/* Question Text */}
      <div className="mt-3 mb-4 sm:mb-5">
        <p className="text-sm sm:text-base md:text-lg text-slate-100 font-normal leading-relaxed whitespace-pre-line">
          {question.question}
        </p>

        {/* Formula Display if relevant */}
        {question.formula && (
          <div className="mt-2.5 inline-block px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700 text-[11px] sm:text-xs font-mono text-sky-300">
            Formula: {question.formula}
          </div>
        )}
      </div>

      {/* Diagram / Visual Figure (if applicable) */}
      {question.diagram && (
        <div className="my-3.5">
          <QuestionDiagram diagramType={question.diagram} />
        </div>
      )}

      {/* Multiple Choice Options - Touch-Friendly (min-h 48px) */}
      <div className="space-y-2 sm:space-y-2.5 mt-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctIndex;

          let btnClass = 'border-slate-700/80 bg-slate-800/40 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
          let letterClass = 'bg-slate-800 text-slate-300 border-slate-600';

          if (isPractice && isAnswered) {
            if (isThisCorrect) {
              btnClass = 'border-emerald-600 bg-emerald-950/30 text-emerald-200';
              letterClass = 'bg-emerald-600 text-white border-emerald-500';
            } else if (isSelected) {
              btnClass = 'border-rose-600 bg-rose-950/30 text-rose-200';
              letterClass = 'bg-rose-600 text-white border-rose-500';
            } else {
              btnClass = 'border-slate-850 bg-slate-900/30 text-slate-500';
              letterClass = 'bg-slate-800/50 text-slate-500 border-slate-800';
            }
          } else if (isSelected) {
            btnClass = 'border-sky-500 bg-sky-950/40 text-white font-medium ring-1 ring-sky-500/50';
            letterClass = 'bg-sky-600 text-white border-sky-400';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              disabled={isPractice && isAnswered}
              className={`w-full text-left p-3 sm:p-3.5 min-h-[48px] rounded-xl border flex items-center justify-between gap-2.5 text-xs sm:text-sm transition-all touch-manipulation ${btnClass} ${
                isPractice && isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 ${letterClass}`}
                >
                  {optionLetters[idx]}
                </span>
                <span className="leading-snug break-words">{option}</span>
              </div>

              {isPractice && isAnswered && (
                <div className="shrink-0 ml-1">
                  {isThisCorrect && <CheckCircle size={18} className="text-emerald-400" />}
                  {isSelected && !isThisCorrect && <XCircle size={18} className="text-rose-400" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Practice Mode Explanation Box */}
      {isPractice && isAnswered && (
        <div className="mt-4 pt-3.5 border-t border-slate-800">
          <div
            className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm ${
              isCorrect
                ? 'bg-emerald-950/20 border-emerald-800/80 text-slate-200'
                : 'bg-slate-800/60 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5 font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-slate-300">
              <BookOpen size={13} className={isCorrect ? 'text-emerald-400' : 'text-sky-400'} />
              <span>{isCorrect ? 'Correct Explanation' : 'Solution & Explanation'}</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {question.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Post-Exam Review Explanation */}
      {showExplanation && mode === 'exam' && (
        <div className="mt-4 pt-3.5 border-t border-slate-800">
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm">
            <div className="flex items-center justify-between mb-1.5 font-semibold">
              <span className="text-sky-300 flex items-center gap-1.5">
                <BookOpen size={13} />
                Detailed Solution:
              </span>
              <span className="text-xs text-emerald-400">
                Correct: Option {optionLetters[question.correctIndex]}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
