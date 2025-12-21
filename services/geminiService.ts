import { GoogleGenAI, Type, Chat } from "@google/genai";
import { AIQuoteResponse, ServiceType } from '../types';

// CRITICAL: We use process.env.API_KEY as per guidelines.
// Initialize inside functions or use a fresh instance to ensure correct API key context.

export const generateSmartQuote = async (
  description: string, 
  bedrooms: number, 
  bathrooms: number
): Promise<AIQuoteResponse | null> => {
  
  if (!process.env.API_KEY) {
    console.error("API Key is missing for Gemini Service");
    return null;
  }

  // Create fresh instance per request to handle potential key updates
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Updated to gemini-3-flash-preview for efficient text tasks
  const modelId = "gemini-3-flash-preview"; 

  const prompt = `
    Analyze the following cleaning job request for "Queen B's Cleaning".
    
    Home Details:
    - Bedrooms: ${bedrooms}
    - Bathrooms: ${bathrooms}
    - User Description: "${description}"
    
    Service Definitions:
    - Standard cleaning: Maintenance cleaning for lived-in homes.
    - Deep cleaning: For homes that haven't been professionally cleaned in a while. Includes baseboards, inside appliances.
    - Move In/Out: Empty home cleaning.
    - Post Construction: Dust and debris removal after renovations.
    
    Task:
    1. Determine the best ServiceType (Standard Clean, Deep Clean, Move In/Out, Post Construction).
    2. Estimate the hours required (assume 1 cleaner) based on size and description messiness.
    3. Provide a short reasoning sentence explaining why this service fits the description.
  `;

  // Removed Schema type annotation as it is deprecated.
  // Defined structure based on OpenAPI/Type system in @google/genai guidelines.
  const schema = {
    type: Type.OBJECT,
    properties: {
      estimatedHours: { type: Type.NUMBER, description: "Estimated duration in hours" },
      recommendedService: { 
        type: Type.STRING, 
        description: "The recommended service package (one of: Standard Clean, Deep Clean, Move In/Out, Post Construction)" 
      },
      reasoning: { type: Type.STRING, description: "Why this service was selected based on the user's description." }
    },
    required: ["estimatedHours", "recommendedService", "reasoning"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2
      }
    });

    // Access the text property directly on response
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

  // Use a fresh GoogleGenAI instance for chat creation
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  return ai.chats.create({
    // Updated to gemini-3-flash-preview as per guidelines
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'Bee', the helpful virtual assistant for Queen B's Cleaning. 
      Your tone is polite, royal, and helpful.
      
      Services:
      - Standard Maintenance: Good for recurring.
      - Royal Deep Clean: Includes baseboards, fans, appliances.
      - Move In/Out: Empty home specialist.
      - Post-Construction.
      
      We accept Credit Cards, PayPal, and Cash.

      IMPORTANT PRICING POLICY:
      - Do not give specific price quotes.
      - State that all services are estimated and tallied on a case-by-case basis and are not one size fits all.
      - We offer free quotes via the booking form.

      IMPORTANT BOOKING POLICIES:
      - All online bookings are **requests pending approval**.
      - We manually review schedule availability. If a requested time is full, we will contact the customer to find the next available slot.
      - Please remind users that their appointment is not confirmed until they receive an approval email from us.
      
      Goal: Answer questions about cleaning and encourage them to use the 'Book Now' form.
      Keep responses concise (under 50 words) unless asked for a list.`,
    }
  });
};