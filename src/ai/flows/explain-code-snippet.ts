// src/ai/flows/explain-code-snippet.ts
'use server';

/**
 * @fileOverview Explains a code snippet in plain English.
 *
 * - explainCodeSnippet - A function that handles the code explanation process.
 * - ExplainCodeSnippetInput - The input type for the explainCodeSnippet function.
 * - ExplainCodeSnippetOutput - The return type for the explainCodeSnippet function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainCodeSnippetInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to be explained.'),
});
export type ExplainCodeSnippetInput = z.infer<typeof ExplainCodeSnippetInputSchema>;

const ExplainCodeSnippetOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code snippet in plain English.'),
});
export type ExplainCodeSnippetOutput = z.infer<typeof ExplainCodeSnippetOutputSchema>;

export async function explainCodeSnippet(input: ExplainCodeSnippetInput): Promise<ExplainCodeSnippetOutput> {
  return explainCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodeSnippetPrompt',
  input: {
    schema: z.object({
      codeSnippet: z.string().describe('The code snippet to be explained.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The explanation of the code snippet in plain English.'),
    }),
  },
  prompt: `You are an expert software developer. Explain the following code snippet in plain English, so that a novice programmer can understand it.\n\nCode Snippet:\n\n{{{codeSnippet}}}`,
});

const explainCodeSnippetFlow = ai.defineFlow<
  typeof ExplainCodeSnippetInputSchema,
  typeof ExplainCodeSnippetOutputSchema
>({
  name: 'explainCodeSnippetFlow',
  inputSchema: ExplainCodeSnippetInputSchema,
  outputSchema: ExplainCodeSnippetOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
