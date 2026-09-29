import { TestQuestion } from './types';

export const pyqSpecialQuestions: TestQuestion[] = [
  {
    "id": "pyq-sp-01",
    "unit": 1,
    "topic": "Search Algorithms",
    "subtopic": "Search Evaluation Parameters",
    "question": "Which of the following is a criterion used to evaluate search algorithm performance according to university exam papers?",
    "options": [
      "Completeness, Time Complexity, Space Complexity, and Optimality",
      "Accuracy, Precision, Recall, and F1-Score",
      "Throughput, Latency, Bandwidth, and Jitter",
      "Maintainability, Portability, Testability, and Reusability"
    ],
    "correctIndex": 0,
    "explanation": "Standard 4 evaluation metrics for search algorithms: Completeness (finds a solution?), Time Complexity (time taken), Space Complexity (memory required), and Optimality (finds least-cost path?).",
    "appearedIn": "Paper 1 (Q.I.c.ii), Paper 6 (Q.I.C.5)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-02",
    "unit": 1,
    "topic": "Agent Architectures",
    "subtopic": "Condition-Action Rule",
    "question": "The Simple Reflex Agent function is based on which rule format?",
    "options": [
      "condition-action rule",
      "action-utility rule",
      "goal-satisfaction rule",
      "perceptron activation rule"
    ],
    "correctIndex": 0,
    "explanation": "Simple Reflex Agents use Condition-Action rules (IF condition THEN action) to map current percepts directly to actions.",
    "appearedIn": "Paper 6 (Q.I.A.6)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "pyq-sp-03",
    "unit": 1,
    "topic": "Search Algorithms",
    "subtopic": "BFS Frontier Data Structure",
    "question": "In Breadth-First Search (BFS), the frontier is implemented as a ________ data structure.",
    "options": [
      "FIFO (First-In-First-Out) Queue",
      "LIFO (Last-In-First-Out) Stack",
      "Min-Heap Priority Queue",
      "Binary Search Tree"
    ],
    "correctIndex": 0,
    "explanation": "BFS uses a FIFO queue so that shallower nodes are always popped and expanded before deeper nodes.",
    "appearedIn": "Paper 7 (Q.I.B.2), Paper 8 (Q.I.B.b)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-04",
    "unit": 2,
    "topic": "Supervised Learning",
    "subtopic": "Python Linear Regression Function",
    "question": "The function/class used for performing Linear Regression in Python's scikit-learn is:",
    "options": [
      "LinearRegression() from sklearn.linear_model",
      "linear_reg() from scipy",
      "Regress() from numpy",
      "LinReg() from stats"
    ],
    "correctIndex": 0,
    "explanation": "In Python, linear regression is performed using LinearRegression() imported from sklearn.linear_model.",
    "appearedIn": "Paper 2 (Q.1.B.2), Paper 3 (Q.I.B.b)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-05",
    "unit": 2,
    "topic": "Supervised Learning",
    "subtopic": "Multiple Linear Regression",
    "question": "When there are more than one independent input variables in a linear regression model, the model is termed as:",
    "options": [
      "Simple Linear Regression",
      "Multiple Linear Regression",
      "Logistic Regression",
      "Multi-Class Perceptron"
    ],
    "correctIndex": 1,
    "explanation": "Multiple Linear Regression incorporates two or more explanatory predictors to model the outcome variable y.",
    "appearedIn": "Paper 2 (Q.1.B.3), Paper 3 (Q.I.B.c)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-06",
    "unit": 2,
    "topic": "Neural Networks",
    "subtopic": "Weight Adjustment",
    "question": "The process of adjusting synaptic weights in a Multi-Layer Neural Network using gradient descent of errors is known as:",
    "options": [
      "Backpropagation",
      "Defuzzification",
      "Forward Selection",
      "Pruning"
    ],
    "correctIndex": 0,
    "explanation": "Backpropagation computes the error gradient with respect to each weight using the chain rule and iteratively adjusts the weights to minimize network loss.",
    "appearedIn": "Paper 2 (Q.1.B.4), Paper 3 (Q.I.B.d)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-07",
    "unit": 2,
    "topic": "Decision Trees",
    "subtopic": "Splitting Criteria",
    "question": "Decision Trees use the criteria of ________ for attribute selection at split nodes.",
    "options": [
      "Information Gain / Gini Index",
      "Euclidean Distance",
      "Manhattan Distance",
      "Cosine Similarity"
    ],
    "correctIndex": 0,
    "explanation": "Decision Tree induction algorithms like ID3 and CART use Information Gain (based on entropy) or Gini Index to select the attribute that best purifies the subset.",
    "appearedIn": "Paper 7 (Q.I.B.6), Paper 8 (Q.I.B.f)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-08",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Bayes Prior",
    "question": "In Bayes' Theorem, the unconditional prior probability represents:",
    "options": [
      "The probability of the hypothesis prior to obtaining any new experimental evidence",
      "The probability after updating with new evidence",
      "The probability that the test is completely defective",
      "The product of all likelihoods"
    ],
    "correctIndex": 0,
    "explanation": "Prior probability P(H) represents the degree of belief or background statistical frequency of hypothesis H before observing evidence E.",
    "appearedIn": "Paper 2 (Q.1.B.5), Paper 3 (Q.I.B.e)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-09",
    "unit": 2,
    "topic": "Ensemble Learning",
    "subtopic": "Ensemble Definition",
    "question": "The most widely used sequential ensemble method in machine learning is:",
    "options": [
      "Boosting",
      "Stacking",
      "Bagging",
      "Clustering"
    ],
    "correctIndex": 0,
    "explanation": "Boosting (such as AdaBoost, Gradient Boost) is the predominant sequential ensemble method that iteratively converts weak learners into a strong learner.",
    "appearedIn": "Paper 5 (Q.I.A.iv), Paper 6 (Q.I.A.5)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "pyq-sp-10",
    "unit": 2,
    "topic": "Knowledge Representation",
    "subtopic": "Fuzzy Logic Module",
    "question": "Which module in a fuzzy expert system transforms the inference results from a fuzzy set back into a single crisp control output value?",
    "options": [
      "Defuzzification module",
      "Fuzzification module",
      "Inference Engine",
      "Linguistic parser"
    ],
    "correctIndex": 0,
    "explanation": "The Defuzzification module takes fuzzy set outputs and calculates a single crisp control value (using methods like Center of Gravity).",
    "appearedIn": "Paper 5 (Q.I.A.i), Paper 1 (Q.I.B.iii)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "pyq-sp-11",
    "diagram": "association-table-1",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Momos & Smoothie Calculation",
    "question": "In the University Paper 6 numerical with N = 5 transactions, where Momos and Smoothie appear together in transactions T2 and T3, what is Support(Momos, Smoothie)?",
    "options": [
      "0.20",
      "0.40",
      "0.60",
      "0.80"
    ],
    "correctIndex": 1,
    "explanation": "Frequency count is 2. Total transactions N = 5. Support = 2 / 5 = 0.40 (40%).",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "easy",
    "category": "numerical",
    "formula": "Support = Count / N"
  },
  {
    "id": "pyq-sp-12",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Maggie -> Momos Confidence",
    "question": "In the same 5-transaction database, Maggie appears in 3 transactions (T1, T4, T5), and in all 3 transactions Momos is also present. What is Confidence(Maggie -> Momos)?",
    "options": [
      "0.60 (60%)",
      "0.80 (80%)",
      "1.00 (100%)",
      "0.40 (40%)"
    ],
    "correctIndex": 2,
    "explanation": "Count(Maggie, Momos) = 3. Count(Maggie) = 3. Confidence = 3 / 3 = 1.0 (100%).",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "easy",
    "category": "numerical",
    "formula": "Confidence = Count(X, Y) / Count(X)"
  },
  {
    "id": "pyq-sp-13",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Q-Learning",
    "question": "Which temporal difference learning algorithm updates state-action values off-policy using the maximum Q-value across all available actions in the next state?",
    "options": [
      "Q-Learning",
      "SARSA",
      "K-Means",
      "Linear Regression"
    ],
    "correctIndex": 0,
    "explanation": "Q-learning is an off-policy TD control algorithm that updates Q(s, a) using the greedy maximum Q(s', a') over all possible actions in state s'.",
    "appearedIn": "Paper 6 (Q.III.2), Paper 7 (Q.4.b)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "pyq-sp-14",
    "diagram": "search-graph",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "A* Romanian Map Step",
    "question": "In the Romanian Map problem, traversing from Arad with start g(Arad)=0, Sibiu has step cost 140 and heuristic h(Sibiu)=253. What is f(Sibiu)?",
    "options": [
      "253",
      "140",
      "393",
      "493"
    ],
    "correctIndex": 2,
    "explanation": "f(Sibiu) = g(Sibiu) + h(Sibiu) = 140 + 253 = 393.",
    "appearedIn": "Paper 2 (Q.2.c-OR), Paper 4 (Q.II.b)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "f(n) = g(n) + h(n)"
  },
  {
    "id": "pyq-sp-15",
    "diagram": "vacuum-world",
    "unit": 1,
    "topic": "Task Environments",
    "subtopic": "Vacuum World States",
    "question": "For the 2-location Vacuum Cleaner World problem, what is the goal test?",
    "options": [
      "Agent must be in square A",
      "Both squares A and B must be clean",
      "Agent must have performed at least 10 actions",
      "Square A is clean and square B is dirty"
    ],
    "correctIndex": 1,
    "explanation": "The goal test for the vacuum cleaner world is satisfied when all rooms (both square A and square B) are clean.",
    "appearedIn": "Paper 2 (Q.5.c), Paper 3 (Q.5.c)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-16",
    "unit": 2,
    "topic": "Supervised Learning",
    "subtopic": "Regularization LASSO vs Ridge",
    "question": "Which regularization technique adds a penalty proportional to the absolute values of the weights (|w|), leading to sparse models where irrelevant weights become exactly zero?",
    "options": [
      "L1 Regularization (LASSO)",
      "L2 Regularization (Ridge)",
      "Dropout",
      "Early Stopping"
    ],
    "correctIndex": 0,
    "explanation": "L1 regularization (LASSO) penalizes the sum of absolute values of coefficients, producing sparsity and automatic feature selection.",
    "appearedIn": "Paper 1 (Q.3.e), Paper 6 (Q.III.2)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "pyq-sp-17",
    "unit": 2,
    "topic": "Decision Trees",
    "subtopic": "Decision Path",
    "question": "How does a Decision Tree reach its final classification decision for an input instance?",
    "options": [
      "Through a sequence of attribute tests from root to leaf",
      "By taking the inverse of a weight matrix",
      "By randomly guessing class probabilities",
      "By performing gradient descent at inference time"
    ],
    "correctIndex": 0,
    "explanation": "A decision tree classifies an instance by filtering it down from the root through a sequence of internal test nodes along branches that match attribute values until a leaf node is reached.",
    "appearedIn": "Paper 6 (Q.I.A.6)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "pyq-sp-18",
    "unit": 3,
    "topic": "Unsupervised Learning",
    "subtopic": "Clustering Objective",
    "question": "What is the primary optimization objective of the K-Means clustering algorithm?",
    "options": [
      "Minimize the Within-Cluster Sum of Squares (WCSS) / Inertia",
      "Maximize the number of clusters k to infinity",
      "Ensure all clusters contain the exact same number of points",
      "Maximize the cross-entropy loss"
    ],
    "correctIndex": 0,
    "explanation": "K-Means minimizes the within-cluster sum of squared Euclidean distances (inertia) between data points and their respective assigned cluster centroids.",
    "appearedIn": "Paper 4 (Q.III.e)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "pyq-sp-19",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Hidden Markov Model Structure",
    "question": "In a Hidden Markov Model (HMM), which two probability matrices fully define the probabilistic generation of observation sequences?",
    "options": [
      "State Transition Probability Matrix and Emission (Observation) Probability Matrix",
      "Covariance Matrix and Hessian Matrix",
      "Gram Matrix and Confusion Matrix",
      "Weight Matrix and Bias Vector"
    ],
    "correctIndex": 0,
    "explanation": "An HMM is defined by: 1) Transition probabilities P(S_t | S_{t-1}) and 2) Emission probabilities P(O_t | S_t) indicating the likelihood of observing output O_t given hidden state S_t.",
    "appearedIn": "Paper 1 (Q.4.e), Paper 6 (Q.I.A.2)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "pyq-sp-20",
    "diagram": "association-table-2",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Pizza & Pasta Confidence Paper 9",
    "question": "From Paper 9 transaction database: N=6 transactions. Pizza appears in 4 transactions; Pizza and Pasta appear together in 3 transactions. What is Confidence(Pizza -> Pasta)?",
    "options": [
      "0.50 (50%)",
      "0.75 (75%)",
      "0.60 (60%)",
      "1.00 (100%)"
    ],
    "correctIndex": 1,
    "explanation": "Confidence = Count(Pizza, Pasta) / Count(Pizza) = 3 / 4 = 0.75 (75%).",
    "appearedIn": "Paper 9 (Q.V.6)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "Confidence = Count(X, Y) / Count(X)"
  }
];
