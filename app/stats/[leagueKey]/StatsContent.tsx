import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Teams } from "./types";
import { Fragment } from "react";

type Props = { stats: any; teams: Teams; teamOrder?: string[] };

export default function StatsContent({ stats, teams }: Props) {
  if (!stats.team_order)
    return (
      <ol className="space-y-4">
        {stats.map((stat, i) => (
          <li key={i} className="flex items-center space-x-4">
            <span className="text-xl font-bold">{i + 1}</span>
            <Avatar>
              <AvatarImage
                src={!!stat.image ? stat.image : teams[stat.key].image}
                alt={!!stat.name ? stat.name : teams[stat.key].name}
              />
              <AvatarFallback>
                {!!stat.name ? stat.name : teams[stat.key].name}
              </AvatarFallback>
            </Avatar>
            <span className="flex-grow">
              {!!stat.name ? stat.name : teams[stat.key].name}
            </span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {stat.value}
            </span>
          </li>
        ))}
      </ol>
    );

  const getRecordColor = (percentage: number) => {
    if (percentage === 1) return "bg-grid-700";
    if (percentage >= 0.8) return "bg-grid-600";
    if (percentage >= 0.6) return "bg-grid-500";
    if (percentage >= 0.4) return "bg-grid-400";
    if (percentage >= 0.2) return "bg-grid-300";
    if (percentage > 0) return "bg-grid-200";
    return "bg-grid-100";
  };

  return (
    <div className="grid grid-cols-[auto,repeat(8,1fr)] gap-1 text-xs">
      <div className="font-bold p-2">Team \ Schedule</div>
      {stats.team_order.map((teamKey) => (
        <div key={teamKey} className="font-bold p-2 text-center">
          {teams[teamKey].name}
        </div>
      ))}
      {stats.team_order.map((teamKey, i: number) => (
        <Fragment key={i}>
          <div className="font-bold p-2">{teams[teamKey].name}</div>
          {stats.team_order.map((_, j: number) => (
            <div
              key={`${teamKey}-${j}`}
              className={`p-2 text-center text-white ${getRecordColor(
                stats.alternative_reality_matrix[i][j]
              )}`}
            >
              {stats.alternative_reality_matrix[i][j]}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
