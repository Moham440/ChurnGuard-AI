// Simulated Telco Customer Churn Dataset
export interface Customer {
  id: string;
  name: string;
  gender: string;
  seniorCitizen: boolean;
  partner: boolean;
  dependents: boolean;
  tenure: number;
  phoneService: boolean;
  internetService: string;
  contract: string;
  monthlyCharges: number;
  totalCharges: number;
  paymentMethod: string;
  churnProbability: number;
  riskLevel: 'high' | 'medium' | 'low';
  tenureGroup: string;
  rfmScore: number;
  numServices: number;
  loyaltyScore: number;
  avgSpendPerService: number;
  shapValues: { feature: string; value: number; direction: 'positive' | 'negative' }[];
}

const firstNames = ['Marie', 'Jean', 'Sophie', 'Pierre', 'Isabelle', 'François', 'Claire', 'Michel', 'Nathalie', 'Luc', 'Élodie', 'Thomas', 'Camille', 'Nicolas', 'Léa', 'Antoine', 'Julie', 'Marc', 'Emma', 'David', 'Sarah', 'Olivier', 'Chloé', 'Laurent', 'Manon', 'Philippe', 'Alice', 'Stéphane', 'Charlotte', 'Bruno', 'Amélie', 'Sylvain', 'Pauline', 'Guillaume', 'Laura', 'Maxime', 'Audrey', 'Julien', 'Marion', 'Christophe'];

const lastNames = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Dupont', 'Roux', 'Fournier', 'Morel', 'Girard'];

const shapFeatures = [
  'Contract_Monthly',
  'Tenure',
  'MonthlyCharges',
  'InternetService_FiberOptic',
  'TechSupport_No',
  'OnlineSecurity_No',
  'PaymentMethod_ElectronicCheck',
  'NumServices',
  'LoyaltyScore',
  'SeniorCitizen',
  'TotalCharges',
  'PaperlessBilling',
];

function generateShapValues(churnProb: number): Customer['shapValues'] {
  const isHighRisk = churnProb > 0.6;
  return shapFeatures.slice(0, 8).map((feature, i) => {
    const baseValue = (Math.random() * 0.3 + 0.05) * (isHighRisk ? 1 : -1);
    const flip = Math.random() > (isHighRisk ? 0.3 : 0.7);
    const value = flip ? -baseValue : baseValue;
    return {
      feature,
      value: parseFloat((value * (1 - i * 0.08)).toFixed(3)),
      direction: value > 0 ? 'positive' as const : 'negative' as const,
    };
  }).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateCustomers(count: number = 200): Customer[] {
  const rand = seededRandom(42);
  const customers: Customer[] = [];

  for (let i = 0; i < count; i++) {
    const tenure = Math.floor(rand() * 72) + 1;
    const contract = rand() < 0.4 ? 'Month-to-month' : rand() < 0.7 ? 'One year' : 'Two year';
    const internetService = rand() < 0.4 ? 'Fiber optic' : rand() < 0.7 ? 'DSL' : 'No';
    const monthlyCharges = parseFloat((rand() * 80 + 20).toFixed(2));
    const totalCharges = parseFloat((monthlyCharges * tenure * (0.8 + rand() * 0.4)).toFixed(2));
    const numServices = Math.floor(rand() * 6) + 1;
    const loyaltyScore = parseFloat((tenure * (contract === 'Two year' ? 3 : contract === 'One year' ? 2 : 1) / 72).toFixed(2));

    // Churn probability logic
    let churnBase = 0.25;
    if (contract === 'Month-to-month') churnBase += 0.25;
    if (tenure < 12) churnBase += 0.15;
    if (internetService === 'Fiber optic') churnBase += 0.1;
    if (monthlyCharges > 70) churnBase += 0.1;
    if (tenure > 48) churnBase -= 0.2;
    if (contract === 'Two year') churnBase -= 0.15;
    churnBase += (rand() - 0.5) * 0.2;
    const churnProbability = parseFloat(Math.max(0.02, Math.min(0.98, churnBase)).toFixed(2));

    const riskLevel: Customer['riskLevel'] = churnProbability > 0.65 ? 'high' : churnProbability > 0.35 ? 'medium' : 'low';
    const tenureGroup = tenure <= 12 ? '0-12 mois' : tenure <= 24 ? '13-24 mois' : tenure <= 48 ? '25-48 mois' : '49+ mois';

    customers.push({
      id: `CLT-${String(i + 1).padStart(4, '0')}`,
      name: `${firstNames[Math.floor(rand() * firstNames.length)]} ${lastNames[Math.floor(rand() * lastNames.length)]}`,
      gender: rand() > 0.5 ? 'Male' : 'Female',
      seniorCitizen: rand() > 0.85,
      partner: rand() > 0.5,
      dependents: rand() > 0.65,
      tenure,
      phoneService: rand() > 0.1,
      internetService,
      contract,
      monthlyCharges,
      totalCharges,
      paymentMethod: ['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'][Math.floor(rand() * 4)],
      churnProbability,
      riskLevel,
      tenureGroup,
      rfmScore: parseFloat((rand() * 5 + 1).toFixed(1)),
      numServices,
      loyaltyScore,
      avgSpendPerService: parseFloat((monthlyCharges / numServices).toFixed(2)),
      shapValues: generateShapValues(churnProbability),
    });
  }
  return customers;
}

export const customers = generateCustomers(200);

// KPI data
export const kpiData = {
  totalCustomers: 7043,
  churnRate: 26.5,
  avgRevenue: 64.76,
  atRiskCustomers: 1869,
  retentionRate: 73.5,
  avgTenure: 32.4,
  monthlyRevenueLoss: 139420,
  potentialSavings: 36000,
};

// Monthly churn trend
export const churnTrend = [
  { month: 'Jan', churn: 22, retained: 78, predicted: 24 },
  { month: 'Fév', churn: 24, retained: 76, predicted: 25 },
  { month: 'Mar', churn: 21, retained: 79, predicted: 22 },
  { month: 'Avr', churn: 27, retained: 73, predicted: 26 },
  { month: 'Mai', churn: 25, retained: 75, predicted: 27 },
  { month: 'Juin', churn: 28, retained: 72, predicted: 29 },
  { month: 'Jul', churn: 26, retained: 74, predicted: 25 },
  { month: 'Aoû', churn: 23, retained: 77, predicted: 24 },
  { month: 'Sep', churn: 29, retained: 71, predicted: 28 },
  { month: 'Oct', churn: 27, retained: 73, predicted: 26 },
  { month: 'Nov', churn: 25, retained: 75, predicted: 27 },
  { month: 'Déc', churn: 26, retained: 74, predicted: 25 },
];

// Contract distribution
export const contractDistribution = [
  { name: 'Mensuel', value: 3875, color: '#ff6b6b' },
  { name: '1 An', value: 1473, color: '#fbbf24' },
  { name: '2 Ans', value: 1695, color: '#10b981' },
];

// Churn by feature
export const churnByService = [
  { service: 'Fibre Optique', churn: 42, noChurn: 58 },
  { service: 'DSL', churn: 19, noChurn: 81 },
  { service: 'Sans Internet', churn: 7, noChurn: 93 },
  { service: 'Sécurité en ligne', churn: 15, noChurn: 85 },
  { service: 'Support Tech', churn: 15, noChurn: 85 },
  { service: 'Sauvegarde', churn: 20, noChurn: 80 },
];

// Model performance
export const modelPerformance = {
  rocAuc: 0.87,
  recall: 0.82,
  precision: 0.74,
  f1Score: 0.78,
  accuracy: 0.81,
};

export const rocCurveData = Array.from({ length: 50 }, (_, i) => {
  const fpr = i / 49;
  const tpr = Math.min(1, Math.pow(fpr, 0.35) + (Math.random() * 0.05));
  return { fpr: parseFloat(fpr.toFixed(3)), tpr: parseFloat(tpr.toFixed(3)) };
});

export const confusionMatrix = {
  trueNeg: 1235,
  falsePos: 178,
  falseNeg: 96,
  truePos: 402,
};

// Feature importance
export const featureImportance = [
  { feature: 'Contract_Monthly', importance: 0.185 },
  { feature: 'Tenure', importance: 0.156 },
  { feature: 'MonthlyCharges', importance: 0.134 },
  { feature: 'InternetService_FO', importance: 0.112 },
  { feature: 'TechSupport_No', importance: 0.098 },
  { feature: 'OnlineSecurity_No', importance: 0.087 },
  { feature: 'PaymentMethod_EC', importance: 0.072 },
  { feature: 'NumServices', importance: 0.058 },
  { feature: 'LoyaltyScore', importance: 0.045 },
  { feature: 'TotalCharges', importance: 0.032 },
];

// Segmentation data
export const segmentationData = [
  { segment: 'Champions', count: 823, churnRate: 5, avgRevenue: 89, x: 85, y: 90, size: 823 },
  { segment: 'Loyaux', count: 1456, churnRate: 12, avgRevenue: 72, x: 70, y: 75, size: 1456 },
  { segment: 'Potentiels', count: 987, churnRate: 22, avgRevenue: 61, x: 55, y: 55, size: 987 },
  { segment: 'À Risque', count: 1234, churnRate: 45, avgRevenue: 68, x: 35, y: 35, size: 1234 },
  { segment: 'En Déclin', count: 876, churnRate: 62, avgRevenue: 54, x: 20, y: 20, size: 876 },
  { segment: 'Perdus', count: 543, churnRate: 85, avgRevenue: 42, x: 10, y: 10, size: 543 },
];

// Architecture layers
export const architectureLayers = [
  {
    title: 'Couche Données',
    icon: 'database',
    color: '#3b82f6',
    items: ['ETL Pipeline (Pandas)', 'Feature Engineering Avancé (RFM, Interactions)', 'Gestion Déséquilibre (SMOTE)'],
  },
  {
    title: 'Couche Modèle',
    icon: 'brain',
    color: '#8b5cf6',
    items: ['Baseline : Logistic Regression', 'Principal : XGBoost (Optuna)', 'Explicabilité : SHAP Values'],
  },
  {
    title: 'Couche API',
    icon: 'server',
    color: '#10b981',
    items: ['FastAPI (RESTful, Async)', 'Validation Pydantic', 'Sérialisation Joblib'],
  },
  {
    title: 'Couche Dashboard',
    icon: 'layout',
    color: '#f59e0b',
    items: ['Streamlit / Dash', 'Prédiction Individuelle + Batch', 'Analyse SHAP Temps Réel'],
  },
  {
    title: 'Couche Déploiement',
    icon: 'cloud',
    color: '#ff6b6b',
    items: ['Docker (Container)', 'CI/CD GitHub Actions', 'Cloud : Render / AWS'],
  },
];

// Stack technique
export const techStack = [
  { domain: 'Langage', tools: 'Python 3.11', icon: 'code' },
  { domain: 'Data Science', tools: 'Pandas, NumPy, Scikit-learn, XGBoost', icon: 'bar-chart' },
  { domain: 'Explicabilité', tools: 'SHAP, LIME', icon: 'search' },
  { domain: 'Optimisation', tools: 'Optuna (Hyperparameter Tuning)', icon: 'settings' },
  { domain: 'API', tools: 'FastAPI, Uvicorn, Pydantic', icon: 'server' },
  { domain: 'Dashboard', tools: 'Streamlit / Plotly Dash', icon: 'layout' },
  { domain: 'Base de Données', tools: 'PostgreSQL, SQLite', icon: 'database' },
  { domain: 'Déploiement', tools: 'Docker, Render / AWS', icon: 'cloud' },
];
