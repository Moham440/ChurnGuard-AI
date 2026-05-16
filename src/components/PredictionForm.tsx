import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, User, Wifi, FileText, CreditCard, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PredictionResult {
  probability: number;
  riskLevel: 'high' | 'medium' | 'low';
  factors: { name: string; impact: number; direction: 'positive' | 'negative' }[];
}

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    tenure: 12,
    contract: 'Month-to-month',
    internetService: 'Fiber optic',
    monthlyCharges: 70,
    totalCharges: 840,
    techSupport: 'No',
    onlineSecurity: 'No',
    paymentMethod: 'Electronic check',
    seniorCitizen: false,
    partner: false,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      let prob = 0.3;
      if (formData.contract === 'Month-to-month') prob += 0.2;
      if (formData.tenure < 12) prob += 0.15;
      if (formData.internetService === 'Fiber optic') prob += 0.1;
      if (formData.monthlyCharges > 70) prob += 0.08;
      if (formData.techSupport === 'No') prob += 0.05;
      if (formData.onlineSecurity === 'No') prob += 0.05;
      if (formData.paymentMethod === 'Electronic check') prob += 0.05;
      if (formData.tenure > 48) prob -= 0.2;
      if (formData.contract === 'Two year') prob -= 0.15;
      if (formData.partner) prob -= 0.05;
      prob = Math.max(0.05, Math.min(0.95, prob));

      setResult({
        probability: parseFloat(prob.toFixed(2)),
        riskLevel: prob > 0.65 ? 'high' : prob > 0.35 ? 'medium' : 'low',
        factors: [
          { name: 'Contrat Mensuel', impact: formData.contract === 'Month-to-month' ? 0.22 : -0.15, direction: formData.contract === 'Month-to-month' ? 'positive' as 'positive' : 'negative' as 'negative' },
          { name: 'Tenure', impact: formData.tenure < 12 ? 0.18 : -0.12, direction: formData.tenure < 12 ? 'positive' as 'positive' : 'negative' as 'negative' },
          { name: 'Charges Mensuelles', impact: formData.monthlyCharges > 70 ? 0.14 : -0.06, direction: formData.monthlyCharges > 70 ? 'positive' as 'positive' : 'negative' as 'negative' },
          { name: 'Fibre Optique', impact: formData.internetService === 'Fiber optic' ? 0.11 : -0.03, direction: formData.internetService === 'Fiber optic' ? 'positive' as 'positive' : 'negative' as 'negative' },
          { name: 'Support Tech', impact: formData.techSupport === 'No' ? 0.09 : -0.08, direction: formData.techSupport === 'No' ? 'positive' as 'positive' : 'negative' as 'negative' },
          { name: 'Sécurité en Ligne', impact: formData.onlineSecurity === 'No' ? 0.07 : -0.07, direction: formData.onlineSecurity === 'No' ? 'positive' as 'positive' : 'negative' as 'negative' },
        ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)),
      });
      setLoading(false);
    }, 1500);
  };

  const riskColors = {
    high: { bg: 'bg-coral-500', text: 'text-coral-400', border: 'border-coral-500/30', label: 'Risque Élevé' },
    medium: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Risque Moyen' },
    low: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Risque Faible' },
  };

  return (
    <section id="prediction" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Prédiction Individuelle</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Saisissez les caractéristiques d'un client pour obtenir la probabilité de churn avec les facteurs explicatifs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Profil Client</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tenure (mois)</label>
                <input
                  type="number"
                  value={formData.tenure}
                  onChange={(e) => setFormData({ ...formData, tenure: Number(e.target.value) })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Contrat
                </label>
                <select
                  value={formData.contract}
                  onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  <Wifi className="w-3.5 h-3.5 inline mr-1" />
                  Internet
                </label>
                <select
                  value={formData.internetService}
                  onChange={(e) => setFormData({ ...formData, internetService: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>Fiber optic</option>
                  <option>DSL</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  <CreditCard className="w-3.5 h-3.5 inline mr-1" />
                  Charges/mois ($)
                </label>
                <input
                  type="number"
                  value={formData.monthlyCharges}
                  onChange={(e) => setFormData({ ...formData, monthlyCharges: Number(e.target.value) })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Support Technique</label>
                <select
                  value={formData.techSupport}
                  onChange={(e) => setFormData({ ...formData, techSupport: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Sécurité en Ligne</label>
                <select
                  value={formData.onlineSecurity}
                  onChange={(e) => setFormData({ ...formData, onlineSecurity: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Paiement</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option>Electronic check</option>
                  <option>Mailed check</option>
                  <option>Bank transfer</option>
                  <option>Credit card</option>
                </select>
              </div>

              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.partner}
                    onChange={(e) => setFormData({ ...formData, partner: e.target.checked })}
                    className="w-4 h-4 rounded bg-navy-800 border-navy-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-400">Partenaire</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Brain className="w-5 h-5" />
              )}
              {loading ? 'Analyse en cours...' : 'Lancer la Prédiction'}
            </button>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border border-blue-500/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Résultat de Prédiction</h3>
            </div>

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-80 text-center"
                >
                  <Info className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-500 text-sm">
                    Configurez le profil client et lancez<br />la prédiction pour voir les résultats
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Gauge */}
                  <div className="text-center mb-6">
                    <div className="relative w-40 h-40 mx-auto">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          stroke={result.riskLevel === 'high' ? '#ff6b6b' : result.riskLevel === 'medium' ? '#fbbf24' : '#10b981'}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${result.probability * 327} 327`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{(result.probability * 100).toFixed(0)}%</span>
                        <span className="text-xs text-gray-400">Prob. Churn</span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-sm font-medium border ${riskColors[result.riskLevel].border} ${riskColors[result.riskLevel].text}`}>
                      {result.riskLevel === 'high' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      {riskColors[result.riskLevel].label}
                    </div>
                  </div>

                  {/* SHAP-like factors */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Facteurs Explicatifs (SHAP)</h4>
                    <div className="space-y-2">
                      {result.factors.map((factor) => (
                        <div key={factor.name} className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 w-36 truncate">{factor.name}</span>
                          <div className="flex-1 h-5 bg-navy-800 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-px h-full bg-gray-600" />
                            </div>
                            {factor.direction === 'positive' ? (
                              <div
                                className="absolute top-0 h-full bg-coral-500/60 rounded-r-full"
                                style={{ left: '50%', width: `${Math.abs(factor.impact) * 200}%` }}
                              />
                            ) : (
                              <div
                                className="absolute top-0 h-full bg-blue-500/60 rounded-l-full"
                                style={{ right: '50%', width: `${Math.abs(factor.impact) * 200}%` }}
                              />
                            )}
                          </div>
                          <span className={`text-xs font-mono w-14 text-right ${factor.direction === 'positive' ? 'text-coral-400' : 'text-blue-400'}`}>
                            {factor.direction === 'positive' ? '+' : ''}{factor.impact.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                      <span>← Réduit le risque</span>
                      <span>Augmente le risque →</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
