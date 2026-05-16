import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, ChevronUp, ChevronDown, Phone, Mail, Gift } from 'lucide-react';
import { customers } from '../data/mockData';

type SortKey = 'churnProbability' | 'tenure' | 'monthlyCharges' | 'name';

export default function AlertsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('churnProbability');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let list = [...customers];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term)
      );
    }
    if (riskFilter !== 'all') {
      list = list.filter((c) => c.riskLevel === riskFilter);
    }
    list.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return list;
  }, [searchTerm, riskFilter, sortKey, sortAsc]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
    setPage(0);
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
    ) : null;

  return (
    <section id="alerts" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">🚨 Alertes Clients à Risque</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Liste priorisée par score de churn — Actions de rétention recommandées
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl border border-blue-500/10 overflow-hidden"
        >
          {/* Filters */}
          <div className="p-4 border-b border-navy-700 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher par nom ou ID..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                className="w-full pl-10 pr-3 py-2 bg-navy-800 border border-navy-600 rounded-lg text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'high', 'medium', 'low'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => { setRiskFilter(level); setPage(0); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    riskFilter === level
                      ? level === 'high' ? 'bg-coral-500/20 text-coral-400 border border-coral-500/30'
                      : level === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : level === 'low' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-navy-800 text-gray-400 border border-navy-600 hover:bg-navy-700'
                  }`}
                >
                  {level === 'all' ? 'Tous' : level === 'high' ? '🔴 Haut' : level === 'medium' ? '🟡 Moyen' : '🟢 Faible'}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-400">
              {filtered.length} client{filtered.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-800/50">
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-medium">ID</th>
                  <th
                    className="py-3 px-4 text-left text-xs text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <span className="flex items-center gap-1">Client <SortIcon col="name" /></span>
                  </th>
                  <th
                    className="py-3 px-4 text-left text-xs text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('churnProbability')}
                  >
                    <span className="flex items-center gap-1">Score Churn <SortIcon col="churnProbability" /></span>
                  </th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-medium">Risque</th>
                  <th
                    className="py-3 px-4 text-left text-xs text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('tenure')}
                  >
                    <span className="flex items-center gap-1">Tenure <SortIcon col="tenure" /></span>
                  </th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-medium">Contrat</th>
                  <th
                    className="py-3 px-4 text-left text-xs text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('monthlyCharges')}
                  >
                    <span className="flex items-center gap-1">Mensuel <SortIcon col="monthlyCharges" /></span>
                  </th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-navy-700/50 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 text-blue-300 font-mono text-xs">{c.id}</td>
                    <td className="py-3 px-4 text-white">{c.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-navy-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              c.riskLevel === 'high' ? 'bg-coral-500' : c.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${c.churnProbability * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-gray-300">{(c.churnProbability * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        c.riskLevel === 'high' ? 'bg-coral-500/20 text-coral-400' :
                        c.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {c.riskLevel === 'high' ? <AlertTriangle className="w-3 h-3" /> : null}
                        {c.riskLevel === 'high' ? 'Haut' : c.riskLevel === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-xs">{c.tenure} mois</td>
                    <td className="py-3 px-4 text-gray-300 text-xs">{c.contract}</td>
                    <td className="py-3 px-4 text-gray-300 text-xs">{c.monthlyCharges}$</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Appeler">
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors" title="Email">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Offre promotionnelle">
                          <Gift className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-navy-700 flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Page {page + 1} sur {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 bg-navy-800 text-gray-300 text-xs rounded-lg border border-navy-600 hover:bg-navy-700 disabled:opacity-40"
              >
                Précédent
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1.5 bg-navy-800 text-gray-300 text-xs rounded-lg border border-navy-600 hover:bg-navy-700 disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
