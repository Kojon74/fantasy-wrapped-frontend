type Props = { headers: string[]; data: string[][] };

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
    <div>
      <h6 className="text-center text-lg font-bold ml-28">Team Schedule</h6>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`,
          gridTemplateRows: `repeat(${headers.length + 1}, 1fr)`,
        }}
      >
        <div></div>
        {headers.map((teamName) => (
          <div
            key={teamName}
            className="font-bold p-2 text-center text-gray-200"
          >
            {teamName}
          </div>
        ))}
        {headers.map((teamName, i: number) => (
          <>
            <div className="font-bold text-gray-200">{teamName}</div>
            {headers.map((_, j: number) => (
              <div
                key={`${teamName}-${j}`}
                className={`flex items-center justify-center p-2 text-white rounded-sm ${getRecordColor(
                  parseFloat(data[i][j])
                )}`}
              >
                {data[i][j]}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
