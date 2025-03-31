"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { NavButtons } from "./NavButtons";
import { Metric } from "./types";
import ListStats from "./ListStats";
import GridStats from "./GridStats";
import Loading from "./Loading";

interface Props {
  leagueKey: string;
  isMobile?: boolean;
}

const backgroundColors = [
  "from-blue-500 via-purple-500 to-blue-500", // "Official" Results
  "from-teal-900 via-blue-900 to-teal-900", // Alternative Realities
  "from-yellow-400 via-green-500 to-yellow-400", // Draft Steal
  "from-red-600 via-orange-500 to-red-600", // Draft Bust
  "from-purple-600 via-pink-500 to-purple-600", // One-Man Army
  "from-red-700 via-gray-900 to-red-700", // Team Tormentor
  "from-red-600 via-orange-500 to-red-600", // Greatest Comeback
];

export function Dashboard({ leagueKey, isMobile = false }: Props) {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const currentMetric = metrics[currentMetricIndex];
  const currentBackground = backgroundColors[currentMetricIndex];

  useEffect(() => {
    const eventSource = new EventSource(`/api/get-metrics/${leagueKey}`); // Proxy via Next.js
    eventSource.onmessage = (event) => {
      console.log(event.data);
      const curMetric = JSON.parse(event.data);
      setMetrics((prev) => [...prev, ...curMetric]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handlePrevious = () => {
    setCurrentMetricIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentMetricIndex((prev) =>
      prev < metrics.length - 1 ? prev + 1 : prev
    );
  };

  const handleShare = () => {
    // Implement sharing functionality here
    console.log("Sharing current metric");
  };

  if (!currentMetric) return <Loading progress={0} />;

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center bg-gradient-to-br ${currentBackground}`}
    >
      <div className="max-w-6xl h-[calc(100vh-8rem)] flex flex-col py-5">
        <Card className="flex-grow mx-6 bg-white/10 backdrop-blur-lg text-white border-none flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-3xl font-bold">
              {currentMetric.title}
            </CardTitle>
            <CardDescription className="text-xl text-gray-200">
              {currentMetric.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            {currentMetric.type === "list" ? (
              <ListStats data={currentMetric.data} />
            ) : (
              <GridStats
                headers={currentMetric.headers}
                data={currentMetric.data}
              />
            )}
          </CardContent>
        </Card>
        <div className="flex-shrink-0 flex justify-center items-center space-x-2 mt-5">
          {metrics.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentMetricIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <NavButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShare={handleShare}
      />
    </div>
  );
}
