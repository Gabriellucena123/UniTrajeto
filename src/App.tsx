/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TabType, DriverRide, UserProfile, EmergencyContact } from './types';
import {
  INITIAL_RIDES,
  INITIAL_USER_PROFILE,
  INITIAL_EMERGENCY_CONTACTS
} from './data/mockData';
import { Header } from './components/Header';
import { DriversTab } from './components/DriversTab';
import { LocationTab } from './components/LocationTab';
import { ProfileTab } from './components/ProfileTab';
import { SettingsTab } from './components/SettingsTab';
import { RouteModal } from './components/RouteModal';
import { OfferRideModal } from './components/OfferRideModal';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('motoristas');
  const [rides, setRides] = useState<DriverRide[]>(INITIAL_RIDES);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(INITIAL_EMERGENCY_CONTACTS);
  
  // Shared route preview modal (can be opened from LocationTab or DriversTab)
  const [activeRoutePreview, setActiveRoutePreview] = useState<DriverRide | null>(null);
  
  // Offer ride modal quick trigger
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToastMessage(message);
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    setToastTimeout(timeout);
  };

  const handleRequestRide = (selectedRide: DriverRide) => {
    setRides((prev) =>
      prev.map((r) =>
        r.id === selectedRide.id
          ? { ...r, requested: true, availableSeats: Math.max(0, r.availableSeats - 1) }
          : r
      )
    );

    setUserProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        ridesTaken: prev.stats.ridesTaken + 1
      }
    }));
  };

  const handlePublishRide = (newRide: DriverRide) => {
    setRides((prev) => [newRide, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        ridesGiven: prev.stats.ridesGiven + 1
      }
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleAddEmergencyContact = (contact: EmergencyContact) => {
    setEmergencyContacts((prev) => [...prev, contact]);
  };

  const handleRemoveEmergencyContact = (id: string) => {
    setEmergencyContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const requestedRides = rides.filter((r) => r.requested);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Pinned Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userAvatar={userProfile.avatarUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 pt-28 pb-12">
        {activeTab === 'motoristas' && (
          <DriversTab
            rides={rides}
            userProfile={userProfile}
            onRequestRide={handleRequestRide}
            onPublishRide={handlePublishRide}
            showToast={showToast}
          />
        )}

        {activeTab === 'localidade' && (
          <LocationTab
            rides={rides}
            onRequestRide={handleRequestRide}
            onOpenRoute={(ride) => setActiveRoutePreview(ride)}
            showToast={showToast}
          />
        )}

        {activeTab === 'perfil' && (
          <ProfileTab
            userProfile={userProfile}
            requestedRides={requestedRides}
            onUpdateProfile={handleUpdateProfile}
            showToast={showToast}
            onOpenOfferRide={() => setIsOfferModalOpen(true)}
          />
        )}

        {activeTab === 'configuracoes' && (
          <SettingsTab
            contacts={emergencyContacts}
            onAddContact={handleAddEmergencyContact}
            onRemoveContact={handleRemoveEmergencyContact}
            showToast={showToast}
          />
        )}
      </main>

      {/* Shared Route Preview Modal */}
      <RouteModal
        ride={activeRoutePreview}
        onClose={() => setActiveRoutePreview(null)}
        onRequestRide={(ride) => {
          handleRequestRide(ride);
          showToast(`Solicitação enviada para ${ride.driverName}!`);
        }}
      />

      {/* Shared Offer Ride Modal */}
      <OfferRideModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        userProfile={userProfile}
        onPublishRide={(newRide) => {
          handlePublishRide(newRide);
          showToast('Carona publicada com sucesso! Colegas já podem visualizar.');
        }}
      />

      {/* Floating Feedback Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
