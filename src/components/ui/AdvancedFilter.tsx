import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Save, Bookmark } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'date';
  options?: { value: string; label: string }[];
}

interface AdvancedFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  filterOptions: FilterOption[];
}

export const AdvancedFilter = ({ onSearch, onFilterChange, filterOptions }: AdvancedFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [savedFilters, setSavedFilters] = useState<{name: string, filters: Record<string, any>}[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  const handleFilterChange = (id: string, value: any) => {
    const newFilters = { ...filters, [id]: value };
    if (!value || value === 'Todos') {
      delete newFilters[id];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const saveCurrentFilter = () => {
    const name = prompt('Nome para este filtro:');
    if (name) {
      setSavedFilters([...savedFilters, { name, filters: { ...filters } }]);
    }
  };

  const applySavedFilter = (saved: Record<string, any>) => {
    setFilters(saved);
    onFilterChange(saved);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Busca rápida em tempo real..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:text-white transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border ${
              isExpanded || Object.keys(filters).length > 0 
                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400' 
                : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filtros Avançados
            {Object.keys(filters).length > 0 && (
              <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
                {Object.keys(filters).length}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
          >
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filterOptions.map(option => (
                  <div key={option.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {option.label}
                    </label>
                    
                    {option.type === 'select' && option.options ? (
                      <select 
                        value={filters[option.id] || ''}
                        onChange={(e) => handleFilterChange(option.id, e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:text-white"
                      >
                        <option value="Todos">Todos</option>
                        {option.options.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : option.type === 'number' ? (
                      <input 
                        type="number"
                        value={filters[option.id] || ''}
                        onChange={(e) => handleFilterChange(option.id, e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:text-white"
                      />
                    ) : (
                      <input 
                        type="text"
                        value={filters[option.id] || ''}
                        onChange={(e) => handleFilterChange(option.id, e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:text-white"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2">
                  {savedFilters.length > 0 && (
                    <div className="flex gap-2 items-center mr-4">
                      <Bookmark size={14} className="text-slate-400" />
                      {savedFilters.map((sf, idx) => (
                        <button 
                          key={idx}
                          onClick={() => applySavedFilter(sf.filters)}
                          className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md hover:border-[var(--color-primary)] transition-colors"
                        >
                          {sf.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                  >
                    <X size={14} /> Limpar
                  </button>
                  <button 
                    onClick={saveCurrentFilter}
                    disabled={Object.keys(filters).length === 0}
                    className="text-sm text-[var(--color-primary)] hover:opacity-80 flex items-center gap-1 font-medium disabled:opacity-50"
                  >
                    <Save size={14} /> Salvar Filtro
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
