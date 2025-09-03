import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { quizzes } from '@/lib/mock-data';
import { BookCopy, Award } from 'lucide-react';
import Link from 'next/link';

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Quizzes</h1>
        <p className="text-muted-foreground">
          Test your environmental knowledge and earn Eco-Points!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1.5">
                  <BookCopy className="w-4 h-4" />
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>{quiz.points} Points</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/quizzes/${quiz.id}`}>Start Quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
