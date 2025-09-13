import { QuizRunner } from '@/components/quiz/quiz-runner';
import { quizDetails } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

import { use } from 'react';

export default function TakeQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quiz = quizDetails[id];

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <QuizRunner quiz={quiz} />
    </div>
  );
}
