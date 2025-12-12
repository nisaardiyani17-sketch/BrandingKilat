import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Fallback response if no API key is present or error occurs, to ensure UI is usable
const FALLBACK_RESPONSE = "I'm simulating a response because the API key might be missing or there was an error. I think 'Kopi Kilat' is a fantastic name!";

export const generateBrandChatResponse = async (history: {role: string, content: string}[], userMessage: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return new Promise(resolve => setTimeout(() => resolve(FALLBACK_RESPONSE), 1000));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    
    // Construct a simple prompt context
    const systemInstruction = "You are a helpful branding assistant named 'BrandingKilat AI'. You help users define their brand identity. Be concise, encouraging, and professional.";
    
    // We will use a simple generateContent call for this demo, keeping it stateless on the server side
    // In a real app, we would use chat sessions.
    const prompt = `${systemInstruction}\n\nUser: ${userMessage}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || FALLBACK_RESPONSE;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_RESPONSE;
  }
};

export const generateBrandLogo = async (name: string, industry: string, primaryColor: string, secondaryColor: string): Promise<string | null> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash-image';

    const prompt = `Design a professional, minimalist, and modern logo for a brand named "${name}". 
    Industry: ${industry}. 
    Primary Color: ${primaryColor}. 
    Secondary Color: ${secondaryColor}. 
    Style: Vector art, flat design, icon-based, clean lines, white background, high quality.`;

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};