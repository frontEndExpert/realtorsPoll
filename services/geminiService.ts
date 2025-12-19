
import { GoogleGenAI, Type } from "@google/genai";
import { PollChoiceId, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPollInsight(choice: PollChoiceId, label: string): Promise<AIInsight> {
  const prompt = `A Realtor just answered a poll about lead management bottlenecks. 
  They selected: "${label}".
  
  Please provide a professional, high-value insight and a potential solution for this specific problem.
  Return a JSON object with:
  1. "title": A catchy headline for the advice (e.g., "The Instant Response Advantage").
  2. "suggestion": 2-3 sentences of expert coaching advice.
  3. "toolReference": A brief mention of how automation/AI tools could fix this.
  
  Keep the tone encouraging, professional, and targeted at high-performing Real Estate agents.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          suggestion: { type: Type.STRING },
          toolReference: { type: Type.STRING }
        },
        required: ["title", "suggestion", "toolReference"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      title: "Optimization Strategy",
      suggestion: "Consistency is key in lead management. Focus on creating a repeatable system that handles the heavy lifting.",
      toolReference: "Consider implementing a CRM with automated workflows."
    };
  }
}
