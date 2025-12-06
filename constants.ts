import { ServiceOption, ServiceType } from './types';

export const SERVICES: ServiceOption[] = [
  {
    id: ServiceType.STANDARD,
    title: "Standard Maintenance",
    description: "Perfect for recurring cleanings. Dusting, vacuuming, mopping, and bathroom sanitation.",
    basePrice: 120,
    iconName: "Sparkles"
  },
  {
    id: ServiceType.DEEP,
    title: "Royal Deep Clean",
    description: "Thorough top-to-bottom cleaning. Includes baseboards, ceiling fans, and inside appliances.",
    basePrice: 200,
    iconName: "ShieldCheck"
  },
  {
    id: ServiceType.MOVE_IN_OUT,
    title: "Move In / Move Out",
    description: "Ensure the home is spotless for the next chapter. Empty home cleaning specialist.",
    basePrice: 280,
    iconName: "Truck"
  },
  {
    id: ServiceType.POST_CONSTRUCTION,
    title: "Post-Construction",
    description: "Removing dust and debris after renovation work. Heavy duty cleaning.",
    basePrice: 350,
    iconName: "HardHat"
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    text: "Queen B's transformed my apartment! The attention to detail is unmatched.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    text: "Professional, punctual, and the online booking was incredibly easy.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    text: "I used the AI quote feature and it was spot on with the final price. Highly recommend!",
    rating: 4
  }
];