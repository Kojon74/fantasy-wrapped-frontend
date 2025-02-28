import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Data } from "./types";

type Props = { row: Data };

export default function ListStatsRow({ row }: Props) {
  return (
    <li key={row.rank} className="flex items-center space-x-4">
      <span className="text-xl font-bold">{row.rank}.</span>
      <Avatar>
        <AvatarImage src={row.image_url} alt={""} />
      </Avatar>
      <span className="flex-grow">{row.main_text}</span>
      {row.sub_text && <span className="flex-grow">{row.sub_text}</span>}
      {row.stat && (
        <span className="text-sm bg-white/20 px-2 py-1 rounded">
          {row.stat}
        </span>
      )}
    </li>
  );
}
