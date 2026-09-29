export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionCategory = 'mcq' | 'numerical' | 'concept' | 'peas-analysis';

export interface TestQuestion {
  id: string;
  unit: 1 | 2 | 3;
  topic: string;
  subtopic?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  appearedIn?: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
  formula?: string;
  hint?: string;
  diagram?: string;
}

export interface UnitTest {
  id: string;
  title: string;
  subtitle: string;
  unitNumber?: number;
  badge: string;
  description: string;
  estimatedMinutes: number;
  gradient: string;
  borderGlow: string;
  iconName: 'Shield' | 'Cpu' | 'Brain' | 'Sparkles' | 'Layers' | 'Zap';
  topicsCovered: string[];
  pyqCount: number;
  questions: TestQuestion[];
}

export interface UserResponse {
  selectedOption: number | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
}

export interface TestResultReport {
  testId: string;
  testTitle: string;
  unitNumber?: number;
  mode: 'exam' | 'practice';
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  topicBreakdown: {
    topic: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
  grade: {
    title: string;
    description: string;
    color: string;
    badge: string;
  };
  timestamp: string;
}
