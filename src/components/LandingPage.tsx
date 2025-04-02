import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Statistics from '../assets/3d/statistics.png';
import KnowledgeGraph from '../assets/3d/knowledge-graph.png';
import Growth from '../assets/3d/growth.png';
import Increase from '../assets/3d/increase.png';
import BarChart from '../assets/3d/bar-chart.png';
import Graph from '../assets/3d/graph.png';
import PieChart from '../assets/3d/pie-chart.png';
import Navbar from './Navbar';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <img src={Statistics} alt="Statistics" className="w-16 h-16 object-contain" />,
      title: 'Interactive Charts',
      description: 'Create dynamic, responsive charts that bring your data to life',
    },
    {
      icon: <img src={KnowledgeGraph} alt="Modern Design" className="w-16 h-16 object-contain" />,
      title: 'Customizable Themes',
      description: 'Choose from multiple beautiful themes or create your own',
    },
    {
      icon: <img src={Growth} alt="Real-time" className="w-16 h-16 object-contain" />,
      title: 'Instant Preview',
      description: 'See your changes in real-time as you customize your charts',
    },
    {
      icon: <img src={Increase} alt="Advanced" className="w-16 h-16 object-contain" />,
      title: 'Advanced Features',
      description: 'Export, share, and embed charts with ease',
    },
  ];

  const handleStartCreating = () => {
    window.scrollTo(0, 0);
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/0 to-transparent"></div>
      
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-24">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Data into Art
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create stunning, interactive charts with our intuitive drag-and-drop interface. Perfect for presentations, reports, and data visualization.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handleStartCreating}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              Start Creating
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 mb-6 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Open Source & Community Driven
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            GraphIt is an open-source project built with love for the community. We welcome contributions from developers worldwide to make it even better.
          </p>
          <a
            href="http://github.com/Milanchetry21/Graphit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 group"
          >
            <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Contribute on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 