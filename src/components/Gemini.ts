'use server';

import { ai } from '@/ai/ai-instance';

export const Gemini = async (prompt: string) => {
  try {
    const result = await ai.generateContent(prompt);
    return result.text();
  } catch (e: any) {
    console.error('Gemini API error:', e);
    return 'Failed to generate response. Please check the console for errors.';
  }
};
