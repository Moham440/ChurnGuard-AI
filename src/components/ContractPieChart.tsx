import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { contractDistribution } from '../data/mockData';

export default function ContractPieChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 border border-blue-500/10"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Distribution des Contrats</h3>
      <p className="text-sm text-gray-400 mb-6">Répartition par type de contrat</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={contractDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {contractDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#131a35',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
              formatter={(value) => [Number(value).toLocaleString(), 'Clients']}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {contractDistribution.map((item) => (
          <div key={item.name} className="text-center">
            <div className="text-xs text-gray-400">{item.name}</div>
            <div className="text-sm font-semibold text-white">{((item.value / 7043) * 100).toFixed(0)}%</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
