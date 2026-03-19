import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus, Calendar, User, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { NovaNegociacaoForm } from './NovaNegociacaoForm';

// Mock data for Kanban
const initialColumns = {
  'leads': {
    id: 'leads',
    title: 'Leads (Novos)',
    items: [
      { id: '1', title: 'Interesse em Casa - Jardins', client: 'Ana Silva', value: 'R$ 2.500.000', date: 'Hoje' },
      { id: '2', title: 'Apto 2 dorms - Pinheiros', client: 'Carlos Souza', value: 'R$ 850.000', date: 'Ontem' },
      { id: '3', title: 'Aluguel Comercial - Centro', client: 'Tech Corp', value: 'R$ 15.000/mês', date: 'Há 2 dias' },
    ]
  },
  'visitas': {
    id: 'visitas',
    title: 'Visitas Agendadas',
    items: [
      { id: '4', title: 'Cobertura Duplex - Moema', client: 'Julia Martins', value: 'R$ 4.200.000', date: 'Amanhã, 14h' },
      { id: '5', title: 'Terreno em Condomínio', client: 'Eduardo Lima', value: 'R$ 600.000', date: 'Sexta, 10h' },
    ]
  },
  'propostas': {
    id: 'propostas',
    title: 'Propostas em Análise',
    items: [
      { id: '6', title: 'Apto Studio - Itaim Bibi', client: 'Rafael Costa', value: 'R$ 520.000', date: 'Aguardando Cliente' },
    ]
  },
  'fechamento': {
    id: 'fechamento',
    title: 'Em Fechamento',
    items: [
      { id: '7', title: 'Casa de Condomínio', client: 'Família Oliveira', value: 'R$ 1.800.000', date: 'Aguardando Assinatura' },
      { id: '8', title: 'Aluguel - Apto 3 dorms', client: 'Mariana Alves', value: 'R$ 4.500/mês', date: 'Aprovando Crédito' },
    ]
  }
};

type ColumnId = keyof typeof initialColumns;
type PipelineItem = (typeof initialColumns)[ColumnId]['items'][number];

const Pipeline = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedItem, setDraggedItem] = useState<{ id: string, sourceColId: string } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<ColumnId>('leads');

  // Metrics calculation
  const metrics = useMemo(() => {
    let totalDeals = 0;
    let totalValueStr = 0;
    
    Object.values(columns).forEach(col => {
      totalDeals += col.items.length;
      col.items.forEach(item => {
        // Parse "R$ 2.500.000" or similar to number
        const val = item.value.replace(/[^0-9,-]+/g,"").replace('.', '').replace(',', '.');
        if (val) totalValueStr += Number(val);
      });
    });

    const conversionRate = totalDeals > 0 ? Math.round((columns.fechamento.items.length / totalDeals) * 100) : 0;

    return {
      totalDeals,
      totalValue: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValueStr),
      conversionRate
    };
  }, [columns]);

  const handleDragStart = (e: React.DragEvent, itemId: string, colId: string) => {
    setDraggedItem({ id: itemId, sourceColId: colId });
    e.dataTransfer.effectAllowed = 'move';
    // Transparent image for better drag visual handled by Framer Motion conceptually
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { id, sourceColId } = draggedItem;
    if (sourceColId === targetColId) return;

    const sourceCol = columns[sourceColId as keyof typeof columns];
    const targetCol = columns[targetColId as keyof typeof columns];

    const item = sourceCol.items.find(i => i.id === id);
    if (!item) return;

    setColumns({
      ...columns,
      [sourceColId]: {
        ...sourceCol,
        items: sourceCol.items.filter(i => i.id !== id)
      },
      [targetColId]: {
        ...targetCol,
        items: [...targetCol.items, item]
      }
    });
    setDraggedItem(null);
  };

  const handleAddNegociacao = (data: PipelineItem & { columnId: string }) => {
    const { columnId, ...item } = data;
    if (!(columnId in columns)) return;
    const typedColumnId = columnId as ColumnId;
    setColumns((prev) => ({
      ...prev,
      [typedColumnId]: {
        ...prev[typedColumnId],
        items: [...prev[typedColumnId].items, item]
      }
    }));
  };

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pipeline de Vendas</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Arraste os cards para atualizar o status da negociação</p>
        </div>
        <button 
          onClick={() => {
            setSelectedColumnId('leads');
            setIsFormOpen(true);
          }}
          className="w-full sm:w-auto bg-[var(--color-primary)] hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-opacity"
        >
          <Plus size={18} />
          Nova Negociação
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Previsão de Receita</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.totalValue}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Taxa de Conversão</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.conversionRate}%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Negociações Ativas</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.totalDeals}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-4 sm:gap-6 pb-2 sm:pb-4 snap-x snap-mandatory">
        {Object.values(columns).map(column => (
          <div 
            key={column.id}
            className="flex flex-col w-[min(22rem,88vw)] sm:w-[320px] shrink-0 snap-start bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                {column.title}
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">
                  {column.items.length}
                </span>
              </h3>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
              <AnimatePresence>
                {column.items.map(item => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    draggable
                    onDragStartCapture={(e) => handleDragStart(e, item.id, column.id)}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:border-[var(--color-primary)] transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    
                    <p className="text-[var(--color-primary)] font-bold text-sm mb-3">
                      {item.value}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700 gap-2">
                      <div className="flex items-center gap-1 truncate min-w-0 max-w-[140px]">
                        <User size={12} />
                        <span className="truncate">{item.client}</span>
                      </div>
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <Calendar size={12} />
                        {item.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setSelectedColumnId(column.id as ColumnId);
                setIsFormOpen(true);
              }}
              className="mt-3 w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
            >
              <Plus size={16} /> Adicionar
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <NovaNegociacaoForm 
            columns={Object.values(columns)}
            initialColumnId={selectedColumnId}
            onClose={() => setIsFormOpen(false)} 
            onSubmit={handleAddNegociacao} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pipeline;
