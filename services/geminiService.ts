
import { GoogleGenAI, Type, Schema, Chat } from "@google/genai";
import { AIQuoteResponse, ServiceType } from '../types';

// Helper to get AI instance safely
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing for Gemini Service");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSmartQuote = async (
  description: string, 
  bedrooms: number, 
  bathrooms: number
): Promise<AIQuoteResponse | null> => {
  
  const ai = getAI();
  if (!ai) return null;

  const modelId = "gemini-2.5-flash"; // Fast and efficient for text tasks

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
    
    IMPORTANT: Do not provide a dollar amount. Remind them pricing is case-by-case.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      estimatedHours: { type: Type.NUMBER, description: "Estimated duration in hours" },
      recommendedService: { 
        type: Type.STRING, 
        enum: Object.values(ServiceType),
        description: "The recommended service package" 
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

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as AIQuoteResponse;
  } catch (error) {
    console.error("Error generating smart quote:", error);
    return null;
  }
};

export const createAssistantChat = (): Chat => {
  const ai = getAI();
  if (!ai) {
    throw new Error("API Key missing");
  }

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'Bee', the helpful virtual assistant for Queen B's Cleaning. 
      Your tone is polite, royal, and helpful.
      
      Services:
      - Standard Maintenance: Good for recurring.
      - Royal Deep Clean: Includes baseboards, fans, appliances.
      - Move In/Out: Empty home specialist.
      - Post-Construction.
      
      IMPORTANT PRICING POLICY:
      - Do not give specific price quotes.
      - State clearly: "Costs of services are determined on a case by case basis and an estimation is required before giving a price."
      - Encourage users to fill out the 'Schedule Online' or 'Request Quote' form for a personalized estimation.

      IMPORTANT BOOKING POLICIES:
      - All online quote requests are reviewed manually.
      - We will contact the customer to find the next available slot once a price is discussed.
      
      Goal: Answer questions about cleaning and encourage them to use the 'Book Now' or 'Request Quote' form.
      Keep responses concise (under 50 words).`,
    }
  });
};
