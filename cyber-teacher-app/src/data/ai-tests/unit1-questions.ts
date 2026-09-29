import { TestQuestion } from './types';

export const unit1Questions: TestQuestion[] = [
  {
    "id": "u1-01",
    "unit": 1,
    "topic": "Agent Architectures",
    "subtopic": "Utility-Based Agents",
    "question": "Which agent architecture is specifically designed to decide the optimal action when multiple competing goals exist or when tradeoffs between conflicting criteria must be evaluated?",
    "options": [
      "Simple Reflex Agent",
      "Model-Based Reflex Agent",
      "Goal-Based Agent",
      "Utility-Based Agent"
    ],
    "correctIndex": 3,
    "explanation": "A utility-based agent uses an explicit utility function that maps states onto a real number, quantifying the degree of happiness or desirability. This allows the agent to make rational trade-offs between conflicting goals (e.g. speed vs. safety).",
    "appearedIn": "Paper 1 (Q.I.A.iv), Paper 7 (Q.I.A.3), Paper 8 (Q.IA.iii)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-02",
    "unit": 1,
    "topic": "Problem Formulation",
    "subtopic": "State Space",
    "question": "Together, the initial state and the successor function (transition model) implicitly define the ________ of a problem.",
    "options": [
      "Agent function",
      "State Space",
      "Path Cost",
      "Goal Test"
    ],
    "correctIndex": 1,
    "explanation": "The initial state and the successor function (which specifies what actions and next states are available) define the complete set of states reachable by any sequence of actions, which is the State Space.",
    "appearedIn": "Paper 2 (Q.1.A.1), Paper 3 (Q.IA.a)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-03",
    "unit": 1,
    "topic": "Task Environments",
    "subtopic": "Observability",
    "question": "If an agent's sensors give it access to the complete state of the environment at each point in time, the environment is classified as:",
    "options": [
      "Static",
      "Episodic",
      "Fully Observable",
      "Discrete"
    ],
    "correctIndex": 2,
    "explanation": "An environment is Fully Observable if the agent's sensors can detect all relevant aspects to choose an action. In such cases, the agent does not need an internal memory state to track unseen factors.",
    "appearedIn": "Paper 2 (Q.1.A.2), Paper 3 (Q.IA.b), Paper 4 (Q.I.A.ii), Paper 5 (Q.I.A.ii)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-04",
    "unit": 1,
    "topic": "Foundations of AI",
    "subtopic": "Agent Definition",
    "question": "'An entity that perceives its environment through sensors and acts upon that environment through actuators.' What is this definition describing?",
    "options": [
      "Actuator",
      "Perceptron",
      "Agent",
      "Inference Engine"
    ],
    "correctIndex": 2,
    "explanation": "This is the classic definition of an Agent according to Russell and Norvig. Humans have eyes/ears (sensors) and hands/legs (actuators); software agents have keystrokes/files (sensors) and network packets/displays (actuators).",
    "appearedIn": "Paper 2 (Q.1.A.3), Paper 3 (Q.IA.c), Paper 4 (Q.I.c.iii)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-05",
    "unit": 1,
    "topic": "Foundations of AI",
    "subtopic": "Neuroscience & Philosophy",
    "question": "The philosophical position of Materialism asserts that the mind's operations are governed entirely by the physical laws of the brain. Which AI foundational discipline studies this biological architecture?",
    "options": [
      "Philosophy",
      "Psychology",
      "Neuroscience",
      "Linguistics"
    ],
    "correctIndex": 2,
    "explanation": "Neuroscience is the study of the nervous system, particularly the brain, examining how physical electro-chemical processes generate consciousness, reasoning, and intelligent behavior.",
    "appearedIn": "Paper 2 (Q.1.A.4), Paper 3 (Q.IA.d)",
    "difficulty": "medium",
    "category": "mcq"
  },
  {
    "id": "u1-06",
    "unit": 1,
    "topic": "Approaches to AI",
    "subtopic": "Acting Humanly",
    "question": "'The study of how to make computers do things at which, at the moment, people are better.' (Elaine Rich, 1983) belongs to which of the four classic approaches to AI?",
    "options": [
      "Thinking Rationally",
      "Thinking Humanly",
      "Acting Humanly",
      "Acting Rationally"
    ],
    "correctIndex": 2,
    "explanation": "Elaine Rich's definition falls under 'Acting Humanly', which measures machine capability against human empirical performance (closely tied to the Turing Test approach).",
    "appearedIn": "Paper 2 (Q.1.A.5), Paper 3 (Q.IA.e), Paper 1 (Q.5.a)",
    "difficulty": "medium",
    "category": "mcq"
  },
  {
    "id": "u1-07",
    "unit": 1,
    "topic": "Agent Architectures",
    "subtopic": "Simple Reflex Agents",
    "question": "A Simple Reflex Agent selects its actions based solely on:",
    "options": [
      "Condition-action rules matching the current percept",
      "An internal model predicting future states",
      "Past percept sequences stored in a database",
      "A utility calculation of long-term rewards"
    ],
    "correctIndex": 0,
    "explanation": "Simple reflex agents act only on the basis of the current percept without utilizing percept history or internal state, governed by Condition-Action rules (e.g. IF light is red THEN stop).",
    "appearedIn": "Paper 6 (Q.I.A.6), Paper 4 (Q.V.d)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-08",
    "unit": 1,
    "topic": "Foundations of AI",
    "subtopic": "History of AI",
    "question": "Who is credited with coining the term 'Artificial Intelligence' at the Dartmouth Conference in 1956?",
    "options": [
      "Alan Turing",
      "John McCarthy",
      "Arthur Samuel",
      "Claude Shannon"
    ],
    "correctIndex": 1,
    "explanation": "John McCarthy organized the famous 1956 Dartmouth Summer Research Project on Artificial Intelligence and coined the phrase 'Artificial Intelligence'.",
    "appearedIn": "Paper 7 (Q.I.A.2), Paper 8 (Q.IA.ii)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-09",
    "unit": 1,
    "topic": "Task Environments",
    "subtopic": "Known vs Unknown",
    "question": "In a ________ environment, the outcomes (or probabilities of outcomes) for all available actions are completely known to the agent.",
    "options": [
      "Stochastic",
      "Episodic",
      "Sequential",
      "Known"
    ],
    "correctIndex": 3,
    "explanation": "In a Known environment, the agent knows the rules/physics of the world. In an Unknown environment, the agent must explore to discover how its actions affect states.",
    "appearedIn": "Paper 6 (Q.I.A.2)",
    "difficulty": "medium",
    "category": "mcq"
  },
  {
    "id": "u1-10",
    "unit": 1,
    "topic": "PEAS Framework",
    "subtopic": "Components of PEAS",
    "question": "In the PEAS framework, what does the acronym represent when designing an intelligent agent?",
    "options": [
      "Protocol, Engine, Actuators, Sensors",
      "Performance Measure, Environment, Actuators, Sensors",
      "Process, Environment, Action, Solution",
      "Percept, Execution, Actuators, State"
    ],
    "correctIndex": 1,
    "explanation": "PEAS stands for Performance Measure, Environment, Actuators, and Sensors. Formulating PEAS is the very first step in designing any rational agent.",
    "appearedIn": "Paper 4 (Q.I.B.i), Paper 6 (Q.I.B.6), Paper 1 (Q.2.d)",
    "difficulty": "easy",
    "category": "peas-analysis"
  },
  {
    "id": "u1-11",
    "unit": 1,
    "topic": "Agent Theory",
    "subtopic": "Percept Sequence",
    "question": "The complete chronological history of everything an agent has perceived up to the current moment is known as the:",
    "options": [
      "State Space",
      "Percept Sequence",
      "Action Space",
      "Transition Model"
    ],
    "correctIndex": 1,
    "explanation": "An agent's percept sequence is the complete history of everything the agent has ever perceived. Mathematically, an agent's choice of action at any given instant can depend on its entire percept sequence to date.",
    "appearedIn": "Paper 4 (Q.I.B.ii), Paper 5 (Q.I.B.ii)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u1-12",
    "unit": 1,
    "topic": "Agent Theory",
    "subtopic": "Agent Function vs Program",
    "question": "What is the key theoretical relationship between an Agent Function (f) and an Agent Program (P)?",
    "options": [
      "The Agent Function is an abstract mathematical mapping f: P* -> A, while the Agent Program is a concrete implementation executing on the architecture.",
      "The Agent Program calculates mathematical limits; the Agent Function converts power to actuators.",
      "They are completely identical concepts with no distinction in AI literature.",
      "The Agent Function runs on hardware; the Agent Program runs only in simulation."
    ],
    "correctIndex": 0,
    "explanation": "Mathematically, an agent's behavior is described by the agent function f: P* -> A mapping percept histories to actions. The agent program is the concrete algorithm that implements f on a physical architecture.",
    "appearedIn": "Paper 2 (Q.1.B.6), Paper 3 (Q.I.B.f), Paper 6 (Q.I.B.4)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-13",
    "unit": 1,
    "topic": "Task Environments",
    "subtopic": "Episodic vs Sequential",
    "question": "Why is an automated email spam filtering system considered an 'Episodic' environment, while playing Chess is 'Sequential'?",
    "options": [
      "Spam filtering uses continuous values, while Chess is discrete.",
      "In spam filtering, deciding on an incoming email does not affect whether future emails are spam or easy to classify; in Chess, current moves dictate future board states.",
      "Spam filtering has multiple agents, while Chess has only a single agent.",
      "Spam filtering is dynamic, while Chess is static."
    ],
    "correctIndex": 1,
    "explanation": "In episodic task environments, the agent's experience is divided into independent atomic episodes where current actions do not impact subsequent episodes. In sequential environments, current actions heavily determine future states and payoffs.",
    "appearedIn": "Paper 1 (Q.I.c.i), Paper 4 (Q.2.f), Paper 6 (Q.II.5)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-14",
    "unit": 1,
    "topic": "Task Environments",
    "subtopic": "Deterministic vs Stochastic",
    "question": "If the next state of an environment is completely determined by the current state and the action executed by the agent, the environment is called:",
    "options": [
      "Deterministic",
      "Stochastic",
      "Strategic",
      "Episodic"
    ],
    "correctIndex": 0,
    "explanation": "If the next state is completely determined by the current state and the action executed by the agent, it is Deterministic. If uncertainty, randomness, or unobserved factors play a role, it is Stochastic.",
    "appearedIn": "Paper 6 (Q.I.C.1), Paper 8 (Q.II.f)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u1-15",
    "unit": 1,
    "topic": "Agent Architectures",
    "subtopic": "Model-Based Reflex Agents",
    "question": "How does a Model-Based Reflex Agent handle partially observable environments?",
    "options": [
      "By guessing the outcome randomly",
      "By maintaining an internal state that tracks unobserved aspects of the world using a transition model and sensor model",
      "By asking a human supervisor for the missing percepts",
      "By ignoring missing observations and executing reflex actions only"
    ],
    "correctIndex": 1,
    "explanation": "A model-based agent maintains an internal state depending on the percept history. It uses knowledge of 'how the world evolves independently of the agent' and 'how the agent's actions affect the world'.",
    "appearedIn": "Paper 4 (Q.II.c), Paper 6 (Q.V.1)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-16",
    "unit": 1,
    "topic": "Agent Architectures",
    "subtopic": "Learning Agents",
    "question": "In the standard architecture of a Learning Agent, which component is responsible for evaluating the agent's behavior against an external performance standard?",
    "options": [
      "Learning Element",
      "Performance Element",
      "Critic",
      "Problem Generator"
    ],
    "correctIndex": 2,
    "explanation": "The Critic observes the world and uses an external performance standard to tell the learning element how well the agent is doing. The Problem Generator suggests actions that lead to new experiences (exploration).",
    "appearedIn": "Paper 2 (Q.2.a-OR), Paper 3 (Q.2.e)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-17",
    "unit": 1,
    "topic": "Uninformed Search",
    "subtopic": "Breadth-First Search (BFS)",
    "question": "Which search algorithm is guaranteed to find the shallowest goal node first using a FIFO queue for its frontier?",
    "options": [
      "Depth-First Search",
      "Breadth-First Search",
      "Uniform-Cost Search",
      "Greedy Best-First Search"
    ],
    "correctIndex": 1,
    "explanation": "Breadth-First Search (BFS) explores the state space level by level, systematically expanding the shallowest unexpanded node first using a First-In-First-Out (FIFO) queue.",
    "appearedIn": "Paper 1 (Q.I.A.iii), Paper 2 (Q.1.A.6), Paper 3 (Q.IA.f)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-18",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "Greedy Best-First Search",
    "question": "Greedy Best-First Search expands nodes using which evaluation function?",
    "options": [
      "f(n) = g(n)",
      "f(n) = h(n)",
      "f(n) = g(n) + h(n)",
      "f(n) = g(n) - h(n)"
    ],
    "correctIndex": 1,
    "explanation": "Greedy Best-First Search expands the node that appears to be closest to the goal, evaluating nodes solely using the heuristic function f(n) = h(n).",
    "appearedIn": "Paper 4 (Q.I.A.iii), Paper 5 (Q.I.A.iii), Paper 6 (Q.I.A.3)",
    "difficulty": "easy",
    "category": "mcq"
  },
  {
    "id": "u1-19",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "A* Search",
    "question": "In the A* search algorithm, what does the evaluation function f(n) = g(n) + h(n) represent?",
    "options": [
      "g(n) is the estimated remaining cost; h(n) is the cost from start to n",
      "g(n) is the exact cost from the start node to node n; h(n) is the estimated cost from n to the nearest goal",
      "g(n) is the depth of node n; h(n) is the branching factor",
      "g(n) is the time complexity; h(n) is the space complexity"
    ],
    "correctIndex": 1,
    "explanation": "f(n) estimates the total cost of the cheapest solution path through node n. Here, g(n) is the actual cost incurred from the start state to node n, and h(n) is the estimated cost from n to the goal.",
    "appearedIn": "Paper 7 (Q.I.A.4), Paper 8 (Q.IA.iv), Paper 4 (Q.II.b)",
    "difficulty": "easy",
    "category": "concept",
    "formula": "f(n) = g(n) + h(n)"
  },
  {
    "id": "u1-20",
    "unit": 1,
    "topic": "Uninformed Search",
    "subtopic": "Blind Search Concept",
    "question": "Why is Blind Search also called 'Uninformed Search'?",
    "options": [
      "Because the search tree has no root node",
      "Because it does not have domain-specific heuristic knowledge about how close a state is to the goal",
      "Because it cannot detect if a goal state has been reached",
      "Because it is implemented without data structures"
    ],
    "correctIndex": 1,
    "explanation": "Uninformed (blind) search strategies have no information about the distance or path cost from the current state to the goal. They can only generate child nodes and test whether a state is a goal state.",
    "appearedIn": "Paper 1 (Q.I.A.ii), Paper 7 (Q.I.A.5), Paper 8 (Q.IA.v)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u1-21",
    "unit": 1,
    "topic": "Search Theory",
    "subtopic": "Frontier Definition",
    "question": "In state-space search algorithms, what is the 'Frontier' (also known as the open list)?",
    "options": [
      "The set of leaf nodes that have been generated but not yet expanded",
      "The sequence of actions forming the final path",
      "The collection of nodes whose children have all been generated",
      "The dead-end states that failed the goal test"
    ],
    "correctIndex": 0,
    "explanation": "The frontier is the set of all leaf nodes available for expansion at any given point during the search process.",
    "appearedIn": "Paper 1 (Q.I.B.i), Paper 6 (Q.I.A.i), Paper 6 (Q.I.B.2)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u1-22",
    "unit": 1,
    "topic": "Uninformed Search",
    "subtopic": "Iterative Deepening Search",
    "question": "What is the primary advantage of Iterative Deepening Depth-First Search (IDS) over Breadth-First Search (BFS)?",
    "options": [
      "IDS has a smaller branching factor than BFS",
      "IDS preserves the completeness and optimality of BFS while having the linear memory requirement O(bd) of DFS",
      "IDS does not require generating child states",
      "IDS eliminates all time complexity"
    ],
    "correctIndex": 1,
    "explanation": "BFS requires storing all nodes at the current level, giving O(b^d) exponential space complexity. IDS combines BFS optimality with DFS space efficiency, requiring only O(bd) linear space.",
    "appearedIn": "Paper 5 (Q.I.B.iii), Paper 1 (Q.2.c), Paper 6 (Q.V.2)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-23",
    "unit": 1,
    "topic": "Search Theory",
    "subtopic": "Evaluation Parameters",
    "question": "Which set of four parameters is standardly used to evaluate the performance of search algorithms in AI?",
    "options": [
      "Completeness, Time Complexity, Space Complexity, and Optimality",
      "Accuracy, Precision, Recall, and F-score",
      "Reliability, Maintainability, Portability, and Usability",
      "Bandwidth, Latency, Throughput, and Packet Loss"
    ],
    "correctIndex": 0,
    "explanation": "AI search algorithms are systematically evaluated on: 1) Completeness (does it find a solution?), 2) Time Complexity (how long does it take?), 3) Space Complexity (how much memory is required?), and 4) Optimality (does it find the lowest-cost path?).",
    "appearedIn": "Paper 1 (Q.I.c.ii), Paper 6 (Q.I.C.5)",
    "difficulty": "easy",
    "category": "concept"
  },
  {
    "id": "u1-24",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "Admissibility of A*",
    "question": "A heuristic function h(n) is defined as 'admissible' if it:",
    "options": [
      "Never overestimates the true cost to reach the goal from node n (h(n) <= h*(n))",
      "Is strictly greater than the true cost to accelerate exploration",
      "Remains constant across all nodes in the state space",
      "Equals zero at every non-goal state"
    ],
    "correctIndex": 0,
    "explanation": "An admissible heuristic is an optimistic estimate: it thinks the goal is closer than it actually is (h(n) <= h*(n)). If h(n) is admissible, tree-search A* is guaranteed to be optimal.",
    "appearedIn": "Paper 4 (Q.II.b), Paper 6 (Q.V.2)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "h(n) <= h*(n)"
  },
  {
    "id": "u1-25",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "Consistency Condition",
    "question": "In Graph-Search A*, which condition guarantees that whenever A* expands a node n, the path found to n is already the shortest/optimal path?",
    "options": [
      "Admissibility only",
      "Consistency (or Monotonicity): h(n) <= c(n, a, n') + h(n')",
      "Convexity",
      "Linearly Separable"
    ],
    "correctIndex": 1,
    "explanation": "A heuristic is consistent (or monotonic) if for every node n and successor n' generated by action a, h(n) <= c(n, a, n') + h(n'). Consistent heuristics satisfy the triangle inequality and guarantee that closed nodes never need reopening.",
    "appearedIn": "Paper 4 (Q.II.b)",
    "difficulty": "hard",
    "category": "concept",
    "formula": "h(n) <= c(n, a, n') + h(n')"
  },
  {
    "id": "u1-26",
    "unit": 1,
    "topic": "Uninformed Search",
    "subtopic": "Uniform Cost Search (UCS)",
    "question": "Uniform-Cost Search (UCS) expands nodes in order of their cumulative path cost g(n). It is the generalized state-space version of which classic graph algorithm?",
    "options": [
      "Bellman-Ford Algorithm",
      "Dijkstra's Algorithm",
      "Floyd-Warshall Algorithm",
      "Kruskal's Algorithm"
    ],
    "correctIndex": 1,
    "explanation": "Uniform-Cost Search is equivalent to Dijkstra's algorithm applied to search trees where nodes are generated on-the-fly rather than needing the whole graph in memory.",
    "appearedIn": "Paper 2 (Q.5.b-OR), Paper 4 (Q.II.e), Paper 6 (Q.V.4)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-27",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "Recursive Best-First Search (RBFS)",
    "question": "What is the key advantage of Recursive Best-First Search (RBFS) over standard A* search?",
    "options": [
      "RBFS searches only forward without backtracking",
      "RBFS runs in linear space O(bd) while mimicking best-first search by tracking the f-value of the best alternative path",
      "RBFS has lower time complexity than O(1)",
      "RBFS works without needing a heuristic function"
    ],
    "correctIndex": 1,
    "explanation": "RBFS is a heuristic search algorithm with linear space complexity O(bd). It uses recursion to explore best paths while maintaining an f-limit to prune and back up alternative paths when needed.",
    "appearedIn": "Paper 5 (Q.2.b)",
    "difficulty": "hard",
    "category": "concept"
  },
  {
    "id": "u1-28",
    "unit": 1,
    "topic": "Uninformed Search",
    "subtopic": "Bidirectional Search",
    "question": "What is the time complexity of Bidirectional Search (branching factor b, solution depth d) assuming BFS in both directions?",
    "options": [
      "O(b^d)",
      "O(b^(d/2))",
      "O(d * log(b))",
      "O(b * d)"
    ],
    "correctIndex": 1,
    "explanation": "Bidirectional search runs two simultaneous searches: one forward from the initial state, and one backward from the goal. They meet in the middle at depth d/2, reducing time complexity from O(b^d) to O(b^(d/2)).",
    "appearedIn": "Paper 5 (Q.2.e), Paper 6 (Q.II.6)",
    "difficulty": "medium",
    "category": "concept",
    "formula": "O(b^(d/2))"
  },
  {
    "id": "u1-29",
    "diagram": "vacuum-world",
    "unit": 1,
    "topic": "Game Playing",
    "subtopic": "Minimax & Alpha-Beta Pruning",
    "question": "In game tree search with Alpha-Beta Pruning, under what condition does pruning (cutoff) occur?",
    "options": [
      "When alpha < beta",
      "When alpha >= beta",
      "When depth reaches 0 and heuristic is 0",
      "When MAX's score becomes negative"
    ],
    "correctIndex": 1,
    "explanation": "Pruning occurs whenever alpha >= beta. Alpha is the value of the best choice found so far for MAX, and beta is the value of the best choice for MIN. If alpha exceeds beta, the opponent can force a worse outcome, so the remaining branches are irrelevant.",
    "appearedIn": "Paper 7 (Q.I.B.c), Paper 8 (Q.I.B.c)",
    "difficulty": "medium",
    "category": "concept"
  },
  {
    "id": "u1-30",
    "diagram": "search-graph",
    "unit": 1,
    "topic": "Informed Search",
    "subtopic": "A* Path Calculation",
    "question": "In an A* search problem, start node S expands to nodes A and B with costs: g(A)=3, h(A)=6 and g(B)=5, h(B)=3. Which node is expanded next from the frontier and what is its f-value?",
    "options": [
      "Node B with f(B) = 8",
      "Node A with f(A) = 9",
      "Both nodes simultaneously",
      "Node A because it has smaller g-cost"
    ],
    "correctIndex": 0,
    "explanation": "f(A) = g(A) + h(A) = 3 + 6 = 9. f(B) = g(B) + h(B) = 5 + 3 = 8. A* always pops the node with the lowest f-value from the frontier, which is Node B with f(B) = 8.",
    "appearedIn": "Paper 2 (Q.2.c-OR), Paper 3 (Q.2.c)",
    "difficulty": "medium",
    "category": "numerical",
    "formula": "f(n) = g(n) + h(n)"
  },
  {
    "id": "u1-31",
    "unit": 1,
    "topic": "Problem Formulation",
    "subtopic": "8-Puzzle State Space",
    "question": "For the classic 8-Puzzle problem, what is the size of the total reachable state space?",
    "options": [
      "9! (362,880) states",
      "9! / 2 (181,440) states due to parity of permutations",
      "8! (40,320) states",
      "3^8 (6,561) states"
    ],
    "correctIndex": 1,
    "explanation": "There are 9 tiles (including blank) on a 3x3 board, giving 9! = 362,880 arrangements. However, exactly half (9! / 2 = 181,440) are reachable from any given starting configuration due to invariant inversion parity.",
    "appearedIn": "Paper 4 (Q.II.d), Paper 6 (Q.V.1)",
    "difficulty": "hard",
    "category": "numerical"
  },
  {
    "id": "u1-32",
    "unit": 1,
    "topic": "PEAS Framework",
    "subtopic": "Hospital Management System",
    "question": "For a 'Hospital Patient Management & Diagnosis System' agent, what is the primary Performance Measure in its PEAS description?",
    "options": [
      "Patient health recovery rate, minimized diagnostic errors, reduced patient wait times and treatment costs",
      "Keyboard, mouse, hospital database server, EHR terminals",
      "Display screen, prescription printouts, automated medicine dispenser",
      "Patients, medical staff, hospital wards, treatment protocols"
    ],
    "correctIndex": 0,
    "explanation": "In PEAS: Performance Measure = Patient outcome, diagnostic accuracy, low cost/delay. Environment = Patients, doctors, nurses, hospital rooms. Actuators = Screen display, prescriptions. Sensors = Keyboard, test result inputs.",
    "appearedIn": "Paper 1 (Q.2.d), Paper 2 (Q.2.c), Paper 7 (Q.II.b)",
    "difficulty": "medium",
    "category": "peas-analysis"
  }
];
