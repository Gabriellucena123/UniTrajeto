export type TabType = 'motoristas' | 'localidade' | 'perfil' | 'configuracoes';

export interface DriverRide {
  id: string;
  driverName: string;
  avatarUrl: string;
  isVerified: boolean;
  course: string;
  period: string;
  rating: number;
  reviewCount: number;
  origin: string;
  destination: string;
  departureTime: string;
  estimatedDuration: string;
  availableSeats: number;
  totalSeats: number;
  carModel: string;
  carColor: string;
  isNight: boolean;
  requested?: boolean;
  isCompleted?: boolean;
  pickupPoint?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  university: string;
  course: string;
  period: string;
  avatarUrl: string;
  isVerified: boolean;
  isDriver: boolean;
  carModel: string;
  carColor: string;
  plate: string;
  totalSeats: number;
  stats: {
    ridesTaken: number;
    ridesGiven: number;
    co2SavedKg: number;
    rating: number;
  };
}
