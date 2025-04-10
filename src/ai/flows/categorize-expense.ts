// categorize-expense.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for categorizing expenses based on their description.
 *
 * - categorizeExpense - A function that categorizes an expense based on its description.
 * - CategorizeExpenseInput - The input type for the categorizeExpense function, including the expense description.
 * - CategorizeExpenseOutput - The return type for the categorizeExpense function, providing the expense category.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CategorizeExpenseInputSchema = z.object({
  description: z.string().describe('The description of the expense.'),
});
export type CategorizeExpenseInput = z.infer<typeof CategorizeExpenseInputSchema>;

const CategorizeExpenseOutputSchema = z.object({
  category: z.string().describe('The category of the expense.'),
});
export type CategorizeExpenseOutput = z.infer<typeof CategorizeExpenseOutputSchema>;

export async function categorizeExpense(input: CategorizeExpenseInput): Promise<CategorizeExpenseOutput> {
  return categorizeExpenseFlow(input);
}

const categorizeExpensePrompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {
    schema: z.object({
      description: z.string().describe('The description of the expense.'),
    }),
  },
  output: {
    schema: z.object({
      category: z.string().describe('The category of the expense.'),
    }),
  },
  prompt: `You are an expert financial assistant. Please categorize the following expense description into one of the following categories: \n\n- Groceries\n- Utilities\n- Rent\n- Transportation\n- Entertainment\n- Travel\n- Office Supplies\n- Software\n- Marketing\n- Salaries\n- Other\n\nExpense Description: {{{description}}}\n\nCategory: `,
});

const categorizeExpenseFlow = ai.defineFlow<
  typeof CategorizeExpenseInputSchema,
  typeof CategorizeExpenseOutputSchema
>(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: CategorizeExpenseInputSchema,
    outputSchema: CategorizeExpenseOutputSchema,
  },
  async input => {
    const {output} = await categorizeExpensePrompt(input);
    return output!;
  }
);
