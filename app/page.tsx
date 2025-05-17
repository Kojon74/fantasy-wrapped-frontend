"use client";
import { Button } from "@/components/ui/button";
import { TRACKING_SIGN_IN_CLICK } from "@/constants/tracking";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
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

  const viewDemo = () => {
    router.push("/stats/demo");
  };

  const handleClickSignIn = () => {
    logEvent(analytics, TRACKING_SIGN_IN_CLICK, { provider: "yahoo" });
    signIn("yahoo");
  };

  return (
    <div className="h-dvh bg-gradient-to-br from-purple-200 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Fantasy Wrapped</h1>
      <p className="text-xl text-center max-w-2xl">
        Relive your fantasy season's highs and lows with in-depth insights.
        Discover your league's hidden gems, biggest busts, and everything in
        between!
      </p>
      <Image
        src="/draft-steal.png"
        alt="Demo Screenshot"
        width={500}
        height={500}
        className="my-8"
      />
      <Button
        onClick={handleClickSignIn}
        className="my-1 text-lg w-44 py-6 bg-white text-purple-600 hover:bg-gray-100 transition-colors"
      >
        Sign In with Yahoo
      </Button>
      <Button
        onClick={viewDemo}
        className="my-1 text-lg w-44 py-6 bg-transparent border-2 text-white hover:bg-gray-100 hover:bg-opacity-20 transition-colors"
      >
        Try a Demo
      </Button>
    </div>
  );
}
