import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Game } from "./types";
import LeagueCard from "./LeagueCard";

type Props = { games: Game[] };

export default function UserHomeContent({ games }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center p-4 pt-28">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Your Fantasy Leagues
      </h1>
      <div className="grid gap-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {games.map((game) => (
          <Card
            key={game.game_key}
            className="bg-white/10 backdrop-blur-lg border-none text-white"
          >
            <CardHeader>
              <CardTitle>
                {`${game.code.toUpperCase()} ${game.season} -
                ${parseInt(game.season) + 1}`}
              </CardTitle>
              <CardDescription className="text-gray-200">
                {game.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {game.leagues.map((league) => (
                  <LeagueCard league={league} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
