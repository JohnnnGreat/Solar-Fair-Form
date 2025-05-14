import "./globals.css";

import { Menu, Sun, UserCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Solar Fair Registration",
  description: "Registration form for Solar Fair events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {/* Modern Header/Navbar */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-[1000px] flex h-14 mx-auto items-center">
              <div className="flex items-center gap-2 mr-4">
                <Sun className="h-6 w-6 text-amber-500" />
                <Link href="/" className="flex items-center space-x-2">
                  <span className="hidden font-bold sm:inline-block">
                    Solar<span className="text-amber-500">Fair</span>
                  </span>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container max-w-6xl py-10 px-4">{children}</main>

          {/* Modern Footer */}
          <footer className="border-t bg-muted/50">
            <div className="mx-auto max-w-[1000px] py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sun className="h-6 w-6 text-amber-500" />
                    <h3 className="font-bold">SolarFair</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connecting solar energy providers with businesses and consumers through
                    innovative events.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
