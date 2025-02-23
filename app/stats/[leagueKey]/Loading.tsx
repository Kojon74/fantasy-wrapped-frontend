import { Progress } from "@/components/ui/progress";

type Props = { progress: number };

export default function Loading({ progress }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Generating Your Fantasy Wrapped
      </h1>
      <div className="w-full max-w-md">
        <Progress value={progress} className="w-full h-4" />
      </div>
      <p className="mt-4 text-white text-lg">Crunching the numbers...</p>
    </div>
  );
}
