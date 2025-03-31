import React, { useState } from 'react';
import ChartDisplay from './ChartDisplay';
import ChartCustomization from './ChartCustomization';
import DataInput from './DataInput';

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
    <div className="max-w-[1200px] mx-auto px-6 pt-20">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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

      <div className="space-y-6">
        {/* Chart Display */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-[500px]">
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DataInput onSubmit={handleDataSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChartCreator; 