
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function combineScripts(script1: string, script2: string): Promise<string> {
  const model = 'gemini-2.5-pro';

  const prompt = `
You are an expert Pine Script developer. Your task is to combine two separate TradingView Pine Script indicators into a single, functional script. This is for users who have a limited number of indicators they can add to a chart.

Here are the two scripts to combine:

--- SCRIPT 1 START ---
${script1}
--- SCRIPT 1 END ---

--- SCRIPT 2 START ---
${script2}
--- SCRIPT 2 END ---

Please follow these instructions carefully:
1.  Merge the logic, inputs, and plotting functions from both scripts into one cohesive script.
2.  Ensure there is only one \`//@version=5\` declaration at the top of the final script.
3.  Create a single \`indicator()\` function call. Generate a new, creative, and descriptive name for the combined indicator, for example, "Momentum Fusion Oscillator". Keep other parameters from the first script's indicator() call, like 'overlay'.
4.  If you find any conflicting variable or function names between the two scripts, you MUST intelligently rename them to prevent compilation errors. For example, if both scripts use a variable named \`src\`, rename the one from the second script to \`src_2\` and update all its references accordingly. This is critical.
5.  Preserve all original comments from both scripts to maintain context.
6.  The final output should ONLY be the complete, combined Pine Script code, ready to be copied and pasted into the TradingView Pine Editor. Do not include any explanations, apologies, or markdown formatting like \`\`\`pine ... \`\`\`.
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
   
