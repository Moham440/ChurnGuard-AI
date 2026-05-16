import { Shield, ExternalLink, Globe, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-navy-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold gradient-text">ChurnGuard AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Système ML end-to-end de prédiction de désabonnement client.
              Feature engineering avancé, XGBoost optimisé, explicabilité SHAP.
            </p>
          </div>

          {/* Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Streamlit', 'Docker', 'PostgreSQL', 'Optuna'].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-navy-800 text-gray-400 text-[10px] rounded-md border border-navy-600">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Livrables */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Livrables</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                Notebooks EDA + Modeling
              </li>
              <li className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                API FastAPI REST
              </li>
              <li className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                Dashboard Interactif
              </li>
              <li className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-coral-400 rounded-full" />
                Docker + CI/CD
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 ChurnGuard AI — Portfolio Data Science & ML Engineering
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" title="GitHub">
              <BookOpen className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" title="Portfolio">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" title="Lien externe">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
