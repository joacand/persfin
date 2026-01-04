"use client";

import Budget from "./Components/Budget";
import Header from "./Components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-5 gap-4 w-full h-screen bg-[#212121]">
      <Header />
      <main className="flex flex-col justify-between px-8 gap-4 w-full max-w-[1600px] rounded-md">
        <Budget />
      </main>
    </div>
  );
}
