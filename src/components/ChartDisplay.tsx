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
      return ['#0F4C81', '#2D9596', '#45B7B8', '#6DD5D8', '#8FF0F3'];
    case 'sunset':
      return ['#FF6B6B', '#FF8573', '#FFA07A', '#FFB482', '#FFC78A'];
    case 'forest':
      return ['#2E7D32', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];
    case 'berry':
      return ['#9C27B0', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5'];
    case 'midnight':
      return ['#1A237E', '#303F9F', '#3949AB', '#3F51B5', '#5C6BC0'];
    case 'neon':
      return ['#FF1493', '#FF69B4', '#FFB6C1', '#00FFFF', '#40E0D0'];
    case 'frost':
      return ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'];
    case 'grainy':
      return ['#6B46C1', '#805AD5', '#9F7AEA', '#B794F4', '#D6BCFA'];
    case 'glass':
      return ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8'];
    case 'retro':
      return ['#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF3300'];
    case 'shadow':
      return ['#1E293B', '#334155', '#475569', '#64748B', '#94A3B8'];
    case 'candy':
      return ['#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8', '#FCE7F3'];
    default:
      return ['#0F4C81', '#2D9596', '#45B7B8', '#6DD5D8', '#8FF0F3'];
  }
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
          ? 'white'
          : 'transparent',
        borderWidth: chartType === 'pie' ? 2 : 2,
        tension: 0.4,
        fill: chartType === 'line' ? {
          target: 'origin',
          above: `rgba(${r}, ${g}, ${b}, 0.1)`,
        } : false,
        pointBackgroundColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointBorderColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointHoverBackgroundColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointHoverBorderColor: chartType === 'line' ? colors[datasetIndex % colors.length] : undefined,
        pointRadius: chartType === 'line' ? 4 : undefined,
        pointHoverRadius: chartType === 'line' ? 6 : undefined,
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
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          font: {
            size: axisFontSize,
          },
          usePointStyle: chartType !== 'pie',
          pointStyle: 'circle',
          padding: 20,
        },
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: titleFontSize,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        titleFont: {
          size: axisFontSize,
        },
        bodyFont: {
          size: axisFontSize,
        },
        mode: 'index' as const,
        intersect: false,
        callbacks: chartType === 'pie' ? {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${value} (${percentage}%)`;
          }
        } : undefined,
      },
      datalabels: {
        display: showDataLabels,
        color: '#fff',
        font: {
          size: axisFontSize,
          weight: 'bold' as const,
        },
        formatter: chartType === 'pie' ? (value: number) => {
          const total = data[0].reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        } : undefined,
      },
    },
    scales: chartType !== 'pie' ? {
      x: {
        grid: {
          display: showGridLines,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
          font: {
            size: axisFontSize,
          },
          padding: { top: 10 },
        },
        ticks: {
          font: {
            size: axisFontSize,
          },
        },
      },
      y: {
        grid: {
          display: showGridLines,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          font: {
            size: axisFontSize,
          },
          padding: { bottom: 10 },
        },
        ticks: {
          font: {
            size: axisFontSize,
          },
        },
        beginAtZero: true,
      },
    } : undefined,
    elements: {
      line: chartType === 'line' ? {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
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
      <div className="h-full flex items-center justify-center text-[#2D9596]">
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