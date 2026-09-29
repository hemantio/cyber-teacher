import React from 'react';

interface QuestionDiagramProps {
  diagramType: string;
}

export function QuestionDiagram({ diagramType }: QuestionDiagramProps) {
  switch (diagramType) {
    case 'vacuum-world':
      return (
        <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-700 max-w-md mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            Vacuum Cleaner World: 2-Location State Space
          </div>
          <svg viewBox="0 0 360 140" className="w-full h-auto">
            {/* Square A */}
            <rect x="20" y="20" width="150" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="30" y="42" fill="#94a3b8" fontSize="13" fontWeight="bold">Square A</text>
            {/* Robot in A */}
            <circle cx="95" cy="65" r="22" fill="#0284c7" stroke="#e0f2fe" strokeWidth="2" />
            <text x="95" y="70" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Robot</text>
            <rect x="85" y="87" width="20" height="6" rx="2" fill="#38bdf8" />
            {/* Dirt in A */}
            <circle cx="50" cy="95" r="7" fill="#f59e0b" />
            <circle cx="58" cy="98" r="5" fill="#d97706" />
            <text x="70" y="100" fill="#fbbf24" fontSize="11 font-medium">Dirty</text>

            {/* Square B */}
            <rect x="190" y="20" width="150" height="100" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
            <text x="200" y="42" fill="#94a3b8" fontSize="13" fontWeight="bold">Square B</text>
            {/* Clean status */}
            <circle cx="265" cy="70" r="18" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <text x="265" y="74" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">CLEAN</text>

            {/* Actions Arrow */}
            <path d="M 125 45 Q 180 25 185 45" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="155" y="22" textAnchor="middle" fill="#7dd3fc" fontSize="9">Action: Right</text>
          </svg>
        </div>
      );

    case 'search-graph':
      return (
        <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-700 max-w-lg mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            A* Search Graph: g(n) = step cost, h(n) = heuristic to Goal
          </div>
          <svg viewBox="0 0 380 150" className="w-full h-auto">
            {/* Start Node S */}
            <circle cx="50" cy="75" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="50" y="73" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">S</text>
            <text x="50" y="87" textAnchor="middle" fill="#38bdf8" fontSize="10">g=0, h=8</text>

            {/* Edge S -> A */}
            <line x1="72" y1="65" x2="158" y2="40" stroke="#64748b" strokeWidth="2" />
            <text x="110" y="45" fill="#f1f5f9" fontSize="11" fontWeight="bold">c=3</text>

            {/* Edge S -> B */}
            <line x1="72" y1="85" x2="158" y2="110" stroke="#64748b" strokeWidth="2" />
            <text x="110" y="110" fill="#f1f5f9" fontSize="11" fontWeight="bold">c=5</text>

            {/* Node A */}
            <circle cx="180" cy="35" r="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <text x="180" y="33" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">A</text>
            <text x="180" y="47" textAnchor="middle" fill="#cbd5e1" fontSize="10">h=6</text>

            {/* Node B */}
            <circle cx="180" cy="115" r="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <text x="180" y="113" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">B</text>
            <text x="180" y="127" textAnchor="middle" fill="#cbd5e1" fontSize="10">h=3</text>

            {/* Edge A -> Goal */}
            <line x1="202" y1="40" x2="288" y2="65" stroke="#64748b" strokeWidth="2" />
            <text x="250" y="45" fill="#f1f5f9" fontSize="11" fontWeight="bold">c=7</text>

            {/* Edge B -> Goal */}
            <line x1="202" y1="110" x2="288" y2="85" stroke="#64748b" strokeWidth="2" />
            <text x="250" y="110" fill="#f1f5f9" fontSize="11" fontWeight="bold">c=4</text>

            {/* Goal Node */}
            <circle cx="310" cy="75" r="24" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
            <text x="310" y="73" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Goal</text>
            <text x="310" y="87" textAnchor="middle" fill="#6ee7b7" fontSize="10">h=0</text>
          </svg>
        </div>
      );

    case 'svm-margin':
      return (
        <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-700 max-w-md mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            Support Vector Machine: Maximum Margin Hyperplane
          </div>
          <svg viewBox="0 0 340 180" className="w-full h-auto">
            {/* Coordinate Axes */}
            <line x1="30" y1="160" x2="320" y2="160" stroke="#475569" strokeWidth="1.5" />
            <line x1="30" y1="160" x2="30" y2="20" stroke="#475569" strokeWidth="1.5" />
            <text x="315" y="155" fill="#94a3b8" fontSize="11">X₁</text>
            <text x="35" y="30" fill="#94a3b8" fontSize="11">X₂</text>

            {/* Margin positive line */}
            <line x1="60" y1="140" x2="260" y2="30" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Optimal Hyperplane */}
            <line x1="80" y1="150" x2="280" y2="40" stroke="#ffffff" strokeWidth="2.5" />
            {/* Margin negative line */}
            <line x1="100" y1="160" x2="300" y2="50" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Class +1 Points */}
            <circle cx="110" cy="50" r="5" fill="#38bdf8" />
            <circle cx="90" cy="70" r="5" fill="#38bdf8" />
            <circle cx="150" cy="40" r="5" fill="#38bdf8" />
            {/* Support Vector (+) */}
            <circle cx="160" cy="85" r="7" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="160" cy="85" r="4" fill="#38bdf8" />
            <text x="175" y="85" fill="#38bdf8" fontSize="10" fontWeight="bold">Support Vector (+)</text>

            {/* Class -1 Points */}
            <circle cx="250" cy="130" r="5" fill="#f43f5e" />
            <circle cx="270" cy="110" r="5" fill="#f43f5e" />
            <circle cx="230" cy="150" r="5" fill="#f43f5e" />
            {/* Support Vector (-) */}
            <circle cx="200" cy="105" r="7" fill="none" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="200" cy="105" r="4" fill="#f43f5e" />
            <text x="215" y="112" fill="#f43f5e" fontSize="10" fontWeight="bold">Support Vector (-)</text>

            {/* Margin Label */}
            <text x="280" y="32" fill="#e2e8f0" fontSize="10">Margin wᵀx + b = 0</text>
          </svg>
        </div>
      );

    case 'neuron-model':
      return (
        <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-700 max-w-lg mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            Mathematical Model of an Artificial Neuron (Perceptron)
          </div>
          <svg viewBox="0 0 380 140" className="w-full h-auto">
            {/* Inputs */}
            <text x="30" y="40" fill="#94a3b8" fontSize="12" fontWeight="bold">x₁</text>
            <text x="30" y="80" fill="#94a3b8" fontSize="12" fontWeight="bold">x₂</text>
            <text x="30" y="120" fill="#94a3b8" fontSize="12" fontWeight="bold">xₙ</text>

            {/* Arrows with Weights */}
            <line x1="50" y1="35" x2="140" y2="65" stroke="#64748b" strokeWidth="1.5" />
            <text x="85" y="42" fill="#38bdf8" fontSize="10">w₁</text>

            <line x1="50" y1="75" x2="140" y2="75" stroke="#64748b" strokeWidth="1.5" />
            <text x="85" y="70" fill="#38bdf8" fontSize="10">w₂</text>

            <line x1="50" y1="115" x2="140" y2="85" stroke="#64748b" strokeWidth="1.5" />
            <text x="85" y="110" fill="#38bdf8" fontSize="10">wₙ</text>

            {/* Summation Body */}
            <circle cx="165" cy="75" r="25" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="165" y="80" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">∑</text>

            {/* Bias Input */}
            <line x1="165" y1="20" x2="165" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="170" y="32" fill="#fbbf24" fontSize="11" fontWeight="bold">Bias b</text>

            {/* Arrow to Activation */}
            <line x1="190" y1="75" x2="235" y2="75" stroke="#64748b" strokeWidth="1.5" />

            {/* Activation Function Block */}
            <rect x="235" y="52" width="46" height="46" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <path d="M 243 83 Q 258 83 258 75 Q 258 67 273 67" fill="none" stroke="#c084fc" strokeWidth="2" />
            <text x="258" y="45" textAnchor="middle" fill="#d8b4fe" fontSize="10">f(z)</text>

            {/* Output Arrow */}
            <line x1="281" y1="75" x2="340" y2="75" stroke="#10b981" strokeWidth="2" />
            <text x="355" y="80" fill="#34d399" fontSize="13" fontWeight="bold">y</text>
          </svg>
        </div>
      );

    case 'decision-tree':
      return (
        <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-700 max-w-md mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            Decision Tree: Restaurant Waiting Problem Split
          </div>
          <svg viewBox="0 0 340 140" className="w-full h-auto">
            {/* Root: Patrons */}
            <rect x="120" y="10" width="100" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="30" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Patrons?</text>

            {/* Branches */}
            <line x1="140" y1="40" x2="60" y2="85" stroke="#64748b" strokeWidth="1.5" />
            <text x="85" y="60" fill="#94a3b8" fontSize="10">None</text>

            <line x1="170" y1="40" x2="170" y2="85" stroke="#64748b" strokeWidth="1.5" />
            <text x="175" y="65" fill="#94a3b8" fontSize="10">Some</text>

            <line x1="200" y1="40" x2="280" y2="85" stroke="#64748b" strokeWidth="1.5" />
            <text x="245" y="60" fill="#94a3b8" fontSize="10">Full</text>

            {/* Leaves */}
            <rect x="25" y="85" width="70" height="28" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="60" y="103" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="bold">No Wait</text>

            <rect x="135" y="85" width="70" height="28" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <text x="170" y="103" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Wait (Yes)</text>

            <rect x="245" y="85" width="75" height="28" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
            <text x="282" y="103" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">WaitEstimate?</text>
          </svg>
        </div>
      );

    case 'association-table-1':
      return (
        <div className="my-4 overflow-x-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider text-center">
            Paper 6 Transaction Database (N = 5)
          </div>
          <table className="w-full text-xs text-left text-slate-200 border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
              <tr>
                <th className="px-3 py-2 border-r border-slate-700">TID</th>
                <th className="px-4 py-2">Purchased Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T1</td>
                <td className="px-4 py-1.5">Momos, Pani Puri, Pasta, Maggie</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T2</td>
                <td className="px-4 py-1.5">Pasta, Momos, Smoothie</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T3</td>
                <td className="px-4 py-1.5">Pani Puri, Smoothie, Momos</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T4</td>
                <td className="px-4 py-1.5">Maggie, Momos, Pani Puri</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T5</td>
                <td className="px-4 py-1.5">Brownie, Pani Puri, Momos, Maggie</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'association-table-2':
      return (
        <div className="my-4 overflow-x-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider text-center">
            Paper 9 Transaction Database (N = 6)
          </div>
          <table className="w-full text-xs text-left text-slate-200 border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
              <tr>
                <th className="px-3 py-2 border-r border-slate-700">TID</th>
                <th className="px-4 py-2">Purchased Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T1</td>
                <td className="px-4 py-1.5">Pizza, Burger, Pasta, Brownie</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T2</td>
                <td className="px-4 py-1.5">Pizza, Pasta, Burger, Coffee</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T3</td>
                <td className="px-4 py-1.5">Pizza, Coffee, Muffins</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T4</td>
                <td className="px-4 py-1.5">Coffee, Pasta</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T5</td>
                <td className="px-4 py-1.5">Muffins, Burger, Brownie, Coffee</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border-r border-slate-700 text-cyan-400 font-bold">T6</td>
                <td className="px-4 py-1.5">Pasta, Coffee, Pizza</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
