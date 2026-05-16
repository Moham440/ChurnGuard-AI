import { motion } from 'framer-motion';
import { Database, Brain, Server, Layout, Cloud, Code, BarChart3, Search, Settings, Layers } from 'lucide-react';
import { architectureLayers, techStack } from '../data/mockData';

const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  database: Database,
  brain: Brain,
  server: Server,
  layout: Layout,
  cloud: Cloud,
  code: Code,
  'bar-chart': BarChart3,
  search: Search,
  settings: Settings,
};

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Architecture Technique</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Système end-to-end — De l'ingestion des données au déploiement cloud
          </p>
        </motion.div>

        {/* Architecture Layers */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0 hidden lg:block" />
          
          <div className="space-y-6">
            {architectureLayers.map((layer, i) => {
              const IconComp = iconMap[layer.icon] || Layers;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`lg:w-[48%] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                >
                  <div className="glass-card rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/25 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2.5 rounded-xl"
                        style={{ backgroundColor: `${layer.color}15` }}
                      >
                        <IconComp className="w-6 h-6" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{layer.title}</h3>
                        <div className="text-[10px] text-gray-500">Couche {i + 1}/5</div>
                      </div>
                      <div
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                    <ul className="space-y-2">
                      {layer.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">Stack Technique</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((item, i) => {
              const IconComp = iconMap[item.icon] || Code;
              return (
                <motion.div
                  key={item.domain}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-4 border border-blue-500/10 hover:border-blue-500/25 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">{item.domain}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.tools}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature Engineering Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 border border-blue-500/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">🧪 Features Engineering Créées</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-600">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Feature</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Méthode</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Valeur Ajoutée</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['TenureGroup', 'Binning (4 catégories)', 'Simplification du parcours client'],
                  ['RFM_Score', 'RFM Analysis', 'Segmentation valeur client'],
                  ['NumServices', 'Agrégation', "Mesure de l'engagement"],
                  ['ContractRisk', 'Interaction binaire', 'Identification du profil à risque'],
                  ['NewHighPayer', 'Interaction binaire', 'Clientèle "volatile" premium'],
                  ['LoyaltyScore', 'Tenure × Contract', 'Synthèse fidélité'],
                  ['AvgSpendPerService', 'Ratio', 'Efficience de la dépense'],
                ].map(([feature, method, value], i) => (
                  <motion.tr
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-navy-700/50 hover:bg-white/[0.02]"
                  >
                    <td className="py-3 px-4 text-blue-300 font-mono text-xs">{feature}</td>
                    <td className="py-3 px-4 text-gray-300">{method}</td>
                    <td className="py-3 px-4 text-gray-400">{value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
