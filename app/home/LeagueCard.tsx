"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { League } from "./types";

type Props = { league: League };

const scoringTypeName = {
  point: "Points League",
  headpoint: "Head to Head Points League",
};

const LeagueCard = ({ league }: Props) => {
  const router = useRouter();

  const leagueScoringTypeName =
    scoringTypeName[league.scoring_type as keyof typeof scoringTypeName] ??
    "Other League";

  const checkAnalysisAvailable = () => {
    if (league.scoring_type !== "headpoint") return "League not supported";
    if (league.is_finished === "0") return "League still in progress";
  };

  const analysisDisabled = checkAnalysisAvailable();

  const handleLeagueSelect = (leagueKey: string) => {
    router.push(`/stats/${leagueKey}`);
  };

  return (
    <Card key={league.league_key} className="bg-white/20 border-none">
      <CardHeader>
        <CardTitle className="text-lg text-white">{league.name}</CardTitle>
        <CardDescription className="text-gray-200">
          Team: {league.name}
        </CardDescription>
        <CardDescription className="text-gray-200">
          {leagueScoringTypeName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => handleLeagueSelect(league.league_key)}
          className="w-full bg-white text-purple-600 hover:bg-gray-100"
        >
          {!!analysisDisabled ? analysisDisabled : "View Wrapped"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeagueCard;
