import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            GraphIt
          </Link>

          {/* Right side link */}
          <a
            href="https://www.buymeacoffee.com/milanchetry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            Buy me a coffee
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 