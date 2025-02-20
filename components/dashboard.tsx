"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Layout } from "./NavButtons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface DashboardProps {
  isMobile?: boolean;
  leagueId: string;
}

interface Metric {
  title: string;
  description: string;
  players: {
    name: string;
    image: string;
    value: string;
  }[];
  colorScheme: string;
}

const metrics: Metric[] = [
  {
    title: "The Mike Sillinger",
    description:
      "Recognizing the ultimate waiver wire wanderers, these players were dropped more times than a bad habit, bouncing from roster to roster all season long.",
    players: [
      {
        name: "Player 1",
        image: "/placeholder.svg?height=40&width=40",
        value: "12 drops",
      },
      {
        name: "Player 2",
        image: "/placeholder.svg?height=40&width=40",
        value: "10 drops",
      },
      {
        name: "Player 3",
        image: "/placeholder.svg?height=40&width=40",
        value: "9 drops",
      },
      {
        name: "Player 4",
        image: "/placeholder.svg?height=40&width=40",
        value: "8 drops",
      },
      {
        name: "Player 5",
        image: "/placeholder.svg?height=40&width=40",
        value: "7 drops",
      },
    ],
    colorScheme: "from-purple-600 via-pink-500 to-red-500",
  },
  {
    title: "The Diamond in the Rough",
    description:
      "These late-round draft picks or waiver wire acquisitions outperformed expectations and became season-long starters.",
    players: [
      {
        name: "Player A",
        image: "/placeholder.svg?height=40&width=40",
        value: "+150% proj",
      },
      {
        name: "Player B",
        image: "/placeholder.svg?height=40&width=40",
        value: "+120% proj",
      },
      {
        name: "Player C",
        image: "/placeholder.svg?height=40&width=40",
        value: "+100% proj",
      },
      {
        name: "Player D",
        image: "/placeholder.svg?height=40&width=40",
        value: "+90% proj",
      },
      {
        name: "Player E",
        image: "/placeholder.svg?height=40&width=40",
        value: "+80% proj",
      },
    ],
    colorScheme: "from-green-400 via-teal-500 to-blue-500",
  },
  {
    title: "The Injury Prone",
    description:
      "These players spent more time on the injury report than on the field, testing the patience of fantasy managers all season.",
    players: [
      {
        name: "Player X",
        image: "/placeholder.svg?height=40&width=40",
        value: "10 weeks IR",
      },
      {
        name: "Player Y",
        image: "/placeholder.svg?height=40&width=40",
        value: "8 weeks IR",
      },
      {
        name: "Player Z",
        image: "/placeholder.svg?height=40&width=40",
        value: "7 weeks IR",
      },
      {
        name: "Player W",
        image: "/placeholder.svg?height=40&width=40",
        value: "6 weeks IR",
      },
      {
        name: "Player V",
        image: "/placeholder.svg?height=40&width=40",
        value: "5 weeks IR",
      },
    ],
    colorScheme: "from-yellow-400 via-orange-500 to-red-500",
  },
  {
    title: "The Consistent Performers",
    description:
      "These reliable players were the backbone of your team, delivering steady points week after week.",
    players: [
      {
        name: "Player M",
        image: "/placeholder.svg?height=40&width=40",
        value: "90% games >10pts",
      },
      {
        name: "Player N",
        image: "/placeholder.svg?height=40&width=40",
        value: "85% games >10pts",
      },
      {
        name: "Player O",
        image: "/placeholder.svg?height=40&width=40",
        value: "80% games >10pts",
      },
      {
        name: "Player P",
        image: "/placeholder.svg?height=40&width=40",
        value: "75% games >10pts",
      },
      {
        name: "Player Q",
        image: "/placeholder.svg?height=40&width=40",
        value: "70% games >10pts",
      },
    ],
    colorScheme: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    title: "The Boom or Bust",
    description:
      "These players were the epitome of unpredictability, capable of winning you a week or sinking your team.",
    players: [
      {
        name: "Player R",
        image: "/placeholder.svg?height=40&width=40",
        value: "40% var",
      },
      {
        name: "Player S",
        image: "/placeholder.svg?height=40&width=40",
        value: "35% var",
      },
      {
        name: "Player T",
        image: "/placeholder.svg?height=40&width=40",
        value: "30% var",
      },
      {
        name: "Player U",
        image: "/placeholder.svg?height=40&width=40",
        value: "25% var",
      },
      {
        name: "Player V",
        image: "/placeholder.svg?height=40&width=40",
        value: "20% var",
      },
    ],
    colorScheme: "from-red-500 via-yellow-500 to-green-500",
  },
];

export function Dashboard({ isMobile = false, leagueId }: DashboardProps) {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const currentMetric = metrics[currentMetricIndex];
  const router = useRouter();

  useEffect(() => {
    document.body.className = `bg-gradient-to-br ${currentMetric.colorScheme} bg-gradient-animate`;
  }, [currentMetric.colorScheme]);

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
    <Layout
      isMobile={isMobile}
      onPrevious={currentMetricIndex > 0 ? handlePrevious : undefined}
      onNext={currentMetricIndex < metrics.length - 1 ? handleNext : undefined}
      onShare={handleShare}
    >
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
            <ol className="space-y-4">
              {currentMetric.players.map((player, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                  <Avatar>
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="flex-grow">{player.name}</span>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {player.value}
                  </span>
                </li>
              ))}
            </ol>
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
      </div>
    </Layout>
  );
}
