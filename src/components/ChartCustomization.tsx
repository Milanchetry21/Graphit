import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

type ChartType = 'bar' | 'line' | 'pie';
type LegendPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';

interface ChartCustomizationProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  legendPosition: LegendPosition;
  onLegendPositionChange: (position: LegendPosition) => void;
  showLegend: boolean;
  onShowLegendChange: (show: boolean) => void;
  showGridLines: boolean;
  onShowGridLinesChange: (show: boolean) => void;
  showDataLabels: boolean;
  onShowDataLabelsChange: (show: boolean) => void;
  title: string;
  onTitleChange: (title: string) => void;
  xAxisLabel: string;
  onXAxisLabelChange: (label: string) => void;
  yAxisLabel: string;
  onYAxisLabelChange: (label: string) => void;
  titleFontSize: number;
  onTitleFontSizeChange: (size: number) => void;
  axisFontSize: number;
  onAxisFontSizeChange: (size: number) => void;
}

const ChartCustomization: React.FC<ChartCustomizationProps> = ({
  chartType,
  onChartTypeChange,
  theme,
  onThemeChange,
  legendPosition,
  onLegendPositionChange,
  showLegend,
  onShowLegendChange,
  showGridLines,
  onShowGridLinesChange,
  showDataLabels,
  onShowDataLabelsChange,
  title,
  onTitleChange,
  xAxisLabel,
  onXAxisLabelChange,
  yAxisLabel,
  onYAxisLabelChange,
  titleFontSize,
  onTitleFontSizeChange,
  axisFontSize,
  onAxisFontSizeChange,
}) => {
  const themes = [
    { 
      id: 'ocean', 
      name: 'Ocean', 
      gradient: 'from-[#0F4C81] to-[#2D9596]',
      effect: 'bg-gradient-to-r shadow-lg',
      colors: ['#0F4C81', '#2D9596', '#45B7B8', '#6DD5D8', '#8FF0F3']
    },
    { 
      id: 'sunset', 
      name: 'Sunset', 
      gradient: 'from-[#FF6B6B] to-[#FFA07A]',
      effect: 'bg-gradient-to-r shadow-lg',
      colors: ['#FF6B6B', '#FF8573', '#FFA07A', '#FFB482', '#FFC78A']
    },
    { 
      id: 'forest', 
      name: 'Forest', 
      gradient: 'from-[#2E7D32] to-[#81C784]',
      effect: 'bg-gradient-to-r shadow-lg',
      colors: ['#2E7D32', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7']
    },
    { 
      id: 'berry', 
      name: 'Berry', 
      gradient: 'from-[#9C27B0] to-[#E1BEE7]',
      effect: 'bg-gradient-to-r shadow-lg',
      colors: ['#9C27B0', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5']
    },
    {
      id: 'midnight',
      name: 'Midnight',
      gradient: 'from-[#1A237E] to-[#534BAE]',
      effect: 'bg-gradient-to-r before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] before:pointer-events-none shadow-lg',
      colors: ['#1A237E', '#303F9F', '#3949AB', '#3F51B5', '#5C6BC0']
    },
    {
      id: 'neon',
      name: 'Neon',
      gradient: 'from-[#FF1493] to-[#00FFFF]',
      effect: 'bg-gradient-to-r shadow-[0_0_15px_rgba(255,20,147,0.5)] animate-pulse',
      colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#00FFFF', '#40E0D0']
    },
    {
      id: 'frost',
      name: 'Frost',
      gradient: 'from-[#E0F7FA] to-[#B2EBF2]',
      effect: 'bg-gradient-to-r backdrop-blur-sm bg-opacity-50 border border-white/20 shadow-xl',
      colors: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA']
    },
    {
      id: 'grainy',
      name: 'Grainy',
      gradient: 'from-[#6B46C1] to-[#9F7AEA]',
      effect: 'bg-gradient-to-r shadow-lg [background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09vT8+vzs7uxH16TeAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAuFJREFUOI0Vk+3NLiEIRG1B8ClAYAsQ2AIEt4D9ePtv5Xp/mZgYJ2fOFJKEfInkVWY2aglmQFkimRTV7MblYyVqD7HXyhKsSuPX12MeDhRHLtGvRG+P+B/S0Vu4OswR9tmvR32CW/Zt2FOc/wL++PkI6nDeNjBD0W8g5jgEZugJVIBg1xKQWQnWQXR5HkADvkBRoEUGB/IrPwA4BKLAq5Wx8RUALqCvAJcQhQYEuQ+7AOcRCg3IwAMDQkFBQQsC5L0UCoFXAD5BqTMg4Pc+BWxgoF8BCSt1Ae71RoBBYHtBgifxN4JLpRnIQGXCrPwAcjCEBZGqpRc/4mwBYRBYB1FBXMB3QR1BQUEZAQQF5WoBqQBQTaG+K15QBYj1FkoUa1x5BlHAj4EcQvkVAD82ECz4CwiqY1/6CqIJp48Qh/drBUcH+QB+DQJ+BwHvh4GA3wkEfBIE/Ob/LYhfWkzQvYIcC/VXQJEX1BqKgAo6THi3QO4tEL4FYi0CgYAogQgURACkPDXUF3sB8QrhQyBIYz8LwnXfwB1aQXBAHMEZolRRXz4XkHsHBLIWBKuqHq31BYGv4F0xvnwE8SF+Atn4EhQ+YiDoAVDBiHkFXIHsJ/A0TYiAhQq+QJQIBHx5FwSqFtzVNkcBFaTqHAT8BAJ+GwH/H4HAj98lGCE1hbwFQhM3CQJ+jAyqaHiHBYJ3ShBcE3RYINhg74Fw8fCF/48M4GPzD0HqW+0MDlMFqQJEE+MgAIxQHg+xEQi5gAqUPAXl0O1qBYGgwB/gEBjhLggHb1UECPpE1gHFYQNBQXmx+DXVxO8lWBuQAGUJ5ANUAS5BquAqiC4/QJR5j4EKRgmifxAEqnZwEyDgAwiQYYEKCOorwBYhvwMEfBwE/AoCfgMBPzsDgmY8CxRZFUlVBLiC6x6IhHcLbAFU0HEL4lqoKjEI+gAiQFAqo7FeAT8DgZ8A8Df294ljZYYK5Q2s1R8Axk24NiUkDQAAAABJRU5ErkJggg==)]',
      colors: ['#6B46C1', '#805AD5', '#9F7AEA', '#B794F4', '#D6BCFA']
    },
    {
      id: 'glass',
      name: 'Glass',
      gradient: 'from-white/60 to-white/20',
      effect: 'bg-gradient-to-r backdrop-blur-md border border-white/20 shadow-xl',
      colors: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8']
    },
    {
      id: 'retro',
      name: 'Retro',
      gradient: 'from-[#FF8C00] to-[#FF4500]',
      effect: 'bg-gradient-to-r [background-image:repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]',
      colors: ['#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF3300']
    },
    {
      id: 'shadow',
      name: 'Shadow',
      gradient: 'from-[#1E293B] to-[#334155]',
      effect: 'bg-gradient-to-r shadow-[inset_0_2px_15px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.5)] border border-slate-700/50',
      colors: ['#1E293B', '#334155', '#475569', '#64748B', '#94A3B8']
    },
    {
      id: 'candy',
      name: 'Candy',
      gradient: 'from-[#EC4899] to-[#F472B6]',
      effect: 'bg-gradient-to-r animate-gradient bg-[length:200%_200%] shadow-lg',
      colors: ['#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8', '#FCE7F3']
    }
  ];

  const legendPositions: LegendPosition[] = ['top', 'bottom', 'left', 'right'];

  return (
    <div className="space-y-8">
      {/* Chart Type Selection */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Chart Type</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onChartTypeChange('bar')}
            className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
              chartType === 'bar'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-[1.02]'
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-medium">Bar</span>
          </button>
          <button
            onClick={() => onChartTypeChange('line')}
            className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
              chartType === 'line'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-[1.02]'
            }`}
          >
            <LineChart className="w-6 h-6" />
            <span className="text-xs font-medium">Line</span>
          </button>
          <button
            onClick={() => onChartTypeChange('pie')}
            className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
              chartType === 'pie'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-[1.02]'
            }`}
          >
            <PieChart className="w-6 h-6" />
            <span className="text-xs font-medium">Pie</span>
          </button>
        </div>
      </div>

      {/* Display Options */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Display Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
            <span className="text-sm text-slate-300">Grid Lines</span>
            <motion.button
              onClick={() => onShowGridLinesChange(!showGridLines)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                showGridLines ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: showGridLines ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
            <span className="text-sm text-slate-300">Data Labels</span>
            <motion.button
              onClick={() => onShowDataLabelsChange(!showDataLabels)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                showDataLabels ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: showDataLabels ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
            <span className="text-sm text-slate-300">Show Legend</span>
            <motion.button
              onClick={() => onShowLegendChange(!showLegend)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                showLegend ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: showLegend ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          {showLegend && (
            <select
              value={legendPosition}
              onChange={(e) => onLegendPositionChange(e.target.value as LegendPosition)}
              className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white/5 text-slate-300"
            >
              {legendPositions.map((position) => (
                <option key={position} value={position}>
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className={`p-3 rounded-xl flex items-center gap-2 transition-all duration-200 ${
                theme === t.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-[1.02]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${t.gradient} ${t.effect}`} />
              <span className="text-xs font-medium">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white">Text Options</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Chart Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter chart title"
              className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white/5 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              X-Axis Label
            </label>
            <input
              type="text"
              value={xAxisLabel}
              onChange={(e) => onXAxisLabelChange(e.target.value)}
              placeholder="Enter x-axis label"
              className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white/5 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Y-Axis Label
            </label>
            <input
              type="text"
              value={yAxisLabel}
              onChange={(e) => onYAxisLabelChange(e.target.value)}
              placeholder="Enter y-axis label"
              className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white/5 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Title Font Size: {titleFontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="48"
              value={titleFontSize}
              onChange={(e) => onTitleFontSizeChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Axis Font Size: {axisFontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={axisFontSize}
              onChange={(e) => onAxisFontSizeChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCustomization; 