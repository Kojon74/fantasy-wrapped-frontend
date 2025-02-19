"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function LoadingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const leagueId = searchParams.get("leagueId")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const simulateProgress = () => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearTimeout(timer)
          router.push(`/stats?leagueId=${leagueId}`)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })

      timer = setTimeout(simulateProgress, 500)
    }

    simulateProgress()

    return () => clearTimeout(timer)
  }, [router, leagueId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">Generating Your Fantasy Wrapped</h1>
      <div className="w-full max-w-md">
        <Progress value={progress} className="w-full h-4" />
      </div>
      <p className="mt-4 text-white text-lg">Crunching the numbers...</p>
    </div>
  )
}

