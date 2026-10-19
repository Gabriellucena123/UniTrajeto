import React from 'react';
import { DriverRide } from '../types';

interface RouteModalProps {
  ride: DriverRide | null;
  onClose: () => void;
  onRequestRide: (ride: DriverRide) => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({ ride, onClose, onRequestRide }) => {
  if (!ride) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[24px]">route</span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-base text-[#0F172A] font-bold">
                Detalhes da Rota Universitária
              </h2>
              <span className="text-xs text-[#565e74]">Corredor de Segurança Estudantil</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#434655] flex items-center justify-center hover:bg-[#dce9ff] transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Route Visual Representation (Interactive Styled Map View) */}
        <div className="w-full h-48 rounded-xl overflow-hidden relative shadow-inner bg-gradient-to-br from-[#eff4ff] via-[#dce9ff] to-[#e5eeff] border border-[#d3e4fe] flex flex-col justify-between p-3.5">
          {/* Simulated Campus Transit Map Vector Graphic */}
          <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid & Campus streets */}
            <line x1="0" y1="40" x2="100%" y2="40" stroke="#b4c5ff" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="100%" y2="120" stroke="#b4c5ff" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="120" y1="0" x2="120" y2="100%" stroke="#b4c5ff" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="280" y1="0" x2="280" y2="100%" stroke="#b4c5ff" strokeWidth="2" strokeDasharray="4 4" />
            {/* Active route line with pulse glow */}
            <path
              d="M 40 140 Q 140 130 200 80 T 380 45"
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Vehicle indicator moving on route */}
            <circle cx="200" cy="80" r="7" fill="#004ac6" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Map Top Badge */}
          <div className="flex items-center justify-between z-10">
            <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[#0F172A] font-['Plus_Jakarta_Sans'] text-[11px] font-bold shadow-xs flex items-center gap-1.5 border border-[#e5eeff]">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping"></span>
              Rota Ativa • Trânsito Rápido
            </span>

            <span className="bg-[#0F172A]/80 text-white px-2.5 py-1 rounded-md text-[11px] font-medium backdrop-blur-md">
              {ride.estimatedDuration}
            </span>
          </div>

          {/* Map Bottom Origin & Destination tags */}
          <div className="flex items-end justify-between z-10">
            <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[#0F172A] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex items-center gap-1 shadow-xs border border-[#e5eeff]">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]"></span>
              {ride.origin.split('(')[0]}
            </div>

            <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[#0F172A] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex items-center gap-1 shadow-xs border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[12px] text-[#0F172A]">location_on</span>
              {ride.destination.split('(')[0]}
            </div>
          </div>

          {/* Verified Route Footnote */}
          <div className="absolute bottom-2 left-2 z-10 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded text-[#0F172A] text-[10px] shadow-xs flex items-center gap-1 border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[13px] text-[#10B981]">gps_fixed</span>
            <span>Trajeto 100% monitorado pela Central de Segurança</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="flex flex-col gap-2.5 text-xs text-[#565e74] bg-[#f8f9ff] p-3.5 rounded-xl border border-[#e5eeff]">
          <div className="flex items-center justify-between text-[#0b1c30]">
            <span className="text-[#565e74]">Motorista Responsável:</span>
            <span className="font-bold text-[#0F172A] flex items-center gap-1">
              {ride.driverName}
              <span className="text-[#10B981] material-symbols-outlined text-[14px]">verified</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Curso & Período:</span>
            <span className="text-[#0b1c30] font-medium">{ride.course} ({ride.period})</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Veículo:</span>
            <span className="text-[#0b1c30] font-medium">{ride.carModel} • {ride.carColor}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Ponto de encontro recomendado:</span>
            <span className="text-[#004ac6] font-semibold text-right max-w-[240px] truncate">
              {ride.pickupPoint || 'Guarita de saída dos alunos'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Horário de Saída:</span>
            <span className="text-[#2563EB] font-bold bg-[#e5eeff] px-2 py-0.5 rounded">
              {ride.departureTime} (Tolerância: 5 min)
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#e5eeff]">
            <span>Vagas Restantes:</span>
            <span className="text-[#007d55] font-bold">
              {ride.availableSeats} disponíveis de {ride.totalSeats}
            </span>
          </div>
        </div>

        {/* Quick Safety Notice */}
        <div className="flex items-center gap-2 p-2.5 bg-[#eff4ff] rounded-lg text-xs text-[#1E3A8A]">
          <span className="material-symbols-outlined text-[#2563EB] text-[18px]">verified_user</span>
          <span>Embarque seguro: confirme o código PIN de 4 dígitos com o motorista ao entrar.</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              onRequestRide(ride);
              onClose();
            }}
            disabled={ride.requested || ride.availableSeats === 0}
            className={`flex-1 py-3 px-4 font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              ride.requested
                ? 'bg-[#007d55] text-white'
                : 'bg-[#004ac6] hover:bg-[#2563EB] text-white active:scale-[0.99]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">hail</span>
            <span>{ride.requested ? 'Carona Já Solicitada' : 'Solicitar Carona Agora'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-3 px-5 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0F172A] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
