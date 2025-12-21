
export enum ServiceType {
  STANDARD = 'Standard Clean',
  DEEP = 'Deep Clean',
  MOVE_IN_OUT = 'Move In/Out',
  POST_CONSTRUCTION = 'Post Construction'
}

export interface QuoteRequest {
  description: string;
  bedrooms: number;
  bathrooms: number;
}

export interface AIQuoteResponse {
  estimatedHours: number;
  recommendedService: ServiceType;
  reasoning: string;
}

export interface BookingDetails {
  serviceType: ServiceType;
  bedrooms: number;
  bathrooms: number;
  date: string;
  time: string;
  address: string;
  instructions: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ServiceOption {
  id: ServiceType;
  title: string;
  description: string;
  iconName: string; // Using string to map to Lucide icons
}
