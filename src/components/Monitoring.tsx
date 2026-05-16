import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const driftData = Array.from({ length: 20 }, (_, i) => ({
  day: `J${i + 1}`,
  psi: parseFloat((Math.random() * 0.15 + (i > 14 ? 0.1 : 0.02)).toFixed(3)),
  accuracy: parseFloat((82 - Math.random() * 3 - (i > 14 ? 4 : 0)).toFixed(1)),
}));

const modelHealth = [
  { metric: 'Latence API', value: '45ms', status: 'ok' },
  { metric: 'PSI Score', value: '0.08', status: 'ok' },
  { metric: 'Data Drift', value: 'Faible', status: 'ok' },
  { metric: 'Accuracy 7j', value: '80.2%', status: 'warning' },
  { metric: 'Predictions/jour', value: '1,247', status: 'ok' },
  { metric: 'Dernier Entraînement', value: '3j', status: 'ok' },
];

export default function Monitoring() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">📈 Monitoring & Data Drift</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Suivi en temps réel de la performance du modèle et détection de la dérive des données
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {modelHealth.map((item, i) => (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 border border-blue-500/10 flex items-center gap-3"
            >
              {item.status === 'ok' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <div className="flex-1">
                <div className="text-xs text-gray-400">{item.metric}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${item.status === 'ok' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">PSI — Population Stability Index</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">Seuil d'alerte: PSI &gt; 0.10 (rouge)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driftData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#131a35',
                      border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Line type="monotone" dataKey="psi" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa', r: 3 }} />
                  {/* Threshold line */}
                  <Line
                    type="monotone"
                    dataKey={() => 0.1}
                    stroke="#ff6b6b"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Seuil"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Accuracy au Fil du Temps</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">Monitoring de la performance prédictive glissante</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driftData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} domain={[70, 85]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#131a35',
                      border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
