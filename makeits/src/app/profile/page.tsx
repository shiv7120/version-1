import { currentUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, BookCopy, Target } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details and progress.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://picsum.photos/seed/${currentUser.avatar}/80`}
                alt={currentUser.name}
              />
              <AvatarFallback className="text-3xl">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold font-headline">
                {currentUser.name}
              </h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div>
            <h3 className="text-lg font-semibold">Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Eco-Points</p>
                  <p className="text-2xl font-bold">
                    {currentUser.ecoPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                <BookCopy className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                <Target className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Challenges Done
                  </p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
            <p className="text-muted-foreground mt-2">
              Coming soon: A list of your completed quizzes and challenges.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
