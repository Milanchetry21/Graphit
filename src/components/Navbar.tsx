import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.nav
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0F4C81] to-[#2D9596] bg-clip-text text-transparent">
              graphit
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {!isHome && (
              <Link
                to="/"
                className="px-4 py-2 text-[#2D9596] hover:text-[#0F4C81] transition-colors"
              >
                Home
              </Link>
            )}
            {isHome && (
              <Link
                to="/create"
                className="px-4 py-2 bg-[#0F4C81] text-white rounded-lg hover:bg-[#0F4C81]/90 transition-colors"
              >
                Create Chart
              </Link>
            )}
            <a
              href="https://www.buymeacoffee.com/graphit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-[#000000] rounded-lg hover:bg-[#FFDD00]/90 transition-colors font-medium"
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 