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
      icon: <img src={Statistics} alt="Statistics" className="w-12 h-12 object-contain" />,
      title: 'Professional Charts',
      description: 'Create stunning bar, line, and pie charts with ease',
    },
    {
      icon: <img src={KnowledgeGraph} alt="Modern Design" className="w-12 h-12 object-contain" />,
      title: 'Modern Design',
      description: 'Beautiful, clean, and modern visualization aesthetics',
    },
    {
      icon: <img src={Growth} alt="Real-time" className="w-12 h-12 object-contain" />,
      title: 'Real-time Updates',
      description: 'See your changes instantly as you customize',
    },
    {
      icon: <img src={Increase} alt="Advanced" className="w-12 h-12 object-contain" />,
      title: 'Advanced Features',
      description: 'Customize colors, fonts, labels, and more',
    },
  ];

  const handleStartCreating = () => {
    window.scrollTo(0, 0);
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <Navbar />
      
      {/* 3D Elements on sides */}
      <div className="absolute left-0 top-1/4 transform -translate-x-1/2 opacity-40">
        <img src={BarChart} alt="" className="w-64 h-64 object-contain" />
      </div>
      <div className="absolute right-0 top-1/3 transform translate-x-1/2 opacity-40">
        <img src={Graph} alt="" className="w-64 h-64 object-contain" />
      </div>
      <div className="absolute left-0 bottom-1/4 transform -translate-x-1/2 opacity-40">
        <img src={PieChart} alt="" className="w-64 h-64 object-contain" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
          <motion.div 
            className="relative text-center max-w-4xl mx-auto mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-bold mb-6 text-white">
              Create Professional
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Charts </span>
              That Stand Out
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Transform your data into stunning visualizations with our powerful and intuitive chart creator
            </p>
            <motion.button
              onClick={handleStartCreating}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl text-lg font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Start Creating Now
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Chart?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join thousands of users who create beautiful charts every day
          </p>
          <motion.button
            onClick={handleStartCreating}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl text-lg font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            Start Creating Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 