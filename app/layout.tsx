import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import { BudgetProvider } from "./Components/BudgetProvider";
import { AuthProvider } from "./Components/AuthContext";
import AuthCheck from "./Components/LoginCheck";

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
        <AuthProvider>
          <BudgetProvider>
            <div className="flex flex-row justify-center min-h-screen bg-[#0E1114] text-white">
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-row flex-wrap justify-center items-center px-4 gap-4 bg-[#151A1E] w-full">
                  <Header />
                  <Navigation />
                </div>
                <main className="flex flex-col flex-1 bg-[#151A1E] p-4 rounded w-[min(100%,80rem)] m-5 items-center">
                  <AuthCheck>
                    {children}
                  </AuthCheck>
                </main>
              </div>
            </div>
          </BudgetProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
