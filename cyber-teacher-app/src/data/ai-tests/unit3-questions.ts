import { TestQuestion } from './types';

export const unit3Questions: TestQuestion[] = [
  {
    "id": "u3-01",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Hidden Markov Model",
    "question": "Which algorithmic model is widely used for solving temporal probabilistic reasoning where the true system state is unobservable (hidden) but emits visible sensor tokens?",
    "options": [
      "Large Language Model (LLM)",
      "Hidden Markov Model (HMM)",
      "Breadth-First Search (BFS)",
      "Ordinary Linear Regression"
    ],
    "correctIndex": 1,
    "explanation": "Hidden Markov Models (HMM) model temporal sequences with hidden underlying states that emit observable symbols governed by transition and emission probability distributions.",
    "appearedIn": "Paper 6 (Q.I.A.2), Paper 1 (Q.4.e), Paper 2 (Q.4.a)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u3-02",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Prior Probability",
    "question": "In Bayes' Theorem, the unconditional baseline probability of an event P(A) before observing any new evidence or percepts is called the:",
    "options": [
      "Posterior Probability",
      "Prior Probability",
      "Likelihood",
      "Joint Conditional Distribution"
    ],
    "correctIndex": 1,
    "explanation": "Prior Probability P(A) is the marginal probability of event A before any conditioning evidence or observed sensor data is considered.",
    "appearedIn": "Paper 2 (Q.1.B.5), Paper 3 (Q.I.B.e)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u3-03",
    "unit": 3,
    "topic": "Statistical Learning Theory",
    "subtopic": "Ockham's Razor",
    "question": "Which foundational philosophical and machine learning principle states that 'when presented with competing hypotheses that explain the data equally well, one should select the simplest hypothesis with the fewest assumptions'?",
    "options": [
      "Bellman's Principle",
      "Ockham's Razor",
      "Markov Property",
      "Moore's Law"
    ],
    "correctIndex": 1,
    "explanation": "Ockham's Razor guides machine learning towards simpler models (e.g. smaller decision trees, regularized weights) because simpler hypotheses generalize better and resist overfitting.",
    "appearedIn": "Paper 4 (Q.I.c.i)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u3-04",
    "unit": 3,
    "topic": "Statistical Learning Theory",
    "subtopic": "Maximum Likelihood Estimation",
    "question": "Maximum-Likelihood Parameter Learning estimates the parameters theta of a statistical model by:",
    "options": [
      "Minimizing the number of features in the dataset",
      "Maximizing the likelihood function L(theta) = P(Data | theta), making the observed training data as probable as possible",
      "Randomly sampling weights from a uniform distribution",
      "Setting all prior probabilities to zero"
    ],
    "correctIndex": 1,
    "explanation": "Maximum Likelihood Estimation (MLE) seeks parameter values theta that maximize the probability of generating the observed dataset D under the assumed model.",
    "appearedIn": "Paper 6 (Q.I.C.4), Paper 2 (Q.4.c)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u3-05",
    "unit": 3,
    "topic": "Classification Models",
    "subtopic": "Naive Bayes Assumption",
    "question": "What is the core simplifying assumption made by the Naive Bayes Classifier that makes its computation tractable?",
    "options": [
      "All features follow a non-linear kernel distribution",
      "All input features are conditionally independent of each other given the class label: P(x1, x2, ..., xn | C) = Product(P(xi | C))",
      "All classes are equally probable (uniform priors)",
      "The data contains no noise or missing values"
    ],
    "correctIndex": 1,
    "explanation": "The 'naive' assumption is class-conditional independence: given the class C, every attribute is assumed to be statistically independent of every other attribute.",
    "appearedIn": "Paper 1 (Q.4.c), Paper 4 (Q.IV.b), Paper 7 (Q.4.c-OR)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "P(X|C) = Product(P(x_i | C))"
  },
  {
    "id": "u3-06",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Expectation-Maximization (EM)",
    "question": "In the Expectation-Maximization (EM) algorithm used for learning with hidden/latent variables, what takes place during the 'E-step' and 'M-step'?",
    "options": [
      "E-step eliminates outliers; M-step multiplies feature weights",
      "E-step calculates expected values of hidden/latent variables given current parameters; M-step re-estimates parameters by maximizing likelihood using those expected values",
      "E-step extracts eigenvalues; M-step merges clusters",
      "E-step trains an ensemble; M-step evaluates test accuracy"
    ],
    "correctIndex": 1,
    "explanation": "The Expectation-Maximization (EM) algorithm alternates between the E-step (computing expected values of latent variables) and the M-step (optimizing parameters given those expectations).",
    "appearedIn": "Paper 1 (Q.4.b), Paper 6 (Q.V.5)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "u3-07",
    "unit": 3,
    "topic": "Unsupervised Learning",
    "subtopic": "K-Means Clustering",
    "question": "In K-Means Clustering, how are cluster centroids updated at the end of each iteration?",
    "options": [
      "By choosing the median point along the principal axis",
      "By calculating the arithmetic mean of all data points currently assigned to that cluster",
      "By randomly shifting coordinates by a constant learning rate",
      "By taking the maximum value of the furthest outlier"
    ],
    "correctIndex": 1,
    "explanation": "K-Means updates each cluster centroid to the geometric mean (center of gravity) of all data points currently assigned to that cluster: mu_k = (1 / |C_k|) * sum(x_i).",
    "appearedIn": "Paper 4 (Q.III.e)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u3-08",
    "unit": 3,
    "topic": "Unsupervised Learning",
    "subtopic": "Hierarchical Clustering Dendrogram",
    "question": "A tree-like diagram that visually illustrates the sequence of merges or splits across clusters at various similarity thresholds in Hierarchical Clustering is called a:",
    "options": [
      "Decision Tree",
      "Dendrogram",
      "Markov Chain",
      "Histogram"
    ],
    "correctIndex": 1,
    "explanation": "A dendrogram is a branching diagram representing the hierarchy of clusters formed in Agglomerative or Divisive hierarchical clustering.",
    "appearedIn": "Paper 4 (Q.III.e)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u3-09",
    "unit": 3,
    "topic": "Probabilistic Models",
    "subtopic": "Bayes Theorem Calculation",
    "question": "Suppose P(Disease) = 0.01. A medical test has Sensitivity P(+|Disease) = 0.90 and False Positive rate P(+|No Disease) = 0.05. Using Bayes Theorem, what is the total probability P(+) of testing positive?",
    "options": [
      "0.0585",
      "0.0900",
      "0.0090",
      "0.1500"
    ],
    "correctIndex": 0,
    "explanation": "By law of total probability: P(+) = P(+|Disease)*P(Disease) + P(+|No Disease)*P(No Disease) = (0.90 * 0.01) + (0.05 * 0.99) = 0.009 + 0.0495 = 0.0585.",
    "appearedIn": "Paper 4 (Q.IV.d), Paper 5 (Q.3.d)",
    "difficulty": "hard",
    "category": "numerical",
    "formula": "P(+) = P(+|D)P(D) + P(+|~D)P(~D)"
  },
  {
    "id": "u3-10",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Definition of RL",
    "question": "In which paradigm of machine learning does an autonomous agent learn optimal decision policies through a continuous sequence of trial-and-error actions receiving rewards or punishments?",
    "options": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Semi-Supervised Learning"
    ],
    "correctIndex": 2,
    "explanation": "Reinforcement learning is learning what to do - how to map situations to actions - so as to maximize a numerical reward signal through active trial-and-error interactions.",
    "appearedIn": "Paper 4 (Q.I.A.i), Paper 5 (Q.I.B.iv), Paper 6 (Q.I.A.5)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u3-11",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Metric Definitions",
    "question": "In Association Rule Mining for a rule X -> Y, what does 'Confidence' measure?",
    "options": [
      "The fraction of total transactions that contain both X and Y: Support(X U Y)",
      "The conditional probability that transaction contains Y given that it contains X: Support(X U Y) / Support(X)",
      "The ratio of observed joint occurrence to expected independent occurrence: Support(X U Y) / (Support(X) * Support(Y))",
      "The total count of distinct items in the basket"
    ],
    "correctIndex": 1,
    "explanation": "Confidence(X -> Y) measures how frequently items in Y appear in transactions that contain X: Confidence = Support(X U Y) / Support(X).",
    "appearedIn": "Paper 1 (Q.4.a), Paper 5 (Q.3.b), Paper 7 (Q.4.a-OR)",
    "difficulty": "easy",
    "category": "concept",
    "formula": "Confidence(X -> Y) = Support(X U Y) / Support(X)"
  },
  {
    "id": "u3-12",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Lift Interpretation",
    "question": "In Association Rule Mining, if the calculated Lift of a rule X -> Y is exactly equal to 1.0 (Lift = 1), what does this indicate about the relationship between itemset X and itemset Y?",
    "options": [
      "X and Y are strongly positively correlated",
      "Occurrence of itemset X and itemset Y are completely independent of each other",
      "X and Y are mutually exclusive and substitute each other",
      "The rule has 100% confidence"
    ],
    "correctIndex": 1,
    "explanation": "Lift = P(X U Y) / (P(X) * P(Y)). When Lift = 1, P(X U Y) = P(X)*P(Y), meaning occurrence of X and Y are statistically independent.",
    "appearedIn": "Paper 6 (Q.III.4), Paper 9 (Q.V.6)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "Lift(X, Y) = Support(X U Y) / (Support(X) * Support(Y))"
  },
  {
    "id": "u3-13",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Apriori Property",
    "question": "What is the fundamental 'Apriori Property' (Downward-Closure Property) used to prune the candidate itemset search space in the Apriori Algorithm?",
    "options": [
      "All supersets of an infrequent itemset must be frequent",
      "All non-empty subsets of a frequent itemset must also be frequent",
      "Items with the highest price have the highest support",
      "Transactions with odd IDs are pruned automatically"
    ],
    "correctIndex": 1,
    "explanation": "The Apriori principle states that if an itemset is frequent, then all of its subsets must also be frequent. Conversely, if an itemset is infrequent, all of its supersets must be infrequent (pruned).",
    "appearedIn": "Paper 6 (Q.V.5), Paper 7 (Q.4.a-OR)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u3-14",
    "diagram": "association-table-1",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Momos & Smoothie Support Numerical",
    "question": "Consider the university exam transaction database (N = 5):\nT1: Momos, Pani Puri, Pasta, Maggie\nT2: Pasta, Momos, Smoothie\nT3: Pani Puri, Smoothie, Momos\nT4: Maggie, Momos, Pani Puri\nT5: Brownie, Pani Puri, Momos, Maggie\n\nWhat is the Support for the itemset {Momos, Smoothie}?",
    "options": [
      "0.2 (20%)",
      "0.4 (40%)",
      "0.6 (60%)",
      "0.8 (80%)"
    ],
    "correctIndex": 1,
    "explanation": "Both Momos and Smoothie appear together in transactions T2 and T3. Total count = 2. Total transactions N = 5. Support(Momos, Smoothie) = 2 / 5 = 0.4 (40%).",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "easy",
    "category": "numerical",
    "formula": "Support = Count / N"
  },
  {
    "id": "u3-15",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Momos -> Pani Puri Confidence Numerical",
    "question": "Using the same 5-transaction database:\nT1: Momos, Pani Puri, Pasta, Maggie\nT2: Pasta, Momos, Smoothie\nT3: Pani Puri, Smoothie, Momos\nT4: Maggie, Momos, Pani Puri\nT5: Brownie, Pani Puri, Momos, Maggie\n\nWhat is the Confidence of the rule (Momos -> Pani Puri)?",
    "options": [
      "0.60 (60%)",
      "0.75 (75%)",
      "0.80 (80%)",
      "1.00 (100%)"
    ],
    "correctIndex": 2,
    "explanation": "Momos is present in all 5 transactions: Count(Momos) = 5. Momos and Pani Puri appear together in T1, T3, T4, T5: Count(Momos, Pani Puri) = 4. Confidence(Momos -> Pani Puri) = 4 / 5 = 0.80 (80%).",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "Confidence = Count(X U Y) / Count(X)"
  },
  {
    "id": "u3-16",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Maggie -> Momos Confidence Numerical",
    "question": "Using the same database:\nT1: Momos, Pani Puri, Pasta, Maggie\nT2: Pasta, Momos, Smoothie\nT3: Pani Puri, Smoothie, Momos\nT4: Maggie, Momos, Pani Puri\nT5: Brownie, Pani Puri, Momos, Maggie\n\nWhat is the Confidence of the rule (Maggie -> Momos)?",
    "options": [
      "0.60 (60%)",
      "0.80 (80%)",
      "1.00 (100%)",
      "0.50 (50%)"
    ],
    "correctIndex": 2,
    "explanation": "Maggie appears in T1, T4, T5: Count(Maggie) = 3. Maggie and Momos appear together in T1, T4, T5: Count(Maggie, Momos) = 3. Confidence(Maggie -> Momos) = 3 / 3 = 1.0 (100%).",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "Confidence = Count(X U Y) / Count(X)"
  },
  {
    "id": "u3-17",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Momos & Pani Puri Lift Numerical",
    "question": "For the same database (N = 5):\nSupport(Momos) = 1.0 (5/5), Support(Pani Puri) = 0.8 (4/5), Support(Momos, Pani Puri) = 0.8 (4/5).\nWhat is the Lift(Momos, Pani Puri)?",
    "options": [
      "0.8",
      "1.0",
      "1.25",
      "1.5"
    ],
    "correctIndex": 1,
    "explanation": "Lift = Support(Momos, Pani Puri) / (Support(Momos) * Support(Pani Puri)) = 0.8 / (1.0 * 0.8) = 0.8 / 0.8 = 1.0.",
    "appearedIn": "Paper 6 (Q.III.4)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "Lift = Support(X, Y) / (Support(X) * Support(Y))"
  },
  {
    "id": "u3-18",
    "diagram": "association-table-2",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Pizza & Pasta Confidence Numerical",
    "question": "Consider University Paper 9 Transaction Database (N = 6):\nT1: Pizza, Burger, Pasta, Brownie\nT2: Pizza, Pasta, Burger, Coffee\nT3: Pizza, Coffee, Muffins\nT4: Coffee, Pasta\nT5: Muffins, Burger, Brownie, Coffee\nT6: Pasta, Coffee, Pizza\n\nWhat is the Confidence of the rule (Pizza -> Pasta)?",
    "options": [
      "0.50 (50%)",
      "0.67 (66.7%)",
      "0.75 (75%)",
      "1.00 (100%)"
    ],
    "correctIndex": 2,
    "explanation": "Pizza is present in T1, T2, T3, T6 -> Count(Pizza) = 4. Pizza and Pasta are together in T1, T2, T6 -> Count(Pizza, Pasta) = 3. Confidence(Pizza -> Pasta) = 3 / 4 = 0.75 (75%).",
    "appearedIn": "Paper 9 (Q.V.6)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "Confidence = Count(X, Y) / Count(X)"
  },
  {
    "id": "u3-19",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Burger & Brownie Lift Numerical",
    "question": "In the same 6-transaction database:\nBurger appears in T1, T2, T5 (Count = 3, Support = 3/6 = 0.5).\nBrownie appears in T1, T5 (Count = 2, Support = 2/6 = 0.3333).\nBurger and Brownie appear together in T1, T5 (Count = 2, Support = 2/6 = 0.3333).\nWhat is the Lift(Burger, Brownie)?",
    "options": [
      "1.0",
      "1.5",
      "2.0",
      "0.5"
    ],
    "correctIndex": 2,
    "explanation": "Lift = Support(Burger, Brownie) / (Support(Burger) * Support(Brownie)) = (2/6) / ((3/6) * (2/6)) = 1 / (3/6) = 1 / 0.5 = 2.0. A lift of 2.0 indicates strong positive association!",
    "appearedIn": "Paper 9 (Q.V.6)",
    "difficulty": "hard",
    "category": "numerical",
    "formula": "Lift = S(A, B) / (S(A) * S(B))"
  },
  {
    "id": "u3-20",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Passive RL",
    "question": "In Passive Reinforcement Learning, what is the fixed condition under which the agent operates?",
    "options": [
      "The policy pi is completely fixed, and the agent's objective is to learn the utility values U^pi(s) of states under this fixed policy",
      "The environment transitions never change",
      "The reward signal is always zero",
      "The agent never takes any actions"
    ],
    "correctIndex": 0,
    "explanation": "In passive RL, the agent's policy pi is fixed (the agent just executes pi) and its task is to learn the utility of states U^pi(s). In active RL, the agent must also decide which actions to take to discover the optimal policy.",
    "appearedIn": "Paper 1 (Q.5.e), Paper 6 (Q.V.6), Paper 7 (Q.4.a)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u3-21",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Adaptive Dynamic Programming (ADP)",
    "question": "Adaptive Dynamic Programming (ADP) is classified as a 'model-based' approach to reinforcement learning because it:",
    "options": [
      "Uses a neural network for every state",
      "Explicitly learns a transition model P(s' | s, a) of the environment and then uses dynamic programming (value iteration) to calculate utilities",
      "Never updates state values",
      "Only works in deterministic environments"
    ],
    "correctIndex": 1,
    "explanation": "An ADP agent learns the transition probability model of the environment by recording how often state s' follows (s, a), and solves the Bellman equations for the learned model.",
    "appearedIn": "Paper 4 (Q.IV.f)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "u3-22",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Temporal Difference (TD) Learning",
    "question": "What is the core idea of Temporal Difference (TD) Learning compared to Adaptive Dynamic Programming?",
    "options": [
      "TD learning updates state utilities incrementally based on observed successor state utilities without needing to learn a full transition model (model-free)",
      "TD learning requires the entire future trajectory before updating any states",
      "TD learning never uses discount factors",
      "TD learning only operates in games of complete information"
    ],
    "correctIndex": 0,
    "explanation": "Temporal Difference learning is model-free: it updates utility estimates directly from observed transitions: U(s) <- U(s) + alpha * [r + gamma * U(s') - U(s)], using the difference between successive estimates.",
    "appearedIn": "Paper 4 (Q.IV.c), Paper 5 (Q.3.c)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "U(s) <- U(s) + alpha * [r + gamma * U(s') - U(s)]"
  },
  {
    "id": "u3-23",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Q-Learning Algorithm",
    "question": "What is the Q-Learning update rule for updating the Q-value Q(s, a) after taking action a in state s, receiving reward r, and transitioning to state s'?",
    "options": [
      "Q(s, a) <- Q(s, a) + alpha * [r + gamma * max_a'(Q(s', a')) - Q(s, a)]",
      "Q(s, a) <- r * gamma + Q(s', a')",
      "Q(s, a) <- Q(s, a) / (1 + alpha)",
      "Q(s, a) <- max_a'(Q(s', a')) - r"
    ],
    "correctIndex": 0,
    "explanation": "Q-learning is an off-policy TD control algorithm. The TD error is [r + gamma * max_a' Q(s', a') - Q(s, a)], which directly converges to the optimal action-value function Q*.",
    "appearedIn": "Paper 6 (Q.III.2), Paper 6 (Q.V.6), Paper 7 (Q.4.b)",
    "difficulty": "hard",
    "category": "concept",
    "formula": "Q(s, a) <- Q(s, a) + alpha * [r + gamma * max_a' Q(s', a') - Q(s, a)]"
  },
  {
    "id": "u3-24",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Exploration vs Exploitation",
    "question": "In Active Reinforcement Learning, what is the 'Exploration vs Exploitation' dilemma?",
    "options": [
      "Choosing between CPU vs GPU compute",
      "Balancing between executing actions that yield known high immediate rewards (exploitation) versus trying new or unfamiliar actions that might reveal even better long-term rewards (exploration)",
      "Deciding whether to save the policy to disk or RAM",
      "Choosing between linear and polynomial regression"
    ],
    "correctIndex": 1,
    "explanation": "A pure exploiter can become trapped in a sub-optimal policy because it never discovers better alternatives. A pure explorer wastes actions on poor outcomes. Rational agents use strategies like epsilon-greedy to balance both.",
    "appearedIn": "Paper 5 (Q.3.c), Paper 7 (Q.V.b-OR)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u3-25",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Policy Search",
    "question": "What distinguishes 'Policy Search' methods from value-iteration or Q-learning approaches in reinforcement learning?",
    "options": [
      "Policy Search adjusts the parameters of a policy function directly to maximize expected performance, without necessarily computing value functions for every state-action pair",
      "Policy Search requires the environment to be completely static",
      "Policy Search only runs in supervised environments",
      "Policy Search never utilizes rewards"
    ],
    "correctIndex": 0,
    "explanation": "Policy search operates directly in the space of policy representations (e.g. neural network weights parameterized by theta) using gradient or hill-climbing methods to maximize expected reward.",
    "appearedIn": "Paper 2 (Q.5.a), Paper 3 (Q.5.a), Paper 4 (Q.IV.e)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "u3-26",
    "unit": 3,
    "topic": "Probabilistic Reasoning",
    "subtopic": "Markov Property",
    "question": "A stochastic process possesses the 'Markov Property' (First-Order Markov Chain) if and only if:",
    "options": [
      "The future state depends only on the current state, and is conditionally independent of all preceding past states: P(X_t | X_{t-1}, ..., X_0) = P(X_t | X_{t-1})",
      "The probabilities never change over time",
      "All states have equal probability of being visited",
      "The process has no transitions"
    ],
    "correctIndex": 0,
    "explanation": "The Markov Property states that the future is conditionally independent of the past given the present. This property is fundamental to HMMs, MDPs, and Reinforcement Learning.",
    "appearedIn": "Paper 1 (Q.4.e), Paper 6 (Q.I.A.2)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "P(X_t | X_{t-1}, ..., X_0) = P(X_t | X_{t-1})"
  },
  {
    "id": "u3-27",
    "unit": 3,
    "topic": "Statistical Learning Theory",
    "subtopic": "Beta Distributions",
    "question": "Why are Beta Distributions commonly used as priors in Bayesian parameter learning for Bernoulli / coin-toss trials?",
    "options": [
      "Because Beta distributions are conjugate priors for the Bernoulli and Binomial likelihoods, meaning the posterior distribution is also a Beta distribution",
      "Because Beta distributions eliminate the need for data collection",
      "Because Beta distributions have no parameters",
      "Because Beta distributions are always discrete integers"
    ],
    "correctIndex": 0,
    "explanation": "The Beta distribution Beta(a, b) is conjugate to the Binomial likelihood. If prior is Beta(a, b) and data contains k heads and (n-k) tails, the posterior is simply Beta(a + k, b + n - k).",
    "appearedIn": "Paper 4 (Q.V.e)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "u3-28",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Positive vs Negative Reinforcement",
    "question": "What is the difference between Positive Reinforcement and Negative Reinforcement in behavioral learning?",
    "options": [
      "Positive reinforcement presents a rewarding stimulus following a desirable behavior; Negative reinforcement removes or avoids an aversive/unpleasant stimulus when the desirable behavior occurs",
      "Positive reinforcement adds points; Negative reinforcement terminates the agent",
      "Positive reinforcement is supervised; Negative reinforcement is unsupervised",
      "There is no difference; both are forms of punishment"
    ],
    "correctIndex": 0,
    "explanation": "Both positive and negative reinforcement strengthen and increase the likelihood of a target behavior. Positive reinforcement adds something desirable; Negative reinforcement removes an unpleasant condition.",
    "appearedIn": "Paper 4 (Q.IV.c), Paper 6 (Q.III.6)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u3-29",
    "unit": 3,
    "topic": "Reinforcement Learning",
    "subtopic": "Discount Factor Gamma",
    "question": "In the discounted reward formulation of Reinforcement Learning, what is the role of the discount factor gamma (where 0 <= gamma < 1)?",
    "options": [
      "It controls how heavily future rewards are valued relative to immediate rewards, ensuring finite cumulative returns over infinite horizons",
      "It determines the learning rate of the neural network",
      "It sets the probability of exploring random actions",
      "It specifies the number of episodes to train"
    ],
    "correctIndex": 0,
    "explanation": "Discount factor gamma determines the present value of future rewards. If gamma=0, the agent is myopic (only cares about immediate reward). As gamma approaches 1, the agent becomes farsighted.",
    "appearedIn": "Paper 2 (Q.4.a-OR), Paper 7 (Q.4.b)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "Return G_t = sum(gamma^k * r_{t+k+1})"
  },
  {
    "id": "u3-30",
    "unit": 3,
    "topic": "Unsupervised Learning",
    "subtopic": "Clustering vs Classification",
    "question": "What is the primary difference between Clustering and Classification?",
    "options": [
      "Clustering is unsupervised (groups data based on intrinsic feature similarity without predefined labels); Classification is supervised (assigns data to predefined target classes using labeled examples)",
      "Clustering works only on images; Classification works only on numbers",
      "Classification produces continuous outputs, while Clustering produces text",
      "Clustering requires backpropagation, while Classification uses K-Means"
    ],
    "correctIndex": 0,
    "explanation": "Classification uses labeled training instances to learn a predictive boundary for known categories (supervised). Clustering discovers natural groupings in unlabeled datasets based on proximity or density (unsupervised).",
    "appearedIn": "Paper 1 (Q.4.d), Paper 4 (Q.III.e), Paper 7 (Q.V.a-OR)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u3-31",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Pizza Support Numerical",
    "question": "In Paper 9 database with N = 6 transactions where Pizza appears in T1, T2, T3, and T6, what is the Support of Pizza?",
    "options": [
      "0.50 (50%)",
      "0.67 (66.67%)",
      "0.75 (75%)",
      "0.33 (33.33%)"
    ],
    "correctIndex": 1,
    "explanation": "Pizza appears in 4 out of 6 transactions. Support(Pizza) = 4 / 6 = 2 / 3 = 0.6667 (66.67%).",
    "appearedIn": "Paper 9 (Q.V.6)",
    "difficulty": "easy",
    "category": "numerical",
    "formula": "Support = Count / N"
  },
  {
    "id": "u3-32",
    "unit": 3,
    "topic": "Association Rule Mining",
    "subtopic": "Coffee & Muffins Support Numerical",
    "question": "In the same 6-transaction database where Coffee and Muffins appear together in T3 and T5, what is Support(Coffee, Muffins)?",
    "options": [
      "0.20 (20%)",
      "0.33 (33.33%)",
      "0.50 (50%)",
      "0.67 (66.67%)"
    ],
    "correctIndex": 1,
    "explanation": "Coffee and Muffins appear together in 2 transactions (T3, T5). Total transactions N = 6. Support = 2 / 6 = 1 / 3 = 0.3333 (33.33%).",
    "appearedIn": "Paper 9 (Q.V.6)",
    "difficulty": "easy",
    "category": "numerical",
    "formula": "Support = Count / N"
  }
];
