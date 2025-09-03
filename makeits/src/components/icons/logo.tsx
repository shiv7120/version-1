import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Leaf className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">
        EcoChampion Quests
      </span>
    </div>
  );
}
