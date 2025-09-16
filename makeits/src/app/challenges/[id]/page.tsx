import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { challenges } from '@/lib/mock-data';
import { Award, Info, UploadCloud } from 'lucide-react';
import { notFound } from 'next/navigation';


type ParamsShape = { id: string };

type Props = { params: ParamsShape | Promise<ParamsShape> };

export default async function ChallengeDetailsPage({ params }: Props) {

// Ensure params is resolved when Next provides a Promise

const resolvedParams: ParamsShape = (await params) as ParamsShape;

const id = resolvedParams?.id;

const challenge = challenges.find((c) => q.id === id);

if (!challenge) {

notFound();

return null;

}

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            {challenge.title}
          </h1>
          <p className="text-muted-foreground">{challenge.category}</p>
        </div>
        <Card>
          <CardHeader className="flex-row gap-3 space-y-0 items-center">
            <Info className="w-5 h-5 text-primary" />
            <CardTitle>Challenge Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{challenge.description}</p>
            <div className="flex items-center gap-2 mt-4 text-lg font-semibold text-primary">
              <Award className="w-5 h-5" />
              <span>{challenge.points} Eco-Points</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Entry</CardTitle>
            <CardDescription>
              Upload a photo or video to prove you've completed the challenge.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Evidence (Photo/Video)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or MP4
                    </p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Comments (Optional)</Label>
              <Textarea
                placeholder="Any thoughts on the challenge?"
                id="message"
              />
            </div>
            <Button className="w-full">Submit for {challenge.points} Points</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
