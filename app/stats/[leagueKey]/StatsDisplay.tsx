import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Dashboard } from "@/app/stats/[leagueKey]/Dashboard";
import { getServerSession } from "next-auth";
import { dummyData } from "@/dummyData";

type Props = { leagueKey: string };

export default async function StatsDisplay({ leagueKey }: Props) {
  const useDummyData = true;
  if (useDummyData) return <Dashboard metrics={dummyData} />;

  const session = await getServerSession(authOptions);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    "X-Refresh-Token": session.refresh_token, // Custom header for refresh token
  };
  const response = await fetch(`http://127.0.0.1:8000/wrapped/${leagueKey}`, {
    headers,
  });
  if (!response.ok) throw new Error("HTTP status " + response.status);
  const { metrics } = await response.json();
  console.log(JSON.stringify(metrics));
  return <Dashboard metrics={metrics} />;
}
