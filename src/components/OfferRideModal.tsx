import React, { useState } from 'react';
import { DriverRide, UserProfile } from '../types';

interface OfferRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onPublishRide: (ride: DriverRide) => void;
}

export const OfferRideModal: React.FC<OfferRideModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onPublishRide
}) => {
  const [origin, setOrigin] = useState('Campus Centro (Portão 2)');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('22:30');
  const [availableSeats, setAvailableSeats] = useState(3);
  const [carModel, setCarModel] = useState(userProfile.carModel || 'Chevrolet Onix');
  const [carColor, setCarColor] = useState(userProfile.carColor || 'Prata');
  const [pickupPoint, setPickupPoint] = useState('Guarita de saída dos alunos');
  const [isNight, setIsNight] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    const newRide: DriverRide = {
      id: `ride-${Date.now()}`,
      driverName: `${userProfile.name.split(' ')[0]} ${userProfile.name.split(' ')[1]?.[0] || 'S'}.`,
      avatarUrl: userProfile.avatarUrl,
      isVerified: userProfile.isVerified,
      course: userProfile.course,
      period: userProfile.period,
      rating: userProfile.stats.rating,
      reviewCount: userProfile.stats.ridesGiven + 5,
      origin,
      destination,
      departureTime,
      estimatedDuration: 'Aprox. 20-30 min',
      availableSeats: Number(availableSeats),
      totalSeats: Number(availableSeats) + 1,
      carModel,
      carColor,
      isNight,
      pickupPoint
    };

    onPublishRide(newRide);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[24px]">add_circle</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base text-[#0F172A] font-bold">
              Oferecer Nova Carona Universitária
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#434655] flex items-center justify-center hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          {/* Driver ID notice */}
          <div className="flex items-center gap-2 p-2.5 bg-[#eff4ff] rounded-lg text-[#1E3A8A]">
            <span className="material-symbols-outlined text-[18px] text-[#10B981]">verified</span>
            <span>Você publicará como <strong>{userProfile.name}</strong> ({userProfile.course})</span>
          </div>

          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Ponto de Partida (Campus):</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="Campus Centro (Portão 2)">Campus Centro (Portão 2)</option>
              <option value="Campus Centro (Estacionamento A)">Campus Centro (Estacionamento A)</option>
              <option value="Campus Sul (Prédio Central)">Campus Sul (Prédio Central)</option>
              <option value="Campus Leste (Bloco de Salas)">Campus Leste (Bloco de Salas)</option>
              <option value="Campus Saúde (Hospital Universitário)">Campus Saúde (Hospital Universitário)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Destino / Bairro / Linha:</label>
            <input
              type="text"
              required
              placeholder="Ex: Zona Leste (Tatuapé / Penha) ou Estação Metrô"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Horário de Saída:</label>
              <input
                type="text"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                placeholder="22:30"
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Vagas Livres:</label>
              <select
                value={availableSeats}
                onChange={(e) => setAvailableSeats(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value={1}>1 vaga</option>
                <option value={2}>2 vagas</option>
                <option value={3}>3 vagas</option>
                <option value={4}>4 vagas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Modelo do Carro:</label>
              <input
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Ex: Onix, HB20, Polo"
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Cor do Veículo:</label>
              <input
                type="text"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                placeholder="Ex: Prata, Branco, Preto"
                className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Ponto de Encontro Específico:</label>
            <input
              type="text"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              placeholder="Ex: Em frente à Biblioteca / Guarita 2"
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#e5eeff] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="nightCheck"
              checked={isNight}
              onChange={(e) => setIsNight(e.target.checked)}
              className="rounded text-[#2563EB] focus:ring-[#2563EB] h-4 w-4"
            />
            <label htmlFor="nightCheck" className="text-[#434655] cursor-pointer">
              Carona noturna (inclusa no Protocolo Noturno com monitoramento reforçado)
            </label>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-[#e5eeff]">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#004ac6] hover:bg-[#2563EB] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>Publicar Carona</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0F172A] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
