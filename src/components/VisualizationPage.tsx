import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';
import ChartCustomization from './ChartCustomization';
import DataInput from './DataInput';

const VisualizationPage: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [chartType, setChartType] = useState<string>('bar');
  const [theme, setTheme] = useState<string>('default');
  const [legendPosition, setLegendPosition] = useState<string>('right');
  const [showGridlines, setShowGridlines] = useState<boolean>(true);
  const [showDataLabels, setShowDataLabels] = useState<boolean>(true);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleDataSubmit = (newData: number[], newLabels: string[]) => {
    setData(newData);
    setLabels(newLabels);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0F4C81]">Chart Visualization</h1>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-4 py-2 text-[#0F4C81] hover:bg-[#0F4C81]/10 rounded-lg transition-colors"
          >
            {showSidebar ? 'Hide Options' : 'Show Options'}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex">
        {/* Main Content */}
        <motion.div 
          className={`flex-1 ${showSidebar ? 'mr-6' : ''}`}
          layout
        >
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <ChartDisplay
              data={data}
              labels={labels}
              chartType={chartType}
              theme={theme}
              legendPosition={legendPosition}
              showGridlines={showGridlines}
              showDataLabels={showDataLabels}
            />
          </div>
        </motion.div>

        {/* Sidebar */}
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-80 space-y-6"
          >
            {/* Data Input */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#0F4C81] mb-4">Data Input</h2>
              <DataInput onSubmit={handleDataSubmit} />
            </div>

            {/* Chart Customization */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#0F4C81] mb-4">Customization</h2>
              <ChartCustomization
                chartType={chartType}
                onChartTypeChange={setChartType}
                theme={theme}
                onThemeChange={setTheme}
                legendPosition={legendPosition}
                onLegendPositionChange={setLegendPosition}
                showGridlines={showGridlines}
                onShowGridlinesChange={setShowGridlines}
                showDataLabels={showDataLabels}
                onShowDataLabelsChange={setShowDataLabels}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisualizationPage; 