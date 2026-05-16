import { motion } from 'framer-motion';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from 'recharts';
import { segmentationData } from '../data/mockData';

const colors = ['#10b981', '#34d399', '#fbbf24', '#ff8787', '#ff6b6b', '#ef4444'];

export default function Segmentation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 border border-blue-500/10"
    >
      <h3 className="text-lg font-semibold text-white mb-1">Segmentation Client</h3>
      <p className="text-sm text-gray-400 mb-6">Analyse RFM — Taille = nombre de clients</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              type="number"
              dataKey="x"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              label={{ value: 'Score Engagement', position: 'bottom', fill: '#94a3b8', fontSize: 11, offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              label={{ value: 'Score Fidélité', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[100, 800]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131a35',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-navy-800 border border-blue-500/20 rounded-xl p-3 text-sm shadow-xl">
                      <div className="font-semibold text-white mb-1">{d.segment}</div>
                      <div className="text-gray-400">Clients: {d.count}</div>
                      <div className="text-gray-400">Taux de churn: {d.churnRate}%</div>
                      <div className="text-gray-400">Revenu moyen: {d.avgRevenue}$</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={segmentationData}>
              {segmentationData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} fillOpacity={0.7} stroke={colors[index]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {segmentationData.map((seg, i) => (
          <div key={seg.segment} className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
            {seg.segment} ({seg.count})
          </div>
        ))}
      </div>
    </motion.div>
  );
}
