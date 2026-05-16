import { motion } from 'framer-motion';
import { Users, TrendingDown, DollarSign, AlertTriangle, ShieldCheck, Clock, ArrowDownRight, Sparkles } from 'lucide-react';
import { kpiData } from '../data/mockData';

const kpis = [
  {
    label: 'Total Clients',
    value: kpiData.totalCustomers.toLocaleString(),
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    change: '+2.3%',
    changeType: 'positive' as const,
  },
  {
    label: 'Taux de Churn',
    value: `${kpiData.churnRate}%`,
    icon: TrendingDown,
    color: 'text-coral-400',
    bgColor: 'bg-coral-500/10',
    borderColor: 'border-coral-500/20',
    change: '-1.2%',
    changeType: 'positive' as const,
  },
  {
    label: 'Revenu Moyen',
    value: `${kpiData.avgRevenue}$`,
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    change: '+5.1%',
    changeType: 'positive' as const,
  },
  {
    label: 'Clients à Risque',
    value: kpiData.atRiskCustomers.toLocaleString(),
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    change: '-3.5%',
    changeType: 'positive' as const,
  },
  {
    label: 'Taux de Rétention',
    value: `${kpiData.retentionRate}%`,
    icon: ShieldCheck,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    change: '+1.2%',
    changeType: 'positive' as const,
  },
  {
    label: 'Tenure Moyenne',
    value: `${kpiData.avgTenure} mois`,
    icon: Clock,
    color: 'text-blue-300',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    change: '+0.8',
    changeType: 'positive' as const,
  },
  {
    label: 'Perte Mensuelle',
    value: `${(kpiData.monthlyRevenueLoss / 1000).toFixed(0)}K$`,
    icon: ArrowDownRight,
    color: 'text-coral-300',
    bgColor: 'bg-coral-400/10',
    borderColor: 'border-coral-400/20',
    change: '-8.2%',
    changeType: 'positive' as const,
  },
  {
    label: 'Économie Potentielle',
    value: `${(kpiData.potentialSavings / 1000).toFixed(0)}K$`,
    icon: Sparkles,
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    change: '+25%',
    changeType: 'positive' as const,
  },
];

export default function KPICards() {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Dashboard Analytics</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            KPIs en temps réel — Segmentation des clients — Tendances de churn
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-xl p-5 border ${kpi.borderColor} hover:scale-[1.02] transition-transform cursor-default`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${kpi.bgColor} p-2 rounded-lg`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {kpi.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-xs text-gray-400">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
