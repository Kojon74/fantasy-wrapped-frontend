import { Suspense } from "react";
import Loading from "./Loading";
import StatsDisplay from "./StatsDisplay";

export default async function StatsPage({
  params,
}: {
  params: { leagueKey: string };
}) {
  const { leagueKey } = params;

  return (
    <div>
      <h1>Fantasy Wrapped</h1>
      <Suspense fallback={<Loading progress={0} />}>
        <StatsDisplay leagueKey={leagueKey} />
      </Suspense>
    </div>
  );
}
