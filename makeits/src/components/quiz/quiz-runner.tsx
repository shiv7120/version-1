'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

type Quiz = {
  id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
};

type QuizRunnerProps = {
  quiz: Quiz;
};

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { question: string; answer: string; isCorrect: boolean }[]
  >([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
    setUserAnswers([
      ...userAnswers,
      { question: currentQuestion.question, answer: selectedAnswer, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished, navigate to results
      const results = {
        score,
        total: quiz.questions.length,
        answers: userAnswers,
      };
      // For a real app, you'd likely save this to a DB.
      // Here, we'll pass it via query params (or use state management).
      localStorage.setItem('quizResults', JSON.stringify(results));
      router.push(`/quizzes/${quiz.id}/results`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-2xl font-headline">
            {quiz.title}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={setSelectedAnswer}
            disabled={isAnswered}
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option}
                className={cn(
                  'flex items-center space-x-3 p-4 border rounded-md transition-colors',
                  isAnswered &&
                    option === currentQuestion.answer &&
                    'border-green-500 bg-green-500/10',
                  isAnswered &&
                    option !== currentQuestion.answer &&
                    selectedAnswer === option &&
                    'border-red-500 bg-red-500/10'
                )}
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {isAnswered && option === currentQuestion.answer && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {isAnswered &&
                  option !== currentQuestion.answer &&
                  selectedAnswer === option && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
              </div>
            ))}
          </RadioGroup>

          {isAnswered && (
            <div className="p-4 bg-secondary rounded-md space-y-2">
              <h4 className="font-semibold">Explanation</h4>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            {isAnswered ? (
              <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
                {currentQuestionIndex < quiz.questions.length - 1
                  ? 'Next Question'
                  : 'Finish Quiz'}
              </Button>
            ) : (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className="w-full sm:w-auto"
              >
                Check Answer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
