import { GoogleGenAI, Type } from "@google/genai";

// Safely retrieve API Key without causing ReferenceErrors
const getAPIKey = (): string => {
  try {
    // In most environments (including the browser with our polyfill), 
    // process.env.API_KEY should be available.
    // We wrap in try-catch to handle strict environments where 'process' might not be defined.
    return process.env.API_KEY || '';
  } catch (e) {
    // Fallback for browser environments where process might be attached to window
    try {
      return (window as any).process?.env?.API_KEY || '';
    } catch (e2) {
      return '';
    }
  }
};

const getAI = () => {
  const apiKey = getAPIKey();
  // We allow empty API key instantiation, but calls will fail if key is missing.
  return new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });
};

// This service helps the user modify the report columns dynamically based on natural language.
export const generateReportSchema = async (
  currentColumns: string[],
  userPrompt: string,
  availableFields: string[]
): Promise<string[]> => {
  
  const model = 'gemini-2.5-flash';
  
  const systemInstruction = `
    You are a database administrator for an Educational ERP. 
    The user wants to modify the columns visible in a student report table.
    
    Current Visible Columns: ${JSON.stringify(currentColumns)}
    All Available Fields in Database: ${JSON.stringify(availableFields)}
    
    User Request: "${userPrompt}"
    
    Task: Return a JSON array of strings representing the *new* list of visible columns based on the user's request.
    Preserve existing columns unless the user explicitly asks to remove them.
    Map vague requests (e.g., "contact info") to specific available fields (e.g., "parentPhone", "parentEmail", "address").
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const text = response.text;
    if (!text) return currentColumns;
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return current columns on failure so the app doesn't break
    return currentColumns;
  }
};

// Helper to ask architectural questions
export const analyzeRequirements = async (orgDescription: string) => {
  const model = 'gemini-2.5-flash';
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model,
      contents: `Analyze this educational organization description for an ERP system: "${orgDescription}". 
      List 3 critical architectural questions I should ask the client before building (e.g., about grading systems, fee structures, or multi-tenancy). 
      Keep it brief.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to analyze requirements at this time.";
  }
}