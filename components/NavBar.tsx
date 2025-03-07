"use client";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 items-center backdrop-blur-lg bg-white/30 px-6 z-50">
      <div className="max-w-6xl mx-auto h-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold">Fantasy Wrapped</span>
        </Link>
        <div>
          <SignInOutButton />
        </div>
      </div>
    </nav>
  );
}
