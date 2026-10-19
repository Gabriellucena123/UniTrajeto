import React, { useState } from 'react';
import { UserProfile, DriverRide } from '../types';

interface ProfileTabProps {
  userProfile: UserProfile;
  requestedRides: DriverRide[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  showToast: (msg: string) => void;
  onOpenOfferRide: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  requestedRides,
  onUpdateProfile,
  showToast,
  onOpenOfferRide
}) => {
  const [isDriverMode, setIsDriverMode] = useState(userProfile.isDriver);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [vehicleModel, setVehicleModel] = useState(userProfile.carModel);
  const [vehicleColor, setVehicleColor] = useState(userProfile.carColor);
  const [vehiclePlate, setVehiclePlate] = useState(userProfile.plate);

  const handleToggleDriverMode = () => {
    const nextState = !isDriverMode;
    setIsDriverMode(nextState);
    onUpdateProfile({ isDriver: nextState });
    showToast(nextState ? 'Modo Motorista ativado! Você pode oferecer caronas.' : 'Modo Passageiro ativado.');
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      carModel: vehicleModel,
      carColor: vehicleColor,
      plate: vehiclePlate
    });
    setIsEditingVehicle(false);
    showToast('Dados do veículo salvos com sucesso!');
  };

  return (
    <div className="flex flex-col w-full pb-8 gap-4">
      {/* Digital Student Identity Card */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#004ac6] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        {/* Subtle background university watermark decoration */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[180px]">school</span>
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#4edea3]">badge</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-white/90">
              Identidade Estudantil Digital
            </span>
          </div>
          <span className="bg-[#10B981]/20 border border-[#10B981]/40 text-[#4edea3] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]">verified</span>
            Válido 2026/2
          </span>
        </div>

        {/* Card Main Info */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative shrink-0">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#10B981] text-white rounded-full p-1 shadow">
              <span className="material-symbols-outlined text-[12px] leading-none font-bold">check</span>
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg leading-tight truncate">
              {userProfile.name}
            </h1>
            <span className="text-xs text-white/80 font-medium truncate">
              {userProfile.course} • {userProfile.period}
            </span>
            <span className="text-[11px] text-white/60 font-mono mt-0.5">
              RA: {userProfile.studentId}
            </span>
          </div>
        </div>

        {/* Card Actions & QR */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/15">
          <div className="text-[11px] text-white/80">
            <span>{userProfile.university}</span>
          </div>
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white rounded-lg text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
            <span>QR de Embarque</span>
          </button>
        </div>
      </section>

      {/* Mobility & Sustainability Stats */}
      <section className="grid grid-cols-4 gap-2">
        <div className="bg-white rounded-xl p-3 border border-[#e5eeff] text-center shadow-2xs">
          <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0F172A]">
            {userProfile.stats.ridesTaken}
          </span>
          <span className="text-[10px] text-[#565e74] leading-tight block mt-0.5">Caronas Pegas</span>
        </div>

        <div className="bg-white rounded-xl p-3 border border-[#e5eeff] text-center shadow-2xs">
          <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#2563EB]">
            {userProfile.stats.ridesGiven}
          </span>
          <span className="text-[10px] text-[#565e74] leading-tight block mt-0.5">Oferecidas</span>
        </div>

        <div className="bg-white rounded-xl p-3 border border-[#e5eeff] text-center shadow-2xs">
          <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#007d55]">
            {userProfile.stats.co2SavedKg}kg
          </span>
          <span className="text-[10px] text-[#565e74] leading-tight block mt-0.5">CO₂ Poupado</span>
        </div>

        <div className="bg-white rounded-xl p-3 border border-[#e5eeff] text-center shadow-2xs">
          <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-amber-600">
            ★ {userProfile.stats.rating}
          </span>
          <span className="text-[10px] text-[#565e74] leading-tight block mt-0.5">Avaliação</span>
        </div>
      </section>

      {/* Driver Mode & Vehicle Card */}
      <section className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[22px]">directions_car</span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
                Modo Motorista Estudantil
              </h2>
              <p className="text-[11px] text-[#565e74]">Compartilhe seus trajetos de ida e volta do campus</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDriverMode}
              onChange={handleToggleDriverMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        {isDriverMode && (
          <div className="bg-[#f8f9ff] rounded-xl p-3.5 border border-[#e5eeff] flex flex-col gap-2.5 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A]">Veículo Cadastrado:</span>
              <button
                onClick={() => setIsEditingVehicle(!isEditingVehicle)}
                className="text-[11px] text-[#004ac6] hover:underline font-semibold cursor-pointer"
              >
                {isEditingVehicle ? 'Cancelar' : 'Editar Dados'}
              </button>
            </div>

            {isEditingVehicle ? (
              <form onSubmit={handleSaveVehicle} className="flex flex-col gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Modelo (Ex: Onix Plus)"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-[#e5eeff] rounded-lg text-[#0F172A]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Cor (Ex: Prata)"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-[#e5eeff] rounded-lg text-[#0F172A]"
                  />
                  <input
                    type="text"
                    placeholder="Placa (Ex: BRA-9E82)"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-[#e5eeff] rounded-lg text-[#0F172A]"
                  />
                </div>
                <button
                  type="submit"
                  className="py-1.5 px-3 bg-[#004ac6] text-white rounded-lg font-semibold hover:bg-[#2563EB] cursor-pointer"
                >
                  Salvar Veículo
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between text-xs text-[#565e74]">
                <div>
                  <span className="font-semibold text-[#0F172A] block">{userProfile.carModel} • {userProfile.carColor}</span>
                  <span className="text-[11px] text-[#737686]">Placa: {userProfile.plate} • {userProfile.totalSeats} vagas seguras</span>
                </div>
                <button
                  onClick={onOpenOfferRide}
                  className="py-1.5 px-3 bg-[#004ac6] hover:bg-[#2563EB] text-white rounded-lg font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Nova Rota</span>
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* My Requested Rides & History */}
      <section className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[20px]">history</span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
              Minhas Solicitações Ativas
            </h2>
          </div>
          <span className="text-[11px] text-[#565e74]">
            {requestedRides.length} {requestedRides.length === 1 ? 'reserva' : 'reservas'}
          </span>
        </div>

        {requestedRides.length > 0 ? (
          <div className="flex flex-col gap-2">
            {requestedRides.map((ride) => (
              <div
                key={ride.id}
                className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#2563EB] flex items-center justify-center font-bold">
                    {ride.driverName[0]}
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">{ride.driverName}</span>
                    <span className="text-[11px] text-[#565e74] truncate max-w-[180px] block">
                      {ride.destination}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#bdffdb] text-[#006242] inline-block">
                    Confirmado
                  </span>
                  <span className="block text-[11px] font-semibold text-[#2563EB] mt-0.5">
                    Saída {ride.departureTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-[#f8f9ff] border border-dashed border-[#e5eeff] text-center text-xs text-[#565e74]">
            Você ainda não solicitou caronas hoje. Navegue pela aba <strong>Motoristas</strong> para encontrar um trajeto seguro.
          </div>
        )}
      </section>

      {/* Boarding QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center flex flex-col items-center gap-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between w-full border-b border-[#e5eeff] pb-2">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
                QR de Embarque Seguro
              </span>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#434655]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Simulated Vector QR */}
            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#d3e4fe] shadow-inner">
              <svg width="150" height="150" viewBox="0 0 100 100" className="mx-auto">
                <rect x="0" y="0" width="100" height="100" fill="#ffffff" rx="4" />
                {/* QR corner patterns */}
                <rect x="10" y="10" width="24" height="24" fill="#0F172A" />
                <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="18" width="8" height="8" fill="#0F172A" />

                <rect x="66" y="10" width="24" height="24" fill="#0F172A" />
                <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="74" y="18" width="8" height="8" fill="#0F172A" />

                <rect x="10" y="66" width="24" height="24" fill="#0F172A" />
                <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="74" width="8" height="8" fill="#0F172A" />

                {/* Data modules */}
                <rect x="40" y="15" width="8" height="8" fill="#2563EB" />
                <rect x="52" y="15" width="8" height="8" fill="#0F172A" />
                <rect x="40" y="27" width="8" height="8" fill="#0F172A" />
                <rect x="40" y="45" width="20" height="20" fill="#004ac6" />
                <circle cx="50" cy="55" r="4" fill="#ffffff" />
                <rect x="68" y="45" width="8" height="8" fill="#0F172A" />
                <rect x="68" y="60" width="8" height="8" fill="#10B981" />
                <rect x="45" y="75" width="8" height="8" fill="#0F172A" />
                <rect x="75" y="75" width="8" height="8" fill="#2563EB" />
              </svg>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#0F172A]">{userProfile.name}</span>
              <span className="text-[11px] text-[#565e74]">PIN de Embarque: <strong className="text-[#2563EB] tracking-widest">7492</strong></span>
              <span className="text-[10px] text-[#737686]">Apresente este código ao motorista antes de ingressar no veículo.</span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-[#004ac6] text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Concluído
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
