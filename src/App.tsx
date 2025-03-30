import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { BarChart, LineChart, PieChart, Settings2, Download, Share2, ArrowLeft } from 'lucide-react';
import DataInput from './components/DataInput';
import ChartDisplay from './components/ChartDisplay';
import ChartCustomization from './components/ChartCustomization';
import LandingPage from './components/LandingPage';
import VisualizationPage from './components/VisualizationPage';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';

type ChartType = 'bar' | 'line' | 'pie';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<VisualizationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;