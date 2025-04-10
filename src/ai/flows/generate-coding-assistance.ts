// src/ai/flows/generate-coding-assistance.ts
'use server';

/**
 * @fileOverview An AI agent that provides coding assistance based on user input.
 *
 * - generateCodingAssistance - A function that generates code snippets and explanations based on a coding question or problem description.
 * - GenerateCodingAssistanceInput - The input type for the generateCodingAssistance function.
 * - GenerateCodingAssistanceOutput - The return type for the generateCodingAssistance function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCodingAssistanceInputSchema = z.object({
  codingProblem: z.string().describe('A coding question or problem description.'),
});

export type GenerateCodingAssistanceInput = z.infer<typeof GenerateCodingAssistanceInputSchema>;

const GenerateCodingAssistanceOutputSchema = z.object({
  codeSnippet: z.string().describe('The AI-generated code snippet.'),
  explanation: z.string().describe('The explanation of the code snippet.'),
});

export type GenerateCodingAssistanceOutput = z.infer<typeof GenerateCodingAssistanceOutputSchema>;

export async function generateCodingAssistance(input: GenerateCodingAssistanceInput): Promise<GenerateCodingAssistanceOutput> {
  return generateCodingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodingAssistancePrompt',
  input: {
    schema: z.object({
      codingProblem: z.string().describe('A coding question or problem description.'),
    }),
  },
  output: {
    schema: z.object({
      codeSnippet: z.string().describe('The AI-generated code snippet.'),
      explanation: z.string().describe('The explanation of the code snippet.'),
    }),
  },
  prompt: `You are an AI coding assistant. You generate code snippets and explanations based on user input.

  Problem: {{{codingProblem}}}

  Respond with a code snippet and an explanation of the code snippet.
  `,
});

const generateCodingAssistanceFlow = ai.defineFlow<
  typeof GenerateCodingAssistanceInputSchema,
  typeof GenerateCodingAssistanceOutputSchema
>({
  name: 'generateCodingAssistanceFlow',
  inputSchema: GenerateCodingAssistanceInputSchema,
  outputSchema: GenerateCodingAssistanceOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
