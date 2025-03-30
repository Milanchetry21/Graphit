import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface DataInputProps {
  onSubmit: (data: number[], labels: string[]) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [dataInput, setDataInput] = useState('');
  const [labelsInput, setLabelsInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Parse data
      const data = dataInput.split(',').map(str => {
        const num = parseFloat(str.trim());
        if (isNaN(num)) {
          throw new Error('Data must be numbers separated by commas');
        }
        return num;
      });

      // Parse labels
      const labels = labelsInput.split(',').map(str => str.trim());

      // Validate lengths match
      if (data.length !== labels.length) {
        throw new Error('Number of data points must match number of labels');
      }

      // Validate not empty
      if (data.length === 0) {
        throw new Error('Please enter at least one data point');
      }

      onSubmit(data, labels);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-[#2D9596] mb-1">
          Data (comma-separated numbers)
        </label>
        <input
          id="data"
          type="text"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          placeholder="1, 2, 3, 4, 5"
          className="w-full px-3 py-2 border border-[#E5EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]"
        />
      </div>

      <div>
        <label htmlFor="labels" className="block text-sm font-medium text-[#2D9596] mb-1">
          Labels (comma-separated text)
        </label>
        <input
          id="labels"
          type="text"
          value={labelsInput}
          onChange={(e) => setLabelsInput(e.target.value)}
          placeholder="A, B, C, D, E"
          className="w-full px-3 py-2 border border-[#E5EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81]"
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        className="w-full px-4 py-2 bg-[#0F4C81] text-white rounded-lg hover:bg-[#0F4C81]/90 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Update Chart
      </motion.button>
    </form>
  );
};

export default DataInput;