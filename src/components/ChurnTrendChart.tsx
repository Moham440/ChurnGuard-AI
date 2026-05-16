import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { churnTrend } from '../data/mockData';

export default function ChurnTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 border border-blue-500/10"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Tendance Mensuelle du Churn</h3>
      <p className="text-sm text-gray-400 mb-6">Churn réel vs prédit — 12 derniers mois</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={churnTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradChurn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff6b6b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradRetained" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131a35',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="churn"
              stroke="#ff6b6b"
              fill="url(#gradChurn)"
              strokeWidth={2}
              name="Churn Réel (%)"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#60a5fa"
              fill="none"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Churn Prédit (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
