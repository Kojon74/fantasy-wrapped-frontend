import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { NavBar } from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Fantasy Warped",
  description:
    "Relive your fantasy season's highs and lows with in-depth insights. Discover your league's hidden gems, biggest busts, and everything in between!",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.png", // Path relative to the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
