export enum ServiceType {
  STANDARD = 'Standard Clean',
  DEEP = 'Deep Clean',
  MOVE_IN_OUT = 'Move In/Out',
  POST_CONSTRUCTION = 'Post Construction'
}

export enum PaymentMethod {
  CREDIT_CARD = 'Credit Card',
  PAYPAL = 'PayPal',
  CASH = 'Cash on Arrival'
}

export interface QuoteRequest {
  description: string;
  bedrooms: number;
  bathrooms: number;
}

export interface AIQuoteResponse {
  estimatedPrice: number;
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
  price: number;
  paymentMethod: PaymentMethod;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ServiceOption {
  id: ServiceType;
  title: string;
  description: string;
  basePrice: number;
  iconName: string; // Using string to map to Lucide icons
}