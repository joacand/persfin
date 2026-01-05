import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import { BudgetProvider } from "./Components/BudgetProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Personal finance tracking application.",
  keywords: [
    "persfin",
    "personal finance",
    "budget",
    "accounting"
  ],
  authors: [{ name: "joacand" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BudgetProvider>
          <div className="flex flex-col w-full min-h-screen bg-[#0B1210] text-white">
            <div className="flex flex-col p-5 gap-4">
              <Header />
            </div>
            <div className="flex flex-row">
              <Navigation />
              <div className="flex flex-col items-center p-5 gap-4">
                <main className="flex flex-col px-4 gap-4 w-full max-w-330 ">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </BudgetProvider>
      </body>
    </html>
  );
}
