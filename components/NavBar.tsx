"use client";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";
import Image from "next/image";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 items-center backdrop-blur-lg bg-white/30 z-50">
      <div className="max-w-6xl mx-auto h-full flex justify-between items-center px-4 sm:px-2 lg:px-6">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/favicon.png"
            alt="Fantasy Warped"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold ml-2">Fantasy Warped</span>
        </Link>
        <div>
          <SignInOutButton />
        </div>
      </div>
    </nav>
  );
}
