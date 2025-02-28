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

export function Dashboard({ metrics, isMobile = false }: Props) {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const currentMetric = metrics[currentMetricIndex];
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
    <div className={`${isMobile ? "px-4" : "px-8"}`}>
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="absolute top-4 right-4 text-white"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <Card className="bg-white/10 backdrop-blur-lg text-white border-none">
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
      <div className="mt-8 flex justify-center items-center space-x-2">
        {metrics.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentMetricIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-white mt-4">
        {currentMetricIndex + 1} of {metrics.length}
      </p>
      <NavButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShare={handleShare}
      />
    </div>
  );
}
