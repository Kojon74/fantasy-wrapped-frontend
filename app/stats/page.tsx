"use client"

import { useSearchParams } from "next/navigation"
import { Dashboard } from "../../components/dashboard"

export default function StatsPage() {
  const searchParams = useSearchParams()
  const leagueId = searchParams.get("leagueId")

  if (!leagueId) {
    return <div>Error: No league selected</div>
  }

  return <Dashboard leagueId={leagueId} />
}

