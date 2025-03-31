import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChartCreator from './components/ChartCreator';
import Navbar from './components/Navbar';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<ChartCreator />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;