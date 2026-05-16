import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { Search, Eye } from 'lucide-react';
import { featureImportance, customers } from '../data/mockData';

export default function ShapAnalysis() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[5]);

  // Generate SHAP beeswarm-like data
  const beeswarmData = featureImportance.flatMap((f) =>
    Array.from({ length: 30 }, (_, i) => ({
      feature: f.feature,
      shapValue: (Math.random() - 0.5) * f.importance * 4,
      featureValue: Math.random(),
      idx: i,
    }))
  );

  const groupedBeeswarm = featureImportance.map((f, fi) => {
    const points = beeswarmData.filter((d) => d.feature === f.feature);
    return { feature: f.feature, points, index: fi };
  });

  return (
    <section id="shap" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Analyse SHAP & Explicabilité</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprendre pourquoi le modèle prédit le churn — Transparence complète des décisions IA
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Feature Importance Globale</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical" margin={{ top: 0, right: 10, left: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
                  <YAxis
                    dataKey="feature"
                    type="category"
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    axisLine={false}
                    width={130}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#131a35',
                      border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Bar dataKey="importance" radius={[0, 6, 6, 0]} barSize={16}>
                    {featureImportance.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${220 + index * 15}, 70%, ${55 + index * 2}%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Individual SHAP Waterfall */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">SHAP Individuel</h3>
              </div>
              <select
                value={selectedCustomer.id}
                onChange={(e) => {
                  const c = customers.find((c) => c.id === e.target.value);
                  if (c) setSelectedCustomer(c);
                }}
                className="bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                {customers.slice(0, 30).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 mb-4 p-3 bg-navy-800/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{(selectedCustomer.churnProbability * 100).toFixed(0)}%</div>
                <div className="text-[10px] text-gray-400">Prob. Churn</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedCustomer.riskLevel === 'high' ? 'bg-coral-500/20 text-coral-400' :
                selectedCustomer.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedCustomer.riskLevel === 'high' ? '🔴 Haut Risque' :
                 selectedCustomer.riskLevel === 'medium' ? '🟡 Risque Moyen' : '🟢 Faible Risque'}
              </div>
              <div className="text-xs text-gray-400 ml-auto">
                Tenure: {selectedCustomer.tenure} mois | {selectedCustomer.contract}
              </div>
            </div>

            {/* Waterfall chart */}
            <div className="space-y-1.5">
              {selectedCustomer.shapValues.map((sv, i) => (
                <motion.div
                  key={sv.feature}
                  initial={{ opacity: 0, x: sv.direction === 'positive' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[11px] text-gray-400 w-40 truncate text-right">{sv.feature}</span>
                  <div className="flex-1 h-6 bg-navy-800 rounded relative overflow-hidden">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-gray-600" />
                    {sv.direction === 'positive' ? (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(Math.abs(sv.value) * 250, 50)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                        className="absolute top-0.5 bottom-0.5 bg-gradient-to-r from-coral-500/80 to-coral-400/60 rounded-r"
                        style={{ left: '50%' }}
                      />
                    ) : (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(Math.abs(sv.value) * 250, 50)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                        className="absolute top-0.5 bottom-0.5 bg-gradient-to-l from-blue-500/80 to-blue-400/60 rounded-l"
                        style={{ right: '50%' }}
                      />
                    )}
                  </div>
                  <span className={`text-[11px] font-mono w-12 ${sv.direction === 'positive' ? 'text-coral-400' : 'text-blue-400'}`}>
                    {sv.value > 0 ? '+' : ''}{sv.value.toFixed(3)}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 px-40">
              <span>← Réduit churn</span>
              <span>Augmente churn →</span>
            </div>
          </motion.div>
        </div>

        {/* SHAP Beeswarm Scatter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 border border-blue-500/10 mt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-1">SHAP Beeswarm Plot</h3>
          <p className="text-sm text-gray-400 mb-6">Distribution des valeurs SHAP par feature — Rouge = haute valeur, Bleu = basse valeur</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: 130, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  type="number"
                  dataKey="shapValue"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={false}
                  label={{ value: 'SHAP Value', position: 'bottom', fill: '#94a3b8', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  tick={false}
                  axisLine={false}
                  domain={[-0.5, featureImportance.length - 0.5]}
                />
                <ZAxis range={[15, 15]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131a35',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [typeof value === 'number' ? value.toFixed(3) : String(value)]}
                />
                {groupedBeeswarm.map((group) => (
                  <Scatter
                    key={group.feature}
                    data={group.points.map((p) => ({
                      shapValue: p.shapValue,
                      y: group.index + (Math.random() - 0.5) * 0.4,
                      featureValue: p.featureValue,
                    }))}
                    fill={`hsl(${220 + group.index * 15}, 70%, 60%)`}
                    opacity={0.6}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          {/* Y-axis labels overlay */}
          <div className="absolute left-6 top-[4.5rem] flex flex-col justify-between" style={{ height: '280px' }}>
            {featureImportance.map((f) => (
              <div key={f.feature} className="text-[10px] text-gray-400 leading-none">{f.feature}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
