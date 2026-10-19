import React, { useState } from 'react';
import { DriverRide } from '../types';

interface DriverCardProps {
  ride: DriverRide;
  onRequestRide: (ride: DriverRide) => void;
  onOpenRoute: (ride: DriverRide) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  ride,
  onRequestRide,
  onOpenRoute
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequested, setIsRequested] = useState(ride.requested || false);

  const handleRequest = () => {
    if (isRequested || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRequested(true);
      onRequestRide(ride);
    }, 600);
  };

  return (
    <article className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] transition-all hover:shadow-md flex flex-col gap-3">
      {/* Header / Profile Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            {ride.avatarUrl ? (
              <img
                src={ride.avatarUrl}
                alt={ride.driverName}
                className="w-12 h-12 rounded-full object-cover bg-[#e5eeff]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  (e.target as HTMLElement).parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-[#dae2fd]');
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#1E3A8A] shadow-inner">
                <span className="material-symbols-outlined text-[28px]">person</span>
              </div>
            )}
            
            {ride.isVerified && (
              <div
                className="absolute -bottom-1 -right-1 bg-[#10B981] text-white rounded-full p-0.5 shadow-sm flex items-center justify-center"
                title="Selo de Verificação Institucional"
              >
                <span className="material-symbols-outlined text-[11px] leading-none font-bold">verified_user</span>
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-['Plus_Jakarta_Sans'] text-base text-[#0F172A] font-bold truncate">
                {ride.driverName}
              </span>
              {ride.isVerified && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006242] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[13px] text-[#10B981]">shield</span>
                  <span>Aluno Verificado</span>
                </span>
              )}
            </div>
            <span className="text-xs text-[#565e74] truncate">
              {ride.course} • {ride.period}
            </span>
          </div>
        </div>

        {/* Rating Pill */}
        <div className="flex items-center gap-1 bg-[#eff4ff] px-2 py-1 rounded-lg shrink-0">
          <span className="material-symbols-outlined text-[14px] text-amber-500 fill-current">star</span>
          <span className="text-xs font-['Plus_Jakarta_Sans'] text-[#0b1c30] font-bold">
            {ride.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-[#565e74]">({ride.reviewCount})</span>
        </div>
      </div>

      {/* Route Trajectory Box */}
      <div className="bg-[#f8f9ff] rounded-lg p-3 flex flex-col gap-2 mt-1 border border-[#e5eeff]/60">
        <div className="flex items-start gap-2.5">
          <div className="flex flex-col items-center mt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/20"></span>
            <span className="w-0.5 h-6 bg-[#d3e4fe] my-0.5"></span>
            <span className="material-symbols-outlined text-[14px] text-[#0F172A]">location_on</span>
          </div>
          <div className="flex flex-col justify-between h-full min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#0F172A] truncate pr-2">
                {ride.origin}
              </span>
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#2563EB] font-bold bg-[#e5eeff] px-2 py-0.5 rounded shrink-0">
                Partida {ride.departureTime}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-[#565e74] truncate pr-2">
                {ride.destination}
              </span>
              <span className="text-[11px] text-[#565e74] shrink-0">
                {ride.estimatedDuration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs & Details */}
      <div className="flex items-center justify-between pt-1 text-[#434655] text-xs">
        <div className="flex items-center gap-1.5 text-[#1E3A8A] font-medium">
          <span className="material-symbols-outlined text-[18px] text-[#2563EB]">airline_seat_recline_normal</span>
          <span>
            <strong className="text-[#0F172A] font-bold">{ride.availableSeats}</strong> vagas disponíveis
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#565e74]">
          <span className="material-symbols-outlined text-[16px]">directions_car</span>
          <span>{ride.carModel} • {ride.carColor}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleRequest}
          disabled={isRequested || isSubmitting || ride.availableSeats === 0}
          className={`flex-1 py-2.5 px-4 font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isRequested
              ? 'bg-[#007d55] text-white cursor-default'
              : ride.availableSeats === 0
              ? 'bg-[#dae2fd] text-[#565e74] cursor-not-allowed'
              : 'bg-[#004ac6] hover:bg-[#2563EB] active:scale-[0.99] text-white'
          }`}
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span>Enviando...</span>
            </>
          ) : isRequested ? (
            <>
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Solicitado!</span>
            </>
          ) : ride.availableSeats === 0 ? (
            <>
              <span className="material-symbols-outlined text-[18px]">block</span>
              <span>Lotado</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">hail</span>
              <span>Solicitar Carona</span>
            </>
          )}
        </button>

        <button
          onClick={() => onOpenRoute(ride)}
          className="py-2.5 px-3.5 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0F172A] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
          title="Ver Trajeto no Mapa"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>Ver Rota</span>
        </button>
      </div>
    </article>
  );
};
