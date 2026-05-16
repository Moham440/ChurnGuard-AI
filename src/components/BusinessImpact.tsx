import { motion } from 'framer-motion';
import { DollarSign, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';

export default function BusinessImpact() {
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
            <span className="gradient-text">💰 Impact Métier</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ROI concret du système de prédiction — De la donnée à la valeur business
          </p>
        </motion.div>

        {/* Storytelling cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-coral-500/20 text-center"
          >
            <div className="text-4xl mb-3">🚫</div>
            <div className="text-3xl font-bold text-coral-400 mb-2">300$</div>
            <div className="text-sm text-gray-300 mb-1">Coût de Remplacement</div>
            <p className="text-xs text-gray-500">Marketing, onboarding, perte de revenus pour chaque client perdu</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 border border-emerald-500/20 text-center"
          >
            <div className="text-4xl mb-3">💚</div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">10$</div>
            <div className="text-sm text-gray-300 mb-1">Coût de Rétention</div>
            <p className="text-xs text-gray-500">Offre promotionnelle, appel du service client, attention personnalisée</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 border border-blue-500/20 text-center"
          >
            <div className="text-4xl mb-3">📈</div>
            <div className="text-3xl font-bold text-blue-400 mb-2">30x</div>
            <div className="text-sm text-gray-300 mb-1">Ratio Coût</div>
            <p className="text-xs text-gray-500">Il est 30x plus rentable de retenir un client que d'en acquérir un nouveau</p>
          </motion.div>
        </div>

        {/* ROI Calculation Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 border border-blue-500/10"
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Calcul du ROI par Campagne</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {[
              { icon: Users, label: 'Clients à risque ciblés', value: '200', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: Target, label: 'Taux de succès', value: '60%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { icon: DollarSign, label: 'Économie/client retenu', value: '290$', color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { icon: TrendingUp, label: 'Économie totale', value: '36,000$', color: 'text-coral-400', bg: 'bg-coral-500/10' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`${step.bg} rounded-xl p-4 text-center min-w-[140px]`}>
                  <step.icon className={`w-6 h-6 ${step.color} mx-auto mb-2`} />
                  <div className={`text-xl font-bold ${step.color}`}>{step.value}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{step.label}</div>
                </div>
                {i < 3 && (
                  <ArrowRight className="w-5 h-5 text-gray-600 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-coral-500/5 rounded-xl border border-blue-500/10">
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              <span className="text-white font-semibold">"</span>
              En ciblant <span className="text-blue-400 font-semibold">200 clients à risque</span> identifiés par le modèle,
              avec un taux de succès de <span className="text-emerald-400 font-semibold">60%</span> (120 clients retenus),
              et une économie de <span className="text-amber-400 font-semibold">290$ par client</span> (300$ remplacement - 10$ rétention),
              le système génère une économie de{' '}
              <span className="text-coral-400 font-bold text-lg">36,000$ par campagne</span>.
              <span className="text-white font-semibold">"</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
