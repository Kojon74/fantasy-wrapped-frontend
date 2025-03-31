"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // TODO: Handle loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    router.push("/home");
    return null;
  }

  return (
    <div className="h-dvh bg-gradient-to-br from-purple-200 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Fantasy Wrapped</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Relive your fantasy season's highs and lows with in-depth insights.
        Discover your league's hidden gems, biggest busts, and everything in
        between!
      </p>
      <Button
        onClick={() => signIn("yahoo")}
        className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-gray-100 transition-colors"
      >
        Sign In with Yahoo
      </Button>
    </div>
  );
}
