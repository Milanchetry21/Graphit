import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingDots from './FloatingDots';

// Import all 3D assets
import BarChart from '../assets/3d/bar-chart.png';
import Graph from '../assets/3d/graph.png';
import PieChart from '../assets/3d/pie-chart.png';
import Statistics from '../assets/3d/statistics.png';
import KnowledgeGraph from '../assets/3d/knowledge-graph.png';
import Growth from '../assets/3d/growth.png';
import Increase from '../assets/3d/increase.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <img src={Statistics} alt="Statistics" className="w-8 h-8" />,
      title: 'Professional Charts',
      description: 'Create stunning bar, line, and pie charts with ease',
    },
    {
      icon: <img src={KnowledgeGraph} alt="Modern Design" className="w-8 h-8" />,
      title: 'Modern Design',
      description: 'Beautiful, clean, and modern visualization aesthetics',
    },
    {
      icon: <img src={Growth} alt="Real-time" className="w-8 h-8" />,
      title: 'Real-time Updates',
      description: 'See your changes instantly as you customize',
    },
    {
      icon: <img src={Increase} alt="Advanced" className="w-8 h-8" />,
      title: 'Advanced Features',
      description: 'Customize colors, fonts, labels, and more',
    },
  ];

  const charts = [
    { type: 'bar', image: BarChart, color: '#0F4C81' },
    { type: 'line', image: Graph, color: '#2D9596' },
    { type: 'pie', image: PieChart, color: '#BB2649' },
  ];

  const handleStartCreating = () => {
    window.scrollTo(0, 0);
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <FloatingDots />
      
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto pt-32 pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0F4C81] to-[#2D9596] bg-clip-text text-transparent leading-tight">
              Transform Your Data into
              <br />
              Beautiful Visualizations
            </h1>
          </motion.div>
          <p className="text-base md:text-lg text-[#2D9596] mb-8 max-w-2xl mx-auto">
            Create professional charts and graphs in seconds. No design skills needed.
          </p>
          <motion.button
            onClick={handleStartCreating}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#0F4C81] text-white rounded-xl font-medium inline-flex items-center gap-2 hover:bg-[#0a3b66] transition-colors shadow-lg shadow-[#0F4C81]/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Creating
          </motion.button>
        </motion.div>

        {/* Chart Type Preview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {charts.map((chart, index) => (
            <motion.div
              key={chart.type}
              className="aspect-video bg-white rounded-xl shadow-sm border border-[#E5EEF6] p-4 flex items-center justify-center overflow-hidden group"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            >
              <motion.img
                src={chart.image}
                alt={`${chart.type} chart`}
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-[#E5EEF6] hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            >
              <div className="w-12 h-12 bg-[#F5F9FD] rounded-lg flex items-center justify-center text-[#0F4C81] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#0F4C81] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#2D9596]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-[#0F4C81] mb-4">
            Ready to Create Your First Chart?
          </h2>
          <motion.button
            onClick={handleStartCreating}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-[#2D9596] text-white rounded-lg font-medium inline-flex items-center gap-2 hover:bg-[#247677] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center pb-8 text-sm text-[#2D9596]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Made with ❤️ by{' '}
          <motion.a
            href="https://www.milanchetry.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-[#0F4C81] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Milan Chetry
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 