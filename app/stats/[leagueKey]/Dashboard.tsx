"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { NavButtons } from "./NavButtons";
import { Metric } from "./types";
import ListStats from "./ListStats";
import GridStats from "./GridStats";

interface Props {
  metrics: Metric[];
  isMobile?: boolean;
}

const backgroundColors = [
  "from-blue-500 via-purple-500 to-blue-500",
  "from-yellow-400 via-green-500 to-yellow-400",
  "from-red-600 via-orange-500 to-red-600",
  "from-purple-600 via-pink-500 to-purple-600",
  "from-red-700 via-gray-900 to-red-700",
];

export function Dashboard({ metrics, isMobile = false }: Props) {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const currentMetric = metrics[currentMetricIndex];
  const currentBackground = backgroundColors[currentMetricIndex];
  const router = useRouter();

  // useEffect(() => {
  //   document.body.className = `bg-gradient-to-br ${currentMetric.colorScheme} bg-gradient-animate`;
  // }, [currentMetric.colorScheme]);

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

  const handleBackToHome = () => {
    router.push("/home");
  };

  return (
    <div className={`h-screen pt-28 bg-gradient-to-br ${currentBackground}`}>
      <div className="max-w-6xl mx-auto">
        <Card className="mx-6 bg-white/10 backdrop-blur-lg text-white border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {currentMetric.title}
            </CardTitle>
            <CardDescription className="text-xl text-gray-200">
              {currentMetric.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentMetric.type === "list" ? (
              <ListStats data={currentMetric.data} />
            ) : (
              <GridStats data={currentMetric.data} />
            )}
          </CardContent>
        </Card>
      </div>
      {/* <div className="fixed bottom-24 w-full"> */}
      <div className="fixed bottom-24 w-full flex justify-center items-center space-x-2">
        {metrics.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentMetricIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      {/* </div> */}
      <NavButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShare={handleShare}
      />
    </div>
  );
}
