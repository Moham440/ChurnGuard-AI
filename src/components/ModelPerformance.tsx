import { motion } from 'framer-motion';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Target, TrendingUp, Award, Gauge } from 'lucide-react';
import { modelPerformance, rocCurveData, confusionMatrix } from '../data/mockData';

const metrics = [
  { label: 'ROC-AUC', value: modelPerformance.rocAuc, target: 0.85, icon: Target, color: 'blue' },
  { label: 'Recall', value: modelPerformance.recall, target: 0.80, icon: TrendingUp, color: 'emerald' },
  { label: 'Precision', value: modelPerformance.precision, target: 0.70, icon: Award, color: 'purple' },
  { label: 'F1-Score', value: modelPerformance.f1Score, target: 0.75, icon: Gauge, color: 'amber' },
];

const colorMap: Record<string, { text: string; bg: string; ring: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', ring: 'stroke-blue-400' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'stroke-emerald-400' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', ring: 'stroke-purple-400' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'stroke-amber-400' },
};

export default function ModelPerformance() {
  const total = confusionMatrix.trueNeg + confusionMatrix.falsePos + confusionMatrix.falseNeg + confusionMatrix.truePos;

  return (
    <section id="performance" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Performance du Modèle</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            XGBoost optimisé via Optuna — Métriques de classification et courbe ROC
          </p>
        </motion.div>

        {/* Metric cards with circular progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => {
            const c = colorMap[m.color];
            const pct = m.value * 100;
            const circumference = 2 * Math.PI * 38;
            const dashOffset = circumference * (1 - m.value);
            const passed = m.value >= m.target;

            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 border border-blue-500/10 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#1e293b" strokeWidth="6" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      className={c.ring}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: dashOffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-xl font-bold ${c.text}`}>{pct.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-white">{m.label}</div>
                <div className="text-xs mt-1">
                  <span className={passed ? 'text-emerald-400' : 'text-coral-400'}>
                    {passed ? '✓' : '✗'} Cible: {(m.target * 100).toFixed(0)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ROC Curve */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <h3 className="text-lg font-semibold text-white mb-1">Courbe ROC</h3>
            <p className="text-sm text-gray-400 mb-4">AUC = {modelPerformance.rocAuc} — Capacité de discrimination</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rocCurveData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="rocGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="fpr"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    axisLine={false}
                    label={{ value: 'Taux de Faux Positifs', position: 'bottom', fill: '#94a3b8', fontSize: 11, offset: -5 }}
                  />
                  <YAxis
                    dataKey="tpr"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    axisLine={false}
                    label={{ value: 'TPR', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#131a35',
                      border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Area type="monotone" dataKey="tpr" stroke="#3b82f6" fill="url(#rocGrad)" strokeWidth={2.5} />
                  <Line
                    type="linear"
                    dataKey="fpr"
                    stroke="#64748b"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Confusion Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <h3 className="text-lg font-semibold text-white mb-1">Matrice de Confusion</h3>
            <p className="text-sm text-gray-400 mb-6">Accuracy globale : {modelPerformance.accuracy * 100}%</p>
            <div className="flex items-center justify-center">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-24" />
                  <div className="text-center text-xs text-gray-400 w-32">Prédit: Non-Churn</div>
                  <div className="text-center text-xs text-gray-400 w-32">Prédit: Churn</div>
                </div>

                <div className="flex items-center mb-2">
                  <div className="w-24 text-xs text-gray-400 text-right pr-3">Réel: Non-Churn</div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-32 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex flex-col items-center justify-center mr-2"
                  >
                    <span className="text-2xl font-bold text-emerald-400">{confusionMatrix.trueNeg}</span>
                    <span className="text-[10px] text-emerald-300">Vrais Négatifs</span>
                    <span className="text-[10px] text-gray-400">{((confusionMatrix.trueNeg / total) * 100).toFixed(1)}%</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="w-32 h-24 bg-coral-500/10 border border-coral-500/20 rounded-xl flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-coral-300">{confusionMatrix.falsePos}</span>
                    <span className="text-[10px] text-coral-200">Faux Positifs</span>
                    <span className="text-[10px] text-gray-400">{((confusionMatrix.falsePos / total) * 100).toFixed(1)}%</span>
                  </motion.div>
                </div>

                <div className="flex items-center">
                  <div className="w-24 text-xs text-gray-400 text-right pr-3">Réel: Churn</div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-32 h-24 bg-amber-500/10 border border-amber-500/20 rounded-xl flex flex-col items-center justify-center mr-2"
                  >
                    <span className="text-2xl font-bold text-amber-300">{confusionMatrix.falseNeg}</span>
                    <span className="text-[10px] text-amber-200">Faux Négatifs</span>
                    <span className="text-[10px] text-gray-400">{((confusionMatrix.falseNeg / total) * 100).toFixed(1)}%</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-32 h-24 bg-blue-500/20 border border-blue-500/30 rounded-xl flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-blue-400">{confusionMatrix.truePos}</span>
                    <span className="text-[10px] text-blue-300">Vrais Positifs</span>
                    <span className="text-[10px] text-gray-400">{((confusionMatrix.truePos / total) * 100).toFixed(1)}%</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Metrics below matrix */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center p-3 bg-navy-800/50 rounded-lg">
                <div className="text-sm font-bold text-white">{modelPerformance.accuracy * 100}%</div>
                <div className="text-[10px] text-gray-400">Accuracy</div>
              </div>
              <div className="text-center p-3 bg-navy-800/50 rounded-lg">
                <div className="text-sm font-bold text-white">{(confusionMatrix.truePos / (confusionMatrix.truePos + confusionMatrix.falseNeg) * 100).toFixed(1)}%</div>
                <div className="text-[10px] text-gray-400">Sensibilité</div>
              </div>
              <div className="text-center p-3 bg-navy-800/50 rounded-lg">
                <div className="text-sm font-bold text-white">{(confusionMatrix.trueNeg / (confusionMatrix.trueNeg + confusionMatrix.falsePos) * 100).toFixed(1)}%</div>
                <div className="text-[10px] text-gray-400">Spécificité</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
