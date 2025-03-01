import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Data } from "./types";

type Props = { row: Data };

export default function ListStatsRow({ row }: Props) {
  return (
    <tr key={row.rank}>
      <td className="text-xl font-bold">{row.rank}.</td>
      <td>
        <Avatar>
          <AvatarImage src={row.image_url} alt={""} />
        </Avatar>
      </td>
      <td className="whitespace-nowrap text-xl font-bold">{row.main_text}</td>
      {row.sub_text && (
        <td className="whitespace-nowrap text-gray-300 text-lg">
          {row.sub_text}
        </td>
      )}
      <td className="w-full">
        {row.stat && (
          <span className="float-right text-sm bg-white/20 px-2 py-1 rounded">
            {row.stat}
          </span>
        )}
      </td>
    </tr>
  );
}
