import "./globals.css";

import { Menu, Sun, UserCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";

export const metadata = {
   title: "Solar Fair Registration",
   description: "Registration form for Solar Fair events",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className="min-h-screen bg-background font-sans antialiased">
            <Toaster
               position="top-center"
               richColors
            />
            <div className="relative flex min-h-screen flex-col">
               {/* Modern Header/Navbar */}
               <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="max-w-[1000px] flex  mx-auto items-center">
                     <div className="flex items-center gap-2 mr-4">
                        <img
                           src="logo.png"
                           className="w-[100px]"
                        />
                        <img
                           src="logo2.jpg"
                           className="w-[100px]"
                        />
                     </div>
                  </div>
               </header>

               {/* Main Content */}
               <main className="flex-1 mx-auto max-w-[1000px] py-10 px-4">{children}</main>

               {/* Modern Footer */}
               <footer className="border-t bg-white">
                  <div className="mx-auto max-w-[1000px] py-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                           <img
                              src="logo3.jpg"
                              className="w-[100px]"
                           />
                        </div>
                     </div>
                  </div>
               </footer>
            </div>
         </body>
      </html>
   );
}
