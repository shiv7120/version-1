import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { leaderboardData, User } from '@/lib/mock-data';
import { Trophy } from 'lucide-react';

const TopPlayerCard = ({ player, rank }: { player: User; rank: number }) => {
  const rankColors = {
    1: 'bg-yellow-400 text-yellow-900',
    2: 'bg-gray-300 text-gray-800',
    3: 'bg-yellow-600 text-yellow-100',
  };
  return (
    <Card className="flex flex-col items-center p-6">
      <div className="relative">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage
            src={`https://picsum.photos/seed/${player.avatar}/100`}
            alt={player.name}
          />
          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            rankColors[rank as keyof typeof rankColors]
          }`}
        >
          {rank}
        </div>
      </div>
      <h3 className="mt-4 text-xl font-bold font-headline">{player.name}</h3>
      <div className="flex items-center gap-1 mt-1 text-primary">
        <Trophy className="w-5 h-5" />
        <span className="font-semibold text-lg">
          {player.points.toLocaleString()}
        </span>
      </div>
    </Card>
  );
};

export default function LeaderboardPage() {
  const topThree = leaderboardData.slice(0, 3);
  const restOfPlayers = leaderboardData.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
        <p className="text-muted-foreground">
          See who is leading the charge in the EcoChampion community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.length > 1 && <TopPlayerCard player={topThree[1]} rank={2} />}
        {topThree.length > 0 && (
          <TopPlayerCard player={topThree[0]} rank={1} />
        )}
        {topThree.length > 2 && <TopPlayerCard player={topThree[2]} rank={3} />}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All EcoChampions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Eco-Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restOfPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-bold text-lg">
                    {player.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://picsum.photos/seed/${player.avatar}/40`}
                          alt={player.name}
                        />
                        <AvatarFallback>
                          {player.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {player.points.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
