"use client";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/30 shadow-md border-b border-white/10 px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Fantasy Wrapped</span>
          </Link>
          <div>
            <SignInOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
