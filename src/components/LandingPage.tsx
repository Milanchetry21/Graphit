import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Statistics from '../assets/3d/statistics.png';
import KnowledgeGraph from '../assets/3d/knowledge-graph.png';
import Growth from '../assets/3d/growth.png';
import Increase from '../assets/3d/increase.png';
import Navbar from './Navbar';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <img src={Statistics} alt="Statistics" className="w-12 h-12 object-contain" />,
      title: 'Interactive Charts',
      description: 'Create dynamic, responsive charts that bring your data to life',
    },
    {
      icon: <img src={KnowledgeGraph} alt="Modern Design" className="w-12 h-12 object-contain" />,
      title: 'Customizable Themes',
      description: 'Choose from multiple beautiful themes or create your own',
    },
    {
      icon: <img src={Growth} alt="Real-time" className="w-12 h-12 object-contain" />,
      title: 'Instant Preview',
      description: 'See your changes in real-time as you customize your charts',
    },
    {
      icon: <img src={Increase} alt="Advanced" className="w-12 h-12 object-contain" />,
      title: 'Advanced Features',
      description: 'Export, share, and embed charts with ease',
    },
  ];

  const handleStartCreating = () => {
    window.scrollTo(0, 0);
    navigate('/create');
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/0 to-transparent"></div>
      
      <Navbar />
      
      <div className="container mx-auto px-6 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 relative z-10">
        <div className="text-center mt-24">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Data into Art
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed"
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
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              Start Creating
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-3 mb-3 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center text-slate-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm">
            Made with ❤️ by{' '}
            <a
              href="https://www.milanchetry.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:font-bold transition-all duration-300"
            >
              Milan Chetry
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 