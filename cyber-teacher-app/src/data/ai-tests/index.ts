import { UnitTest, TestQuestion, TestResultReport } from './types';
import { unit1Questions } from './unit1-questions';
import { unit2Questions } from './unit2-questions';
import { unit3Questions } from './unit3-questions';
import { pyqSpecialQuestions } from './pyq-special-questions';

export * from './types';
export { unit1Questions } from './unit1-questions';
export { unit2Questions } from './unit2-questions';
export { unit3Questions } from './unit3-questions';
export { pyqSpecialQuestions } from './pyq-special-questions';

export const ALL_UNIT_TESTS: UnitTest[] = [
  {
    id: 'unit-1',
    title: 'Unit 1: Intelligent Agents & Problem Solving by Searching',
    subtitle: 'Agents, Environments, PEAS, Uninformed Search, A* & Adversarial Game Trees',
    unitNumber: 1,
    badge: 'SEM 5 • UNIT 1',
    description: 'Master the foundations of Artificial Intelligence: AI definitions, PEAS frameworks, Agent architectures (Reflex, Goal, Utility, Learning), Uninformed Search (BFS, DFS, UCS, IDS), Informed Heuristic Search (Greedy, A* admissibility & consistency), and Adversarial Minimax with Alpha-Beta Pruning.',
    estimatedMinutes: 35,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    borderGlow: 'rgba(34, 211, 238, 0.4)',
    iconName: 'Cpu',
    topicsCovered: [
      'Foundations & Definitions of AI',
      'Intelligent Agents & Percept Sequence',
      'PEAS Framework for Autonomous Systems',
      'Nature of Task Environments (7 Dimensions)',
      'Agent Architectures (Reflex, Model, Goal, Utility, Learning)',
      'Problem Formulation (8-Puzzle, Vacuum World, Romanian Map)',
      'Uninformed Search: BFS, DFS, UCS, IDS, Bidirectional',
      'Informed Search: Greedy Best-First & A* Optimality',
      'Game Playing: Minimax & Alpha-Beta Pruning'
    ],
    pyqCount: 22,
    questions: unit1Questions
  },
  {
    id: 'unit-2',
    title: 'Unit 2: Knowledge Representation, Logic & Supervised Machine Learning',
    subtitle: 'Logic, Semantic Networks, Frames, Fuzzy Systems, Decision Trees, Regression, SVM & Neural Networks',
    unitNumber: 2,
    badge: 'SEM 5 • UNIT 2',
    description: 'Thoroughly covers Knowledge Representation & Reasoning: Propositional Logic, Semantic Networks, Frame Representation, Deductive/Inductive/Abductive reasoning, Fuzzy Logic systems & Defuzzification. Extends into Supervised Learning: Decision Trees, Entropy, Linear & Logistic Regression, L1/L2 Regularization, Nonparametric Models, SVM & Kernels, Neural Networks & Backpropagation, and Ensemble Learning.',
    estimatedMinutes: 40,
    gradient: 'from-purple-500/20 via-pink-500/10 to-blue-500/20',
    borderGlow: 'rgba(168, 85, 247, 0.4)',
    iconName: 'Brain',
    topicsCovered: [
      'Types of Knowledge & Knowledge Representation',
      'Propositional Logic & Tautologies',
      'Semantic Networks & Frame Systems',
      'Deductive, Inductive & Abductive Reasoning',
      'Fuzzy Logic, Fuzzification & Defuzzification',
      'Decision Trees, Entropy & Information Gain',
      'Linear, Multiple & Logistic Regression',
      'Regularization: L1 LASSO vs L2 Ridge',
      'Support Vector Machines (SVM) & Kernel Trick',
      'Artificial Neural Networks & Backpropagation',
      'Ensemble Methods: AdaBoost, Bagging & Random Forest'
    ],
    pyqCount: 24,
    questions: unit2Questions
  },
  {
    id: 'unit-3',
    title: 'Unit 3: Probabilistic Models, Unsupervised Learning & Reinforcement Learning',
    subtitle: 'Bayes Theorem, Naive Bayes, EM, Clustering, Solved Association Rule Mining Numericals & Q-Learning',
    unitNumber: 3,
    badge: 'SEM 5 • UNIT 3',
    description: 'Comprehensive evaluation covering Probabilistic Models: Statistical Learning, Bayes Theorem, Naive Bayes with MAP, EM Algorithm, and HMMs. Explores Unsupervised Learning: K-Means & Hierarchical Clustering, Association Rule Mining with Support/Confidence/Lift solved numericals, and Reinforcement Learning: Passive RL, TD Learning, Active Q-Learning, and Policy Search.',
    estimatedMinutes: 40,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    borderGlow: 'rgba(16, 185, 129, 0.4)',
    iconName: 'Sparkles',
    topicsCovered: [
      'Hidden Markov Models (HMM) & Markov Property',
      'Bayes Theorem & Prior/Posterior Probabilities',
      'Maximum Likelihood Estimation & Ockham\'s Razor',
      'Naive Bayes Classifier & Conditional Independence',
      'Expectation-Maximization (EM) Algorithm',
      'K-Means & Hierarchical Clustering (Dendrograms)',
      'Association Rule Mining: Support, Confidence, Lift',
      'Solved Numericals (Momos/Pani Puri & Pizza/Burger Datasets)',
      'Passive vs Active Reinforcement Learning',
      'Q-Learning & Bellman Optimality Equations',
      'Exploration vs Exploitation Tradeoff & Policy Search'
    ],
    pyqCount: 25,
    questions: unit3Questions
  },
  {
    id: 'pyq-special',
    title: 'Semester 5 University PYQ Mega Bank (Papers 1 - 9)',
    subtitle: 'Curated compilation of past Mumbai University exam questions & exact paper numericals',
    badge: 'SEM 5 • PAST PAPERS 1-9',
    description: 'A focused, high-yield drill consisting exclusively of verified past paper questions, MCQs, fill-in-the-blanks, and step-by-step numerical problems cited directly from University examination papers 1 through 9.',
    estimatedMinutes: 25,
    gradient: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    borderGlow: 'rgba(245, 158, 11, 0.4)',
    iconName: 'Shield',
    topicsCovered: [
      'Direct Past Exam MCQs with Paper Citations',
      'Repeated Fill-in-the-Blanks & Terminology Checks',
      'A* Romanian Map Step Calculations',
      'Association Rule Mining Solved Exam Numericals',
      'Decision Tree Splitting & Neural Backpropagation Checks',
      'HMM Matrices & Reinforcement Learning Properties'
    ],
    pyqCount: 20,
    questions: pyqSpecialQuestions
  },
  {
    id: 'full-mock',
    title: 'Semester 5 Full Syllabus Grand Mock Exam',
    subtitle: '45-Question comprehensive timed examination simulating real college semester tests',
    badge: 'SEM 5 • FULL SEMESTER EXAM',
    description: 'The ultimate test of Artificial Intelligence mastery. Combines randomized questions across all 3 units with real-time countdown timer, comprehensive scorecard, topic-wise strength analysis, and review mode.',
    estimatedMinutes: 45,
    gradient: 'from-rose-500/20 via-purple-500/10 to-cyan-500/20',
    borderGlow: 'rgba(244, 63, 94, 0.4)',
    iconName: 'Layers',
    topicsCovered: [
      'Comprehensive Coverage of Unit 1, Unit 2 & Unit 3',
      'Real University Exam Weighted Distribution',
      'Timer Countdown & Review Navigation Palette',
      'Topic-by-Topic Performance Analytics',
      'Shareable Results & Performance Badges'
    ],
    pyqCount: 45,
    questions: [
      ...unit1Questions.slice(0, 15),
      ...unit2Questions.slice(0, 15),
      ...unit3Questions.slice(0, 15)
    ]
  }
];

export function getAllTests(): UnitTest[] {
  return ALL_UNIT_TESTS;
}

export function getTestById(id: string): UnitTest | undefined {
  return ALL_UNIT_TESTS.find(t => t.id === id);
}

export function calculateGrade(percentage: number): {
  title: string;
  description: string;
  color: string;
  badge: string;
} {
  if (percentage >= 90) {
    return {
      title: 'Distinction (Outstanding)',
      description: 'Exceptional mastery across all units, algorithms, and numericals! Ready to top the university exam.',
      color: '#10B981',
      badge: 'O Grade (Outstanding)'
    };
  } else if (percentage >= 75) {
    return {
      title: 'First Class with Distinction',
      description: 'Strong conceptual grasp across search, logic, machine learning, and probabilistic models.',
      color: '#0284c7',
      badge: 'A+ Grade (Excellent)'
    };
  } else if (percentage >= 60) {
    return {
      title: 'First Class',
      description: 'Good foundational understanding. Review missed topics and numericals to boost your score.',
      color: '#2563eb',
      badge: 'A Grade (Very Good)'
    };
  } else if (percentage >= 50) {
    return {
      title: 'Second Class (Pass)',
      description: 'Cleared the test. We recommend reviewing Unit 2 & 3 numericals and algorithm optimality proofs.',
      color: '#d97706',
      badge: 'B Grade (Good)'
    };
  } else {
    return {
      title: 'Needs Revision',
      description: 'Several key concepts were missed. Practice using Practice Mode with instant explanations.',
      color: '#dc2626',
      badge: 'Re-attempt Recommended'
    };
  }
}
