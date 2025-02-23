import { Progress } from "@/components/ui/progress";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function StatsPage({
  params,
}: {
  params: { leagueKey: string };
}) {
  const { leagueKey } = params;
  const session = await getServerSession(authOptions);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    "X-Refresh-Token": session.refresh_token, // Custom header for refresh token
  };
  const resp = await fetch(
    `http://127.0.0.1:5000/api/get-fantasy-data?league_key=${leagueKey}`,
    {
      headers,
    }
  );
  console.log(await resp.json());

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Generating Your Fantasy Wrapped
      </h1>
      <div className="w-full max-w-md">
        {/* <Progress value={progress} className="w-full h-4" /> */}
      </div>
      <p className="mt-4 text-white text-lg">Crunching the numbers...</p>
    </div>
  );
}
