import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import '../styles/animations.css';

interface DataInputProps {
  onSubmit: (datasets: { data: number[]; label: string }[], labels: string[]) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [datasets, setDatasets] = useState<Array<{ label: string; values: Array<[string, number]> }>>([
    {
      label: 'Dataset 1',
      values: [
        ['A', 0],
        ['B', 0],
        ['C', 0],
        ['D', 0],
        ['E', 0],
      ],
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
      const xAxisLabels = Array.from(new Set(datasets.flatMap(ds => ds.values.map(v => v[0]))));
      const processedDatasets = datasets.map(ds => ({
        label: ds.label,
        data: xAxisLabels.map(label => {
          const matchingValue = ds.values.find(v => v[0] === label);
          return matchingValue ? matchingValue[1] : 0;
        }),
      }));

      onSubmit(processedDatasets, xAxisLabels);
    }
  };

  const handleClear = () => {
    setDatasets([{
      label: 'Dataset 1',
      values: [
        ['A', 0],
        ['B', 0],
        ['C', 0],
        ['D', 0],
        ['E', 0],
      ],
    }]);
    setCsvData('');
    onSubmit([], []);
  };

  const handleTableChange = (datasetIndex: number, valueIndex: number, field: 'label' | 'value', newValue: string) => {
    const newDatasets = [...datasets];
    if (field === 'label') {
      newDatasets[datasetIndex].values[valueIndex][0] = newValue;
    } else {
      newDatasets[datasetIndex].values[valueIndex][1] = isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue);
    }
    setDatasets(newDatasets);
  };

  const handleDatasetLabelChange = (datasetIndex: number, newLabel: string) => {
    const newDatasets = [...datasets];
    newDatasets[datasetIndex].label = newLabel;
    setDatasets(newDatasets);
  };

  const addRow = (datasetIndex: number) => {
    const newDatasets = [...datasets];
    newDatasets[datasetIndex].values.push(['', 0]);
    setDatasets(newDatasets);
  };

  const removeRow = (datasetIndex: number, valueIndex: number) => {
    const newDatasets = [...datasets];
    if (newDatasets[datasetIndex].values.length > 1) {
      newDatasets[datasetIndex].values = newDatasets[datasetIndex].values.filter((_, i) => i !== valueIndex);
      setDatasets(newDatasets);
    }
  };

  const addDataset = () => {
    setDatasets([...datasets, {
      label: `Dataset ${datasets.length + 1}`,
      values: [
        ['A', 0],
        ['B', 0],
        ['C', 0],
        ['D', 0],
        ['E', 0],
      ],
    }]);
  };

  const removeDataset = (index: number) => {
    if (datasets.length > 1) {
      setDatasets(datasets.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      {/* Multiple Dataset Tables */}
      <div className="space-y-6">
        {datasets.map((dataset, datasetIndex) => (
          <div key={datasetIndex} className="bg-white rounded-lg border border-[#E5EEF6] p-4">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={dataset.label}
                onChange={(e) => handleDatasetLabelChange(datasetIndex, e.target.value)}
                className="px-3 py-1 text-sm border border-[#E5EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                placeholder="Dataset name"
              />
              {datasets.length > 1 && (
                <button
                  onClick={() => removeDataset(datasetIndex)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                >
                  Remove Dataset
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F5F9FD]">
                    <th className="border border-[#E5EEF6] px-4 py-2 text-sm font-medium text-[#0F4C81] text-left w-12">#</th>
                    <th className="border border-[#E5EEF6] px-4 py-2 text-sm font-medium text-[#0F4C81] text-left">Label</th>
                    <th className="border border-[#E5EEF6] px-4 py-2 text-sm font-medium text-[#0F4C81] text-left">Value</th>
                    <th className="border border-[#E5EEF6] px-4 py-2 text-sm font-medium text-[#0F4C81] w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.values.map((row, valueIndex) => (
                    <tr key={valueIndex} className="hover:bg-[#F5F9FD]/50">
                      <td className="border border-[#E5EEF6] px-4 py-2 text-sm text-gray-600">{valueIndex + 1}</td>
                      <td className="border border-[#E5EEF6] px-4 py-2">
                        <input
                          type="text"
                          value={row[0]}
                          onChange={(e) => handleTableChange(datasetIndex, valueIndex, 'label', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-none focus:outline-none bg-transparent"
                          placeholder="Enter label"
                        />
                      </td>
                      <td className="border border-[#E5EEF6] px-4 py-2">
                        <input
                          type="number"
                          value={row[1]}
                          onChange={(e) => handleTableChange(datasetIndex, valueIndex, 'value', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-none focus:outline-none bg-transparent"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="border border-[#E5EEF6] px-4 py-2">
                        <button
                          onClick={() => removeRow(datasetIndex, valueIndex)}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => addRow(datasetIndex)}
              className="mt-4 px-4 py-2 text-sm font-medium text-[#0F4C81] bg-[#F5F9FD] hover:bg-[#E5EEF6] rounded-lg transition-colors"
            >
              Add Row
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={addDataset}
          className="px-4 py-2 text-sm font-medium text-[#0F4C81] bg-[#F5F9FD] hover:bg-[#E5EEF6] rounded-lg transition-colors"
        >
          Add Dataset
        </button>
        <div className="flex-1" />
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleGenerateChart}
          className="px-4 py-2 text-sm font-medium text-white bg-[#0F4C81] hover:bg-[#0F4C81]/90 rounded-lg transition-colors"
        >
          Generate Chart
        </button>
      </div>

      {/* CSV Import */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#0F4C81]">
          Import CSV Data (First row should be headers, first column should be labels)
        </label>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="Year,Dataset 1,Dataset 2&#10;1990,458,89&#10;1991,721,92&#10;1992,189,95&#10;1993,933,98"
          className="w-full h-32 px-3 py-2 text-sm border border-[#E5EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 font-mono"
        />
      </div>
    </div>
  );
};

export default DataInput;