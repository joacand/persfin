"use client";

import Link from "next/link";

export default function About() {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl">About</h2>
            <div className="flex flex-col max-w-3xl text-base gap-4 bg-[#0B1A16] rounded p-4">
                <p className="text-lg">Welcome to <strong>Perfin!</strong></p>
                <p>This is a personal finance application based on <Link className="text-blue-500" href="https://en.wikipedia.org/wiki/Double-entry_bookkeeping">double-entry accounting</Link> principles. Every transaction is recorded from an account to another account, where each account has one of the type: asset, liability, equity, revenue, or expense. This ensures the finances are always balanced and traceable.</p>
                <p>The app allows you to track your bank accounts, income, expenses, loans, and investments in a single place. By using proper accounting logic, you can generate accurate projections of your net worth and monitor how your actions affect your financial health over time.</p>
            </div>
        </div>
    );
}
