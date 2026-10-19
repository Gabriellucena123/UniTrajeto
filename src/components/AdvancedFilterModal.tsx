import React from 'react';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  minSeats: number;
  setMinSeats: (seats: number) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
  onlyVerified: boolean;
  setOnlyVerified: (v: boolean) => void;
  onReset: () => void;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  isOpen,
  onClose,
  selectedCampus,
  setSelectedCampus,
  minSeats,
  setMinSeats,
  timeFilter,
  setTimeFilter,
  onlyVerified,
  setOnlyVerified,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[22px]">tune</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base text-[#0F172A] font-bold">
              Filtros Avançados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#434655] flex items-center justify-center hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 text-xs">
          {/* Campus Origin Filter */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1.5">Campus de Partida:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Todos', 'Campus Centro', 'Campus Sul', 'Campus Saúde'].map((campus) => (
                <button
                  key={campus}
                  type="button"
                  onClick={() => setSelectedCampus(campus)}
                  className={`py-2 px-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    selectedCampus === campus
                      ? 'border-[#2563EB] bg-[#e5eeff] text-[#004ac6] font-semibold'
                      : 'border-[#e5eeff] bg-[#f8f9ff] text-[#434655] hover:border-[#c3c6d7]'
                  }`}
                >
                  {campus}
                </button>
              ))}
            </div>
          </div>

          {/* Departure window */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1.5">Janela de Horário:</label>
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'night', label: 'Noturno (21h+)' },
                { id: '22h', label: 'Saída 22h+' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTimeFilter(t.id)}
                  className={`flex-1 py-2 px-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                    timeFilter === t.id
                      ? 'border-[#2563EB] bg-[#e5eeff] text-[#004ac6] font-semibold'
                      : 'border-[#e5eeff] bg-[#f8f9ff] text-[#434655]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum seats */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1.5">Vagas Mínimas:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setMinSeats(s)}
                  className={`flex-1 py-2 rounded-lg border text-center transition-colors cursor-pointer ${
                    minSeats === s
                      ? 'border-[#2563EB] bg-[#e5eeff] text-[#004ac6] font-semibold'
                      : 'border-[#e5eeff] bg-[#f8f9ff] text-[#434655]'
                  }`}
                >
                  {s}+ {s === 1 ? 'vaga' : 'vagas'}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle verified */}
          <div className="flex items-center justify-between p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
            <div>
              <span className="font-semibold text-[#0F172A] block">Apenas Alunos Verificados</span>
              <span className="text-[11px] text-[#565e74]">Motoristas com RA institucional e documento validado</span>
            </div>
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="h-5 w-5 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-[#e5eeff]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#004ac6] hover:bg-[#2563EB] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Aplicar Filtros
          </button>
          <button
            type="button"
            onClick={onReset}
            className="py-2.5 px-4 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0F172A] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};
