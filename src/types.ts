export type SpecialtyCategory = 
  | 'all'
  | 'prevencion'
  | 'estetica'
  | 'ortodoncia'
  | 'implantes'
  | 'endodoncia'
  | 'pediatria'
  | 'cirugia';

export interface Treatment {
  id: string;
  title: string;
  category: SpecialtyCategory;
  shortDesc: string;
  fullDesc: string;
  estimatedPrice: number;
  duration: string;
  recommendedFrequency?: string;
  iconName: string;
  beforeAfterImage?: {
    before: string;
    after: string;
  };
  benefits: string[];
  faqs?: { question: string; answer: string }[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  copLicense: string; // Colegio de Odontólogos ID
  experienceYears: number;
  avatar: string;
  rating: number;
  reviewCount: number;
  bio: string;
  availableDays: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  treatmentId: string;
  treatmentTitle: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  notes?: string;
  toothNumber?: number;
  isFirstVisit: boolean;
  status: 'confirmada' | 'pendiente' | 'completada' | 'cancelada';
  createdAt: string;
  qrCodeValue: string;
}

export interface ToothInfo {
  number: number;
  name: string;
  type: 'Incisivo' | 'Canino' | 'Premolar' | 'Molar';
  arch: 'superior' | 'inferior';
  side: 'izquierdo' | 'derecho';
  commonIssues: {
    issue: string;
    description: string;
    recommendedTreatment: string;
    estimatedCost: number;
  }[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  treatmentName: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  fallback?: boolean;
}
