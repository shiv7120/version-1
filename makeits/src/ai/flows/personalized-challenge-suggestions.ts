'use server';

/**
 * @fileOverview Personalized challenge suggestions based on quiz performance.
 *
 * - personalizedChallengeSuggestions - A function that suggests challenges.
 * - PersonalizedChallengeSuggestionsInput - The input type for the personalizedChallengeSuggestions function.
 * - PersonalizedChallengeSuggestionsOutput - The return type for the personalizedChallengeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedChallengeSuggestionsInputSchema = z.object({
  quizResults: z
    .string()
    .describe('The quiz results of the student.'),
  studentInterests: z.string().describe('The interests of the student'),
});
export type PersonalizedChallengeSuggestionsInput = z.infer<
  typeof PersonalizedChallengeSuggestionsInputSchema
>;

const PersonalizedChallengeSuggestionsOutputSchema = z.object({
  challengeSuggestions: z
    .array(z.string())
    .describe(
      'A list of personalized environmental challenges tailored to the student.'
    ),
});
export type PersonalizedChallengeSuggestionsOutput = z.infer<
  typeof PersonalizedChallengeSuggestionsOutputSchema
>;

export async function personalizedChallengeSuggestions(
  input: PersonalizedChallengeSuggestionsInput
): Promise<PersonalizedChallengeSuggestionsOutput> {
  return personalizedChallengeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedChallengeSuggestionsPrompt',
  input: {schema: PersonalizedChallengeSuggestionsInputSchema},
  output: {schema: PersonalizedChallengeSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized environmental challenge suggestions to students based on their quiz performance and interests.

  Analyze the student's quiz results and interests to identify areas where they can improve their knowledge and make a positive impact on the environment.

  Quiz Results: {{{quizResults}}}
  Student Interests: {{{studentInterests}}}

  Suggest challenges that are engaging, achievable, and relevant to the student's interests. The challenges should help the student learn more about specific environmental topics and encourage them to take action in their daily lives.

  Provide a list of challenge suggestions.

  Example:
  [
    "Participate in a local tree planting event and learn about the importance of reforestation.",
    "Reduce your carbon footprint by using public transportation or biking to school.",
    "Start a recycling program in your school or community to reduce waste and conserve resources.",
  ]
  `,
});

const personalizedChallengeSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedChallengeSuggestionsFlow',
    inputSchema: PersonalizedChallengeSuggestionsInputSchema,
    outputSchema: PersonalizedChallengeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
