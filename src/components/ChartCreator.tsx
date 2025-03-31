import React, { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import ChartCustomization from './ChartCustomization';
import DataInput from './DataInput';
import Navbar from './Navbar';

type ChartType = 'bar' | 'line' | 'pie';
type LegendPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';

const ChartCreator: React.FC = () => {
  const [datasets, setDatasets] = useState<{ data: number[]; label: string }[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [chartType, setChartType] = useState<ChartType>('line');
  const [theme, setTheme] = useState('sunset');
  const [legendPosition, setLegendPosition] = useState<LegendPosition>('top');
  const [showLegend, setShowLegend] = useState(true);
  const [showGridLines, setShowGridLines] = useState(true);
  const [showDataLabels, setShowDataLabels] = useState(false);
  const [title, setTitle] = useState('');
  const [xAxisLabel, setXAxisLabel] = useState('');
  const [yAxisLabel, setYAxisLabel] = useState('');
  const [titleFontSize, setTitleFontSize] = useState(20);
  const [axisFontSize, setAxisFontSize] = useState(12);

  const handleDataSubmit = (newDatasets: { data: number[]; label: string }[], newLabels: string[]) => {
    setDatasets(newDatasets);
    setLabels(newLabels);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar: Chart Customization */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 sticky top-24">
              <ChartCustomization
                chartType={chartType}
                onChartTypeChange={setChartType}
                theme={theme}
                onThemeChange={setTheme}
                legendPosition={legendPosition}
                onLegendPositionChange={setLegendPosition}
                showLegend={showLegend}
                onShowLegendChange={setShowLegend}
                showGridLines={showGridLines}
                onShowGridLinesChange={setShowGridLines}
                showDataLabels={showDataLabels}
                onShowDataLabelsChange={setShowDataLabels}
                title={title}
                onTitleChange={setTitle}
                xAxisLabel={xAxisLabel}
                onXAxisLabelChange={setXAxisLabel}
                yAxisLabel={yAxisLabel}
                onYAxisLabelChange={setYAxisLabel}
                titleFontSize={titleFontSize}
                onTitleFontSizeChange={setTitleFontSize}
                axisFontSize={axisFontSize}
                onAxisFontSizeChange={setAxisFontSize}
              />
            </div>
          </div>

          {/* Main Content: Chart Display and Data Input */}
          <div className="col-span-12 lg:col-span-9 space-y-8">
            {/* Chart Display */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <ChartDisplay
                data={datasets.map(d => d.data)}
                datasetLabels={datasets.map(d => d.label)}
                labels={labels}
                chartType={chartType}
                theme={theme}
                legendPosition={legendPosition}
                showLegend={showLegend}
                showGridLines={showGridLines}
                showDataLabels={showDataLabels}
                title={title}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
                titleFontSize={titleFontSize}
                axisFontSize={axisFontSize}
              />
            </div>

            {/* Data Input */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <DataInput onSubmit={handleDataSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCreator; 