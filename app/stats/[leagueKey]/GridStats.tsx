type Props = { headers: string[]; data: any[][] };

export default function GridStats({ headers, data }: Props) {
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
