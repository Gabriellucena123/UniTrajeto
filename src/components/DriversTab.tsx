import React, { useState, useMemo } from 'react';
import { DriverRide, UserProfile } from '../types';
import { DriverCard } from './DriverCard';
import { RouteModal } from './RouteModal';
import { OfferRideModal } from './OfferRideModal';
import { AdvancedFilterModal } from './AdvancedFilterModal';

interface DriversTabProps {
  rides: DriverRide[];
  userProfile: UserProfile;
  onRequestRide: (ride: DriverRide) => void;
  onPublishRide: (ride: DriverRide) => void;
  showToast: (msg: string) => void;
}

export const DriversTab: React.FC<DriversTabProps> = ({
  rides,
  userProfile,
  onRequestRide,
  onPublishRide,
  showToast
}) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Quick Filter Chips state
  const [filterNight, setFilterNight] = useState(true); // default active like in screenshot
  const [filterLate, setFilterLate] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterSeats, setFilterSeats] = useState(false);

  // Advanced modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('Todos');
  const [minSeats, setMinSeats] = useState(1);
  const [timeFilter, setTimeFilter] = useState('all');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Offer ride modal state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Selected route for preview modal
  const [selectedRouteRide, setSelectedRouteRide] = useState<DriverRide | null>(null);

  // Filter computation
  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      // Text search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesDriver = ride.driverName.toLowerCase().includes(query);
        const matchesDestination = ride.destination.toLowerCase().includes(query);
        const matchesOrigin = ride.origin.toLowerCase().includes(query);
        const matchesCourse = ride.course.toLowerCase().includes(query);
        if (!matchesDriver && !matchesDestination && !matchesOrigin && !matchesCourse) {
          return false;
        }
      }

      // Quick chips
      if (filterNight && !ride.isNight) {
        return false;
      }
      if (filterLate) {
        // departure >= 22:00
        const hour = parseInt(ride.departureTime.split(':')[0], 10);
        if (isNaN(hour) || hour < 22) return false;
      }
      if (filterVerified && !ride.isVerified) {
        return false;
      }
      if (filterSeats && ride.availableSeats < 2) {
        return false;
      }

      // Advanced modal filters
      if (selectedCampus !== 'Todos' && !ride.origin.includes(selectedCampus)) {
        return false;
      }
      if (minSeats > 1 && ride.availableSeats < minSeats) {
        return false;
      }
      if (onlyVerified && !ride.isVerified) {
        return false;
      }
      if (timeFilter === 'night' && !ride.isNight) {
        return false;
      }
      if (timeFilter === '22h') {
        const hour = parseInt(ride.departureTime.split(':')[0], 10);
        if (isNaN(hour) || hour < 22) return false;
      }

      return true;
    });
  }, [
    rides,
    searchTerm,
    filterNight,
    filterLate,
    filterVerified,
    filterSeats,
    selectedCampus,
    minSeats,
    onlyVerified,
    timeFilter
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterNight(false);
    setFilterLate(false);
    setFilterVerified(false);
    setFilterSeats(false);
    setSelectedCampus('Todos');
    setMinSeats(1);
    setTimeFilter('all');
    setOnlyVerified(false);
    showToast('Filtros redefinidos');
  };

  const handleRequestRideFromCard = (ride: DriverRide) => {
    onRequestRide(ride);
    showToast(`Solicitação enviada para ${ride.driverName}! Ele tem até 10 min para aceitar.`);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search & Smart Filter Toolbar */}
      <section className="flex flex-col gap-2 pt-1 mb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full pl-10 pr-10 py-3 bg-white text-[#0b1c30] text-sm rounded-xl shadow-xs border border-[#e5eeff] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
            placeholder="Buscar destino ou motorista..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-10 pr-2 flex items-center text-[#737686] hover:text-[#0b1c30] transition-colors cursor-pointer"
              title="Limpar busca"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          ) : null}
          <button
            aria-label="Abrir filtros avançados"
            onClick={() => setIsFilterModalOpen(true)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#737686] hover:text-[#2563EB] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setFilterNight(!filterNight)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-transform active:scale-95 cursor-pointer ${
              filterNight
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#e5eeff] text-[#434655] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">dark_mode</span>
            <span>Noturno</span>
          </button>

          <button
            onClick={() => setFilterLate(!filterLate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
              filterLate
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#e5eeff] text-[#434655] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>Saída 22h+</span>
          </button>

          <button
            onClick={() => setFilterVerified(!filterVerified)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
              filterVerified
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#e5eeff] text-[#434655] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Somente Verificados</span>
          </button>

          <button
            onClick={() => setFilterSeats(!filterSeats)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
              filterSeats
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#e5eeff] text-[#434655] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">event_seat</span>
            <span>2+ Vagas</span>
          </button>
        </div>
      </section>

      {/* Section Header */}
      <section className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0F172A] font-bold tracking-tight">
              Caronas Disponíveis Hoje
            </h1>
            <span className="px-2 py-0.5 bg-[#2563EB]/10 text-[#2563EB] rounded-full font-['Plus_Jakarta_Sans'] text-[11px] font-bold">
              {filteredRides.length} {filteredRides.length === 1 ? 'ativa' : 'ativas'}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[#006242] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
            Tempo Real
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-[#565e74]">
            Compartilhe rotas seguras com colegas da faculdade
          </p>
          <button
            onClick={() => setIsOfferModalOpen(true)}
            className="inline-flex items-center gap-1 text-[#004ac6] hover:text-[#2563EB] font-['Plus_Jakarta_Sans'] text-xs font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>Oferecer Carona</span>
          </button>
        </div>
      </section>

      {/* Drivers Stream Cards */}
      <div className="flex flex-col gap-4">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <DriverCard
              key={ride.id}
              ride={ride}
              onRequestRide={handleRequestRideFromCard}
              onOpenRoute={(r) => setSelectedRouteRide(r)}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 border border-[#e5eeff] text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#e5eeff] text-[#2563EB] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">directions_car</span>
            </div>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
                Nenhuma carona encontrada
              </p>
              <p className="text-xs text-[#565e74] mt-1 max-w-xs mx-auto">
                Tente ajustar os filtros ou buscar por outro bairro ou campus universitário.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="py-2 px-4 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#004ac6] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </div>

      {/* Safety & Institutional Trust Banner */}
      <section className="mt-6">
        <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center gap-3.5 shadow-xs border border-[#d3e4fe]/70">
          <div className="w-10 h-10 rounded-full bg-[#006242]/10 text-[#006242] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0F172A] font-bold">
              Protocolo de Segurança Ativo
            </span>
            <p className="text-xs text-[#565e74] mt-0.5 leading-snug">
              Todas as caronas contam com monitoramento em tempo real e seguro estudantil.
            </p>
          </div>
        </div>
      </section>

      {/* Route Modal */}
      <RouteModal
        ride={selectedRouteRide}
        onClose={() => setSelectedRouteRide(null)}
        onRequestRide={handleRequestRideFromCard}
      />

      {/* Offer Ride Modal */}
      <OfferRideModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        userProfile={userProfile}
        onPublishRide={(newRide) => {
          onPublishRide(newRide);
          showToast('Carona publicada com sucesso! Colegas já podem visualizar.');
        }}
      />

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        minSeats={minSeats}
        setMinSeats={setMinSeats}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        onlyVerified={onlyVerified}
        setOnlyVerified={setOnlyVerified}
        onReset={handleResetFilters}
      />
    </div>
  );
};
