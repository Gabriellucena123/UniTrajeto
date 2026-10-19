import React, { useState } from 'react';
import { EmergencyContact } from '../types';

interface SettingsTabProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: EmergencyContact) => void;
  onRemoveContact: (id: string) => void;
  showToast: (msg: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  contacts,
  onAddContact,
  onRemoveContact,
  showToast
}) => {
  const [autoShareTrip, setAutoShareTrip] = useState(true);
  const [pinVerification, setPinVerification] = useState(true);
  const [womenOnlyRide, setWomenOnlyRide] = useState(false);
  const [instantAlerts, setInstantAlerts] = useState(true);

  // New emergency contact form state
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Familiar');

  // Emergency SOS trigger simulation state
  const [isSosTriggered, setIsSosTriggered] = useState(false);

  const handleTriggerSOS = () => {
    setIsSosTriggered(true);
    showToast('🚨 ALERTA SOS ATIVADO! Localização GPS enviada à Segurança do Campus e Contatos.');
    setTimeout(() => {
      setIsSosTriggered(false);
    }, 5000);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    onAddContact({
      id: `contact-${Date.now()}`,
      name: newContactName,
      phone: newContactPhone,
      relation: newContactRelation
    });

    setNewContactName('');
    setNewContactPhone('');
    setIsAddingContact(false);
    showToast('Contato de emergência adicionado com sucesso!');
  };

  return (
    <div className="flex flex-col w-full pb-8 gap-4">
      {/* Central de Segurança e SOS Estudantil */}
      <section className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">emergency_home</span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
                Protocolo SOS de Emergência
              </h2>
              <p className="text-[11px] text-[#565e74]">Acionamento instantâneo para suporte e guarda do campus</p>
            </div>
          </div>
          <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-2 py-0.5 rounded-full">
            Pronto 24h
          </span>
        </div>

        <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff] flex flex-col gap-3">
          <p className="text-xs text-[#434655] leading-relaxed">
            Em caso de desvio de rota, parada suspeita ou insegurança, pressione o botão de SOS. Seus contatos e a viatura do campus receberão suas coordenadas exatas em tempo real.
          </p>

          <button
            onClick={handleTriggerSOS}
            className={`w-full py-3 px-4 font-['Plus_Jakarta_Sans'] font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSosTriggered
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'bg-[#93000a] hover:bg-[#ba1a1a] text-white active:scale-98'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">fmd_bad</span>
            <span>{isSosTriggered ? 'SOS ATIVO - VIATURA NOTIFICADA' : 'ACIONAR BOTÃO DE PÂNICO / SOS'}</span>
          </button>
        </div>
      </section>

      {/* Emergency Contacts List */}
      <section className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[20px]">contact_phone</span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A]">
              Contatos de Emergência Cadastrados
            </h2>
          </div>
          <button
            onClick={() => setIsAddingContact(!isAddingContact)}
            className="text-xs font-semibold text-[#004ac6] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>{isAddingContact ? 'Fechar' : 'Adicionar'}</span>
          </button>
        </div>

        {isAddingContact && (
          <form onSubmit={handleSaveContact} className="p-3 bg-[#eff4ff] rounded-xl border border-[#d3e4fe] flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-[#0F172A]">Novo Contato Protetor:</span>
            <input
              type="text"
              required
              placeholder="Nome (Ex: Mãe, Irmão, Colega de República)"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              className="px-3 py-2 bg-white border border-[#d3e4fe] rounded-lg text-[#0F172A]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="tel"
                required
                placeholder="Telefone (11) 9..."
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="px-3 py-2 bg-white border border-[#d3e4fe] rounded-lg text-[#0F172A]"
              />
              <select
                value={newContactRelation}
                onChange={(e) => setNewContactRelation(e.target.value)}
                className="px-3 py-2 bg-white border border-[#d3e4fe] rounded-lg text-[#0F172A]"
              >
                <option value="Familiar">Familiar</option>
                <option value="Amigo da Faculdade">Amigo da Faculdade</option>
                <option value="Institucional">Institucional</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-[#004ac6] hover:bg-[#2563EB] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Salvar Contato
            </button>
          </form>
        )}

        <div className="flex flex-col gap-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 bg-[#f8f9ff] rounded-xl border border-[#e5eeff] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e5eeff] text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">person_check</span>
                </div>
                <div>
                  <span className="font-bold text-[#0F172A] block">{contact.name}</span>
                  <span className="text-[11px] text-[#565e74]">{contact.phone} • {contact.relation}</span>
                </div>
              </div>

              {contacts.length > 1 && (
                <button
                  onClick={() => {
                    onRemoveContact(contact.id);
                    showToast('Contato removido');
                  }}
                  className="text-[#ba1a1a] hover:bg-[#ffdad6]/50 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Remover contato"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Ride Preferences */}
      <section className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
        <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#2563EB] text-[20px]">tune</span>
          Preferências de Embarque e Segurança
        </h2>

        <div className="flex flex-col divide-y divide-[#e5eeff] text-xs">
          <div className="flex items-center justify-between py-2.5">
            <div>
              <span className="font-semibold text-[#0F172A] block">Compartilhar trajeto automaticamente</span>
              <span className="text-[11px] text-[#565e74]">Envia link de monitoramento ao embarcar no veículo</span>
            </div>
            <input
              type="checkbox"
              checked={autoShareTrip}
              onChange={(e) => {
                setAutoShareTrip(e.target.checked);
                showToast(e.target.checked ? 'Compartilhamento automático ativado' : 'Desativado');
              }}
              className="h-5 w-5 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2.5">
            <div>
              <span className="font-semibold text-[#0F172A] block">Código PIN obrigatório</span>
              <span className="text-[11px] text-[#565e74]">Motorista só inicia corrida após digitar seu PIN de 4 dígitos</span>
            </div>
            <input
              type="checkbox"
              checked={pinVerification}
              onChange={(e) => {
                setPinVerification(e.target.checked);
                showToast(e.target.checked ? 'PIN de segurança ativado' : 'PIN desativado');
              }}
              className="h-5 w-5 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2.5">
            <div>
              <span className="font-semibold text-[#0F172A] block">Filtro Alunas (Caronas com Mulheres)</span>
              <span className="text-[11px] text-[#565e74]">Prioriza e restringe compartilhamento exclusivo entre universitárias</span>
            </div>
            <input
              type="checkbox"
              checked={womenOnlyRide}
              onChange={(e) => {
                setWomenOnlyRide(e.target.checked);
                showToast(e.target.checked ? 'Filtro de caronas femininas ativado' : 'Desativado');
              }}
              className="h-5 w-5 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2.5">
            <div>
              <span className="font-semibold text-[#0F172A] block">Alertas de Vagas na Minha Rota</span>
              <span className="text-[11px] text-[#565e74]">Notificar quando um colega abrir carona para meu bairro</span>
            </div>
            <input
              type="checkbox"
              checked={instantAlerts}
              onChange={(e) => {
                setInstantAlerts(e.target.checked);
                showToast(e.target.checked ? 'Notificações de rota ativadas' : 'Desativadas');
              }}
              className="h-5 w-5 text-[#2563EB] rounded focus:ring-[#2563EB] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* University Institutional Partnership Footnote */}
      <section className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#d3e4fe] flex items-start gap-3 text-xs text-[#1E3A8A]">
        <span className="material-symbols-outlined text-[20px] text-[#10B981] shrink-0 mt-0.5">verified</span>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[#0F172A]">Termo de Convênio Universitário Ativo</span>
          <p className="text-[11px] text-[#565e74] leading-relaxed">
            Plataforma homologada pela Reitoria e Diretoria de Segurança Comunitária. Todos os usuários possuem vínculo de matrícula ou funcional ativo e auditado.
          </p>
        </div>
      </section>
    </div>
  );
};
