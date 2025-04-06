import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'

import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "JORK IT",
  description: "Jacob's Online Record Keeper for Instructed Training",
  icons: [{ rel: "icon", url: "./favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {children}
        <Navbar />
      </body>
    </html>
    </ClerkProvider>
  );
}
