import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import '../styles/animations.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'pie';
type LegendPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';

interface ChartDisplayProps {
  data: number[][];
  labels: string[];
  datasetLabels: string[];
  chartType: ChartType;
  theme: string;
  legendPosition: LegendPosition;
  showLegend: boolean;
  showGridLines: boolean;
  showDataLabels: boolean;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  titleFontSize: number;
  axisFontSize: number;
}

const getThemeColors = (theme: string): string[] => {
  switch (theme) {
    case 'ocean':
      return ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC'].map(color => addGradientToColor(color));
    case 'sunset':
      return ['#F97316', '#FB923C', '#FD8A4B', '#FDBA74', '#FED7AA'].map(color => addGradientToColor(color));
    case 'forest':
      return ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'].map(color => addGradientToColor(color));
    case 'berry':
      return ['#C026D3', '#D946EF', '#E879F9', '#F0ABFC', '#F5D0FE'].map(color => addGradientToColor(color));
    case 'midnight':
      return ['#3730A3', '#4F46E5', '#6366F1', '#818CF8', '#A5B4FC'].map(color => addGradientToColor(color));
    case 'neon':
      return ['#DB2777', '#EC4899', '#F472B6', '#00B4D8', '#90E0EF'].map(color => addGradientToColor(color));
    case 'frost':
      return ['#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#E0F2FE'].map(color => addGradientToColor(color));
    case 'grainy':
      return ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'].map(color => addGradientToColor(color));
    case 'glass':
      return ['#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0', '#F1F5F9'].map(color => addGradientToColor(color));
    case 'retro':
      return ['#EA580C', '#F97316', '#FB923C', '#FD8A4B', '#FDBA74'].map(color => addGradientToColor(color));
    case 'shadow':
      return ['#334155', '#475569', '#64748B', '#94A3B8', '#CBD5E1'].map(color => addGradientToColor(color));
    case 'candy':
      return ['#BE185D', '#DB2777', '#EC4899', '#F472B6', '#F9A8D4'].map(color => addGradientToColor(color));
    default:
      return ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC'].map(color => addGradientToColor(color));
  }
};

const addGradientToColor = (color: string): string => {
  // Convert hex to RGB for gradient manipulation
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return color;
};

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  data,
  labels,
  datasetLabels,
  chartType,
  theme,
  legendPosition,
  showLegend,
  showGridLines,
  showDataLabels,
  title,
  xAxisLabel,
  yAxisLabel,
  titleFontSize,
  axisFontSize,
}) => {
  const colors = getThemeColors(theme);

  const chartData = {
    labels,
    datasets: data.map((dataset, datasetIndex) => {
      const color = colors[datasetIndex % colors.length];
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      
      return {
        label: datasetLabels[datasetIndex] || `Dataset ${datasetIndex + 1}`,
        data: dataset,
        backgroundColor: chartType === 'pie' 
          ? dataset.map((_, index) => colors[index % colors.length])
          : chartType === 'line'
          ? `rgba(${r}, ${g}, ${b}, 0.1)`
          : colors[datasetIndex % colors.length],
        borderColor: chartType === 'line' 
          ? colors[datasetIndex % colors.length] 
          : chartType === 'pie'
          ? 'rgba(255, 255, 255, 0.8)'
          : 'transparent',
        borderWidth: chartType === 'pie' ? 2 : 2,
        tension: 0.4,
        fill: chartType === 'line' ? {
          target: 'origin',
          above: `rgba(${r}, ${g}, ${b}, 0.1)`,
        } : false,
        pointBackgroundColor: chartType === 'line' ? '#ffffff' : undefined,
        pointBorderColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointHoverBackgroundColor: chartType === 'line' ? '#ffffff' : undefined,
        pointHoverBorderColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointBorderWidth: chartType === 'line' ? 2 : undefined,
        pointRadius: chartType === 'line' ? 4 : undefined,
        pointHoverRadius: chartType === 'line' ? 6 : undefined,
        pointHoverBorderWidth: chartType === 'line' ? 3 : undefined,
        hoverOffset: chartType === 'pie' ? 20 : undefined,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        align: 'center' as const,
        labels: {
          font: {
            size: axisFontSize,
            family: "'Inter', sans-serif",
            weight: 'normal' as const,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#E2E8F0',
          boxWidth: 6,
          boxHeight: 6,
        },
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: titleFontSize,
          family: "'Inter', sans-serif",
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        color: '#F1F5F9',
      },
      tooltip: {
        enabled: true,
        titleFont: {
          size: axisFontSize,
          family: "'Inter', sans-serif",
          weight: 'bold' as const,
        },
        bodyFont: {
          size: axisFontSize,
          family: "'Inter', sans-serif",
          weight: 'normal' as const,
        },
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F1F5F9',
        bodyColor: '#E2E8F0',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: chartType === 'pie' ? {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${value.toLocaleString()} (${percentage}%)`;
          }
        } : {
          label: function(context: any) {
            return ` ${context.raw.toLocaleString()}`;
          }
        },
      },
      datalabels: {
        display: showDataLabels,
        color: '#FFFFFF',
        font: {
          size: axisFontSize,
          family: "'Inter', sans-serif",
          weight: '600' as const,
        },
        formatter: chartType === 'pie' ? (value: number) => {
          const total = data[0].reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        } : (value: number) => value.toLocaleString(),
        textAlign: 'center',
        textStrokeColor: 'rgba(0, 0, 0, 0.5)',
        textStrokeWidth: 3,
        offset: 8,
      },
    },
    scales: chartType !== 'pie' ? {
      x: {
        grid: {
          display: showGridLines,
          drawBorder: false,
          color: 'rgba(148, 163, 184, 0.1)',
        },
        border: {
          display: false,
        },
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
          font: {
            size: axisFontSize,
            family: "'Inter', sans-serif",
            weight: '500' as const,
          },
          padding: { top: 10 },
          color: '#E2E8F0',
        },
        ticks: {
          font: {
            size: axisFontSize,
            family: "'Inter', sans-serif",
          },
          color: '#94A3B8',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          display: showGridLines,
          drawBorder: false,
          color: 'rgba(148, 163, 184, 0.1)',
        },
        border: {
          display: false,
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          font: {
            size: axisFontSize,
            family: "'Inter', sans-serif",
            weight: '500' as const,
          },
          padding: { bottom: 10 },
          color: '#E2E8F0',
        },
        ticks: {
          font: {
            size: axisFontSize,
            family: "'Inter', sans-serif",
          },
          color: '#94A3B8',
          callback: function(value: any) {
            return value.toLocaleString();
          },
        },
        beginAtZero: true,
      },
    } : undefined,
    elements: {
      line: chartType === 'line' ? {
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      } : undefined,
      point: chartType === 'line' ? {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 4,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
      } : undefined,
      bar: chartType === 'bar' ? {
        borderRadius: 8,
        borderSkipped: false,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 4,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
      } : undefined,
      arc: chartType === 'pie' ? {
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowBlur: 8,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      } : undefined,
    },
  };

  const renderChart = () => {
    switch (chartType) {
    case 'bar':
      return <Bar data={chartData} options={options} />;
    case 'line':
      return <Line data={chartData} options={options} />;
    case 'pie':
      return <Pie data={chartData} options={options} />;
    default:
        return <Bar data={chartData} options={options} />;
    }
  };

  if (!data.length || !labels.length) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        Enter data to generate a chart
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[400px] chart-container relative group"
    >
      {renderChart()}
    </motion.div>
  );
};

export default ChartDisplay;