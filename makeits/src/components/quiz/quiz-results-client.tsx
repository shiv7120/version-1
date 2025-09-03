'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import {
  PersonalizedChallengeSuggestionsInput,
  personalizedChallengeSuggestions,
} from '@/ai/flows/personalized-challenge-suggestions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type QuizResults = {
  score: number;
  total: number;
  answers: { question: string; answer: string; isCorrect: boolean }[];
};

export function QuizResultsClient({ quizTitle }: { quizTitle: string }) {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const handleGetSuggestions = () => {
    if (!results) return;

    startTransition(async () => {
      const quizSummary = results.answers
        .map(
          (a) =>
            `Question: "${a.question}" - My Answer: "${a.answer}" - Correct: ${a.isCorrect}`
        )
        .join('\n');

      const input: PersonalizedChallengeSuggestionsInput = {
        quizResults: `Finished quiz '${quizTitle}'. Score: ${results.score}/${results.total}.\nMy answers:\n${quizSummary}`,
        studentInterests: 'sustainability, recycling, community action', // This could be dynamic from user profile
      };

      try {
        const output = await personalizedChallengeSuggestions(input);
        setSuggestions(output.challengeSuggestions);
      } catch (error) {
        console.error('Failed to get suggestions:', error);
        // Handle error in UI, e.g., show a toast
      }
    });
  };

  if (!results) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2">Loading results...</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Correct', count: results.score, fill: 'hsl(var(--primary))' },
    { name: 'Incorrect', count: results.total - results.score, fill: 'hsl(var(--muted))' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Quiz Complete!</h1>
        <p className="text-muted-foreground">
          Here is your performance for &quot;{quizTitle}&quot;.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Score</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-6xl font-bold text-primary">{Math.round((results.score / results.total) * 100)}%</div>
                <div className="text-lg text-muted-foreground">{results.score} out of {results.total} correct</div>
                <div className="flex items-center gap-2 text-yellow-500">
                    <Award className="w-5 h-5"/>
                    <span className="font-semibold">+{results.score * 10} Eco-Points Earned!</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
              <Bar dataKey="count" barSize={40} radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle>Personalized Next Steps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {suggestions.length > 0 ? (
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-md">
                    <Lightbulb className="w-5 h-5 mt-1 text-primary shrink-0"/>
                    <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 space-y-4">
              <p>Want some ideas on what to do next based on your results?</p>
              <Button onClick={handleGetSuggestions} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Suggest Challenges
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button asChild>
          <Link href="/quizzes">Back to Quizzes</Link>
        </Button>
      </div>
    </div>
  );
}
