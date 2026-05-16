import { motion } from 'framer-motion';
import { Shield, TrendingDown, Brain, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-800 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(255,107,107,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <Shield className="w-16 h-16 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 rounded-full animate-pulse" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            <span className="gradient-text">ChurnGuard</span>{' '}
            <span className="text-white">AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-200/80 mb-3 font-light">
            Système Intelligent de Prédiction de Désabonnement Client
          </p>

          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Machine Learning end-to-end avec Feature Engineering avancé (RFM, Interactions), 
            XGBoost optimisé via Optuna, explicabilité SHAP et tableau de bord interactif.
            <br />
            <span className="text-coral-400 font-semibold">Réduction estimée du churn de 25%</span> — ROI de 36 000$ par campagne.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#dashboard"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2"
          >
            <TrendingDown className="w-5 h-5" />
            Voir le Dashboard
          </a>
          <a
            href="#prediction"
            className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            Prédiction Client
          </a>
        </motion.div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'ROC-AUC', value: '0.87', icon: '📊' },
            { label: 'Recall', value: '82%', icon: '🎯' },
            { label: 'Clients Analysés', value: '7,043', icon: '👥' },
            { label: 'Économie/Campagne', value: '36K$', icon: '💰' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass-card rounded-xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <ChevronDown className="w-6 h-6 text-blue-400/50 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
