"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Game } from "./types";

type Props = { games: Game[] };

export default function UserHomeContent({ games }: Props) {
  const router = useRouter();

  const handleLeagueSelect = (leagueKey: string) => {
    router.push(`/stats/${leagueKey}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Your Fantasy Leagues
      </h1>
      <div className="grid gap-4 w-full max-w-md">
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
                  <Card
                    key={league.league_key}
                    className="bg-white/20 border-none"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{league.name}</CardTitle>
                      {/* <CardDescription className="text-gray-200">Team: {league.name}</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handleLeagueSelect(league.league_key)}
                        className="w-full bg-white text-purple-600 hover:bg-gray-100"
                      >
                        View Wrapped
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
