import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { FertilizerOptimization } from './pages/FertilizerOptimization';
import { HarvestPrediction } from './pages/HarvestPrediction';
import { DroneMonitoring } from './pages/DroneMonitoring';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'disease':
        return <DiseaseDetection />;
      case 'fertilizer':
        return <FertilizerOptimization />;
      case 'harvest':
        return <HarvestPrediction />;
      case 'drone':
        return <DroneMonitoring />;
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Farm Overview';
      case 'disease': return 'Disease Detection';
      case 'fertilizer': return 'Fertilizer Optimizer';
      case 'harvest': return 'Harvest Prediction';
      case 'drone': return 'Drone Monitoring';
      default: return 'Farm Overview';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} title={getTitle()} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
