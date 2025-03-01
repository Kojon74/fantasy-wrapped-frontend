import ListStatsRow from "./ListStatsRow";
import { Data } from "./types";

type Props = { data: Data[] };

export default function ListStats({ data }: Props) {
  return (
    <table className="w-full table-auto">
      {data.map((row) => (
        <ListStatsRow row={row} />
      ))}
    </table>
  );
}
