import { DriverRide, UserProfile, EmergencyContact } from '../types';

export const INITIAL_RIDES: DriverRide[] = [
  {
    id: 'carlos-1',
    driverName: 'Carlos S.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAARqVDpA914H9w_dSrzCtRNa753JrtQ03WFrZKuQ_r-QGGrlCfLI9mO5-be1HRo7bVriut4f8yivxHp6gRK7TGiL_x10m02PSeb0kcYZtZfcmIEgh3TdWafXuh5TP7NhU9u_aS5U4dY1LLi4NiQVg1YJ5iAs6H1qN9EoxZDU298gRz08F5GX-o4aaa7tjc4S_7oqqAbNxWURXV_V8boiRo85XmOPXOF1VgeSd22i8lgFuT5JTf2aAKdw',
    isVerified: true,
    course: 'Engenharia de Software',
    period: '6º Período',
    rating: 4.8,
    reviewCount: 24,
    origin: 'Campus Centro (Portão 2)',
    destination: 'Zona Leste (Av. Radial / Tatuapé)',
    departureTime: '22:30',
    estimatedDuration: 'Aprox. 25 min',
    availableSeats: 3,
    totalSeats: 4,
    carModel: 'Onix Hatch',
    carColor: 'Prata',
    isNight: true,
    pickupPoint: 'Guarita de saída dos alunos (Portão 2)',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: 'mariana-2',
    driverName: 'Mariana C.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBi9XrpgKkBeODcE5kPQY1f8t1gIUAgmThNyK5_tOFUSnVYuhbO7oOxDWuNOMaUtP6qK0yXR-2IKiJCRdF0TRiNFsiFZSrxyZ4bGsRHvjBLwg1CnYVa5c7WcnfXtc0HENNEBLYbSY_Vl-mdUs2KGnDunINQ168nOEYYhV3cUqTsDBfFqekYVEASai5ySsCbPa7eDkJEZqP3JOv1XcW4LM7QxuPGMN95MZHgFz26Eq2C2OcUy_o2_vx8jg',
    isVerified: true,
    course: 'Administração',
    period: '8º Período',
    rating: 5.0,
    reviewCount: 38,
    origin: 'Campus Sul (Prédio Central)',
    destination: 'Estação de Metrô Linha Azul',
    departureTime: '22:45',
    estimatedDuration: 'Aprox. 12 min',
    availableSeats: 2,
    totalSeats: 4,
    carModel: 'HB20',
    carColor: 'Branco',
    isNight: true,
    pickupPoint: 'Em frente à Biblioteca Central (Térreo)',
    coordinates: { lat: -23.5615, lng: -46.6558 }
  },
  {
    id: 'felipe-3',
    driverName: 'Felipe R.',
    avatarUrl: '', // generic silhouette
    isVerified: true,
    course: 'Direito',
    period: '4º Período',
    rating: 4.5,
    reviewCount: 12,
    origin: 'Campus Centro (Estacionamento A)',
    destination: 'Zona Norte (Santana / Parada Inglesa)',
    departureTime: '18:00',
    estimatedDuration: 'Aprox. 35 min',
    availableSeats: 4,
    totalSeats: 4,
    carModel: 'Polo Sedan',
    carColor: 'Cinza',
    isNight: false,
    pickupPoint: 'Estacionamento de Alunos Bloco Direito',
    coordinates: { lat: -23.5489, lng: -46.6388 }
  },
  {
    id: 'beatriz-4',
    driverName: 'Beatriz L.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    isVerified: true,
    course: 'Medicina',
    period: '5º Período',
    rating: 4.9,
    reviewCount: 42,
    origin: 'Campus Saúde (Hospital Universitário)',
    destination: 'Zona Oeste (Pinheiros / Vila Madalena)',
    departureTime: '22:15',
    estimatedDuration: 'Aprox. 20 min',
    availableSeats: 2,
    totalSeats: 3,
    carModel: 'Renegade',
    carColor: 'Preto',
    isNight: true,
    pickupPoint: 'Entrada Principal do Ambulatório Geral',
    coordinates: { lat: -23.555, lng: -46.666 }
  },
  {
    id: 'lucas-5',
    driverName: 'Lucas M.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    isVerified: true,
    course: 'Arquitetura',
    period: '7º Período',
    rating: 4.7,
    reviewCount: 19,
    origin: 'Campus Centro (Portão 1)',
    destination: 'ABC Paulista (Santo André / Linha 10)',
    departureTime: '22:40',
    estimatedDuration: 'Aprox. 32 min',
    availableSeats: 3,
    totalSeats: 4,
    carModel: 'Ka Sedan',
    carColor: 'Azul',
    isNight: true,
    pickupPoint: 'Posto de Segurança Portão 1',
    coordinates: { lat: -23.552, lng: -46.64 }
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Gabriel Silveira',
  email: 'gabriel@masterconsulting.com.br',
  studentId: '2024.1.0942-SP',
  university: 'Universidade de São Paulo (USP)',
  course: 'Engenharia de Software',
  period: '6º Período',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuArQ4juxVYzU390kxJ6szhSpxt33WAN4yEO7JVWr5j_QcUcEnvqv_c_CUobs1HuAqlnuzHgLpExYethLKWpMCFSUmWjUMMAa2A9o2Om8wU0tg8Vso1snStz_m2fbpHeM0rQV6BLRM3a7AvF0SFraVkjeTqZ3ANT5nbC5NDNljLY4BBjxrAg2giNoKM2JgR5i72w6KNzEtL__0QnNAHSvdPr6Tkr4hjI4KHnR1Zv9yeVvaHRtMDczk9esA',
  isVerified: true,
  isDriver: false,
  carModel: 'Chevrolet Onix Plus',
  carColor: 'Prata',
  plate: 'BRA-9E82',
  totalSeats: 3,
  stats: {
    ridesTaken: 24,
    ridesGiven: 8,
    co2SavedKg: 54,
    rating: 4.9
  }
};

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Helena Silveira (Mãe)',
    phone: '(11) 98765-4321',
    relation: 'Familiar'
  },
  {
    id: '2',
    name: 'Segurança do Campus (24h)',
    phone: '(11) 3091-0000',
    relation: 'Institucional'
  }
];

export const CAMPUS_LOCATIONS = [
  { id: '1', name: 'Campus Centro (Portão 2)', coords: { x: 38, y: 44 }, description: 'Guarita e Ponto Seguro' },
  { id: '2', name: 'Campus Sul (Prédio Central)', coords: { x: 62, y: 68 }, description: 'Praça das Bandeiras' },
  { id: '3', name: 'Campus Centro (Estacionamento A)', coords: { x: 28, y: 36 }, description: 'Próximo ao Ginásio' },
  { id: '4', name: 'Estação Metrô Linha Azul', coords: { x: 78, y: 32 }, description: 'Terminal de Integração' },
  { id: '5', name: 'Zona Leste (Radial / Tatuapé)', coords: { x: 88, y: 55 }, description: 'Conexão Expressa Leste' },
  { id: '6', name: 'Zona Norte (Santana)', coords: { x: 42, y: 15 }, description: 'Acesso Marginais' }
];
