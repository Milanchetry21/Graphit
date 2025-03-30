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
  data: number[];
  labels: string[];
  chartType: ChartType;
  theme: string;
  legendPosition: LegendPosition;
  showGridlines: boolean;
  showDataLabels: boolean;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  titleFontSize: number;
  axisLabelFontSize: number;
  fontFamily: string;
}

const getThemeColors = (theme: string): [string, string, string] => {
  switch (theme) {
    case 'ocean':
      return ['#0F4C81', '#2D9596', '#265073'];
    case 'forest':
      return ['#2E7D32', '#4CAF50', '#81C784'];
    case 'sunset':
      return ['#FF6B6B', '#FF8E72', '#FFA07A'];
    default:
      return ['#0F4C81', '#2D9596', '#265073'];
  }
};

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  data,
  labels,
  chartType,
  theme,
  legendPosition,
  showGridlines,
  showDataLabels,
  title,
  xAxisLabel,
  yAxisLabel,
  titleFontSize,
  axisLabelFontSize,
  fontFamily,
}) => {
  const colors = getThemeColors(theme);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors[0],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: chartType !== 'pie' ? {
      x: {
        grid: {
          display: showGridlines,
        },
      },
      y: {
        grid: {
          display: showGridlines,
        },
        beginAtZero: true,
      },
    } : undefined,
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[400px] chart-container relative group"
    >
      {data.length > 0 ? (
        renderChart()
      ) : (
        <div className="text-center text-gray-500">
          <p>No data to display</p>
          <p className="text-sm">Please input your data to see the visualization</p>
        </div>
      )}
    </motion.div>
  );
};

export default ChartDisplay;