import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Dashboard } from "@/app/stats/[leagueKey]/Dashboard";
import { getServerSession } from "next-auth";

type Props = { leagueKey: string };

export default async function StatsDisplay({ leagueKey }: Props) {
  const session = await getServerSession(authOptions);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    "X-Refresh-Token": session.refresh_token, // Custom header for refresh token
  };
  const response = await fetch(
    `http://127.0.0.1:5000/api/get-fantasy-data?league_key=${leagueKey}`,
    {
      headers,
    }
  );
  if (!response.ok) throw new Error("HTTP status " + response.status);
  const { teams, metrics } = await response.json();
  return <Dashboard teams={teams} metrics={metrics} />;
}
