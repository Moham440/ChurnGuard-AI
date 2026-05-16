import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { churnByService } from '../data/mockData';

export default function ServiceChurnChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 border border-blue-500/10"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Churn par Service</h3>
      <p className="text-sm text-gray-400 mb-6">Taux de désabonnement par type de service</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={churnByService} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
            <YAxis
              dataKey="service"
              type="category"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131a35',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
              formatter={(value) => [`${value}%`, '']}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
            <Bar dataKey="churn" fill="#ff6b6b" name="Churn %" radius={[0, 4, 4, 0]} barSize={14} />
            <Bar dataKey="noChurn" fill="#10b981" name="Rétention %" radius={[0, 4, 4, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
