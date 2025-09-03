import { QuizRunner } from '@/components/quiz/quiz-runner';
import { quizDetails } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const quiz = quizDetails[params.id];

  if (!quiz) {
   
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <QuizRunner quiz={quiz} />
    </div>
  );
}
