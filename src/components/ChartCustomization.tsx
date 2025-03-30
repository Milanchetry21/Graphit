import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, ArrowLeft, Type, Grid, Tag, BarChart, LineChart, PieChart } from 'lucide-react';

interface ChartCustomizationProps {
  title: string;
  setTitle: (title: string) => void;
  xAxisLabel: string;
  setXAxisLabel: (label: string) => void;
  yAxisLabel: string;
  setYAxisLabel: (label: string) => void;
  titleFontSize: number;
  setTitleFontSize: (size: number) => void;
  axisLabelFontSize: number;
  setAxisLabelFontSize: (size: number) => void;
  showGridlines: boolean;
  setShowGridlines: (show: boolean) => void;
  showDataLabels: boolean;
  setShowDataLabels: (show: boolean) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  onBack: () => void;
  onThemeChange: (theme: string) => void;
  onGridlinesChange: (show: boolean) => void;
  onDataLabelsChange: (show: boolean) => void;
  onLegendPositionChange: (position: string) => void;
  selectedTheme: string;
  legendPosition: string;
  chartType: 'bar' | 'line' | 'pie';
  onChartTypeChange: (type: 'bar' | 'line' | 'pie') => void;
}

const ChartCustomization: React.FC<ChartCustomizationProps> = ({
  title,
  setTitle,
  xAxisLabel,
  setXAxisLabel,
  yAxisLabel,
  setYAxisLabel,
  titleFontSize,
  setTitleFontSize,
  axisLabelFontSize,
  setAxisLabelFontSize,
  showGridlines,
  setShowGridlines,
  showDataLabels,
  setShowDataLabels,
  fontFamily,
  setFontFamily,
  onBack,
  onThemeChange,
  onGridlinesChange,
  onDataLabelsChange,
  onLegendPositionChange,
  selectedTheme,
  legendPosition,
  chartType,
  onChartTypeChange,
}) => {
  const fonts = [
    'Inter',
    'Poppins',
    'DM Sans',
    'Spline Sans',
    'Arial',
    'Helvetica',
    'Times New Roman',
  ];

  const themes = [
    { id: 'modern-blue', name: 'Modern Blue', colors: ['#0F4C81', '#2D9596'] },
    { id: 'minimal', name: 'Minimal', colors: ['#2C3E50', '#BDC3C7'] },
    { id: 'ocean-gradient', name: 'Ocean Gradient', colors: ['#1A4B84', '#41B3A3'] },
    { id: 'neon-green', name: 'Neon Green', colors: ['#00FF9D', '#00B377'] },
    { id: 'sunset-orange', name: 'Sunset Orange', colors: ['#FF7E5F', '#FEB47B'] },
    { id: 'electric-pink', name: 'Electric Pink', colors: ['#FF1493', '#FF69B4'] },
    { id: 'sunny-yellow', name: 'Sunny Yellow', colors: ['#FFD700', '#FFA500'] },
    { id: 'royal-purple', name: 'Royal Purple', colors: ['#7B1FA2', '#9C27B0'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-[#E5EEF6]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-[#2D9596]" />
          <h3 className="text-base font-medium text-[#0F4C81]">Customize</h3>
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Grid className="w-4 h-4" />
            <span>Chart Type</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onChartTypeChange('bar')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                chartType === 'bar'
                  ? 'bg-[#0F4C81] text-white'
                  : 'hover:bg-[#F5F9FD] text-[#2D9596]'
              }`}
            >
              <BarChart className="w-5 h-5" />
              <span className="text-xs">Bar</span>
            </button>
            <button
              onClick={() => onChartTypeChange('line')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                chartType === 'line'
                  ? 'bg-[#0F4C81] text-white'
                  : 'hover:bg-[#F5F9FD] text-[#2D9596]'
              }`}
            >
              <LineChart className="w-5 h-5" />
              <span className="text-xs">Line</span>
            </button>
            <button
              onClick={() => onChartTypeChange('pie')}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                chartType === 'pie'
                  ? 'bg-[#0F4C81] text-white'
                  : 'hover:bg-[#F5F9FD] text-[#2D9596]'
              }`}
            >
              <PieChart className="w-5 h-5" />
              <span className="text-xs">Pie</span>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Type className="w-4 h-4" />
            <span>Typography</span>
          </div>
          
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-[#0F4C81] mb-1">
              Chart Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E5EEF6] rounded-lg focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all text-[#2D9596]"
              placeholder="Enter chart title"
            />
          </div>

          <div>
            <label htmlFor="fontFamily" className="block text-xs font-medium text-[#0F4C81] mb-1">
              Font Family
            </label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E5EEF6] rounded-lg focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all text-[#2D9596]"
            >
              {fonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="titleFontSize" className="block text-xs font-medium text-[#0F4C81] mb-1">
              Title Size
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                id="titleFontSize"
                min="12"
                max="48"
                value={titleFontSize}
                onChange={(e) => setTitleFontSize(Number(e.target.value))}
                className="flex-1 accent-[#0F4C81]"
              />
              <span className="text-xs text-[#2D9596] w-12">{titleFontSize}px</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Tag className="w-4 h-4" />
            <span>Axis Labels</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="xAxis" className="block text-xs font-medium text-[#0F4C81] mb-1">
                X-Axis
              </label>
              <input
                id="xAxis"
                type="text"
                value={xAxisLabel}
                onChange={(e) => setXAxisLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E5EEF6] rounded-lg focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all text-[#2D9596]"
                placeholder="X-Axis"
              />
            </div>
            <div>
              <label htmlFor="yAxis" className="block text-xs font-medium text-[#0F4C81] mb-1">
                Y-Axis
              </label>
              <input
                id="yAxis"
                type="text"
                value={yAxisLabel}
                onChange={(e) => setYAxisLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E5EEF6] rounded-lg focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all text-[#2D9596]"
                placeholder="Y-Axis"
              />
            </div>
          </div>

          <div>
            <label htmlFor="axisLabelFontSize" className="block text-xs font-medium text-[#0F4C81] mb-1">
              Label Size
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                id="axisLabelFontSize"
                min="8"
                max="24"
                value={axisLabelFontSize}
                onChange={(e) => setAxisLabelFontSize(Number(e.target.value))}
                className="flex-1 accent-[#0F4C81]"
              />
              <span className="text-xs text-[#2D9596] w-12">{axisLabelFontSize}px</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Grid className="w-4 h-4" />
            <span>Display</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="showGridlines" className="text-sm text-[#0F4C81]">
                Show Gridlines
              </label>
              <div className="relative inline-block w-8 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="showGridlines"
                  checked={showGridlines}
                  onChange={(e) => setShowGridlines(e.target.checked)}
                  className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="showGridlines"
                  className={`toggle-label block h-4 rounded-full cursor-pointer ${
                    showGridlines ? 'bg-[#0F4C81]' : 'bg-[#E5EEF6]'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="showDataLabels" className="text-sm text-[#0F4C81]">
                Show Data Labels
              </label>
              <div className="relative inline-block w-8 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="showDataLabels"
                  checked={showDataLabels}
                  onChange={(e) => setShowDataLabels(e.target.checked)}
                  className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="showDataLabels"
                  className={`toggle-label block h-4 rounded-full cursor-pointer ${
                    showDataLabels ? 'bg-[#0F4C81]' : 'bg-[#E5EEF6]'
                  }`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Grid className="w-4 h-4" />
            <span>Theme</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`relative p-4 rounded-lg border transition-all ${
                  selectedTheme === theme.id
                    ? 'border-[#0F4C81] shadow-md'
                    : 'border-[#E5EEF6] hover:border-[#0F4C81]/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-2 mb-2">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#2D9596]">
                  {theme.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
            <Grid className="w-4 h-4" />
            <span>Legend Position</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0F4C81] mb-2">
              Legend Position
            </label>
            <select
              value={legendPosition}
              onChange={(e) => onLegendPositionChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E5EEF6] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 transition-all"
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ChartCustomization; 