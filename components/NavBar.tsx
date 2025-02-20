"use client";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";

export function NavBar() {
  return (
    <nav className="h-1/2">
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
