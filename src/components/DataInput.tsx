import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import '../styles/animations.css';

interface DataInputProps {
  onSubmit: (datasets: { data: number[]; label: string }[], labels: string[]) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [labels, setLabels] = useState<string[]>(['A', 'B', 'C', 'D', 'E']);
  const [datasets, setDatasets] = useState<Array<{ label: string; values: { [key: string]: number } }>>([
    {
      label: 'Dataset 1',
      values: {
        'A': 1,
        'B': 2,
        'C': 3,
        'D': 4,
        'E': 5,
      },
    },
  ]);
  const [csvData, setCsvData] = useState<string>('');

  const handleGenerateChart = () => {
    if (csvData) {
      const rows = csvData.trim().split('\n');
      const headers = rows[0].split(',').map(h => h.trim());
      const datasetLabels = headers.slice(1); // First column is for x-axis labels
      const xAxisLabels = rows.slice(1).map(row => row.split(',')[0].trim());
      
      const newDatasets = datasetLabels.map((label, i) => ({
        label,
        data: rows.slice(1).map(row => parseFloat(row.split(',')[i + 1].trim())),
      }));

      onSubmit(newDatasets, xAxisLabels);
    } else {
      // Handle table data
      const processedDatasets = datasets.map(ds => ({
        label: ds.label,
        data: labels.map(label => ds.values[label] || 0),
      }));

      onSubmit(processedDatasets, labels);
    }
  };

  const handleClear = () => {
    setLabels(['A', 'B', 'C', 'D', 'E']);
    setDatasets([{
      label: 'Dataset 1',
      values: {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
      },
    }]);
    setCsvData('');
    onSubmit([], []);
  };

  const handleTableChange = (datasetIndex: number, label: string, field: 'label' | 'value', newValue: string) => {
    if (field === 'label') {
      // Update the label across all datasets
      const oldLabel = label;
      const newLabels = labels.map(l => l === oldLabel ? newValue : l);
      setLabels(newLabels);
      
      // Update all datasets with the new label
      const newDatasets = datasets.map(ds => ({
        ...ds,
        values: Object.fromEntries(
          Object.entries(ds.values).map(([key, value]) => [
            key === oldLabel ? newValue : key,
            value
          ])
        )
      }));
      setDatasets(newDatasets);
    } else {
      // Update value for specific dataset
      const newDatasets = [...datasets];
      newDatasets[datasetIndex] = {
        ...newDatasets[datasetIndex],
        values: {
          ...newDatasets[datasetIndex].values,
          [label]: isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue)
        }
      };
      setDatasets(newDatasets);
    }
  };

  const handleDatasetLabelChange = (datasetIndex: number, newLabel: string) => {
    const newDatasets = [...datasets];
    newDatasets[datasetIndex].label = newLabel;
    setDatasets(newDatasets);
  };

  const addRow = () => {
    const newLabel = String.fromCharCode(65 + labels.length); // Generate next letter
    setLabels([...labels, newLabel]);
    
    // Add the new label with value 0 to all datasets
    const newDatasets = datasets.map(ds => ({
      ...ds,
      values: {
        ...ds.values,
        [newLabel]: 0
      }
    }));
    setDatasets(newDatasets);
  };

  const removeRow = (label: string) => {
    if (labels.length > 1) {
      const newLabels = labels.filter(l => l !== label);
      setLabels(newLabels);
      
      // Remove the label from all datasets
      const newDatasets = datasets.map(ds => ({
        ...ds,
        values: Object.fromEntries(
          Object.entries(ds.values).filter(([key]) => key !== label)
        )
      }));
      setDatasets(newDatasets);
    }
  };

  const addDataset = () => {
    setDatasets([...datasets, {
      label: `Dataset ${datasets.length + 1}`,
      values: Object.fromEntries(labels.map(label => [label, 0])),
    }]);
  };

  const removeDataset = (index: number) => {
    if (datasets.length > 1) {
      setDatasets(datasets.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      {/* Dataset Inputs */}
      <div className="space-y-4">
        {datasets.map((dataset, datasetIndex) => (
          <div key={datasetIndex} className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={dataset.label}
                onChange={(e) => handleDatasetLabelChange(datasetIndex, e.target.value)}
                placeholder={`Dataset ${datasetIndex + 1} Label`}
                className="flex-1 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                onClick={() => removeDataset(datasetIndex)}
                className="p-2 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {labels.map((label, labelIndex) => (
                <div key={labelIndex} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex-1 grid grid-cols-[80px,1fr] items-center gap-3">
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => handleTableChange(datasetIndex, label, 'label', e.target.value)}
                      placeholder={`Label ${labelIndex + 1}`}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                      type="number"
                      value={dataset.values[label]}
                      onChange={(e) => handleTableChange(datasetIndex, label, 'value', e.target.value)}
                      placeholder="Value"
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <button
                    onClick={() => removeRow(label)}
                    className="shrink-0 p-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={addDataset}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Dataset
        </button>
        <button
          onClick={addRow}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>
        <div className="flex-1" />
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleGenerateChart}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transition-colors hover:shadow-lg hover:shadow-blue-500/20"
        >
          Generate Chart
        </button>
      </div>

      {/* CSV Import */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Import CSV Data (First row should be headers, first column should be labels)
        </label>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="Year,Dataset 1,Dataset 2&#10;1990,458,89&#10;1991,721,92&#10;1992,189,95&#10;1993,933,98"
          className="w-full h-32 px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
        />
      </div>
    </div>
  );
};

export default DataInput;