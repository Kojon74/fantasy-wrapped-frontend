import { Suspense } from "react";
import Loading from "./Loading";
import { Dashboard } from "./Dashboard";

export default async function StatsPage({
  params,
}: {
  params: { leagueKey: string };
}) {
  const { leagueKey } = params;

  // TODO: Is the suspense even doing anything?
  return (
    <Suspense fallback={<Loading progress={0} />}>
      <Dashboard leagueKey={leagueKey} />
    </Suspense>
  );
}
