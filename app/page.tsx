"use client";

import Budget from "./Components/Budget";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#212121]">
      <div className="flex flex-col p-5 gap-4">
        <Header />
      </div>
      <div className="flex flex-row">
        <Navigation />
        <div className="flex flex-col items-center p-5 gap-4">
          <main className="flex flex-col px-4 gap-4 w-full max-w-[1600px]">
            <Budget />
          </main>
        </div>
      </div>
    </div>
  );
}
