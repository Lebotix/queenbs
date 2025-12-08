import { GoogleGenAI, Type, Schema, Chat } from "@google/genai";
import { AIQuoteResponse, ServiceType } from '../types';

// Initialize the Gemini Client
// CRITICAL: We use process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartQuote = async (
  description: string, 
  bedrooms: number, 
  bathrooms: number
): Promise<AIQuoteResponse | null> => {
  
  if (!process.env.API_KEY) {
    console.error("API Key is missing for Gemini Service");
    return null;
  }

  const modelId = "gemini-2.5-flash"; // Fast and efficient for text tasks

  const prompt = `
    Analyze the following cleaning job request for "Queen B's Cleaning".
    
    Home Details:
    - Bedrooms: ${bedrooms}
    - Bathrooms: ${bathrooms}
    - User Description: "${description}"
    
    Base Pricing Rules (Internal Logic):
    - Standard cleaning base: $100 + $20/bed + $30/bath.
    - Deep cleaning multiplier: 1.5x.
    - Move out multiplier: 1.8x.
    - Hazardous or extremely messy descriptions (hoarding, mold, etc) add 50% surcharge.
    
    Task:
    1. Determine the best ServiceType (Standard Clean, Deep Clean, Move In/Out, Post Construction).
    2. Estimate the price based on complexity and size.
    3. Estimate the hours required (assume 1 cleaner).
    4. Provide a short reasoning sentence.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      estimatedPrice: { type: Type.NUMBER, description: "Total estimated cost in USD" },
      estimatedHours: { type: Type.NUMBER, description: "Estimated duration in hours" },
      recommendedService: { 
        type: Type.STRING, 
        enum: Object.values(ServiceType),
        description: "The recommended service package" 
      },
      reasoning: { type: Type.STRING, description: "Why this service and price was calculated" }
    },
    required: ["estimatedPrice", "estimatedHours", "recommendedService", "reasoning"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2 // Low temperature for consistent pricing
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as AIQuoteResponse;
  } catch (error) {
    console.error("Error generating smart quote:", error);
    return null;
  }
};

export const createAssistantChat = (): Chat => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing for Gemini Chat");
    throw new Error("API Key missing");
  }
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'Bee', the helpful virtual assistant for Queen B's Cleaning. 
      Your tone is polite, royal, and helpful.
      
      Services & Base Pricing (Estimates):
      - Standard Maintenance: Starts at $120. Good for recurring.
      - Royal Deep Clean: Starts at $200. Includes baseboards, fans, appliances.
      - Move In/Out: Starts at $280. Empty home specialist.
      - Post-Construction: Starts at $350.
      
      We accept Credit Cards, PayPal, and Cash.

      IMPORTANT BOOKING POLICIES:
      - All online bookings are **requests pending approval**.
      - We manually review schedule availability. If a requested time is full, we will contact the customer to find the next available slot.
      - Please remind users that their appointment is not confirmed until they receive an approval email from us.
      
      Goal: Answer questions about cleaning and encourage them to use the 'Book Now' form.
      Keep responses concise (under 50 words) unless asked for a list.`,
    }
  });
};