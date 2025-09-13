import { QuizResultsClient } from '@/components/quiz/quiz-results-client';
import { quizzes } from '@/lib/mock-data';
import { use } from 'react';

export default function QuizResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quiz = quizzes.find((q) => q.id === id);
  const quizTitle = quiz?.title || 'Quiz Results';

  return <QuizResultsClient quizTitle={quizTitle} />;
}
