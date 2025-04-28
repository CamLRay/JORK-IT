import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "~/components/Navbar";
import {  SidebarProvider, SidebarTrigger  } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";

export const metadata: Metadata = {
  title: "JORK IT",
  description: "Jacob's Online Record Keeper for Instructed Training",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        
        <div className="hidden lg:block">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="pb-16 min-h-screen">{children}</main>
        </SidebarProvider>
        </div>
        <div className="lg:hidden">
          <main className="pb-16 min-h-screen">{children}</main>
          <Navbar />
        </div>
        <Toaster />
      </body>
    </html>
    
  );
}
