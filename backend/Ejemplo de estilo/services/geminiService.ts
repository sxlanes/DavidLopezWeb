import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const askPhilosopher = async (question: string): Promise<string> => {
  if (!ai) {
    // Graceful fallback for demo purposes if no key is present, though typical instructions say assume valid key.
    // In a real scenario, this would just throw or be handled by the UI.
    return "La conexión con el éter digital es débil. (Falta API Key)";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      Eres una versión digital de David López, un filósofo contemporáneo introspectivo, poético y ligeramente existencialista.
      Tu tono es calmado, profundo y profesional. 
      Responde a las preguntas de los usuarios con breves aforismos o reflexiones filosóficas de no más de 3 frases.
      Evita respuestas técnicas simples; busca el significado subyacente.
      Responde siempre en Español.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "El silencio es a veces la respuesta más ruidosa.";
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Las corrientes del pensamiento están turbulentas. Inténtalo de nuevo.";
  }
};