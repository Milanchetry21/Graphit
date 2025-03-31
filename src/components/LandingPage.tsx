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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0F4C81] to-[#2D9596] bg-clip-text text-transparent">
            Create Beautiful Charts in Seconds
          </h1>
          <p className="text-lg text-[#2D9596] mb-8">
            Transform your data into stunning visualizations with our intuitive chart creator
          </p>
          <motion.button
            onClick={handleStartCreating}
            className="px-8 py-3 bg-[#0F4C81] text-white rounded-lg text-lg font-medium hover:bg-[#0a3b64] transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>

        {/* Chart Type Previews */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {charts.map((chart, index) => (
            <motion.div
              key={chart.type}
              className="aspect-video bg-white rounded-xl shadow-lg border border-[#E5EEF6] p-6 flex items-center justify-center overflow-hidden group hover:border-[#0F4C81] transition-colors"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-6 text-center border border-[#E5EEF6] hover:border-[#0F4C81] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-[#F5F9FD] rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-[#0F4C81] mb-2">{feature.title}</h3>
              <p className="text-[#2D9596]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#0F4C81] mb-4">
            Ready to Create Your Chart?
          </h2>
          <p className="text-[#2D9596] mb-8">
            Start creating beautiful charts in seconds with our intuitive interface
          </p>
          <motion.button
            onClick={handleStartCreating}
            className="px-8 py-3 bg-[#0F4C81] text-white rounded-lg text-lg font-medium hover:bg-[#0a3b64] transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 