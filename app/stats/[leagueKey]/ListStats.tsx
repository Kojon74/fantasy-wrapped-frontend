import ListStatsRow from "./ListStatsRow";
import { Data } from "./types";

type Props = { data: Data[] };

export default function ListStats({ data }: Props) {
  return (
    <ol className="space-y-4">
      {data.map((row) => (
        <ListStatsRow row={row} />
      ))}
    </ol>
  );
}
