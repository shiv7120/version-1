import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Zap, Target, Award } from 'lucide-react';
import Image from 'next/image';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="#" className="flex items-center justify-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground">
            EcoChampion Quests
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Become an EcoChampion Today
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join quests, take quizzes, and complete challenges to learn
                    about our environment and make a real-world impact.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/register">Start Your Quest</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/600.webp"
                width="600"
                height="600"
                alt="Hero"
                data-ai-hint="nature forest"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Engage, Learn, and Act
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to make environmental education fun
                  and impactful through a variety of interactive features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <Zap className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">
                  Dynamic Quizzes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge with quizzes on various environmental
                  topics and get instant feedback.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Target className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">
                  Real-World Challenges
                </h3>
                <p className="text-sm text-muted-foreground">
                  Apply what you've learned by completing hands-on environmental
                  challenges.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Award className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">
                  Earn Eco-Points
                </h3>
                <p className="text-sm text-muted-foreground">
                  Climb the leaderboard and become an EcoChampion by earning
                  points for your efforts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EcoChampion Quests. All rights
          reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
