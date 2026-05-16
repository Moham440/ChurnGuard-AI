import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KPICards from './components/KPICards';
import ChurnTrendChart from './components/ChurnTrendChart';
import ContractPieChart from './components/ContractPieChart';
import ServiceChurnChart from './components/ServiceChurnChart';
import Segmentation from './components/Segmentation';
import PredictionForm from './components/PredictionForm';
import ShapAnalysis from './components/ShapAnalysis';
import ModelPerformance from './components/ModelPerformance';
import Architecture from './components/Architecture';
import AlertsTable from './components/AlertsTable';
import BusinessImpact from './components/BusinessImpact';
import Monitoring from './components/Monitoring';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-gray-200">
      <Navbar />
      <Hero />
      <KPICards />

      {/* Charts Section */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <ChurnTrendChart />
          <ContractPieChart />
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <ServiceChurnChart />
          <Segmentation />
        </div>
      </section>

      <PredictionForm />
      <ShapAnalysis />
      <ModelPerformance />
      <Architecture />
      <AlertsTable />
      <Monitoring />
      <BusinessImpact />
      <Footer />
    </div>
  );
}
