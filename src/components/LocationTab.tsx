import React, { useState } from 'react';
import { DriverRide } from '../types';
import { CAMPUS_LOCATIONS } from '../data/mockData';

interface LocationTabProps {
  rides: DriverRide[];
  onRequestRide: (ride: DriverRide) => void;
  onOpenRoute: (ride: DriverRide) => void;
  showToast: (msg: string) => void;
}

export const LocationTab: React.FC<LocationTabProps> = ({
  rides,
  onRequestRide,
  onOpenRoute,
  showToast
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Todas');
  const [activeDriverId, setActiveDriverId] = useState<string | null>(rides[0]?.id || null);
  const [searchDestination, setSearchDestination] = useState('');

  const selectedDriver = rides.find((r) => r.id === activeDriverId) || rides[0];

  // Simulated vehicle positions on the campus coordinate grid
  const vehiclePins = [
    { id: 'carlos-1', x: 42, y: 48, label: 'Carlos S. (Onix)', duration: '2 min do Portão 2', seats: 3 },
    { id: 'mariana-2', x: 65, y: 64, label: 'Mariana C. (HB20)', duration: 'Parada no Prédio Central', seats: 2 },
    { id: 'felipe-3', x: 30, y: 38, label: 'Felipe R. (Polo)', duration: 'Estacionamento A', seats: 4 },
    { id: 'beatriz-4', x: 74, y: 36, label: 'Beatriz L. (Renegade)', duration: 'Ambulatório Geral', seats: 2 }
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Floating search destination header */}
      <section className="flex flex-col gap-2 pt-1 mb-3">
        <div className="relative w-full shadow-xs rounded-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2563EB]">
            <span className="material-symbols-outlined text-[20px]">explore</span>
          </div>
          <input
            className="w-full pl-10 pr-10 py-3 bg-white text-[#0b1c30] text-sm rounded-xl border border-[#e5eeff] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
            placeholder="Para onde você vai hoje? Ex: Metrô, Tatuapé..."
            type="text"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
          />
          {searchDestination && (
            <button
              onClick={() => setSearchDestination('')}
              className="absolute inset-y-0 right-3 flex items-center text-[#737686] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
        </div>

        {/* Campus Hub quick selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['Todas', 'Campus Centro', 'Campus Sul', 'Metrô Linha Azul', 'Tatuapé'].map((hub) => (
            <button
              key={hub}
              onClick={() => setSelectedLocation(hub)}
              className={`px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedLocation === hub
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#e5eeff] text-[#434655] hover:text-[#0b1c30]'
              }`}
            >
              {hub}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Campus Map Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#eff4ff] border border-[#d3e4fe] shadow-sm select-none">
        {/* Vector Campus Blueprint */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="campusZone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dce9ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#eff4ff" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Campus green zones & quadrangles */}
          <rect x="0" y="0" width="100" height="100" fill="#f8f9ff" />
          <circle cx="50" cy="50" r="45" fill="url(#campusZone)" />
          
          {/* Main campus internal ring road */}
          <ellipse cx="50" cy="50" rx="36" ry="30" fill="none" stroke="#d3e4fe" strokeWidth="3" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#d3e4fe" strokeWidth="2.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#d3e4fe" strokeWidth="2.5" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dae2fd" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Campus safety zones perimeter */}
          <circle cx="50" cy="50" r="28" fill="#10B981" fillOpacity="0.04" stroke="#10B981" strokeWidth="0.5" strokeDasharray="1 2" />

          {/* Active driver route trace */}
          {selectedDriver && (
            <path
              d="M 42 48 Q 50 35 65 30 T 88 55"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="1.8"
              strokeDasharray="2 1"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Campus Landmark Badges */}
        {CAMPUS_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A] border-2 border-white shadow-xs"></span>
            <span className="mt-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-['Plus_Jakarta_Sans'] font-bold text-[#0F172A] shadow-xs border border-[#e5eeff] whitespace-nowrap">
              {loc.name.split('(')[0]}
            </span>
          </div>
        ))}

        {/* Interactive Pulsing Vehicle Pins */}
        {vehiclePins.map((pin) => {
          const isSelected = pin.id === activeDriverId;
          return (
            <button
              key={pin.id}
              onClick={() => {
                setActiveDriverId(pin.id);
                showToast(`Motorista selecionado: ${pin.label}`);
              }}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex flex-col items-center cursor-pointer transition-transform ${
                isSelected ? 'scale-115' : 'hover:scale-105'
              }`}
            >
              {/* Pulse ripple */}
              <span
                className={`absolute -inset-1.5 rounded-full opacity-70 ${
                  isSelected
                    ? 'bg-[#2563EB] animate-ping'
                    : 'bg-[#06B6D4]/40 group-hover:animate-ping'
                }`}
              ></span>

              {/* Pin bubble */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white transition-colors ${
                  isSelected ? 'bg-[#004ac6]' : 'bg-[#2563EB]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">directions_car</span>
              </div>

              {/* Tooltip badge */}
              <div
                className={`mt-1 px-2 py-0.5 rounded text-[10px] font-['Plus_Jakarta_Sans'] font-bold whitespace-nowrap shadow-sm border ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white/95 text-[#0F172A] border-[#e5eeff]'
                }`}
              >
                {pin.label.split(' ')[0]} • {pin.seats} vag.
              </div>
            </button>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute top-2.5 left-2.5 z-20 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#e5eeff] shadow-xs flex items-center gap-2 text-[10px] text-[#0F172A]">
          <span className="flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            Campus Monitorado
          </span>
          <span className="text-[#c3c6d7]">|</span>
          <span className="flex items-center gap-1 text-[#565e74]">
            <span className="material-symbols-outlined text-[13px] text-[#2563EB]">near_me</span>
            4 viaturas ativas
          </span>
        </div>

        {/* Live Re-center Button */}
        <button
          onClick={() => {
            setActiveDriverId('carlos-1');
            showToast('Mapa centralizado no Campus Centro (Portão 2)');
          }}
          className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-white text-[#0F172A] shadow-md border border-[#e5eeff] flex items-center justify-center hover:bg-[#eff4ff] transition-colors cursor-pointer"
          title="Centralizar no meu Campus"
        >
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>

      {/* Bottom Sheet / Nearest Drivers drawer */}
      <section className="mt-4 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[20px]">near_me</span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
              Motoristas Próximos a Você
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#007d55] bg-[#bdffdb]/40 px-2 py-0.5 rounded-full">
            Embarque Imediato
          </span>
        </div>

        {/* Selected Driver Quick Card */}
        {selectedDriver && (
          <div className="bg-[#eff4ff] rounded-xl p-3.5 border border-[#d3e4fe] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  {selectedDriver.avatarUrl ? (
                    <img
                      src={selectedDriver.avatarUrl}
                      alt={selectedDriver.driverName}
                      className="w-10 h-10 rounded-full object-cover border border-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#1E3A8A]">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 bg-[#10B981] text-white rounded-full p-0.5">
                    <span className="material-symbols-outlined text-[9px] leading-none">check</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0F172A]">
                      {selectedDriver.driverName}
                    </span>
                    <span className="text-[10px] text-[#006242] font-semibold bg-white px-1.5 py-0.2 rounded border border-[#bdffdb]">
                      ★ {selectedDriver.rating}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#565e74]">
                    {selectedDriver.carModel} • {selectedDriver.carColor}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="block font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#2563EB]">
                  {selectedDriver.departureTime}
                </span>
                <span className="text-[11px] text-[#007d55] font-semibold">
                  {selectedDriver.availableSeats} vagas livres
                </span>
              </div>
            </div>

            <div className="text-xs text-[#434655] flex items-center justify-between border-t border-[#d3e4fe]/80 pt-2">
              <span className="truncate pr-2">
                <strong>Destino:</strong> {selectedDriver.destination}
              </span>
              <span className="text-[11px] text-[#565e74] shrink-0 font-medium">
                {selectedDriver.estimatedDuration}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  onRequestRide(selectedDriver);
                  showToast(`Solicitação enviada para ${selectedDriver.driverName}!`);
                }}
                disabled={selectedDriver.requested || selectedDriver.availableSeats === 0}
                className={`flex-1 py-2 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedDriver.requested
                    ? 'bg-[#007d55] text-white'
                    : 'bg-[#004ac6] hover:bg-[#2563EB] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">hail</span>
                <span>{selectedDriver.requested ? 'Solicitado' : 'Solicitar Carona'}</span>
              </button>

              <button
                onClick={() => onOpenRoute(selectedDriver)}
                className="py-2 px-3 bg-white hover:bg-[#f8f9ff] text-[#0F172A] border border-[#d3e4fe] rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">map</span>
                <span>Trajeto</span>
              </button>
            </div>
          </div>
        )}

        {/* Other nearby drivers mini-list */}
        <div className="flex flex-col gap-2 mt-1">
          <span className="text-xs font-bold text-[#565e74]">Outros motoristas nesta região:</span>
          {rides
            .filter((r) => r.id !== selectedDriver.id)
            .slice(0, 2)
            .map((ride) => (
              <div
                key={ride.id}
                onClick={() => setActiveDriverId(ride.id)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#e5eeff] hover:bg-[#f8f9ff] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2563EB] text-[18px]">directions_car</span>
                  <div>
                    <span className="font-semibold text-xs text-[#0F172A] block">{ride.driverName}</span>
                    <span className="text-[11px] text-[#565e74] truncate max-w-[200px] block">
                      {ride.destination}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#2563EB] block">{ride.departureTime}</span>
                  <span className="text-[10px] text-[#565e74]">{ride.availableSeats} vagas</span>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
