import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  statusFilter: string;
  divisionFilter: string;
  onStatusFilterChange: (status: string) => void;
  onDivisionFilterChange: (division: string) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  divisionFilter,
  onStatusFilterChange,
  onDivisionFilterChange,
  onClearFilters
}) => {
  const statusOptions = ['All', 'Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];
  const divisionOptions = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

  const hasActiveFilters = statusFilter !== 'All' || divisionFilter !== 'All';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Division:</label>
          <select
            value={divisionFilter}
            onChange={(e) => onDivisionFilterChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
          >
            {divisionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-[#CA2420] transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;