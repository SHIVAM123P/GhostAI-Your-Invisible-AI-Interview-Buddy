'use server';
/**
 * @fileOverview A code optimization AI agent.
 *
 * - optimizeCode - A function that handles the code optimization process.
 * - OptimizeCodeInput - The input type for the optimizeCode function.
 * - OptimizeCodeOutput - The return type for the optimizeCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const OptimizeCodeInputSchema = z.object({
  code: z.string().describe('The code to be optimized.'),
  optimizationType: z
    .enum(['performance', 'readability', 'security'])
    .describe('The type of optimization to perform.'),
});
export type OptimizeCodeInput = z.infer<typeof OptimizeCodeInputSchema>;

const OptimizeCodeOutputSchema = z.object({
  optimizedCode: z.string().describe('The optimized code.'),
  explanation: z.string().describe('The explanation of the changes made.'),
});
export type OptimizeCodeOutput = z.infer<typeof OptimizeCodeOutputSchema>;

export async function optimizeCode(input: OptimizeCodeInput): Promise<OptimizeCodeOutput> {
  return optimizeCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCodePrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code to be optimized.'),
      optimizationType: z
        .enum(['performance', 'readability', 'security'])
        .describe('The type of optimization to perform.'),
    }),
  },
  output: {
    schema: z.object({
      optimizedCode: z.string().describe('The optimized code.'),
      explanation: z.string().describe('The explanation of the changes made.'),
    }),
  },
  prompt: `You are an expert code optimizer. You will receive code and an optimization type. You will then return the optimized code and an explanation of the changes made.

Code: {{{code}}}
Optimization Type: {{{optimizationType}}}
`,
});

const optimizeCodeFlow = ai.defineFlow<
  typeof OptimizeCodeInputSchema,
  typeof OptimizeCodeOutputSchema
>({
  name: 'optimizeCodeFlow',
  inputSchema: OptimizeCodeInputSchema,
  outputSchema: OptimizeCodeOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});



