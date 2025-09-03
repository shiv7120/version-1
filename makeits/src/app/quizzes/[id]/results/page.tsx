import { QuizResultsClient } from '@/components/quiz/quiz-results-client';
import { quizzes } from '@/lib/mock-data';

export default function QuizResultsPage({ params }: { params: { id: string } }) {
  const quiz = quizzes.find((q) => q.id === params.id);
  const quizTitle = quiz?.title || 'Quiz Results';

  return <QuizResultsClient quizTitle={quizTitle} />;
}
